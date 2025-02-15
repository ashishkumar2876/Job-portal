import { ReactNode, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '@/redux/store';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user } = useSelector((store: RootState) => store.authSlice);
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null || user.role !== 'recruiter') {
      navigate('/');
    }
  }, [user, navigate]);

  return <>{children}</>;
};

export default ProtectedRoute;
