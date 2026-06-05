import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useMutation } from '@tanstack/react-query';
import { authApi, type AuthData } from '../api/auth';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';

const loginSchema = z.object({
  email: z.string().email('Некоректний формат email'),
  password: z.string().min(1, 'Пароль не може бути порожнім'),
});

export const Login = () => {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<AuthData>({
    resolver: zodResolver(loginSchema),
  });

  const mutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: async (data) => {
      const token = data.access_token;
      
      localStorage.setItem('token', token);
      try {
        const user = await authApi.getMe();
        login(token, user);
        navigate('/profile');
      } catch (err) {
        console.error('Помилка отримання профілю', err);
      }
    },
    onError: (error: any) => {
      if (error.response?.status === 401) {
        setError('root', { message: 'Невірний email або пароль' });
      } else {
        setError('root', { message: 'Сталася невідома помилка' });
      }
    },
  });

  const onSubmit = (data: AuthData) => {
    mutation.mutate(data);
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h2>Вхід</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        
        <div>
          <label>Email</label>
          <input type="email" {...register('email')} style={{ width: '100%', padding: '8px' }} />
          {errors.email && <span style={{ color: 'red', fontSize: '14px' }}>{errors.email.message}</span>}
        </div>

        <div>
          <label>Пароль</label>
          <input type="password" {...register('password')} style={{ width: '100%', padding: '8px' }} />
          {errors.password && <span style={{ color: 'red', fontSize: '14px' }}>{errors.password.message}</span>}
        </div>

        {errors.root && <div style={{ color: 'red', fontWeight: 'bold' }}>{errors.root.message}</div>}

        <button type="submit" disabled={mutation.isPending} style={{ padding: '10px' }}>
          {mutation.isPending ? 'Завантаження...' : 'Увійти'}
        </button>
        
      </form>
    </div>
  );
};