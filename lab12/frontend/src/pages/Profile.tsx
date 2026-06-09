import { useAuthStore } from '../store/authStore';

export const Profile = () => {
  const user = useAuthStore((state) => state.user);

  if (!user) return null;

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2>Профіль користувача</h2>
      
      <div style={{ 
        padding: '1.5rem', 
        border: '1px solid #ddd', 
        borderRadius: '8px',
        backgroundColor: '#f9f9f9'
      }}>
        <p style={{ margin: '10px 0' }}>
          <strong>ID:</strong> {user.id}
        </p>
        <p style={{ margin: '10px 0' }}>
          <strong>Email:</strong> {user.email}
        </p>
        
        {user.createdAt && (
          <p style={{ margin: '10px 0' }}>
            <strong>Дата створення:</strong> {new Date(user.createdAt).toLocaleString()}
          </p>
        )}
      </div>
    </div>
  );
};