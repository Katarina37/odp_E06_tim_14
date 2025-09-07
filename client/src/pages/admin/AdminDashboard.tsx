import { useEffect, useState } from "react";
import { contentApi } from "../../api_services/contents/ContentAPIService";
import { adminApi } from "../../api_services/admin/AdminAPIService";
import type { ContentDto } from "../../models/contents/ContentDto";
import AdminContentForm from "../../components/admin/AdminContentForm";
import { PročitajVrijednostPoKljuču } from "../../helpers/local_storage";
import "../../components/admin/Admin.css";
import ContentListUser from "../../components/prikaz_sadrzaja/PrikazSadrzajaKorisnik/ContentListUser";


export default function AdminDashboard(){
    const [, setContents] = useState<ContentDto[]>([]);
    const [showForm, setShowForm] = useState(false);
    const token = PročitajVrijednostPoKljuču("authToken");

   
    const load = async () => {
        const data = await contentApi.getAllContent();
        setContents(data);
    };

    useEffect(() => {load();}, []);

    const handleAddContent = () => {
      setShowForm(true);
    }

    const handleDelete = async (id: number) => {
        if(!token) return;
        if(!confirm("Obrisati sadržaj?")) return;
        await adminApi.deleteContent(id, token);
        load();
    };

    return(
    <div className="admin-dashboard">
        

        {showForm ? (
          <AdminContentForm onCreated={() => { load(); setShowForm(false); }} onCancel={() => setShowForm(false)} />
        ) : (
          <>
            <ContentListUser contentApi={contentApi} isAdmin onDelete={handleDelete} onAdd={handleAddContent}/>
          </>
        )}
      </div>
    );
}