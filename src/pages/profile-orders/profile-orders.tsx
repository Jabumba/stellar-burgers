import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { getAuthenticationStatus } from '../../services/slices/userSlice';
import { useSelector } from '../../services/store';
import { Navigate, useNavigate } from 'react-router-dom';
import { getUserOrders } from '../../services/slices/ordersSlice';

export const ProfileOrders: FC = () => {
    const navigate = useNavigate()
    if(useSelector(getAuthenticationStatus) === false) {
        navigate('/login', { replace: false })
        return;
    }
    /** TODO: взять переменную из стора */
    const orders: TOrder[] = useSelector(getUserOrders);
    
    return <ProfileOrdersUI orders={orders} />;
};
