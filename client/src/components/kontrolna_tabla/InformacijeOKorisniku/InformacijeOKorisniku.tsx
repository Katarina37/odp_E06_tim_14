import { ObrišiVrijednostPoKljuču } from "../../../helpers/local_storage";
import { useAuth } from "../../../hooks/useAuthHook";

export function InformacijeOKorisniku() {
    const {user, logout } = useAuth();

    if(!user) return null;

    const handleLogout = () => {
        ObrišiVrijednostPoKljuču("authUser");
        logout();
    };

     return (
    <div className="bg-white/30 backdrop-blur-lg shadow-md rounded-2xl p-10 w-full max-w-2xl border border-gray-300">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Контролна табла</h1>

      <div className="space-y-3 text-lg text-gray-800">
        <p><strong>ID:</strong> {user.user_id}</p>
        <p><strong>Корисничко име:</strong> {user.username}</p>
        <p><strong>Улога:</strong> {user.uloga}</p>
        <p><strong>Датум и време:</strong> {new Date().toLocaleString()}</p>
      </div>

      <button
        onClick={handleLogout}
        className="mt-8 px-4 bg-red-700/60 hover:bg-red-700/70 text-white py-2 rounded-xl  transition"
      >
        Напусти контролну таблу
      </button>
    </div>
  );
}

