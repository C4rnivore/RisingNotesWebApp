import { Link } from 'react-router-dom';
import VerticalVideoPreview from '../../../Components/Blog/VerticalVideoPreview';
import plus from '../../../Images/account-page/plus-icon.svg';

function Blog(params) {
    return (
        <div className="account-page-user">
            <h2>Все клипы</h2>
            <Link to={'/uploadvertvideo'} className='account-page-add-song'><img alt='icon' src={plus}/>Новый пост</Link>

            <div className="blog">
                <VerticalVideoPreview isArtist={true} views={1000}/>
                <VerticalVideoPreview isArtist={true} views={1000}/>
                <VerticalVideoPreview isArtist={true} views={1000}/>
                <VerticalVideoPreview isArtist={true} views={1000}/>
                <VerticalVideoPreview isArtist={true} views={1000}/>
                <VerticalVideoPreview isArtist={true} views={1000}/>
            </div>
        </div>
    )
}

export default Blog;