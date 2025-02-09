import { getAuthenticationStatus, getUserData } from "../../services/slices/userSlice";
import { useSelector } from "../../services/store";
import { useNavigate } from 'react-router-dom';

type ProtectedRouteProps = {
    children: React.ReactElement;
};
  
export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const navigate = useNavigate();
    const isAuthChecked = useSelector(getAuthenticationStatus);

    if (isAuthChecked === false) {
        navigate('/login', { replace: false })
        return;
    }

    return children;
}