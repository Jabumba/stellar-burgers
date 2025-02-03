import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '../../services/store';
import { TIngredient } from '../../utils/types';
import { getIngredients } from '../../services/slices/ingredientsSlice';
import { useParams } from 'react-router-dom';

export const IngredientDetails: FC = () => {
    const { id } = useParams();
  /** TODO: взять переменную из стора */
  const ingredients: TIngredient[] = useSelector(getIngredients)
  const ingredientData: TIngredient | undefined = ingredients.filter((ingredient) => ingredient._id === id).pop();

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
