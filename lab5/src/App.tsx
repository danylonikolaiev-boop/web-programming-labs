import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { todosApi } from './api/todos';

function App() {
  const [title, setTitle] = useState('');
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['todos'],
    queryFn: todosApi.getAll,
  });

  const mutation = useMutation({
    mutationFn: (newTitle: string) => 
      todosApi.create({ title: newTitle, completed: false }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      setTitle('');
    },
  });

  const AddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    mutation.mutate(title);
  };

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

      <form onSubmit={AddTodo} style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Що потрібно зробити?"
          style={{ flex: 1, padding: '8px' }}
        />
        <button 
          type="submit" 
          disabled={mutation.isPending}
          style={{ padding: '8px 16px', cursor: mutation.isPending ? 'not-allowed' : 'pointer' }}
        >
          {mutation.isPending ? 'Додавання...' : 'Додати'}
        </button>
      </form>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {data?.map((todo) => (
          <li 
            key={todo.id} 
            style={{ 
              padding: '10px',
              borderBottom: '1px solid #eee',
              textDecoration: todo.completed ? 'line-through' : 'none',
              color: todo.completed ? '#888' : '#ececec'
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