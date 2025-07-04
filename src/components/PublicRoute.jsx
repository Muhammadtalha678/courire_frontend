import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PublicRoute = () => {
  const { user } = useAuth();

  // Agar user login hai to login page se hata do
  return user ? <Navigate to="/services" /> : <Outlet />;
};

export default PublicRoute;
