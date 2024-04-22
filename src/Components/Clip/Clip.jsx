import './Clip.css'

function Clip(props) {
    const stockCover='https://products.ls.graphics/mesh-gradients/images/29.-Pale-Cornflower-Blue_1.jpg'

    return ( 
        <div key={props.key} className="clip-wrapper">
            <div className="cover-wrapper">
                <img draggable='false' className="clip-cover" src={props.cover ? props.cover : stockCover}/>
                <span className="clip-duration">{props.duration}</span>
            </div>
            <div className="clip-song"> 
                <div className="song-img-placeholder"></div>
                <div className="song-info-wrapper">
                    <span className="clip-song-name">{props.name}</span>
                    <span className="clip-song-author">{props.authorName}</span>
                </div>
            </div>
        </div>
    );
}
export default Clip;