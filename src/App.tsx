import { FaSearch } from "react-icons/fa";
import { CtxProps } from "./@types/App";
import { PhotoProps } from "./@types/photo";
import { useAppCtx } from "./context/appCtx";

function Photo({
  urls: { regular },
  alt_description,
  likes,
  user: {
    name,
    portfolio_url,

    profile_image: { medium },
  },
}: PhotoProps) {
  return (
    <article className="photo">
      <img src={regular} alt={alt_description} />
      <div className="photo-info">
        <div>
          <h4>{name}</h4>
          <p>{likes} likes</p>
        </div>
        <a href={portfolio_url}>
          <img src={medium} alt={name} className="user-img" />
        </a>
      </div>
    </article>
  );
}

function App() {
  const { loading, photos, query, setQuery, handleSubmit } =
    useAppCtx() as CtxProps;
  console.log(query);

  return (
    <main>
      <section className="search">
        <form className="search-form">
          <input
            type="text"
            placeholder="Search..."
            value={query}
            className="form-input"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setQuery?.(e.target.value)
            }
          />
          <button type="submit" className="submit-btn" onClick={handleSubmit}>
            <FaSearch />
          </button>
        </form>
      </section>
      <section className="photos">
        <div className="photos-center">
          {photos?.map((photo, index) => (
            <Photo key={index} {...photo} />
          ))}
        </div>
        {loading && <h2 className="loading">Loading...</h2>}
      </section>
    </main>
  );
}

export default App;
