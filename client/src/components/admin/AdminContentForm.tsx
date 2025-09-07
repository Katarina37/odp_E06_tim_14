import { useState } from "react";
import type { CreateContentRequest } from "../../api_services/admin/IAdminAPIService";
import { adminApi } from "../../api_services/admin/AdminAPIService";
import { PročitajVrijednostPoKljuču } from "../../helpers/local_storage";
import "./Admin.css";

interface AdminContentFormProps {
  onCreated: () => void;
  onCancel: () => void;
}

export default function AdminContentForm({ onCreated, onCancel }: AdminContentFormProps) {
  const [tip, setTip] = useState("film");
  const [naziv, setNaziv] = useState("");
  const [opis, setOpis] = useState("");
  const [datum, setDatum] = useState("");
  const [cover, setCover] = useState("");
  const [zanr, setZanr] = useState("");
  const [trivia, setTrivia] = useState<string[]>([]);
  const [epizode, setEpizode] = useState<any[]>([]);
  const [showEpisodes, setShowEpisodes] = useState(false);

  const token = PročitajVrijednostPoKljuču("authToken");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    const contentData: CreateContentRequest = {
      content: { naziv, tip, opis, datum_izlaska: datum, cover_slika: cover, zanr },
      trivia,
      epizode: tip === "serija" ? epizode : undefined,
    };

    try {
      await adminApi.createContent(contentData, token);
      alert("Sadržaj uspješno dodat");
      onCreated();
    } catch (err) {
      alert("Greška prilikom dodavanja sadržaja");
    }
  };

  const handleAddEpisode = () => {
    setEpizode([
      ...epizode,
      {
        sezona: 1,
        broj_epizode: 1,
        naziv_epizode: "",
        opis_epizode: "",
        cover_slika: "",
      },
    ]);
    setShowEpisodes(true);
  };

  const updateEpisode = (index: number, field: string, value: any) => {
    const newEpisodes = [...epizode];
    newEpisodes[index] = { ...newEpisodes[index], [field]: value };
    setEpizode(newEpisodes);
  };

 
  return (
    <div className="form-overlay">
      <div className="admin-form">
        <h2>Dodaj novi sadržaj</h2>
        <form onSubmit={handleSubmit}>
          <input placeholder="Naziv" value={naziv} onChange={(e) => setNaziv(e.target.value)} />
          <textarea placeholder="Opis" value={opis} onChange={(e) => setOpis(e.target.value)} />
          <input type="date" value={datum} onChange={(e) => setDatum(e.target.value)} />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const folder = tip === "film" ? "filmovi" : "serije";
                setCover(`Images/${folder}/${file.name}`);
              }
            }}
          />
          {cover && (
            <div className="cover-preview-wrapper">
              <img src={`/${cover}`} alt="Preview" className="cover-preview" />
              <p>{cover}</p>
            </div>
          )}

          <input placeholder="Žanr" value={zanr} onChange={(e) => setZanr(e.target.value)} />
          <select value={tip} onChange={(e) => setTip(e.target.value)}>
            <option value="film">Film</option>
            <option value="serija">Serija</option>
          </select>

          <textarea
            placeholder="Trivia (odvojeno zarezima)"
            onChange={(e) => setTrivia(e.target.value.split(","))}
          />

          {tip === "serija" && (
            <button type="button" onClick={handleAddEpisode} className="episode-btn">
              Dodaj epizode
            </button>
          )}

          <div className="form-buttons">
            <button type="submit">Sačuvaj</button>
            <button type="button" onClick={onCancel} className="cancel-btn">
              Odustani
            </button>
          </div>
        </form>
      </div>

      
      {showEpisodes && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Epizode</h3>
            {epizode.map((ep, i) => (
              <div key={i} className="episode-card">
                <input
                  type="number"
                  placeholder="Sezona"
                  value={ep.sezona}
                  onChange={(e) => updateEpisode(i, "sezona", +e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Broj epizode"
                  value={ep.broj_epizode}
                  onChange={(e) => updateEpisode(i, "broj_epizode", +e.target.value)}
                />
                <input
                  placeholder="Naziv epizode"
                  value={ep.naziv_epizode}
                  onChange={(e) => updateEpisode(i, "naziv_epizode", e.target.value)}
                />
                <textarea
                  placeholder="Opis"
                  value={ep.opis_epizode}
                  onChange={(e) => updateEpisode(i, "opis_epizode", e.target.value)}
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) updateEpisode(i, "cover_slika", `Images/serije/${file.name}`);
                  }}
                />
                {ep.cover_slika && <img src={`/${ep.cover_slika}`} alt="Preview" className="cover-preview-episode" />}
              </div>
            ))}
            <button type="button" onClick={handleAddEpisode} className="add-episode-btn">
              ➕ Dodaj epizodu
            </button>
            <div className="modal-buttons">
              <button type="button" onClick={() => setShowEpisodes(false)}>
                Sačuvaj
              </button>
              <button type="button" onClick={() => setShowEpisodes(false)}>
                Odustani
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
