import { useEffect, useState } from "react";
import type { IEpisodeAPIService } from "../../../api_services/episodes/IEpisodeAPIService";
import type { EpizodaDto } from "../../../models/episodes/EpisodeDto";
import '../PrikazSadrzajaGeneral/ContentList.css';
import { useParams, useNavigate} from "react-router-dom";

interface EpisodeDetailProps {
    episodeApi: IEpisodeAPIService;
}

export function EpisodeDetails( {episodeApi}: EpisodeDetailProps) {
    const params = useParams<{content_id?: string; episode_id?: string}>();
    const c_id = params.content_id ? parseInt(params.content_id, 10) : undefined;
    const e_id = params.episode_id ? parseInt(params.episode_id, 10) : undefined;
    const [episodes, setEpisode] = useState<EpizodaDto | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if(!e_id || !c_id) return;
        (async () => {
            try {
                const data = await episodeApi.getEpisodeById(e_id, c_id);
                setEpisode(data);
            } catch (err) {
                console.error(err);
                setEpisode(null);
            }
        })();
    }, [episodeApi, e_id, c_id]);

    const handleClick = () => {
        navigate(-1);
    }

    return (
        <div className="content-page">
            <div className="content-header">
                <button className="login-button" onClick={handleClick}>Nazad</button>
            </div>

            {episodes ? (
                <div className="detail-container">
                    <div className="detail-image">
                        <img src={`/${episodes.cover_slika}`} alt={episodes.naziv_epizode} />
                    </div>
                    <div className="detail-info">
                        <h2>{episodes.naziv_epizode}</h2>
                        <p><strong>Sezona:</strong>{episodes.sezona}</p>
                        <p><strong>Epizoda:</strong>{episodes.broj_epizode}</p>
                        <p><strong>Naziv epizode:</strong>{episodes.naziv_epizode}</p>
                        <p><strong>Opis:</strong>{episodes.opis_epizode}</p>
                    </div>
                </div>
            ) : (
                <p>Sadrzaj nije pronadjen</p>
            )}
        </div>
    );
}

