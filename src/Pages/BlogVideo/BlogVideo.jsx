import placeholder from '../../Images/Group 73.png';
import './BlogVideo.css';
import x from '../../Images/controller/x_red.svg';
import heart from '../../Images/controller/heart.svg';
import { useNavigate } from 'react-router-dom';

function BlogVideo(params) {
    const navigate = useNavigate();

    return (
        <div className="blog-video-wrapper">
            <img alt='background' src={placeholder}/>
            <div className="blog-video">
                <div className='vertical-wrapper'>
                    <video alt='video' poster={placeholder} controls/>
                </div>

            <div className='blog-text'>
                    <button onClick={() => navigate(-1)}><img alt='x' src={x}/></button>
                    <span>
                        <img alt='avatar' src={placeholder}/>
                        <p>Francis Owens</p>
                    </span>

                    <p>Описание вертикального видео. 
Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
sed do eiusmod tempor incididunt ut labore et dolore magna 
aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis 
aute irure dolor in reprehenderit in voluptate velit esse 
cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat 
cupidatat non proident, sunt in culpa qui officia deserunt 
mollit anim id est laborum.
                    </p>

                    <div className='blog-song'>
                        <img alt='photo' src={placeholder}/>
                        <span>
                            <p>Deconstructive Achievements</p>
                            <p className='blog-artist-name'>Francis Owens, ZIA</p>
                        </span>
                        <button><img alt='to_favourites' src={heart}/></button>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default BlogVideo;