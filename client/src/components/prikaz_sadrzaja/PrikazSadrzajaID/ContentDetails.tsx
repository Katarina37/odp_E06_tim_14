import { useEffect, useState } from "react";
import type { IContentAPIService } from "../../../api_services/contents/IContentAPIService";
import type { ContentDto } from "../../../models/contents/ContentDto";
import '../PrikazSadrzajaGeneral/ContentList.css';
import { useParams, useNavigate, Link } from "react-router-dom";

interface ContentDetailsProps {
    contentApi: IContentAPIService;
}

export function ContentDetails( { contentApi} : ContentDetailsProps) {
    const params  = useParams<{ content_id?: string }>();
    const id = params.content_id ? parseInt(params.content_id, 10) : undefined;
    const [contents, setContent ] = useState<ContentDto | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if(!id)  return;
        (async () => {

            try {
                const data = await contentApi.getContentById(id);
                console.log("Podaci:", data);
                setContent(data);
            } catch (err) {
                console.error(err);
                setContent(null);
            }
        })();
    }, [contentApi, id]);

    const handleClick = () => {
        navigate("/content");
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
                </div>
                <div className="detail-info">
                    <h2>{contents.naziv}</h2>
                    <p><strong>Zanr: </strong>{contents.zanr}</p>
                    <p><strong>Tip: </strong>{contents.tip}</p>
                    <p><strong>Datum izlaska:</strong> {new Date(contents.datum_izlaska).toLocaleDateString()}</p>
                    <p>{contents.opis}</p>
                    {contents.prosjecna_ocjena && <p><strong>Prosječna ocjena:</strong> {contents.prosjecna_ocjena}</p>}
                    {contents.trivia_opis && (
                        <div>
                        <strong>Trivia:</strong>
                        <ul>
                        {contents.trivia_opis.map((t, i) => (
                        <li key={i}>{t}</li>
                    ))}
                     </ul>
                  </div>
                )}
                </div>

                {contents.tip === "serija" && (
                <p>
                    <strong>Epizode: </strong>
                    <Link to={`/content/${contents.content_id}/episodes`}>Pogledaj sve epizode</Link>
                </p>
                )}

            </div>
        ) : (
            <p>Sadrzaj nije pronadjen</p>
        )}
    </div>
    );
}

export default ContentDetails;
