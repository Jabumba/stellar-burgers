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
import { Routes, Route, useLocation } from 'react-router-dom';
import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { useDispatch, useSelector } from '../../services/store';
import { useEffect } from 'react';
import { fetchOrders, fetchUserOrders, getCurrentOrderId } from '../../services/slices/ordersSlice';
import { fetchIngredients } from '../../services/slices/ingredientsSlice';
import { fetchUser } from '../..//services/slices/userSlice';
import { ProtectedRoute } from '../protected-route/protected-route';

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
                    <Route path='login' element={<ProtectedRoute isAuthorisationPage={true}><Login /></ProtectedRoute>} />
                    <Route path='register' element={<ProtectedRoute isAuthorisationPage={true}><Register /></ProtectedRoute>} />
                    <Route path='forgot-password' element={<ProtectedRoute isAuthorisationPage={true}><ForgotPassword /></ProtectedRoute>} />
                    <Route path='reset-password' element={<ProtectedRoute isAuthorisationPage={true}><ResetPassword /></ProtectedRoute>} />
                    <Route path='profile'>
                        <Route index element={<ProtectedRoute isAuthorisationPage={false}><Profile /></ProtectedRoute>} />
                        <Route path='orders' element={<ProtectedRoute isAuthorisationPage={false}><ProfileOrders /></ProtectedRoute>} />
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
                        <ProtectedRoute isAuthorisationPage={false}>
                            <OrderInfo />
                        </ProtectedRoute>
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
                <ProtectedRoute isAuthorisationPage={false}>
                    <Modal title={`#${currentOrderId}`} onClose={() => {window.history.back()}}>
                        <OrderInfo />
                    </Modal>
                </ProtectedRoute>
                }/>
            </Routes>)}
        </div>)
};

export default App;
