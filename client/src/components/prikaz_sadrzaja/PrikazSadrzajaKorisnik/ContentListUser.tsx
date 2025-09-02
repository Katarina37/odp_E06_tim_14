import { useEffect, useState } from "react";
import type  { IContentAPIService } from "../../../api_services/contents/IContentAPIService";
import type { ContentDto } from "../../../models/contents/ContentDto";
import '../PrikazSadrzajaGeneral/ContentList.css';
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuthHook";


interface PrikazProps {
  contentApi: IContentAPIService;
}

export function ContentListUser({ contentApi }: PrikazProps) {
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
  {isAuthenticated && <button className="logout-button" onClick={handleLogoutClick}>Odjavi se</button>}

  <div className="content-main">
    <div className="filter-controls">
      <div className="search-wrapper">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Pretrazi"
          className="search-input"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <select value={tip} onChange={e => setTip(e.target.value)}>
        <option value="">Svi tipovi</option>
        <option value="film">Film</option>
        <option value="serija">Serija</option>
      </select>
      <select value={sortBy} onChange={e => setSortBy(e.target.value as "naziv" | "prosjecna_ocjena" | "")}>
        <option value="">Sortiraj po</option>
        <option value="naziv">Naziv</option>
        <option value="prosjecna_ocjena">Prosečna ocena</option>
      </select>
      <select value={sortOrder} onChange={e => setSortOrder(e.target.value as "asc" | "desc" | "")}>
        <option value="">Redosled</option>
        <option value="asc">Rastuće</option>
        <option value="desc">Opadajuće</option>
      </select>
    </div>

    <div className="cards-grid">
      {contents.map(content => (
        <div key={content.content_id} className="card" onClick={() => navigate(`/content/${content.content_id}`)}>
          <img src={`/${content.cover_slika}`} alt={content.naziv} />
          <div className="card-info">
            <h3>{content.naziv}</h3>
            <p>{content.zanr}</p>
          </div>
        </div>
      ))}
    </div>

    {contents.length === 0 && search.trim() !== "" && (
      <div className="no-results" style={{ textAlign: 'center', width: '100%', marginTop: '20px' }}>
       Nema rezultata za "{search}"
      </div>
    )}


  </div>
</div>

  );
}


export default ContentListUser;