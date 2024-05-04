import axios from "axios";
import { api } from "../../../App/App";


export const getGenres = async () =>{
    try{
        const response = await axios({
            method:'GET',
            url: api + 'api/common-data/genre/list',
            responseType: 'application/json'
        })
        let result = JSON.parse(response.data).genreList
        return result
    }
    catch(err){
        console.log(err);
    }
}

export const getLanguages = async () =>{
    try{
        const response = await axios({
            method:'GET',
            url: api + 'api/common-data/language/list',
            responseType: 'application/json'
        })
        let result = JSON.parse(response.data).languageList
        return result
    }
    catch(err){
        console.log(err);
    }
}

export const getMoods = async () =>{
    try{
        const response = await axios({
            method:'GET',
            url: api + 'api/common-data/vibe/list',
            responseType: 'application/json'
        })
        let result = JSON.parse(response.data).vibeList

        return result
    }
    catch(err){
        console.log(err);
    }
}