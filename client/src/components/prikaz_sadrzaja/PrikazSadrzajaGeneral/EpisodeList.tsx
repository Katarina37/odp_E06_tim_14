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
    const [ visibleSeasons, setVisibleSeasons] = useState<Record<number, boolean>>({});
    const navigate = useNavigate();

    useEffect(() => {
        if(!content_id) return;
        (async () => {
            try {
                const data = await episodeApi.getAllEpisodes(content_id);
                setEpisodes(data);

                const initialVisibility: Record<number, boolean> = {};
                data.forEach( e=> {
                    if(!initialVisibility[e.sezona]){
                        initialVisibility[e.sezona] = true;
                    }
                });

                setVisibleSeasons(initialVisibility);
            } catch (err) {
                console.error(err);
            }
        })();
    }, [episodeApi, content_id]);

    const groupBySeason: Record<number, EpizodaDto[]> = {};
    episodes.forEach(ep => {
        const sezona = ep.sezona;
        if(!groupBySeason[sezona]){
            groupBySeason[sezona] = [];
        }

        groupBySeason[sezona].push(ep);
    });

    const toggleSeasonVisibility = (sezona: number) => {
        setVisibleSeasons(prev => ({
            ...prev,
            [sezona]: !prev[sezona]
        }));
    }

    return (
        <div className="content-page">
            <div className="content-header">
                <button className="login-button"  onClick={() => navigate(`/content/${content_id}`)}>Nazad</button>
            </div>

            {Object.entries(groupBySeason).map(([sezonaStr, eps]) => {
                const sezona = parseInt(sezonaStr, 10);
                const isVisible = visibleSeasons[sezona];

                return (
                    <div key={sezona} className="season-block">
                        <div className="season-header">
                            <h2 style={{ paddingLeft: "30px" }}> Sezona {sezona}</h2>
                            <button className="toggle-button" onClick={() => toggleSeasonVisibility(sezona)}>{isVisible ? "Sakrij epizode" : "Prikazi epizode"}</button>
                        </div>

                        { isVisible && (
                            <div className="cards-grid">
                                {eps.map(episode => (
                                    <div
                                        key={episode.episode_id}
                                        className="card"
                                        onClick={() => navigate(`/content/${episode.content_id}/episodes/${episode.episode_id}`)}
                                    >
                                        <img src={`/${episode.cover_slika}`} alt={episode.naziv_epizode} />
                                        <div className="card-info">
                                            <h3>S{episode.sezona}E{episode.broj_epizode}</h3>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )
            })}

           
        </div>
    );
}

export default EpisodeList;
