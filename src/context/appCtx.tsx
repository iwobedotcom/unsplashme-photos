import { createContext, useContext, useEffect, useRef, useState } from "react";
import { AppProps, CtxProps } from "../@types/App";

const AppCtx = createContext<CtxProps | null>(null);

const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`;
const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;

function AppCtxProvider({ children }: AppProps) {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [newImages, setNewImages] = useState(false);
  const isMount = useRef(false);

  const fetchImages = async () => {
    setLoading(true);
    let url;
    const urlPage = `&page=${page}`;
    const urlQuery = `&query=${query}`;

    if (query) {
      url = `${searchUrl}${clientID}${urlPage}${urlQuery}`;
    } else {
      url = `${mainUrl}${clientID}${urlPage}`;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();
      setPhotos((initialPhotos) => {
        if (query && page === 1) {
          return data.results;
        } else if (query) {
          return [...initialPhotos, ...data.results];
        } else {
          return [...initialPhotos, ...data];
        }
      });
      setNewImages(false);
      setLoading(false);
    } catch (error) {
      setNewImages(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    if (!isMount.current) {
      isMount.current = true;
      return;
    }
    if (!newImages) return;
    if (loading) return;
    setPage((initialPage) => initialPage + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newImages]);

  const event = () => {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) {
      setNewImages(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", event);
    return () => window.removeEventListener("scroll", event);
  });

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!query) return;
    if (page === 1) {
      fetchImages();
    }
    setPage(1);
  };

  return (
    <AppCtx.Provider
      value={{ loading, photos, page, query, setQuery, setPage, handleSubmit }}
    >
      {children}
    </AppCtx.Provider>
  );
}

export const useAppCtx = () => {
  return useContext(AppCtx);
};

export { AppCtx, AppCtxProvider };
