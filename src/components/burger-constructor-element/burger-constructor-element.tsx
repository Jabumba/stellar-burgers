import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { getBuildingOrder, changeIngredients, deleteIngredient } from '../../services/slices/ordersSlice';
import { useSelector, useDispatch } from '../../services/store';
import { TIngredient } from '@utils-types';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch()
    const handleMoveDown = () => {
        dispatch(changeIngredients({changedIndex: index, needIndex: index+1}));
    };

    const handleMoveUp = () => {
        dispatch(changeIngredients({changedIndex: index, needIndex: index-1}));
    };

    const handleClose = () => {
        dispatch(deleteIngredient(ingredient.id))
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
