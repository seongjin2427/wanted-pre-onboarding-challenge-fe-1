import { useNavigate } from 'react-router-dom';
import { ListItem, ListItemButton, Typography } from '@mui/material';

interface TodoProps {
  id?: string;
  title: string;
  createdAt?: string;
  updatedAt?: string;
  active?: boolean;
}

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

export default Todo;
