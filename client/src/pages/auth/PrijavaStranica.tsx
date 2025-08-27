import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PrijavaForma } from "../../components/autentifikacija/PrijavaForma";
import type { IAuthAPIService } from "../../api_services/auth/IAuthAPIService";
import { useAuth } from "../../hooks/useAuthHook";
import "./PrijavaStranica.css"

interface LoginPageProps {
  authApi: IAuthAPIService;
}

export default function PrijavaStranica({ authApi }: LoginPageProps) {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user) 
      navigate(`/content/${user.uloga}`);
  }, [isAuthenticated, navigate, user]);

  return (
    <main className="main-container">
        <PrijavaForma authApi={authApi} />
    </main>
  );
}
