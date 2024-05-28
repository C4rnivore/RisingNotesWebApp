import Clip from "../../Clip/Clip";
import './Clips.css';
import { useState, useEffect } from "react";
import axios from "axios";
import { api } from "../../App/App";

export default function Clips(props) {
    const [clips, setClips] = useState(undefined)

    const getArtistClips = async ()=> {
        try{
            const response = await axios({
                method:'GET',
                url: api + 'api/music-clip/by-author/' + props.artistId,
                responseType: 'application/json'
            })
            let result = JSON.parse(response.data).musicClipList
            return result
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        getArtistClips()
            .then(res=>setClips(res))
            .catch(err=>console.log(err))
    },[])



    return (
        <div className="artist-clips">
            {clips?.map( (clip, index) => (
                    <Clip 
                        key={index} 
                        clipId={clip.id} 
                        authorId={clip.uploaderId} 
                        songId={clip.songId} 
                        name={clip.title} />
                ))}
        </div>
    )
}