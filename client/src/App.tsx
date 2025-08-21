import { Routes, Route, Navigate } from "react-router-dom";
import { authApi } from "./api_services/auth/AuthAPIService";
import { ProtectedRoute } from "./components/protected_route/ProtectedRoute";
import PrijavaStranica from "./pages/auth/PrijavaStranica";
import RegistracijaStranica from "./pages/auth/RegistracijaStranica";
import KontrolnaTablaKorisnikStranica from "./pages/kontrolna_tabla/KontrolnaTablaKorisnikStranica";
import KontrolaTablaAdministratorStranica from "./pages/kontrolna_tabla/KontrolnaTablaAdministratorStranica";
import NotFoundStranica from "./pages/not_found/NotFoundPage";
import { usersApi } from "./api_services/users/UsersAPIService";

function App() {
    return (
        <Routes>
            <Route path="/login" element={<PrijavaStranica authApi={authApi} />} />
            <Route path="/register" element={<RegistracijaStranica authApi={authApi} />} />
            <Route path="/404" element={<NotFoundStranica />} />

            <Route
            path="/korisnik-dashboard"
            element={
                <ProtectedRoute requiredRole="korisnik">
                    <KontrolnaTablaKorisnikStranica />
                </ProtectedRoute>
            }
            />

            <Route
            path="/administrator-dashboard"
            element={
                <ProtectedRoute requiredRole="administrator">
                    <KontrolaTablaAdministratorStranica usersApi={usersApi} />
                </ProtectedRoute>
            }
            />

            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
    );
}

export default App;
