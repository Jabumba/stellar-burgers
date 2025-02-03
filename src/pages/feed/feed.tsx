import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { fetchOrders, getOrders } from '../../services/slices/ordersSlice';

export const Feed: FC = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchOrders());
        console.log('feed')
    }, []);
  /** TODO: взять переменную из стора */
    const orders: TOrder[] = useSelector(getOrders);

    if (!orders.length) {
      return <Preloader />;
    }

    return <FeedUI orders={orders} handleGetFeeds={() => {}} />;
};
