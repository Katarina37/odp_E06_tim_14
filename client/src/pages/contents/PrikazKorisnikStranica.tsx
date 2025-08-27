import type { IContentAPIService } from "../../api_services/contents/IContentAPIService";
import ContentListUser from "../../components/prikaz_sadrzaja/PrikazSadrzajaKorisnik/ContentListUser";


interface PrikazSadrzajaUserProps {
    contentApi: IContentAPIService;
}

export default function PrikazKorisnikStranica( {contentApi}: PrikazSadrzajaUserProps) {
    return (
        <div className="min-h-screen bg-gray-100">
            <ContentListUser contentApi={contentApi} />
        </div>
    )
}
