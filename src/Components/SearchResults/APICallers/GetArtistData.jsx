import axios from "axios";
import { api } from "../../App/App";
import SearchResults from "../SearchResults";

export async function fetchInput(input){
    let searchResult = {
        artists:{
            id:undefined,
            name: undefined,
            about: undefined,
            vkLink: undefined,
            yaMusicLink: undefined,
            webSiteLink: undefined,
            pfp:undefined
        },
        tracks: undefined,
        playlists: undefined,
        clips: undefined
    }

    searchResult.artists = await fetchArtists(input)
    searchResult.tracks = await fetchTracks(input)
    searchResult.playlists = await fetchPlaylists(input)
    searchResult.clips = await fetchClips(input)
    return searchResult
}

 async function fetchArtists(input){
    if(input == '')
        return
    
    try{
        const response = await axios({
            method:'GET',
            url: api + 'api/author/list/?NameWildcard='+input,
            responseType: 'application/json',
        })
        return JSON.parse(response.data).authorList
    }
    catch(err){
        console.log('Something wrong occured when trying to fetch artist data');
    }
}

async function fetchTracks(input){
    if(input == '')
        return 

    try{
        const response = await axios({
            method:'GET',
            url: api + `api/song/list?NamePart=${input}`,
            responseType: 'application/json',
        })
        const result = JSON.parse(response.data).songList
        return result
    }
    catch(err){
        console.log('Something wrong occured when trying to fetch songs data');
    }
}

async function fetchPlaylists(input){
    if(input == '')
        return 

    try{
        const response = await axios({
            method:'GET',
            url: api + `api/playlist/list?NamePart=${input}`,
            responseType: 'application/json',
        })
        const result = JSON.parse(response.data).musicClipList
        return result
    }
    catch(err){
        console.log('Something wrong occured when trying to fetch clips data');
    }
}

async function fetchClips(input){
    if(input == '')
        return 

    try{
        const response = await axios({
            method:'GET',
            url: api + `api/music-clip/list?nameWildcard=${input}`,
            responseType: 'application/json',
        })
        const result = JSON.parse(response.data).playlistList
        return result
    }
    catch(err){
        console.log('Something wrong occured when trying to fetch playlists data');
    }
}


