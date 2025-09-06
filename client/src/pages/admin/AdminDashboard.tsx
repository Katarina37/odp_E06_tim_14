import { useEffect, useState } from "react";
import { contentApi } from "../../api_services/contents/ContentAPIService";
import { adminApi } from "../../api_services/admin/AdminAPIService";
import type { ContentDto } from "../../models/contents/ContentDto";
import AdminContentForm from "../../components/admin/AdminContentForm";
import { PročitajVrijednostPoKljuču } from "../../helpers/local_storage";
import "../../components/admin/Admin.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuthHook";

import ContentListUser from "../../components/prikaz_sadrzaja/PrikazSadrzajaKorisnik/ContentListUser";



export default function AdminDashboard(){
    const [contents, setContents] = useState<ContentDto[]>([]);
    const [showForm, setShowForm] = useState(false);
    const token = PročitajVrijednostPoKljuču("authToken");
    const navigate = useNavigate();
    const { logout } = useAuth();
   
    const load = async () => {
        const data = await contentApi.getAllContent();
        setContents(data);
    };

    useEffect(() => {load();}, []);

    const handleDelete = async (id: number) => {
        if(!token) return;
        if(!confirm("Obrisati sadržaj?")) return;
        await adminApi.deleteContent(id, token);
        load();
    };

    const handleLogout = () => {
      logout();
      navigate("/content");
    };

    return(
    <div className="admin-dashboard">
        <div className="admin-header">
          <button className="btn-yellow" onClick={() => setShowForm(!showForm)}>
            {showForm ? "Zatvori" : "Dodaj"}
          </button>
          <button className="btn-red" onClick={handleLogout}>Odjavi se</button>
        </div>

        {showForm ? (
          <AdminContentForm onCreated={() => { load(); setShowForm(false); }} />
        ) : (
          <>
            <ContentListUser contentApi={contentApi} isAdmin onDelete={handleDelete}/>
          </>
        )}
      </div>
    );
}