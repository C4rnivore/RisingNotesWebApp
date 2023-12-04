import axios from "axios";
import { api } from "../../App/App";


export async function fetchInput(input){
    let searchResult = {
        artists: undefined,
        tracks: undefined,
        playlists: undefined
    }

    await Promise.all([
        fetchArtists(input)
        .then(res=>{
            console.log(res)
            searchResult.artists = res
            fetchTracks(res)
            .then(res=>{
                console.log(res)
                searchResult.tracks = res
            })
        })
    ])
    return searchResult
}

async function fetchArtists(input){
    if(input == ''){
        return
    }
    else{
        try{
            const response = await axios({
                method:'GET',
                url: api + 'api/author/list/?NameWildcard='+input,
                responseType: 'application/json',
            })
            const result = JSON.parse(response.data).authorList
            return result
        }
        catch(err){
            console.log('error fetchArtist');
        }
    }
}

async function fetchTracks(artists){
    const results = {}
    if(!artists)
        return

    await artists.forEach(artist => {
        fetchTrack(artist.id).then(res=> results[artist.id] = res)
    })
    return results
}
async function fetchTrack(authorId){
    try{
        const response = await axios({
            method:'GET',
            url: api + 'api/author/'+authorId+'/song/list',
            responseType: 'application/json',
        })
        const result = JSON.parse(response.data)
        return result
    }
    catch(err){
        console.log('error fetchtrack');
    }
}



// async function fetchPlaylists(input){
//     try{
//         const response = await axios({
//             method:'GET',
//             url: api + 'api/author/' + name,
//             responseType: 'application/json',
//         })
//         return JSON.parse(response.data)
//     }
//     catch(err){
//         searchResult.artist = {}
//         return {}
//     }
// }