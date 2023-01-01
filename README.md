# wanted-pre-onboarding-challenge-fe-1

본 프로젝트는 원티드 프리온보딩 1월 사전미션을 위해 구현되었습니다.

<br>

---

<br>
# 프로젝트 실행 방법 (루트 폴더 기준)

- 백엔드

```
cd backend
yarn start
```

- 프론트엔드

```
cd frontend
npm run start
```

---

# 프로젝트 소개

프로젝트 주요기능

- 로그인/회원가입
- 투두리스트 조회
- 투두리스트 상세페이지 조회
- 투두리스트 수정/삭제

사용 라이브러리

- React + Typescript
- MUI (Material UI)
- axios

---

## 로그인/회원가입

### 유효성 검사

로그인/회원가입 시 필요한 `loginId`, `password` input 값에 대해 매 입력 마다 `utils/validateUserInfo`의 정규식에 만족하는지 확인하고, 모두 만족한다면 `setValid`를 통해 `valid`의 값을 `true`로 변경합니다.

```typescript
// frontend/src/page/LoginPage.tsx

const userInfoChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  const next: UserInfoType = { ...userInfo };
  next[name] = value;
  setValid(validateUserInfo(next)); // 유효성 검사
  setUserInfo(next);
};
...

return (
  ...

    <TextField
    label="LOGIN ID (EMAIL)"
    name="loginId"
    margin="dense"
    onChange={userInfoChangeHandler}
    value={userInfo.loginId}
    fullWidth
  />
  <TextField
    type="password"
    label="PASSWORD"
    name="password"
    sx={{ margin: '10px 0 20px 0' }}
    onChange={userInfoChangeHandler}
    value={userInfo.password}
    fullWidth
  />

  ...
)

// utils/validate.ts

const regexp: { [key: string]: RegExp } = {
  loginId: /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  password: /^.{8,}$/,
};

const validateUserInfo = ({ loginId, password }: UserInfoType) => {
  return regexp.loginId.test(loginId) && regexp.password.test(password);
};
```

### 토큰 보유 여부 확인

`/auth` 페이지에 접근할 때 토큰이 로컬 스토리지에 존재하는지 확인 후, 존재한다면 `/`페이지로 이동합니다.

```typescript
// src/page/LoginPage.tsx

React.useEffect(() => {
  const token = localStorage.getItem('token');
  if (token) navigate('/');
}, [navigate]);
```

---

## 투두리스트 조회

`getTodos` 메서드를 정의하여 `/` 페이지 진입 시, 투두리스트를 fetch하여 브라우저에 렌더링합니다.

```typescript
// src/page/HomePage.tsx
const getTodos = React.useCallback(async () => {
  const { status, data } = await getTodosApi();

  if (status) {
    navigate(validateStatus(status, pathname + search));
  }

  if (status === 200) {
    setTodos(data);
  }
}, [pathname, search, navigate]);

React.useEffect(() => {
  getTodos();
}, [getTodos, search]);

return (
  ...
  <List>
    {todos.map((td) => (
      <Todo key={td.id} active={td.id === todo} {...td} />
    ))}
  </List>
  ...
);

// src/api/todo.ts
const getTodosApi = async () => {
  try {
    const { status, data } = await axios.get<{ data: TodoType[] }>(
      'http://localhost:8080/todos',
      {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      },
    );
    return { status, data: data.data };
  } catch (err) {
    const error = err as AxiosError;
    return { status: error.response?.status, data: [] };
  }
};
```

---

## 투두리스트 상세 조회

투두리스트 클릭 시, query( `mode=detail, todo=id`)로 정보를 특정하면,

```typescript
// src/components/Todo.tsx
const Todo = ({ id, title, updatedAt, active }: TodoProps) => {
  const navigate = useNavigate();
  const formatter = Intl.DateTimeFormat('ko-KR', {}).format;

  const changeTodoId = () => {
    navigate(`/?mode=detail&todo=${id}`);
  };

  return (
    <ListItem sx={{ display: 'flex', alignItems: 'flex-start', padding: 0 }}>
      <ListItemButton
        onClick={changeTodoId}
        sx={{ display: 'block', background: active ? '#eeeeee' : 'none' }}
      >
        <Typography variant="h6">{title}</Typography>
        <Typography variant="subtitle2">
          {updatedAt && formatter(new Date(updatedAt))}
        </Typography>
      </ListItemButton>
    </ListItem>
  );
};
```

`HomePage` 컴포넌트에서 query의 `mode`에 따라 `TodoDetail` 컴포넌트를 렌더링합니다.

```typescript
// src/page/HomePage.tsx
...
<Box flex="3" padding="30px 30px">
  {mode === 'add' && <AddTodo />}
  {(mode === 'detail' || mode === 'modify') && <TodoDetail />}
</Box>;
...
```

`TodoDetail`에서는 query로 받은 id를 기반으로 상세 정보를 받아옵니다.<br>
(`modify === false, default false`) 아직 수정모드가 아니므로 `ReadTodo` 컴포넌트를 렌더링합니다.

