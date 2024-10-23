import { useEffect, useRef, useState } from 'react';
import './BlogVideoPlayer.css';
import { api } from '../App/App';
import placeholder from '../../Images/main-placeholder.png';
import heart from '../../Images/controller/heart.svg';
import closeButton from '../../Images/playerforvideo/closebutton.svg'
import { useSelector, useDispatch } from 'react-redux';
import { updateVertVideoPlayerValue } from '../../Redux/slices/vertVideoPlayerSlice';

function VertVideoPlayer() {
    const videoRef = useRef();
    const placeholderVideoRef = useRef();
    const [isPlaying, setIsPlaying] = useState(false);
    
    const resize = useSelector((state)=> state.resize.value)
    const vertVideoInfo = useSelector((state)=> state.vertVideoInfo.value)
    const vertvideo = useSelector((state) => state.vertVideoPlayer.value)
    const dispatch = useDispatch()

    useEffect(() => {
        if (resize === 'standart')
        handlePlayVideo();
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

    if (resize === 'standart')
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
                            <button onClick={() => dispatch(updateVertVideoPlayerValue(false))}><img alt='x' src={closeButton}/></button>
                                <span>
                                    <img  alt='avatar' src={placeholder} />
                                    <p>{vertVideoInfo.author}</p>
                                </span>

                                <p>{vertVideoInfo.description}</p>

                                <div className='blog-song'>
                                    <img alt='photo' src={vertVideoInfo.songId ? api + `api/song/${vertVideoInfo.songId}/logo` : placeholder} />
                                    <span>
                                        <p>{vertVideoInfo.title}</p>
                                        <p className='blog-artist-name'>{vertVideoInfo.author}</p>
                                    </span>
                                    <button><img alt='to_favourites' src={heart} /></button>
                                </div>
                        </div>

                    </div>
                </div>
                : <></>
            }
        </>
    )
    else {
        return (
            <>
            { vertvideo ?
                <div className='video-player-wrapper'>
                    <button className='player-exit-button' onClick={() => dispatch(updateVertVideoPlayerValue(false))}><img src={closeButton}/></button>
                    <video className='vertvideo-player' src={vertvideo} type="video/mp4" loop autoPlay/>
                </div>
                : <></>
            }
            </>
        )
    }
}


export default VertVideoPlayer;