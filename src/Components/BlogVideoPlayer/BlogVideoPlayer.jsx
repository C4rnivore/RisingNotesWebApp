import { useContext, useEffect, useRef, useState } from 'react';
import './BlogVideoPlayer.css';
import { VertVideoPlayerContext, api, axiosUnauthorized } from '../App/App';
import placeholder from '../../Images/main-placeholder.png';
import heart from '../../Images/controller/heart.svg';
import { Navigate } from 'react-router-dom';
import closeButton from '../../Images/playerforvideo/closebutton.svg'


function VertVideoPlayer({id, title, description}) {
    const { vertvideo, setVertVideo } = useContext(VertVideoPlayerContext);
    const videoRef = useRef();
    const placeholderVideoRef = useRef();
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        handlePlayVideo();
        console.log();
    }, [vertvideo])

    function handlePlayVideo() {
        // плеер видео
        if (isPlaying || !vertvideo) {
            setIsPlaying(false);
            videoRef?.current?.pause();
            placeholderVideoRef?.current?.pause();
        }
        else if (typeof vertvideo === "string" && vertvideo.includes('api/short-video')) {
            videoRef.current.src = vertvideo;
            videoRef.current.play();
            placeholderVideoRef.current.src = vertvideo;
            placeholderVideoRef.current.play();
            setIsPlaying(true);
        }
        else {
            const url = URL.createObjectURL(vertvideo);
            videoRef.current.src = url;
            videoRef.current.play();
            placeholderVideoRef.current.src = url;
            placeholderVideoRef.current.play();
            setIsPlaying(true);
        }
    }

    return (
        <>
            {vertvideo ?
                <div className="blog-video-wrapper">
                    <video alt='background' className='placeholder-vert-video' ref={placeholderVideoRef} src={api + `api/short-video/${vertvideo.name}/file`} muted loop/>
                    <div className="blog-video">
                        <div className='vertical-wrapper'>
                            <video className='vertvideo-player' ref={videoRef} src={api + `api/short-video/${vertvideo.name}/file`} type="video/mp4" onClick={handlePlayVideo} loop/>
                        </div>

                        <div className='blog-text'>
                            <button onClick={() => setVertVideo(false)}><img alt='x' src={closeButton}/></button>
                                <span>
                                    <img  alt='avatar' src={placeholder} />
                                    <p>Francis Owens</p>
                                </span>

                                <p>
                                </p>

                                <div className='blog-song'>
                                    <img alt='photo' src={placeholder} />
                                    <span>
                                        <p>Deconstructive Achievements</p>
                                        <p className='blog-artist-name'>Francis Owens, ZIA</p>
                                    </span>
                                    <button><img alt='to_favourites' src={heart} /></button>
                                </div>
                        </div>

                    </div>
                </div>
                // <div className='video-player-wrapper'>
                //     <button className='vertplayer-exit-button' onClick={() => setVideo(false)}>Закрыть</button>
                //     <video className='vertvideo-player' ref={videoRef} src={api + `api/video/${video.name}/file`} type="video/mp4" controls/>
                // </div>
                : <></>
            }
        </>
    )
}


export default VertVideoPlayer;