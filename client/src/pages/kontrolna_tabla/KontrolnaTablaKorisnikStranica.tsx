import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuthHook";
import { InformacijeOKorisniku } from "../../components/kontrolna_tabla/InformacijeOKorisniku/InformacijeOKorisniku";

export default function KontrolnaTablaUserStranica() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    
    if (!isAuthenticated) {
      logout();
      navigate("/login");
    }
  }, [isAuthenticated, logout, navigate]);

  return (
    <main className="min-h-screen bg-gradient-to-tr from-slate-600/75 to-orange-800/70 flex items-center justify-center">
      <InformacijeOKorisniku />
    </main>
  );
}
