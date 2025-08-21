import { jwtDecode } from "jwt-decode";
import { ObrišiVrijednostPoKljuču, PročitajVrijednostPoKljuču } from "../../../helpers/local_storage";
import { useAuth } from "../../../hooks/auth/useAuthHook";
import type { JwtTokenClaims } from "../../../types/auth/JwtTokenClaims";


export function InformacijeOKorisniku() {
    const token = PročitajVrijednostPoKljuču("authToken");
    const { logout } = useAuth();

    if(!token) return null;

    const { user_id, username, uloga } = jwtDecode<JwtTokenClaims>(token);

    const handleLogout = () => {
        ObrišiVrijednostPoKljuču("authToken");
        logout();
    };

    return (
      <div className="bg-white/30 backdrop-blur-lg shadow-md rounded-2xl p-10 w-full max-w-2xl border border-gray-300">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Kontrolna tabla</h1>

      <div className="space-y-3 text-lg text-gray-800">
        <p><strong>ID:</strong> {user_id}</p>
        <p><strong>Korisnicko ime :</strong> {username}</p>
        <p><strong>Uloga:</strong> {uloga}</p>
        <p><strong>Datum i vrijeme:</strong> {new Date().toLocaleString()}</p>
      </div>

      <button
        onClick={handleLogout}
        className="mt-8 px-4 bg-red-700/60 hover:bg-red-700/70 text-white py-2 rounded-xl  transition"
      >
        Napusti kontrolnu tablu
      </button>
    </div>
    );

}

