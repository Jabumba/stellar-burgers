import { useSelector, useDispatch } from '../../services/store';
import { fetchIngredients, getIngredients, getLoadingStatus } from '../../services/slices/ingredientsSlice';
import { RootState } from '../../services/store';

import styles from './constructor-page.module.css';

import { BurgerIngredients } from '../../components';
import { BurgerConstructor } from '../../components';
import { Preloader } from '../../components/ui';
import { FC, useEffect, useLayoutEffect, useState } from 'react';

export const ConstructorPage: FC = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchIngredients());
        console.log('1')
    }, []);
    let isIngredientsLoading: boolean = useSelector(getLoadingStatus)
    return (
        <>
        {isIngredientsLoading ? (
            <Preloader />
        ) : (
        <main className={styles.containerMain}>
          <h1
            className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
          >
            Соберите бургер
          </h1>
          <div className={`${styles.main} pl-5 pr-5`}>
            <BurgerIngredients />
            <BurgerConstructor />
          </div>
        </main>
      )}
    </>
  );
};
