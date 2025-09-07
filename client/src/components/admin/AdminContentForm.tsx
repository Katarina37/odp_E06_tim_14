import { useState } from "react";
import type { CreateContentRequest } from "../../api_services/admin/IAdminAPIService";
import { adminApi } from "../../api_services/admin/AdminAPIService";
import { PročitajVrijednostPoKljuču } from "../../helpers/local_storage";
import "./Admin.css"

interface AdminContentFormProps{
    onCreated: () => void;
}

export default function AdminContentForm({onCreated} : AdminContentFormProps){
    const [tip, setTip] = useState("film");
    const [naziv, setNaziv] = useState("");
    const [opis, setOpis] = useState("");
    const [datum, setDatum] = useState("");
    const [cover, setCover] = useState("");
    const [zanr, setZanr] = useState("");
    const [trivia, setTrivia] = useState<string[]>([]);
    const [epizode, setEpizode] = useState<any[]>([]);

    const token = PročitajVrijednostPoKljuču("authToken");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if(!token) return;

        const contentData: CreateContentRequest = {
            content: {naziv, tip, opis, datum_izlaska: datum, cover_slika: cover, zanr},
            trivia,
            epizode: tip === "serija" ? epizode : undefined,
        };

        try{
            await adminApi.createContent(contentData, token);
            alert("Sadrzaj uspjesno dodat");
            onCreated();
        }catch(err){
            alert("Greska prilikom dodavanja sadrzaja");
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
                cover_slika: ""
            },
        ]);
    };

    const updateEpisode = (index: number, field: string, value: any) => {
        const newEpisodes = [...epizode];
        newEpisodes[index] = {...newEpisodes[index], [field]: value};
        setEpizode(newEpisodes);
    };

    return(
    <div className="form-wrapper">
    <form onSubmit={handleSubmit} className="admin-form">
      <h2>Dodaj novi sadržaj</h2>

      <input placeholder="Naziv" value={naziv} onChange={e => setNaziv(e.target.value)} />
      <textarea placeholder="Opis" value={opis} onChange={e => setOpis(e.target.value)} />
      <input type="date" value={datum} onChange={e => setDatum(e.target.value)} />
      <input type="file" accept="image/*" onChange={(e) => {
        const file = e.target.files?.[0];
        if(file) {
          const folder = tip === "film" ? "filmovi" : "serije";
          setCover(`Images/${folder}/${file.name}`);
        }
      }}/>

      { cover && (
        <div style={{marginTop: '10px'}}>
         <img src={`/${cover}`} alt="Preview" style={{ width: '150px', borderRadius: '4px'}} />
         <p style={{ fontSize: '12px'}}>{cover}</p>
        </div>
      )}
      <input placeholder="Žanr" value={zanr} onChange={e => setZanr(e.target.value)} />

      <select value={tip} onChange={e => setTip(e.target.value)}>
        <option value="film">Film</option>
        <option value="serija">Serija</option>
      </select>

      <textarea
        placeholder="Trivia (odvojeno zarezima)"
        onChange={e => setTrivia(e.target.value.split(","))}
      />

      {tip === "serija" && (
        <div style={{ backgroundColor: "#283649"}}>
          <h3>Epizode</h3>
          {epizode.map((ep, i) => (
            <div key={i} className="episode-card" style={{ backgroundColor: "#283649", border:"none"}}>
              <input type="number" placeholder="Sezona" value={ep.sezona} onChange={e => updateEpisode(i, "sezona", +e.target.value)} />
              <input type="number" placeholder="Broj epizode" value={ep.broj_epizode} onChange={e => updateEpisode(i, "broj_epizode", +e.target.value)} />
              <input placeholder="Naziv epizode" value={ep.naziv_epizode} onChange={e => updateEpisode(i, "naziv_epizode", e.target.value)} />
              <textarea placeholder="Opis" value={ep.opis_epizode} onChange={e => updateEpisode(i, "opis_epizode", e.target.value)} />
              <input type="file" accept="image/*" onChange={(e) => {
                const file = e.target.files?.[0];
                if(file) {
                  const putanja = `Images/serije/${file.name}`;
                  updateEpisode(i, "cover_slika", putanja);
                }
              }} />

              { ep.cover_slika && (
                <div style={{marginTop: "8px"}}>
                  <img src={`/${ep.cover_slika}`} alt="Preview" style={{ width: "120px", borderRadius: "4px"}}/>
                  <p style={{fontSize: "11px"}}>{ep.cover_slika}</p>
                </div>
              )}
            </div>
          ))}
          <button type="button" onClick={handleAddEpisode} style={{ marginBottom: "16px" }}>Dodaj epizodu</button>
        </div>
      )}

      <button type="submit">Sačuvaj</button>
    </form>
    </div>
    );
}