import { useEffect, useState } from "react";
import { fetchDataFromApi } from "../utils/api";

export function useFetchMedia(url, setMedia, setTotalPages){
    const [isLoading, setIsLoading] = useState(false);

    useEffect(function(){
      async function fetchMedia() {
        setIsLoading(true);
        const res = await fetchDataFromApi(url);
        setMedia(res.results);
        setTotalPages(res.total_pages);
        setIsLoading(false);
      }
      fetchMedia();
    }, [url, setMedia, setTotalPages]);

    return isLoading;
};