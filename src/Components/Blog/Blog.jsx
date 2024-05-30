import VerticalVideoPreview from "./VerticalVideoPreview";
import VerticalClip from "../VerticalClip/VerticalClip";
import './Blog.css';
import { useState, useEffect } from "react";
import axios from "axios";
import { api } from "../App/App";
function Blog(props) {
    const [verts, setVerts] = useState(undefined)

    const getArtistVert = async ()=> {
        try{
            const response = await axios({
                method:'GET',
                url: api + 'api/short-video/by-author/' + props.artistId,
                responseType: 'application/json'
            })
            let result = JSON.parse(response.data).shortVideoList
            return result
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        getArtistVert()
            .then(res=>setVerts(res))
            .catch(err=>console.log(err))
    },[])
    return (
        <div className="blog">
            {verts?.map((video)=>(
                <VerticalClip id={video.id}/>
            ))}
        </div>
    )
}

export default Blog;