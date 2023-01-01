interface TodoType {
  id?: string;
  title: string;
  content: string;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: string | undefined;
}

export type { TodoType };
