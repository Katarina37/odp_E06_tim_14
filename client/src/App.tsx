import { Routes, Route, Navigate } from "react-router-dom";
import { authApi } from "./api_services/auth/AuthAPIService";
import PrijavaStranica from "./pages/auth/PrijavaStranica";
import RegistracijaStranica from "./pages/auth/RegistracijaStranica";
//import { usersApi } from "./api_services/users/UsersAPIService";
import PrikazSadrzajaStranica from "./pages/contents/PrikazSadrzajaStranica";
import { contentApi } from "./api_services/contents/ContentAPIService";
import { ProtectedRoute } from "./components/protected_route/ProtectedRoute";
import PrikazDetaljaStranica from "./pages/contents/PrikazDetaljaStranica";
import PrikazEpizodaStranica from "./pages/contents/PrikazEpizodaStranica";
import { episodeApi } from "./api_services/episodes/EpisodeAPIService";
import PrikazDetaljaEpStranica from "./pages/contents/PrikazDetaljaEpStranica";
import PrikazKorisnikStranica from "./pages/contents/PrikazKorisnikStranica";
import AdminDashboard from "./pages/admin/AdminDashboard";



function App() {
  return (
    <Routes>
      <Route path="/login" element={<PrijavaStranica authApi={authApi} />} />
      <Route path="/register" element={<RegistracijaStranica authApi={authApi} />} />
      <Route path="/content/:content_id" element={<PrikazDetaljaStranica contentApi={contentApi} />} />
      <Route path="/content/:content_id/episodes" element={<PrikazEpizodaStranica episodeApi={episodeApi} />} />
      <Route path="/content/:content_id/episodes/:episode_id" element={<PrikazDetaljaEpStranica episodeApi={episodeApi} />} />
      
      <Route path="/content/korisnik" element={
        <ProtectedRoute requiredRole={["korisnik", "administrator"]}>
          <PrikazKorisnikStranica contentApi={contentApi} />
        </ProtectedRoute>
      }
      />

      <Route path="/content/administrator" element={
        <ProtectedRoute requiredRole={["administrator"]}>
          <AdminDashboard />
        </ProtectedRoute>
      }/>

      <Route path="/content" element = {<PrikazSadrzajaStranica contentApi={contentApi} />} />
      <Route path="/" element={<Navigate to="/content" replace />} />

    </Routes>

    
  );
}

export default App; 




