import './SearchArtistCard.css'
import { api } from '../App/App';
import { Link } from 'react-router-dom';
import useSearchClean from '../../Hooks/useSearchClean/useSearchClean';

function SearchArtistCard(props) {
    const onSrcError = props.srcErrHandler
    const {cleanQuery} = useSearchClean()

    return ( 
        <div key={props.index} className="search-artist-card">
            <Link to={`/artist/${props.artist.id}`} onClick={() => cleanQuery()}>
                <img onError={onSrcError} src={api + `api/author/${props.artist.id}/logo?width=200&height=200`? api + `api/author/${props.artist.id}/logo?width=200&height=200`:'12'} alt={"нет картинки"} />
            </Link>
            <span className='search-artist-name'>{props.artist.name}</span>
        </div>
    );
}

export default SearchArtistCard;