import { useState } from "react";
import { Link } from "react-router-dom";
import { validacijaPodatakaAuth } from "../../api_services/validators/auth/AuthValidator";
import type { AuthFormProps } from "../../types/props/auth_form_props/AuthFormProps";
import { useAuth } from "../../hooks/useAuthHook";
import "./PrijavaForma.css"

export function RegistracijaForma({ authApi }: AuthFormProps) {
  const [username, setUsername] = useState("");
  const [lozinka, setLozinka] = useState("");
  const [uloga, setUloga] = useState("korisnik");
  const [greska, setGreska] = useState("");
  const { login } = useAuth();

  const podnesiFormu = async (e: React.FormEvent) => {
    e.preventDefault();

    const validacija = validacijaPodatakaAuth(username, lozinka);
    if (!validacija.uspjesno) {
      setGreska(validacija.poruka ?? "Neispravni podaci");
      return;
    }

    const odgovor = await authApi.registracija(username, uloga, lozinka);
    if (odgovor.success && odgovor.data) {
      login(odgovor.data);
    } else {
      setGreska(odgovor.message);
      setUsername("");
      setLozinka("");
    }
  };

  return (
    <div className="login-page">
      <div className="prijava-forma">
      <h1>Registracija</h1>
      <form onSubmit={podnesiFormu}>
        <div className="input-group">
           <input
            type="text"
            placeholder="Korisničko ime"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
       
       <div className="input-group">
         <input
          type="password"
          placeholder="Лозинка"
          value={lozinka}
          onChange={(e) => setLozinka(e.target.value)}
        />
       </div>
       
        <select
          value={uloga}
          onChange={(e) => setUloga(e.target.value)}>
          <option value="korisnik">Korisnik</option>
          <option value="administrator">Admin</option>
        </select>

        {greska && <p className="greska">{greska}</p>}

        <button
          type="submit">
          Registruj se
        </button>
      </form>

      <p>
        Već imate nalog?{" "}
        <Link to="/login">
          Prijavite se
        </Link>
      </p>

      <p>
        Gledajte kao gost?{""}
        <Link to="/content">
          Gledaj
        </Link>
      </p>
    </div>
    </div>
  );
}
