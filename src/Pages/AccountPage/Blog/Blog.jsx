import { Link } from 'react-router-dom';
import VerticalVideoPreview from '../../../Components/Blog/VerticalVideoPreview';
import plus from '../../../Images/account-page/plus-icon.svg';
import { useCookies } from 'react-cookie';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { api } from '../../../Components/App/App';
import VerticalClip from '../../../Components/VerticalClip/VerticalClip';

function Blog(params) {
    const [cookies] = useCookies(['authorId']);
    const [verts, setVerts] = useState(undefined)

    const getAuthorClips = async ()=> {
        try{
            const response = await axios({
                method:'GET',
                url: api + 'api/short-video/by-author/' + cookies.authorId,
                responseType: 'application/json'
            })
            let result = JSON.parse(response.data).shortVideoList
            return result
        }
        catch(err){
            return Promise.reject(err);
        }
    }

    useEffect(()=>{
        getAuthorClips()
            .then(res=>setVerts(res))
            .catch(err=>console.log(err))
    }, [])



    return (
        <div className="account-page-user">
            <h2>Все клипы</h2>
            <Link to={'/uploadvertvideo'} className='account-page-add-song'><img alt='icon' src={plus}/>Новый пост</Link>

            <div className="blog">
                {verts?.map(video=>(
                    <VerticalClip id={video.id}/>
                ))}
            </div>
        </div>
    )
}

export default Blog;