import { useEffect, useState } from "react";
import type  { IContentAPIService } from "../../../api_services/contents/IContentAPIService";
import type { ContentDto } from "../../../models/contents/ContentDto";
import './ContentList.css'
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface PrikazProps {
  contentApi: IContentAPIService;
}

export function ContentList({ contentApi }: PrikazProps) {
  const [contents, setContent] = useState<ContentDto[]>([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  }

  /*useEffect(() => {
    (async () => {
      try {
        const data = await contentApi.getAllContent();
        setContent(data);
      } catch (err) {
        console.error("Greska:", err);
      }
    })();
  }, [contentApi]);*/

  const fetchContent = async () => {
    try {
      const params = { naziv: search || undefined }; 
      const data = await contentApi.getContentByFilter(params);
      setContent(data);
    } catch (err) {
      console.error("Greska:", err);
      setContent([]);
    }
  }

  useEffect(() => {
    fetchContent();
  }, [search]); 

  const sinners = contents.find((c) => (c.naziv as string) === "Sinners");  

    return (
    <div className="content-page">
      <div className="content-header">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Pretrazi"
          className="search-input"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button className="login-button" onClick={handleLoginClick}>Prijavi se</button>
      </div>

      {sinners && (
        <div className="hero-section"
        style={{
          backgroundImage: `url(/Images/filmovi/SinnersPoster.png)`,
        }}>
          <div className="hero-overlay">
            <h1>{sinners.naziv}</h1>
            <p>{sinners.zanr}</p>
            <button className="hero-button"
            onClick={() => navigate(`/content/${sinners.content_id}`)}
            >Prikazi više
            </button>
          </div>
        </div>
      )}

      <div className="cards-grid">
        {contents?.map(content => (
          <div key={content.content_id} className="card" onClick={() => navigate(`/content/${content.content_id}`)}>
            <img src={content.cover_slika} alt={content.naziv} />
            <div className="card-info">
              <h3>{content.naziv}</h3>
              <p>{content.zanr}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  
  );
}

export default ContentList;