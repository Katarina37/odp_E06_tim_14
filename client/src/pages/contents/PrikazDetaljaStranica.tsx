
import type { IContentAPIService } from "../../api_services/contents/IContentAPIService";
import ContentDetails from "../../components/prikaz_sadrzaja/PrikazSadrzajaID/ContentDetails";

interface PrikazDetaljaStranicaProps {
    contentApi: IContentAPIService;
}

export default function PrikazDetaljaStranica( {contentApi}: PrikazDetaljaStranicaProps) {
    return(
        <div className="min-h-screen bg-gray-100">
            <ContentDetails contentApi={contentApi} />
        </div>
    );
}

