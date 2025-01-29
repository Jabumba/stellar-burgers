import React, { FC } from 'react';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import { clsx } from 'clsx';
import { Link, Outlet, useLocation } from 'react-router-dom';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => {
    const currentLocation = useLocation();
    let pathName = currentLocation.pathname
    return (
        <>
            <header className={styles.header}>
                <nav className={`${styles.menu} p-4`}>
                    <div className={styles.menu_part_left}>
                        <Link to='/'
                        className={clsx({
                            [styles.link_active] : pathName === '/',
                            [styles.link] : true
                        })}
                        >
                            <BurgerIcon 
                            type={'primary'} 
                            />
                            <p className='text text_type_main-default ml-2 mr-10'>Конструктор</p>
                        </Link>
                        <Link to='/feed'
                        className={clsx({
                            [styles.link_active] : pathName === '/feed',
                            [styles.link] : true
                        })}>
                            <ListIcon type={'primary'} />
                            <p className='text text_type_main-default ml-2'>Лента заказов</p>
                        </Link>
                    </div>
                    <div className={styles.logo}>
                        <Logo className='' />
                    </div>
                    <div className={styles.link_position_last}>
                        <Link to='/profile' 
                        className={clsx({
                            [styles.link_active] : pathName === '/profile',
                            [styles.link] : true
                        })}>
                            <ProfileIcon type={'primary'} />
                            <p className='text text_type_main-default ml-2'>
                                {userName || 'Личный кабинет'}
                            </p>
                        </Link>
                    </div>
                </nav>
            </header>
            <Outlet />
        </>
    )
};
