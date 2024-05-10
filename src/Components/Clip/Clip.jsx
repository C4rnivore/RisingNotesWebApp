import './Clip.css'

function Clip({key, cover, duration, name, authorName}) {
    const stockCover='https://products.ls.graphics/mesh-gradients/images/29.-Pale-Cornflower-Blue_1.jpg'

    return ( 
        <div key={key} className="clip-wrapper">
            <div className="cover-wrapper">
                <img draggable='false' className="clip-cover" src={cover ? cover : stockCover}/>
                <span className="clip-duration">{duration}</span>
            </div>
            <div className="clip-song"> 
                <div className="song-img-placeholder"></div>
                <div className="song-info-wrapper">
                    <span className="clip-song-name">{name}</span>
                    <span className="clip-song-author">{authorName}</span>
                </div>
            </div>
        </div>
    );
}
export default Clip;