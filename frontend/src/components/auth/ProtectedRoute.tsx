import { Navigate } from 'react-router-dom';
import { useWallet } from '../../context/WalletContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { connected } = useWallet();

  if (!connected) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
