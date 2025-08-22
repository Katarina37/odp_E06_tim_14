import { useState } from "react";
import { Link } from "react-router-dom";
import { validacijaPodatakaAuth } from "../../api_services/validators/auth/AuthValidator";
import type { AuthFormProps } from "../../types/props/auth_form_props/AuthFormProps";
import { useAuth } from "../../hooks/auth/useAuthHook";



export function PrijavaForma({ authApi}: AuthFormProps){
  console.log("Prijava se renderuje");  
  const [username, setUsername] = useState("");
  const [lozinka, setLozinka] = useState("");
  const [greska, setGreska] = useState("");
  const { login } = useAuth();

  const podnesiFormu = async (e: React.FormEvent) => {
   e.preventDefault();
   console.log("Form submitted");
   console.log(username);
   console.log(lozinka);

    const validacija = validacijaPodatakaAuth(username, lozinka);
    if (!validacija.uspjesno) {
      console.log("Validacija nije prosla.");
      setGreska(validacija.poruka ?? "Neispravni podaci");
      return;
    }

    const odgovor = await authApi.prijava(username, lozinka);
    console.log("Odgovor sa servera", odgovor);
    console.log("tip", typeof odgovor.data);
    if (odgovor.success && odgovor.data) {
      console.log("Log uspjesan");
      login(odgovor.data);
    } else {
      console.log("Log neuspjesan");
      setGreska(odgovor.message);
      setUsername("");
      setLozinka("");
    }
    };

    return (
        <div className="bg-gradient-to-br from-white/70 via-purple-200/50 to-purple-400/50 backdrop-blur-lg shadow-md rounded-2xl p-10 w-full max-w-md border border-blue-400">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Prijava</h1>
            <form onSubmit={podnesiFormu} className="space-y-4">
                <input
                type="text"
                placeholder="Korisnicko ime"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-white/40 px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                type="password"
                placeholder="Lozinka"
                value={lozinka}
                onChange={(e) => setLozinka(e.target.value)}
                className="w-full bg-white/40 px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {greska && <p className="text-md text-center text-red-700/80 font-medium"> {greska}</p>}
                <button
                type="submit"
                className="w-full bg-purple-800 hover:bg-purple-900 text-white py-2 rounded-xl transition-colors duration-300 cursor-pointer">
                    Prijavi se
                </button>
            </form>
            <p className="text-center text-sm mt-4">
                Nemate nalog? {" "}
                <Link to="/register" className="text-purple-800 hover:text-purple-900 hover:underline transition-colors duration-300">
                Registrujte se 
                </Link>
            </p>
        </div>
    );
}