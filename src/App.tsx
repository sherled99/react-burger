import {Routes, Route, useLocation } from 'react-router-dom';
import { HomePage, LoginPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, ProfilePage, IngredientPage, ProfileOrdersPage, FeedPage, OrderPage} from './pages';
import { ProtectedRouteElement } from './components/protected-route';
import { UnProtectedRouteElement } from './components/unprotected-route';
import { Modal } from './components/Modal/Modal';
import { AppHeader } from './components/AppHeader/AppHeader';
import { IngredientDetails } from './components/IngredientDetails/IngredientDetails';
import { OrderDetails } from './components/OrderDetails/OrderDetails';
import { OrderModal } from './components/OrderModal/OrderModal';

export default function App() {
    const location = useLocation();
    let background = location.pathname.replace(/\/\w+$/, '');
    if (background === "/ingredients" || location.pathname === "/send_order"){
      background = "/";
    }
    return (
          <div>
            <AppHeader/>
            <Routes location={location?.state?.backgroundLocation && background || location}>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<UnProtectedRouteElement element={<LoginPage />}/>} />
              <Route path="/register" element={<UnProtectedRouteElement element={<RegisterPage />}/>} />
              <Route path="/forgot-password" element={<UnProtectedRouteElement element={<ForgotPasswordPage />}/>} />
              <Route path="/reset-password" element={<UnProtectedRouteElement element={<ResetPasswordPage />}/>} />
              <Route path="/profile" element={<ProtectedRouteElement element={<ProfilePage />}/>} />
              <Route path="/profile/orders" element={<ProtectedRouteElement element={<ProfileOrdersPage />}/>} />
              <Route path="/profile/orders/:id"  element={<OrderPage />} />
              <Route path="/ingredients/:id" element={<IngredientPage />} />
              <Route path="/feed" element={<FeedPage />} />
              <Route path="/feed/:id"  element={<OrderPage />} />
            </Routes>

              {location?.state?.backgroundLocation && (
                <Routes location={location}>
                  <Route path="/ingredients/:id" element={<Modal children={<IngredientDetails />} />} />
                  <Route path="/send_order" element={<Modal children={<OrderDetails />} />} />
                  <Route path="/feed/:id" element={<Modal children={<OrderModal />}  />} />
                  <Route path="/profile/orders/:id" element={<Modal children={<OrderModal />} />} />
                </Routes>
              )}
          </div>
    );
  }