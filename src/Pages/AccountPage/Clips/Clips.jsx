import { Link } from "react-router-dom";
import Clip from "../../../Components/Clip/Clip";
import plus from '../../../Images/account-page/plus-icon.svg';
import { useCookies } from "react-cookie";
import { api } from "../../../Components/App/App";
import { useEffect,useState } from "react";
import axios from "axios";

export default function Clips() {
    const [cookies] = useCookies(['authorId']);
    const [clips, setClips] = useState(undefined)

    const getAuthorClips = async ()=> {
        try{
            const response = await axios({
                method:'GET',
                url: api + 'api/music-clip/by-author/' + cookies.authorId,
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
        getAuthorClips()
            .then(res=>setClips(res))
            .catch(err=>console.log(err))
    }, [])

    return (
        <div className="account-page-user">
            <h2>Все клипы</h2>
            <Link to={'/uploadvideo'} className='account-page-add-song'><img alt='icon' src={plus}/>Новое видео</Link>

            <div className="artist-clips">
                {clips?.map( (clip,index) => (
                    <Clip 
                        key={index} 
                        clipId={clip.id} 
                        authorId={clip.uploaderId} 
                        songId={clip.songId} 
                        name={clip.title} />
                ))}
            </div>
        </div>
    )
}