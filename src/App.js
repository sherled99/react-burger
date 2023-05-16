import {Routes, Route, useLocation } from 'react-router-dom';
import { HomePage, LoginPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, ProfilePage, IngredientPage, ProfileOrdersPage} from './pages';
import { ProtectedRouteElement } from './components/protected-route';
import { UnProtectedRouteElement } from './components/unprotected-route';
import { Modal } from './components/Modal/Modal';

export default function App() {
    let location = useLocation();
    return (
          <div>
            <Routes location={location?.state?.backgroundLocation || location}>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<UnProtectedRouteElement element={<LoginPage />}/>} />
              <Route path="/register" element={<UnProtectedRouteElement element={<RegisterPage />}/>} />
              <Route path="/forgot-password" element={<UnProtectedRouteElement element={<ForgotPasswordPage />}/>} />
              <Route path="/reset-password" element={<UnProtectedRouteElement element={<ResetPasswordPage />}/>} />
              <Route path="/profile" element={<ProtectedRouteElement element={<ProfilePage />}/>} />
              <Route path="/profile/orders" element={<ProtectedRouteElement element={<ProfileOrdersPage />}/>} />
              <Route path="/ingredients/:id" element={<IngredientPage />} />
            </Routes>

              {location?.state?.backgroundLocation && (
                <Routes>
                  <Route path="/ingredients/:id" element={<Modal />} />
                  <Route path="/send_order" element={<Modal />} />
                </Routes>
              )}

          </div>
    );
  }