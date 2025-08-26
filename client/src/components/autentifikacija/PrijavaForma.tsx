import { useState } from "react";
import { Link } from "react-router-dom";
import { validacijaPodatakaAuth } from "../../api_services/validators/auth/AuthValidator";
import type { AuthFormProps } from "../../types/props/auth_form_props/AuthFormProps";
import { useAuth } from "../../hooks/useAuthHook";

export function PrijavaForma({ authApi }: AuthFormProps) {
  const [username, setUsername] = useState("");
  const [lozinka, setLozinka] = useState("");
  const [greska, setGreska] = useState("");
  const { login } = useAuth();

  const podnesiFormu = async (e: React.FormEvent) => {
    e.preventDefault();

    const validacija = validacijaPodatakaAuth(username, lozinka);
    if (!validacija.uspjesno) {
      setGreska(validacija.poruka ?? "Неисправни подаци");
      return;
    }

    const odgovor = await authApi.prijava(username, lozinka);
    if (odgovor.success && odgovor.data) {
      const userdto = odgovor.data;
      console.log("podaci", userdto);
      console.log(userdto);
      login(userdto);
    } else {
      setGreska(odgovor.message);
      setUsername("");
      setLozinka("");
    }
  };

  return (
     <div className="bg-white/30 backdrop-blur-lg shadow-md rounded-2xl p-8 w-full max-w-sm border border-blue-400">
    <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Prijava</h1>
    <form onSubmit={podnesiFormu} className="flex flex-col items-center">
      <input
        type="text"
        placeholder="Korisničko ime"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full max-w-xs mb-4 bg-white/40 px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
        type="password"
        placeholder="Lozinka"
        value={lozinka}
        onChange={(e) => setLozinka(e.target.value)}
        className="w-full max-w-xs mb-4 bg-white/40 px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      {greska && (
        <p className="text-md text-center text-red-700/80 font-medium">{greska}</p>
      )}
      <button
        type="submit"
        className="w-full max-w-xs bg-blue-700/70 hover:bg-blue-700/90 text-white py-2 rounded-xl transition"
      >
        Prijavi se
      </button>
    </form>
    <p className="text-center text-sm mt-4">
      Nemate nalog?{" "}
      <Link to="/register" className="text-blue-700 hover:underline">
        Registrujte se
      </Link>
    </p>
    <p className="text-center text-sm mt-2">
      Gledajte kao gost?{" "}
      <Link to="/content" className="text-blue-700 hover:underline">
        Gledaj
      </Link>
    </p>
</div>
  );
}
