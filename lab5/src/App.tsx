import { useQuery } from '@tanstack/react-query';
import { todosApi } from './api/todos';

function App() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['todos'],
    queryFn: todosApi.getAll,
  });
  if (isLoading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <p>Завантаження списку завдань...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div style={{ padding: '20px', color: 'red' }}>
        <p>Сталася помилка: {(error as Error).message}</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <h1>Мій список справ</h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {data?.map((todo) => (
          <li 
            key={todo.id} 
            style={{ 
              padding: '10px',
              borderBottom: '1px solid #eee',
              textDecoration: todo.completed ? 'line-through' : 'none',
              color: todo.completed ? '#888' : '#f0ebeb'
            }}
          >
            {todo.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;