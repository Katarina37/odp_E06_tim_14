import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RegistracijaForma } from "../../components/autentifikacija/RegistracijaForma";
import type { IAuthAPIService } from "../../api_services/auth/IAuthAPIService";
import { useAuth } from "../../hooks/auth/useAuthHook";

interface RegistracijaPageProps {
    authApi: IAuthAPIService;
}

export default function RegistracijaStranica({ authApi }: RegistracijaPageProps){
    const { isAuthenticated, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if(isAuthenticated && user)
            navigate(`/${user.uloga}-dashboard`);
    }, [isAuthenticated, navigate, user]);

    return (
        <main className="min-h-screen bg-gradient-to-tr from-white/70 via-purple-300/60 to-purple-600/80 flex items-center justify-center">
            <RegistracijaForma authApi={authApi} />
        </main>

    );
}

