import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getUserData, getAuthenticationStatus, getPassword, fetchUser, updateUser } from '../../services/slices/userSlice';
import { TUser } from '@utils-types';
import { useDispatch, useSelector } from '../../services/store';

export const Profile: FC = () => {
    const dispatch = useDispatch()
    // TODO: взять переменную из стора
    const user = useSelector(getUserData);
    const password = useSelector(getPassword);

    const [formValue, setFormValue] = useState<TUser & { password: string }>({
        name: user.name,
        email: user.email,
        password: password
    });

    useEffect(() => {
        setFormValue((prevState) => ({
            ...prevState,
            name: user.name || '',
            email: user.email || '',
            password: password
        }));
    }, [user, password]);

    const isFormChanged =
        formValue.name !== user?.name ||
        formValue.email !== user?.email ||
        !!formValue.password;

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        dispatch(updateUser({email: formValue.email, name: formValue.name, password: formValue.password}))
    };

    const handleCancel = (e: SyntheticEvent) => {
        e.preventDefault();
        setFormValue({
            name: user?.name,
            email: user?.email,
            password: password
        });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValue((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <ProfileUI
        formValue={formValue}
        isFormChanged={isFormChanged}
        handleCancel={handleCancel}
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
        />
    );
};
