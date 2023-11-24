import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";

const headers = {
    Authorization: "bearer " + process.env.REACT_APP_CINEMANIA_TOKEN
};

export const fetchDataFromApi = async (url, params) => {
    try{
        const {data} = await axios.get(BASE_URL + url, {
            headers,
            params
        });
        return data;
    }
    catch(err){
        console.log(err);
        return err;
    }
}