import { useState } from "react";
import { Link } from "react-router-dom";
import { validacijaPodatakaAuth } from "../../api_services/validators/auth/AuthValidator";
import type { AuthFormProps } from "../../types/props/auth_form_props/AuthFormProps";
import { useAuth } from "../../hooks/useAuthHook";
import "./PrijavaForma.css"

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
    <div className="prijava-forma">
    <h1>Prijava</h1>
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
        placeholder="Lozinka"
        value={lozinka}
        onChange={(e) => setLozinka(e.target.value)}
      />
      </div>
      
       {greska && <p className="greska">{greska}</p>}

      <button
        type="submit"
      >
        Prijavi se
      </button>
    </form>

    <p>
      Nemate nalog?{" "}
      <Link to="/register">
        Registrujte se
      </Link>
    </p>

    <p>
      Gledajte kao gost?{" "}
      <Link to="/content">
        Gledaj
      </Link>
    </p>
</div>
  );
}
