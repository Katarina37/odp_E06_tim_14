import { useEffect, useState } from "react";
import type { IEpisodeAPIService } from "../../../api_services/episodes/IEpisodeAPIService";
import type { EpizodaDto } from "../../../models/episodes/EpisodeDto";
import './ContentList.css';
import { useNavigate, useParams } from "react-router-dom";

interface PrikazEpProps {
    episodeApi: IEpisodeAPIService;
}

export function EpisodeList( { episodeApi}: PrikazEpProps) {
    const params = useParams<{ content_id?: string }>();
    const content_id = params.content_id ? parseInt(params.content_id, 10) : undefined; 
    const [episodes, setEpisodes ] = useState<EpizodaDto[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        if(!content_id) return;
        (async () => {
            try {
                const data = await episodeApi.getAllEpisodes(content_id);
                setEpisodes(data);
            } catch (err) {
                console.error(err);
            }
        })();
    }, [episodeApi, content_id]);

    return (
        <div className="content-page">
            <div className="content-header">
                <button className="login-button"  onClick={() => navigate(`/content/${content_id}`)}>Nazad</button>
            </div>

            <div className="cards-grid">
                {episodes?.map(episode => (
                    <div key={episode.episode_id} className="card" onClick={() => navigate(`/content/${episode.content_id}/episodes/${episode.episode_id}`)}>
                        <img src={`/${episode.cover_slika}`} alt={episode.naziv_epizode} />
                        <div className="card-info">
                            <h3>S{episode.sezona}E{episode.broj_epizode}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default EpisodeList;
