import './SearchArtistCard.css'
import { api } from '../App/App';
import { Link } from 'react-router-dom';
import useSearchClean from '../../Hooks/useSearchClean/useSearchClean';

function SearchArtistCard(props) {
    const onSrcError = props.srcErrHandler
    const {cleanQuery} = useSearchClean()

    return ( 
        <Link key={props.index} to={`/artist/${props.artist.id}`} className='playlist'>
            <img className='playlistskin' onError={onSrcError} src={api + `api/author/${props.artist.id}/logo?width=200&height=200`? api + `api/author/${props.artist.id}/logo?width=200&height=200`:'12'} alt={"нет картинки"} />
            <p className='labelplaylist'>{props.artist.name}</p>
        </Link>
    );
}

export default SearchArtistCard;