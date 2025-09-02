import { useEffect, useState } from "react";
import { contentApi } from "../../api_services/contents/ContentAPIService";
import { adminApi } from "../../api_services/admin/AdminAPIService";
import type { ContentDto } from "../../models/contents/ContentDto";
import AdminContentForm from "../../components/admin/AdminContentForm";
import { PročitajVrijednostPoKljuču } from "../../helpers/local_storage";
import "../../components/admin/Admin.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuthHook";

import { FaTrash } from "react-icons/fa";



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
            <h2>Postojeći sadržaj</h2>
            <div className="content-grid">
              {contents.map(c => (
                <div key={c.content_id} className="content-card">
                  <img src={`/${c.cover_slika}`} alt={c.naziv} className="card-image"/>
                  <div className="card-info">
                    <h3>{c.naziv}</h3>
                    <p>{c.zanr}</p>
                    <button onClick={() => handleDelete(c.content_id)}><FaTrash /></button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    );
}