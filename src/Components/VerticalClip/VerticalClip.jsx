import { useState } from 'react'
import './VerticalClip.css'
import { useEffect, useContext, useRef } from 'react'
import { api } from '../App/App'
import axios from 'axios'
import Skeleton from 'react-loading-skeleton'
import { VertVideoInfoContext, VertVideoPlayerContext,} from '../App/App';
import { handleVideoEnter, handleVideoHover, handleVideoLeave } from '../Clip/handlers/ClipHandlers';

function VerticalClip(props) {
    const [dataFetched, setDataFetched] = useState(false)
    const [vertData, setVertData] = useState(undefined)
    const [videoLoaded, setVideoLoaded] = useState(false)
    const [authorName, setAuthorName] = useState('')

    const { vertvideo, setVertVideo } = useContext(VertVideoPlayerContext);
    const { vertVideoInfo, setVertVideoInfo } = useContext(VertVideoInfoContext);

    const previewRef = useRef(undefined)
    const videoPreviewRef = useRef(undefined)

    useEffect(()=>{
        getVertData()
            .then(res=>{
                setVertData(res)
                setDataFetched(true)
            })
            .catch(err=>console.log(err))
    },[])

    const getAuthorName = async (id) =>{
        try{
            const response = await axios({
                method:'GET',
                url: api + 'api/author/' + id,
                responseType: 'application/json'
            })
            let result = JSON.parse(response.data)
            return result.name
        }
        catch(err){
            return Promise.reject(err);
        }
    }

    const getVertData = async () =>{
        try{
            const response = await axios({
                method:'GET',
                url: api + `api/short-video/${props.id}`,
                responseType: 'application/json',
            })
            const result = JSON.parse(response.data)
            console.log(result)
            return result
        }
        catch(err){
            console.log('Something wrong occured when trying to fetch vert data');
        }
    }

    const handleVertClick = () =>{
        setVertVideo(api + `api/short-video/${props.id}/file`)
        setVertVideoInfo({
            author:authorName,
            description: vertData.description,
            title:vertData.title,
            songId:vertData.relatedSongId
        })
    }

    return ( 
        <div className="vertical-clip">
             {videoLoaded ? <></>:  <>  
                <Skeleton baseColor='#0F141D' highlightColor="#2C323D"  height={700}/>
            </>}
            {!dataFetched? <></> :
             <div className="vert-video" 
                onClick={handleVertClick}
                onMouseOver={() => handleVideoHover(videoPreviewRef)}
                onMouseEnter={() => handleVideoEnter(previewRef)}
                onMouseLeave={() => handleVideoLeave(previewRef, videoPreviewRef)} >
                <img
                    ref={previewRef}
                    draggable='false'
                    className='vert-cover' 
                    src={api + `api/short-video/${props.id}/preview`} 
                    alt="" 
                    style={{ objectFit:'cover', pointerEvents:'none'}} />
                <video
                    ref={videoPreviewRef}
                    className='clip-video' 
                    muted={true}
                    onCanPlay={()=>{setVideoLoaded(true)}}
                    src={api + `api/short-video/${props.id}/file`}>
                    Sorry, your browser doesn't support embedded videos
                </video>
                <div className="vert-data-label" style={videoLoaded?{display:'block'}:{display:'none'}}>
                    <h2>{vertData.title}</h2>
                    <span>{vertData.description}</span>
                </div>
            </div>
            }
           
        </div>
    );




}

export default VerticalClip;