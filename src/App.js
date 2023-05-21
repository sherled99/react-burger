import {Routes, Route, useLocation } from 'react-router-dom';
import { HomePage, LoginPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, ProfilePage, IngredientPage, ProfileOrdersPage, FeedPage, OrderPage} from './pages';
import { ProtectedRouteElement } from './components/protected-route';
import { UnProtectedRouteElement } from './components/unprotected-route';
import { Modal } from './components/Modal/Modal';
import { AppHeader } from './components/AppHeader/AppHeader';

export default function App() {
    const location = useLocation();
    let background = location.pathname.replace(/\/\w+$/, '');
    if (background === "/ingredients"){
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
                  <Route path="/ingredients/:id" element={<Modal />} />
                  <Route path="/send_order" element={<Modal />} />
                  <Route path="/feed/:id" element={<Modal />} />
                  <Route path="/profile/orders/:id" element={<Modal />} />
                </Routes>
              )}
          </div>
    );
  }