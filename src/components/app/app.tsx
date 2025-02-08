import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { BrowserRouter, Routes, Route, useNavigate, useParams, useLocation } from 'react-router-dom';
import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { useDispatch, useSelector } from '../../services/store';
import { useEffect } from 'react';
import { fetchOrders, fetchUserOrders, getCurrentOrder, getCurrentOrderId } from '../../services/slices/ordersSlice';
import { TOrder } from '@utils-types';
import { fetchIngredients, getIngredients } from '../../services/slices/ingredientsSlice';
import { fetchUser } from '../..//services/slices/userSlice';

const App = () => {
    const location = useLocation();
    const dispatch = useDispatch()
    const backgroundLocation = location.state?.background;
    useEffect(() => {
        dispatch(fetchIngredients());
        dispatch(fetchOrders());
        dispatch(fetchUserOrders());
        dispatch(fetchUser());
    }, [])
    let currentOrderId: number = useSelector(getCurrentOrderId);
    return (
        <div className={styles.app}>
            <Routes 
            location={backgroundLocation || location}
            >
                <Route path='/' element={<AppHeader />}> //
                    <Route index element={<ConstructorPage />} /> //
                    <Route path='feed' element={<Feed />} /> //
                    <Route path='login' element={<Login />} />
                    <Route path='register' element={<Register />} />
                    <Route path='forgot-password' element={<ForgotPassword />} />
                    <Route path='reset-password' element={<ResetPassword />} />
                    <Route path='profile'>
                        <Route index element={<Profile />} />
                        <Route path='orders' element={<ProfileOrders />} />
                    </Route>

                    <Route 
                    path='ingredients/:id' 
                    element={
                            <IngredientDetails />
                    }/>
                    <Route 
                    path='feed/:id' 
                    element={
                        <OrderInfo />
                    }/>
                    <Route 
                    path='profile/orders/:id' 
                    element={
                        <OrderInfo />
                    }/>

                    <Route path='*' element={<NotFound404 />} /> //
                </Route>
            </Routes>

            {
            backgroundLocation 
            && 
            (<Routes >
                <Route
                path='/feed/:id'
                element={
                    <Modal title={`#${currentOrderId}`} onClose={() => {window.history.back()}}>
                        <OrderInfo />
                    </Modal>
                }/>
                <Route
                path='/ingredients/:id'
                element={
                    <Modal title='Детали ингредиента' onClose={() => {window.history.back()}}>
                        <IngredientDetails />
                    </Modal>
                }/>
                <Route
                path='/profile/orders/:id'
                element={
                    <Modal title={`#${currentOrderId}`} onClose={() => {window.history.back()}}>
                        <OrderInfo />
                    </Modal>
                }/>
            </Routes>)}
        </div>)
};

export default App;
