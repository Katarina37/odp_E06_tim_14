import { useEffect, useState } from "react";
import type  { IContentAPIService } from "../../../api_services/contents/IContentAPIService";
import type { ContentDto } from "../../../models/contents/ContentDto";
import '../PrikazSadrzajaGeneral/ContentList.css';
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuthHook";
import { FaTrash } from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";


interface PrikazProps {
  contentApi: IContentAPIService;
  isAdmin?: boolean;
  onDelete?: (id: number) => void;
  onAdd?: () => void;
}

export function ContentListUser({ contentApi, isAdmin = false, onDelete, onAdd }: PrikazProps) {
  const [contents, setContent] = useState<ContentDto[]>([]);
  const [search, setSearch] = useState("");
  const [tip, setTip] = useState("");
  const [sortBy, setSortBy] = useState<string>("naziv");
  const [sortOrder, setSortOrder] = useState<string>("asc");

  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  
  const handleLogoutClick = () => {
    logout();
    navigate("/content");
  };

  const fetchContent = async () => {
    try {
      const params = {
        tip: tip || undefined,
        naziv: search || undefined,
        sortBy: sortBy || undefined,
        sortOrder: sortOrder || undefined
      };
      const data = await contentApi.getContentByFilter(params);
      setContent(data);
    } catch (err) {
      console.error(err);
      setContent([]);
    }
  };

  useEffect(() => {
    fetchContent();
  }, [tip, search, sortBy, sortOrder]);

  return (
     <div className="content-page">
       {isAuthenticated && (
        <button
          className={`logout-button`}
          onClick={handleLogoutClick}
        >
          Odjavi se
        </button>
      )}

      <div className="content-main">
        <div className="filter-controls">
          <h3 className="filter-title">Filteri</h3>

          <label className="filter-label">Pretraga:</label>
          <div className="search-wrapper">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Pretraži sadržaj..."
              className="search-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <label className="filter-label">Tip sadržaja:</label>
          <select value={tip} onChange={(e) => setTip(e.target.value)}>
            <option value="">Svi tipovi</option>
            <option value="film">Film</option>
            <option value="serija">Serija</option>
          </select>

          <label className="filter-label">Sortiraj po:</label>
          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value as "naziv" | "prosjecna_ocjena" | "")
            }
          >
            <option value="">Odaberi...</option>
            <option value="naziv">Naziv</option>
            <option value="prosjecna_ocjena">Prosječna ocjena</option>
          </select>

          <label className="filter-label">Redoslijed:</label>
          <select
            value={sortOrder}
            onChange={(e) =>
              setSortOrder(e.target.value as "asc" | "desc" | "")
            }
          >
            <option value="">Odaberi...</option>
            <option value="asc">Rastuće</option>
            <option value="desc">Opadajuće</option>
          </select>
        </div>

        {/* Kartice */}
        <div className="cards-grid">
          {isAdmin && onAdd && search.trim() === "" && tip === "" && (
            <div className="card add-card" onClick={() => onAdd()}>
              <span className="add-icon">
                <FaPlusCircle />
              </span>
            </div>
          )}

          {contents.map((content) => (
            <div key={content.content_id} className="card">
              <div onClick={() => navigate(`/content/${content.content_id}`, { state: { isAdmin } } ) }>
                <img src={`/${content.cover_slika}`} alt={content.naziv} />
                <div className="card-info">
                  <h3>{content.naziv}</h3>
                  <p>{content.zanr}</p>
                </div>
              </div>

              {isAdmin && onDelete && (
                <button
                  onClick={() => onDelete(content.content_id)}
                  style={{
                    marginTop: "5px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "red",
                    fontSize: "18px",
                  }}
                  title="Obriši"
                >
                  <FaTrash />
                </button>
              )}
            </div>
          ))}
        </div>

        {contents.length === 0 && search.trim() !== "" && (
          <div
            className="no-results"
            style={{ textAlign: "center", width: "100%", marginTop: "20px" }}
          >
            Nema rezultata za "{search}"
          </div>
        )}
      </div>
    </div>
  );
}


export default ContentListUser;