```typescript
  ...
  const fetchTodo = React.useCallback(async () => {
    const { status, data } = await getTodoByIdApi(id);
    if (status === 200) {
      setTodo(data);
    }
  }, [id]);
  ...

return (
  ...
  <Box>
    {modifyMode ? (
      <ModifyTodo
        id={id}
        todo={todo}
        modifiedTodo={modifiedTodo}
        fetchTodo={fetchTodo}
        changeModifyMode={changeModifyMode}
        copyModifiedTodo={copyModifiedTodo}
      />
    ) : (
      <ReadTodo
        todo={{ ...todo, id }}
        changeModifyMode={changeModifyMode}
        copyModifiedTodo={copyModifiedTodo}
      />
    )}
  </Box>
  ...
);
```

`ReadTodo` 컴포넌트에서 `props`로 받아온 상세정보를 렌더링합니다.

```typescript
// src/components/ReadTodo.tsx
  ...
  <Typography variant="h6">할 일 제목</Typography>
  <Typography>{title}</Typography>
  <Typography variant="h6">할 일 내용</Typography>
  <Typography>{content}</Typography>
  <Typography variant="h6">등록일</Typography>
  <Typography>{createdAt && formatter(new Date(createdAt))}</Typography>
  <Typography variant="h6">수정일</Typography>
  <Typography>{updatedAt && formatter(new Date(updatedAt))}</Typography>
  ...
```

---

## 투두리스트 수정

`ReadTodo` 컴포넌트에서 수정 버튼을 클릭하면, 수정을 위한 `modifiedTodo`에 현재 투두리스트에 대한 정보를 저장한 후, `modifyMode`를 `true`로 변경합니다.
그리고 query를 `mode=modify&todo=id`로 변경합니다.

```typescript
// src/components/ReadTodo.tsx
...
const onModifyMode = () => {
  copyModifiedTodo(todo);
  changeModifyMode(true);
  navigate(`/?mode=modify&todo=${id}`);
};
...
<Button variant="contained" onClick={onModifyMode}>
  수정
</Button>
...
```

`mode=modify`로 변경되면 아래 `ReadTodo` 컴포넌트 대신 `ModifyTodo` 컴포넌트가 렌더링 됩니다. <br>
`title`과 `content`에 대해 매 입력마다 `modifiedTodo`에 저장되며, 확인 버튼을 누르면, `modifiedTodo`에 저장되있던 정보와 `id`값을 서버에 요청하여 `update`를 할 수 있습니다.

```typescript
// src/components/ModifyTodo.tsx
  ...
  const changeTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const next: TodoType = { ...todo };
    next[name] = value;
    copyModifiedTodo(next);
  };

  const updateTodo = async () => {
    const status = await updateTodoApi({
      id,
      title: modifiedTodo.title,
      content: modifiedTodo.content,
    });

    if (status === 200) {
      cancelModifyMode();
      fetchTodo();
    }
  };

...
<>
  <Box display="flex" gap="1rem" marginBottom="1rem">
    <Button variant="contained" onClick={updateTodo}>
      확인
    </Button>
    <Button variant="contained" color="info" onClick={cancelModifyMode}>
      취소
    </Button>
  </Box>
  <Typography variant="h6">할 일 제목</Typography>
  <Input name="title" value={modifiedTodo.title} onChange={changeTodo} />
  <Typography variant="h6">할 일 내용</Typography>
  <Input name="content" value={modifiedTodo.content} onChange={changeTodo} />
</>
...
```

---

## 투두리스트 삭제

`TodoDetail`의 삭제 버튼을 클릭하면, 해당 id의 투두리스트를 삭제 할 수 있습니다.

```typescript
// src/components/TodoDetail.tsx
...
const removeTodo = async () => {
  const status = await removeTodoApi(id);
  if (status === 200) {
    alert('정상적으로 삭제되었습니다.');
    navigate('/');
  }
};

return (
  <>
    <Box display="flex" gap="1rem" marginBottom="1rem">
      <Button variant="contained" onClick={onModifyMode}>
        수정
      </Button>
      <Button variant="contained" color="error" onClick={removeTodo}>
        삭제
      </Button>
    </Box>
    <Typography variant="h6">할 일 제목</Typography>
    <Typography>{title}</Typography>
    <Typography variant="h6">할 일 내용</Typography>
    <Typography>{content}</Typography>
    <Typography variant="h6">등록일</Typography>
    <Typography>{createdAt && formatter(new Date(createdAt))}</Typography>
    <Typography variant="h6">수정일</Typography>
    <Typography>{updatedAt && formatter(new Date(updatedAt))}</Typography>
  </>
);
```

---

## 폴더 구조

```
wanted-pre-onboard-1
├─ backend
│  ├─ app.ts
│  ├─ controllers
│  ├─ db
│  ├─ index.ts
│  ├─ middleware
│  ├─ models
│  ├─ package.json
│  ├─ README.md
│  ├─ routes
│  ├─ services
│  ├─ tsconfig.json
│  ├─ types
│  ├─ utils
│  └─ yarn.lock
├─ frontend
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ public
│  ├─ README.md
│  ├─ src
│  │  ├─ api
│  │  ├─ App.tsx
│  │  ├─ components
│  │  ├─ index.css
│  │  ├─ index.tsx
│  │  ├─ layout
│  │  ├─ logo.svg
│  │  ├─ page
│  │  ├─ setupTests.ts
│  │  ├─ style
│  │  ├─ types
│  │  └─ utils
│  └─ tsconfig.json
├─ .gitignore
└─ README.md

```
