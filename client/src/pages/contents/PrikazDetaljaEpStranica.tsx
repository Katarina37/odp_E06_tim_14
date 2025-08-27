import type { IEpisodeAPIService } from "../../api_services/episodes/IEpisodeAPIService";
import { EpisodeDetails } from "../../components/prikaz_sadrzaja/PrikazSadrzajaID/EpisodeDetails";

interface PrikazDetaljaEpStranicaProps {
    episodeApi: IEpisodeAPIService;
}

export default function PrikazDetaljaEpStranica( {episodeApi}: PrikazDetaljaEpStranicaProps) {
    return(
        <div className="min-h-screen bg-gray-100">
            <EpisodeDetails episodeApi={episodeApi} />
        </div>
    )
}