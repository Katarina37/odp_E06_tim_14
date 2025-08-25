import { Routes, Route, Navigate } from "react-router-dom";
import { authApi } from "./api_services/auth/AuthAPIService";
import PrijavaStranica from "./pages/auth/PrijavaStranica";
import RegistracijaStranica from "./pages/auth/RegistracijaStranica";
import KontrolnaTablaAdminStranica from "./pages/kontrolna_tabla/KontrolnaTablaAdminStranica";
import KontrolnaTablaUserStranica from "./pages/kontrolna_tabla/KontrolnaTablaKorisnikStranica";
import { usersApi } from "./api_services/users/UsersAPIService";
import PrikazSadrzajaStranica from "./pages/contents/PrikazSadrzajaStranica";
import { contentApi } from "./api_services/contents/ContentAPIService";
import { ProtectedRoute } from "./components/protected_route/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<PrijavaStranica authApi={authApi} />} />
      <Route path="/register" element={<RegistracijaStranica authApi={authApi} />} />

      <Route path="/korisnik-dashboard" element={
        <ProtectedRoute requiredRole="korisnik">
          <KontrolnaTablaUserStranica />
        </ProtectedRoute>
      }
      />

      <Route path="/administrator-dashboard" element = {
        <ProtectedRoute requiredRole="administrator">
          <KontrolnaTablaAdminStranica usersApi={usersApi} />
        </ProtectedRoute>
      }
      />

      <Route path="/content" element = {<PrikazSadrzajaStranica contentApi={contentApi} />} />
      <Route path="/" element={<Navigate to="/content" replace />} />

    </Routes>

    
  );
}

export default App; 




