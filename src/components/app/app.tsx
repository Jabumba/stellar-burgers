import { ConstructorPage, Feed, ForgotPassword, Login, NotFound404, Profile, ProfileOrders, Register, ResetPassword } from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';

const App = () => (
    <div className={styles.app}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AppHeader />} >
                    <Route index element={<ConstructorPage /> } />
                    <Route path="feed" element={<Feed />}/>
                    <Route path="login" element={<Login />}/>
                    <Route path="register" element={<Register />}/>
                    <Route path="forgot-password" element={<ForgotPassword />}/>
                    <Route path="reset-password" element={<ResetPassword />}/>
                    <Route path="profile" >
                        <Route index element={<Profile />} />
                        <Route path="orders" element={<ProfileOrders />}/>
                    </Route>
                    <Route path="*" element={<NotFound404 />}/>
                </Route>

                {/* <Route path="/" element={<ConstructorPage />}/>
                <Route path="/feed" element={<Feed />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/register" element={<Register />}/>
                <Route path="/forgot-password" element={<ForgotPassword />}/>
                <Route path="/reset-password" element={<ResetPassword />}/>
                <Route path="/profile" >
                    <Route index element={<Profile />} />
                    <Route path="orders" element={<ProfileOrders />}/>
                </Route>
                <Route path="*" element={<NotFound404 />}/> */}
            </Routes>

            <Routes>
                <Route path="/feed/:id" element={<Modal title='' onClose={() => {}}><OrderInfo /></Modal>} />
                <Route path="/ingredients/:id" element={<Modal title='' onClose={() => {}}><IngredientDetails /></Modal>} />
                <Route path="/profile/orders/:id" element={<Modal title='' onClose={() => {}}><OrderInfo /></Modal>} />
            </Routes>
        </BrowserRouter>
    </div>
);

export default App;
