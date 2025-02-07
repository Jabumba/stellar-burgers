import { FC, useEffect, useMemo } from 'react';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { getIngredients } from '../../services/slices/ingredientsSlice'
import { useDispatch, useSelector } from '../../services/store'
import { fetchOrders, getBuildingOrder } from '../../services/slices/ordersSlice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchOrders());
  }, [])
  const orderData = useSelector(getBuildingOrder);
  const ingredients = orderData.ingredients
//   .map((ingredient) => Object.assign({id: ingredient._id}, ingredient))
  const constructorItems = {
    bun: {
        name: orderData.bun?.name ?? '',
        price: orderData.bun?.price ?? 0,
        image: orderData.bun?.image ?? ''
    },
    ingredients: ingredients
  };

  const orderRequest = false;

  const orderModalData = null;

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
  };
  const closeOrderModal = () => {};

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
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
