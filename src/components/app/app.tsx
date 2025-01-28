import { ConstructorPage, Feed, ForgotPassword, Login, NotFound404, Profile, ProfileOrders, Register, ResetPassword } from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';

const App = () => (
    <div className={styles.app}>
        <AppHeader />
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ConstructorPage />}/>
                <Route path="/feed" element={<Feed />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/register" element={<Register />}/>
                <Route path="/forgot-password" element={<ForgotPassword />}/>
                <Route path="/reset-password" element={<ResetPassword />}/>
                <Route path="/profile" >
                    <Route index element={<Profile />} />
                    <Route path="orders" element={<ProfileOrders />}/>
                </Route>
                <Route path="*" element={<NotFound404 />}/>
            </Routes>

            <Routes>
                <Route path="/img/:id" element={<Modal><OrderInfo /></Modal>} />
                <Route path="/ingredients/:id" element={<Modal><IngredientDetails /></Modal>} />
                <Route path="/profile/orders/:number" element={<Modal><OrderInfo /></Modal>} />
            </Routes>
        </BrowserRouter>
        {/* <Routes>
            <Route path="/" element={<ConstructorPage />}/>
            <Route path="/feed" element={<Feed />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/register" element={<Register />}/>
            <Route path="/forgot-password" element={<ForgotPassword />}/>
            <Route path="/reset-password" element={<ResetPassword />}/>
            <Route path="/profile" >
                <Route index element={<Profile />} />
                <Route path="orders" element={<ProfileOrders />}/>
            </Route>
            <Route path="*" element={<NotFound404 />}/>
        </Routes> */}

        {/* <Routes>
            <Route path="/img/:id" element={<Modal><OrderInfo /></Modal>} />
            <Route path="/ingredients/:id" element={<Modal><IngredientDetails /></Modal>} />
            <Route path="/profile/orders/:number" element={<Modal><OrderInfo /></Modal>} />
        </Routes> */}
    {/* <AppHeader /> */}
    {/* <ConstructorPage /> */}
    </div>
);

export default App;
