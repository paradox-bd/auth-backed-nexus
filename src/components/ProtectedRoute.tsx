
import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

type ProtectedRouteProps = {
  children: React.ReactNode;
  allowedRoles?: Array<'student' | 'faculty' | 'admin'>;
};

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
    } else if (!isLoading && isAuthenticated && allowedRoles) {
      if (user && !allowedRoles.includes(user.role)) {
        navigate('/unauthorized');
      }
    }
  }, [isAuthenticated, isLoading, navigate, user, allowedRoles]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-university-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
