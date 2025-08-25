import type { IEpisodeAPIService } from "../../api_services/episodes/IEpisodeAPIService";
import EpisodeList from "../../components/prikaz_sadrzaja/PrikazSadrzajaGeneral/EpisodeList";

interface PrikazEpizodaStranicaProps {
    episodeApi: IEpisodeAPIService;
}

export default function PrikazEpizodaStranica( { episodeApi} : PrikazEpizodaStranicaProps) {
    return(
        <div className="min-h-screen bg-gray-100">
            <EpisodeList episodeApi={episodeApi} />
        </div>
    );
}


