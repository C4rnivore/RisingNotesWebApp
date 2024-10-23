import { useEffect, useRef } from 'react';
import './VideoPlayer.css';
import closeButton from '../../Images/playerforvideo/closebutton.svg'
import risingnotes from '../../Images/playerforvideo/risingnotes.svg'
import { useSelector, useDispatch } from 'react-redux';
import { updateVideoPlayerValue } from '../../Redux/slices/videoPlayerSlice';



function VideoPlayer() {
    const videoRef = useRef();
    const video = useSelector((state)=>state.videoPlayer.value)
    const dispatch = useDispatch()

    useEffect(() => {
        handlePlayVideo();
        console.log(video)
    }, [video])

    function handlePlayVideo() {
        // плеер видео
        if (!video) {
            videoRef?.current?.pause();
        }
        else if (typeof video === "string" && video.includes('api/music-clip')) {
            // playFunc(video);
            videoRef.current.src = video;
            videoRef.current.play();
        }
        else {
            const url = URL.createObjectURL(video);
            // playFunc(url);
            videoRef.current.src = url;
            videoRef.current.play();
        }
    }

    function playFunc(url) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'blob';
        xhr.onload = function() {
        if (this.status === 200) {
            // Создание низкопроигрышного потока
            const mediaSource = new MediaSource();
            videoRef.current.src = URL.createObjectURL(mediaSource);
            mediaSource.addEventListener('sourceopen', () => {
            const sourceBuffer = mediaSource.addSourceBuffer('video/mp4; codecs="avc1.42E01E"');
            sourceBuffer.mode = 'sequence'; // Поддержка низкой задержки
            const chunkSize = 4096;
            let start = 0;
            let end = Math.min(start + chunkSize, this.readyState >= MediaSource.HAS_QUINTIC_PTS? this.duration : Infinity);

            // Функция для загрузки следующего блока
            const loadNextChunk = () => {
                if (start >= this.duration) return;
                sourceBuffer.appendBuffer(xhr.response.slice(start, end));
                start += chunkSize;
                end = Math.min(start + chunkSize, this.readyState >= MediaSource.HAS_QUINTIC_PTS? this.duration : Infinity);
                requestAnimationFrame(loadNextChunk);
            };

            loadNextChunk();
            });
        }
        };
        xhr.send();
    }

    return (
        <>
            {video ?
                <div className='video-player-wrapper'>
                    <img className="rising-notes-forplayer" src={risingnotes}></img>
                    <button className='player-exit-button' onClick={() => 
                        dispatch(
                            updateVideoPlayerValue(false)
                            )}>
                    <img src={closeButton}/></button>
                    <video className='video-player' ref={videoRef} type="video/mp4" preload="auto" controls/>
                </div>
                : <></>
            }
        </>
    )
}


export default VideoPlayer;