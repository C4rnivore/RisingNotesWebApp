import { useContext, useEffect, useRef } from 'react';
import './VideoPlayer.css';
import { VideoPlayerContext, api } from '../App/App';


function VideoPlayer() {
    const { video, setVideo } = useContext(VideoPlayerContext);
    const videoRef = useRef();

    useEffect(() => {
        handlePlayVideo();
    })

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
                    <button className='player-exit-button' onClick={() => setVideo(false)}>Закрыть</button>
                    <video className='video-player' ref={videoRef} src={api + `api/video/${video.name}/file`} type="video/mp4" controls/>
                </div>
                : <></>
            }
        </>
    )
}


export default VideoPlayer;