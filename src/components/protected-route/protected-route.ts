import { getAuthenticationStatus } from "../../services/slices/userSlice";
import { useSelector } from "../../services/store";
import { useNavigate } from 'react-router-dom';

type ProtectedRouteProps = {
    isAuthorisationPage: boolean
    children: React.ReactElement;
};
  
export const ProtectedRoute = ({ children, isAuthorisationPage }: ProtectedRouteProps) => {
    const navigate = useNavigate();
    const isAuthChecked = useSelector(getAuthenticationStatus);

    if (isAuthChecked === false && isAuthorisationPage === false) {
        navigate('/login', { replace: false });
        return;
    }

    if(isAuthChecked === true && isAuthorisationPage === true){
        history.go(-1);
        return;
    }

    return children;
}