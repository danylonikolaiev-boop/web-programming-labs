import { Link, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export const Layout = () => {
  const { user, logout } = useAuthStore();

  return (
    <div>
      <header style={{ padding: '1rem', borderBottom: '1px solid #ccc', display: 'flex', justifyContent: 'space-between' }}>
        <nav>
          {user && <Link to="/profile" style={{ marginRight: '1rem' }}>Профіль</Link>}
        </nav>
        <div>
          {user ? (
            <>
              <span style={{ marginRight: '1rem' }}>{user.email}</span>
              <button onClick={logout}>Вийти</button>
            </>
          ) : (
            <>
              <Link to="/login" style={{ marginRight: '1rem' }}>Увійти</Link>
              <Link to="/register">Зареєструватися</Link>
            </>
          )}
        </div>
      </header>
      <main style={{ padding: '2rem' }}>
        <Outlet />
      </main>
    </div>
  );
};