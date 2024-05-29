import { useContext, useEffect, useRef } from 'react';
import './VideoPlayer.css';
import { VideoPlayerContext, api } from '../App/App';
import closeButton from '../../Images/playerforvideo/closebutton.svg'
import risingnotes from '../../Images/playerforvideo/risingnotes.svg'



function VideoPlayer() {
    const { video, setVideo } = useContext(VideoPlayerContext);
    const videoRef = useRef();

    useEffect(() => {
        handlePlayVideo();
    }, [video])

    function handlePlayVideo() {
        // плеер видео
        if (!video) {
            videoRef?.current?.pause();
        }
        else if (typeof video === "string" && video.includes('api/music-clip')) {
            videoRef.current.src = video;
            videoRef.current.play();
        }
        else {
            const url = URL.createObjectURL(video);
            videoRef.current.src = url;
            videoRef.current.play();
        }
    }

    return (
        <>
            {video ?
                <div className='video-player-wrapper'>
                    <img className="rising-notes-forplayer" src={risingnotes}></img>
                    <button className='player-exit-button' onClick={() => setVideo(false)}><img src={closeButton}/></button>
                    <video className='video-player' ref={videoRef} src={api + `api/video/${video.name}/file`} type="video/mp4" controls/>
                </div>
                : <></>
            }
        </>
    )
}


export default VideoPlayer;