import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RegistracijaForma } from "../../components/autentifikacija/RegistracijaForma";
import type { IAuthAPIService } from "../../api_services/auth/IAuthAPIService";
import { useAuth } from "../../hooks/useAuthHook";
import "./PrijavaStranica.css"

interface RegistracijaPageProps {
  authApi: IAuthAPIService;
}

export default function RegistracijaStranica({ authApi }: RegistracijaPageProps) {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user) 
      navigate(`/content/${user.uloga}`);
  }, [isAuthenticated, navigate, user]);

  return (
    <main className="main-container">
      <RegistracijaForma authApi={authApi} />
    </main>
  );
}
