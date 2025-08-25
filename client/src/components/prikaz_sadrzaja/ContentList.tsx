import { useEffect, useState } from "react";
import type { IContentAPIService } from "../../api_services/contents/IContentAPIService";
import type { ContentDto } from "../../models/contents/ContentDto";
import './ContentList.css'
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface PrikazProps {
  contentApi: IContentAPIService;
}

export function ContentList({ contentApi }: PrikazProps) {
  const [contents, setContent] = useState<ContentDto[]>([]);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  }

  useEffect(() => {
    (async () => {
      try {
        const data = await contentApi.getAllContent();
        setContent(data);
      } catch (err) {
        console.error("Greska:", err);
      }
    })();
  }, [contentApi]);

  
     return (
    <div className="content-page">
      <div className="content-header">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Pretrazi"
          className="search-input"
        />
        <button className="login-button" onClick={handleLoginClick}>Prijavi se</button>
      </div>

      <div className="cards-grid">
        {contents?.map(content => (
          <div key={content.content_id} className="card">
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
