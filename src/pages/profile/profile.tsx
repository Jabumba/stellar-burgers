import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getUserData, getAuthenticationStatus, getPassword, fetchUser } from '../../services/slices/userSlice';
import { TUser } from '@utils-types';
import { useDispatch, useSelector } from '../../services/store';

export const Profile: FC = () => {
    // const dispatch = useDispatch()
    // useEffect(() => {
    //     dispatch(fetchUser());
    // })
    if(useSelector(getAuthenticationStatus) === false) {
        return (
            <Navigate
            to={'/login'}
            />
        )
    }
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
            email: user.email || ''
        }));
    }, [user]);

    const isFormChanged =
        formValue.name !== user?.name ||
        formValue.email !== user?.email ||
        !!formValue.password;

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
    };

    const handleCancel = (e: SyntheticEvent) => {
        e.preventDefault();
        setFormValue({
            name: user?.name,
            email: user?.email,
            password: ''
        });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValue((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

//   if(useSelector(getAuthenticationStatus)) {
//     return (
//         <Navigate
//         to={'/'}
//         />
//     )
//   }

    return (
        <ProfileUI
        formValue={formValue}
        isFormChanged={isFormChanged}
        handleCancel={handleCancel}
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
        />
        // <div>vfdcdcd</div>
    );

    // return null;
};
