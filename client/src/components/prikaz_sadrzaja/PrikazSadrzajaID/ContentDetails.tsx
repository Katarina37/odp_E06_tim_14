import { useEffect, useState } from "react";
import type { IContentAPIService } from "../../../api_services/contents/IContentAPIService";
import type { ContentDto } from "../../../models/contents/ContentDto";
import type { OcjenaDto } from "../../../models/ratings/OcjenaDto";
import '../PrikazSadrzajaGeneral/ContentList.css';
import './OcjenaPrikaz.css';
import { PročitajVrijednostPoKljuču } from "../../../helpers/local_storage";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ocjenaApi } from "../../../api_services/ratings/OcjenaAPIService";


import { FaCheckCircle, FaPen } from "react-icons/fa";
interface ContentDetailsProps {
    contentApi: IContentAPIService;
}

export function ContentDetails( { contentApi} : ContentDetailsProps) {
    const params  = useParams<{ content_id?: string }>();
    const id = params.content_id ? parseInt(params.content_id, 10) : undefined;
    const [contents, setContent ] = useState<ContentDto | null>(null);
    const [userRate, setUserRate] = useState<OcjenaDto | null>(null);
    const [ ocjenaNova, setOcjena ] = useState<number>(1);
    const navigate = useNavigate();

    const idToken = PročitajVrijednostPoKljuču("authToken");

    useEffect(() => {
        if(!id)  return;
        (async () => {

            try {
                const data = await contentApi.getContentById(id);
                
                setContent(data);

                if(idToken){
                    const ocjena = await ocjenaApi.getUserRate(id, idToken);
                    setUserRate(ocjena);
                }
            } catch (err) {
                console.error(err);
                setContent(null);
            }
        })();
    }, [contentApi, id, idToken]);

    const handleClick = () => {
        if(!idToken){
            navigate("/content");
        }
        navigate("/content/korisnik");
    };

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();

        if(!idToken || !id) return;

        try {
            const ocjenaAdd = await ocjenaApi.addOcjena(id, ocjenaNova, idToken);
            setUserRate(ocjenaAdd);
        } catch (err) {
            console.error(err);
        }
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();

        if(!idToken || !id) return;

        try {
            const ocjenaUpdate = await ocjenaApi.updateOcjena(id, ocjenaNova, idToken);
            setUserRate(ocjenaUpdate);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="content-page">
        <div className="content-header">
            <button className="login-button" onClick={handleClick}>Nazad</button>
        </div>

        {contents ? (
            <div className="detail-container">
                <div className="detail-image">
                    <img src={`/${contents.cover_slika}`} alt={contents.naziv} />
                     { idToken && (
                    <div className="rating-container">
                        {userRate ? (
                            <div className="rating-box">
                                <p> <FaCheckCircle /> Ocijenili ste sadrzaj: <strong> {userRate.ocjena}</strong></p>
                                <form onSubmit={handleUpdate} className="rating-form">
                                    <input type="number" min={1} max={10} value={ocjenaNova} onChange={e => setOcjena(+e.target.value)} />
                                    <button className="login-button" type="submit"><FaPen> Promijeni </FaPen></button>
                                </form>
                            </div>
                        ) : (
                            <div className="rating-box">
                                <p>Jos niste ocijenili ovaj sadrzaj</p>
                                <form onSubmit={handleAdd} className="rating-form">
                                    <input type="number" min={1} max={10} value={ocjenaNova} onChange={e => setOcjena(+e.target.value)} />
                                    <button className="login-button" type="submit">Ocijeni</button>
                                </form>
                            </div>
                        )}
                    </div>
                )}
                </div>
                <div className="detail-info">
                    <h2>{contents.naziv}</h2>
                    <p><strong>Zanr: </strong>{contents.zanr}</p>
                    <p><strong>Tip: </strong>{contents.tip}</p>
                    <p><strong>Datum izlaska:</strong> {new Date(contents.datum_izlaska).toLocaleDateString()}</p>
                    <p>{contents.opis}</p>
                    {contents.prosjecna_ocjena !== undefined && contents.prosjecna_ocjena !== null && (
                        <div className="rating-container">
                            <span className="rating-stars">
                                {Array.from({length:10}, (_, i) => {
                                    const avg = Number(contents.prosjecna_ocjena);
                                    return(
                                        <span key={i} className={i < Math.round(avg) ? "star filled" : "star"}>
                                            ★
                                        </span>
                                    );
                                })}
                            </span>
                            <span className="rating-value">{Number(contents.prosjecna_ocjena).toFixed(1)}</span>
                        </div>
                    )}
                    {contents.trivia_opis && (
                        <div>
                        <strong>Trivia:</strong>
                        <ul>
                        {contents.trivia_opis.map((t, i) => (
                        <li key={i}>{t}</li>
                    ))}
                     </ul>
                    {contents.tip === "serija" && (
                    <div className="episodes-link-container">
                    <Link className="episodes-link" to={`/content/${contents.content_id}/episodes`}>Pogledaj sve epizode</Link>
                    </div>
                    )}
                  </div>
                )}
                </div>
            </div>
        ) : (
            <p>Sadrzaj nije pronadjen</p>
        )}
    </div>
    );
}

export default ContentDetails; 
