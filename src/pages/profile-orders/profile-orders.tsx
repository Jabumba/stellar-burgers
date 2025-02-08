import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { getAuthenticationStatus } from '../../services/slices/userSlice';
import { useSelector } from '../../services/store';
import { Navigate } from 'react-router-dom';
import { getUserOrders } from '../../services/slices/ordersSlice';

export const ProfileOrders: FC = () => {
    if(useSelector(getAuthenticationStatus) === false) {
            return (
                <Navigate
                to={'/login'}
                />
            )
    }
    /** TODO: взять переменную из стора */
    const orders: TOrder[] = useSelector(getUserOrders);
    console.log(orders)
    return <ProfileOrdersUI orders={orders} />;
};
