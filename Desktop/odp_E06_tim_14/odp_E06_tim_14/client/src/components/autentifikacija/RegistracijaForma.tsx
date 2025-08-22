import { useState } from "react";
import { Link } from "react-router-dom";
import { validacijaPodatakaAuth } from "../../api_services/validators/auth/AuthValidator";
import type { AuthFormProps } from "../../types/props/auth_form_props/AuthFormProps";
import { useAuth } from "../../hooks/auth/useAuthHook";


export function RegistracijaForma({ authApi } : AuthFormProps) {
    const [username, setUsername] = useState("");
    const [lozinka, setLozinka] = useState("");
    const [uloga, setUloga] = useState("korisnik");
    const [greska, setGreska] = useState("");
    const { login } = useAuth();

    const podnesiFormu = async (e: React.FormEvent) => {
        e.preventDefault();

        const validacija = validacijaPodatakaAuth(username, lozinka);

        if(!validacija.uspjesno){
            setGreska(validacija.poruka ?? "Neispravni podaci");
            return;
        }

        const odgovor = await authApi.registracija(username, lozinka, uloga);
        if(odgovor.success && odgovor.data){
            login(odgovor.data);
        } else {
            setGreska(odgovor.message);
            setUsername("");
            setLozinka("");
        }
    };

    return (
        <div className="bg-gradient-to-tr from-purple-300/40 via-purple-200/30 to-white/30 backdrop-blur-lg shadow-2xl rounded-3xl p-12 w-full max-w-md border border-purple-400">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Registracija</h1>
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
                <select
                value={uloga}
                onChange={(e) => setUloga(e.target.value)}
                className="w-full bg-white/40 text-black px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    <option value="korisnik">Korisnik</option>
                    <option value="administrator">Administrator</option>
                </select>
                {greska && <p className="text-md text-center text-red-700/80 font-medium">{greska}</p>}
                <button
                type="submit"
                className="w-full bg-purple-800/80 hover:bg-purple-900/90 text-white py-2 rounded-xl transition shadow-lg cursor-pointer">
                    Registruj se
                </button>
            </form>
            <p className="text-center text-sm mt-4">
                Vec imate nalog? {" "}
                <Link to="/login" className="text-purple-800 hover:text-purple-900 transition">
                    Prijavite se
                </Link>
            </p>
        </div>
    );
}