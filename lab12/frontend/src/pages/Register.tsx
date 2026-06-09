import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useMutation } from '@tanstack/react-query';
import { authApi, type AuthData } from '../api/auth';
import { useNavigate } from 'react-router-dom';

const registerSchema = z.object({
  email: z.string().email('Некоректний формат email'),
  password: z.string().min(6, 'Пароль має містити мінімум 6 символів'),
});

export const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<AuthData>({
    resolver: zodResolver(registerSchema),
  });

  const mutation = useMutation({
    mutationFn: authApi.register,
    onSuccess: () => {
      alert('Акаунт успішно створено! Тепер ви можете увійти.');
      navigate('/login');
    },
    onError: (error: any) => {
      if (error.response?.status === 409) {
        setError('root', { message: 'Користувач з таким email вже існує' });
      } else if (error.response?.status === 400) {
         setError('root', { message: 'Невалідні дані' });
      } else {
        setError('root', { message: 'Сталася помилка при реєстрації' });
      }
    },
  });

  const onSubmit = (data: AuthData) => {
    mutation.mutate(data);
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h2>Реєстрація</h2>
      
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
          {mutation.isPending ? 'Реєстрація...' : 'Зареєструватися'}
        </button>
        
      </form>
    </div>
  );
};