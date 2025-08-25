import type { UserDto } from "../../../models/users/UserDto";

interface RedUTabeliKorisnikaProps {
    korisnik: UserDto;
}

export function RedUTabeliKorisnika({ korisnik }: RedUTabeliKorisnikaProps) {
  return (
    <tr className="hover:bg-gray-100 transition">
      <td className="px-4 py-2">{korisnik.user_id}</td>
      <td className="px-4 py-2">{korisnik.username}</td>
      <td className="px-4 py-2">{korisnik.uloga}</td>
    </tr>
  );
}
