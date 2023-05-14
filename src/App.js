import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage, LoginPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, ProfilePage, IngredientPage } from './pages';
import { ProtectedRouteElement } from './components/protected-route';
import { UnProtectedRouteElement } from './components/unprotected-route';

export default function App() {
    return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ProtectedRouteElement element={<HomePage />}/>} />
            <Route path="/login" element={<UnProtectedRouteElement element={<LoginPage />}/>} />
            <Route path="/register" element={<UnProtectedRouteElement element={<RegisterPage />}/>} />
            <Route path="/forgot-password" element={<UnProtectedRouteElement element={<ForgotPasswordPage />}/>} />
            <Route path="/reset-password" element={<UnProtectedRouteElement element={<ResetPasswordPage />}/>} />
            <Route path="/profile" element={<ProtectedRouteElement element={<ProfilePage />}/>} />
            <Route path="/ingredients/:id" element={<ProtectedRouteElement element={<IngredientPage />}/>} />
          </Routes>
        </BrowserRouter>
    );
  }