import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { getAuthenticationStatus, getRegisterError, registerUser } from '../../services/slices/userSlice';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';

export const Register: FC = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        const name = userName
        dispatch(registerUser({email, name, password}))
    };
    const error = useSelector(getRegisterError) ?? ''
    if(useSelector(getAuthenticationStatus) === true) {
            navigate('/profile', { replace: true })
        }
    return (
        <RegisterUI
        errorText={`${error}`}
        email={email}
        userName={userName}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
        setUserName={setUserName}
        handleSubmit={handleSubmit}
        />
    );
};
