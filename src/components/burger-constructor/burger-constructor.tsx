import { FC, useEffect, useMemo } from 'react';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { getIngredients } from '../../services/slices/ingredientsSlice'
import { useDispatch, useSelector } from '../../services/store'
import { fetchOrders, getBuildingOrder, fetchPostOrder, getYourOrder, getLoadingOrderStatus } from '../../services/slices/ordersSlice';
import { getAuthenticationStatus } from '../../services/slices/userSlice';
import { Navigate, replace, useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(fetchOrders());
  }, [])
  const authenticationStatus = useSelector(getAuthenticationStatus);
  const orderData = useSelector(getBuildingOrder) ?? null;
  const ingredients = orderData.ingredients;
//   .map((ingredient) => Object.assign({id: ingredient._id}, ingredient))
  const constructorItems = {
    bun: {
        name: orderData.bun?.name ?? '',
        price: orderData.bun?.price ?? 0,
        image: orderData.bun?.image ?? ''
    },
    ingredients: ingredients
  };

  const orderRequest = useSelector(getLoadingOrderStatus);
//   const orderRequest = false

  const orderModalData = useSelector(getYourOrder);

  const onOrderClick = () => {
    if(authenticationStatus === false) {
        navigate('/login', {replace: false})
        return
    }
    if (!constructorItems.bun || orderRequest) return;
    let idArray: string[] = constructorItems.ingredients.map((ingredient) => { return ingredient._id })
    idArray.push(orderData.bun?._id ?? '')
    dispatch(fetchPostOrder(idArray))
  };
  const closeOrderModal = () => {
    const list = document.getElementById('modals')
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  //   return null;

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData.order}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
