import type  { IContentAPIService } from "../../api_services/contents/IContentAPIService";
import ContentList from "../../components/prikaz_sadrzaja/ContentList";
interface PrikazSadrzajaStranicaProps {
    contentApi : IContentAPIService;
}

export default function PrikazSadrzajaStranica( { contentApi } : PrikazSadrzajaStranicaProps) {

    return (
         <div className="min-h-screen bg-gray-100">
            <ContentList contentApi={contentApi} />
          </div>
    );
}