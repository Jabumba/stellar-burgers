import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { getAuthenticationStatus, getLoginError, loginUser } from '../../services/slices/userSlice';
import { useNavigate } from 'react-router-dom';

export const Login: FC = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        dispatch(loginUser({email, password}))
    };
    const error = useSelector(getLoginError) ?? ''
    if(useSelector(getAuthenticationStatus) === true) {
        navigate(-1)
    }
    return (
        <LoginUI
            errorText={`${error}`}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            handleSubmit={handleSubmit}
        />
    );
};
