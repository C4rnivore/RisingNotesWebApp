import { useState } from 'react'
import pfp_placeholder from '../../Images/image-placeholder/pfp_placeholder.jpg'

function Header() {
    const [pfp,setPfp] = useState(pfp_placeholder)
    const [logo, setLogo] = useState()

    return (
        <header className='header'>
            <div className="header_logo">
                <img src={logo} alt="" />
                <span className='logo_txt'>RISING NOTES</span>
            </div>
            <div className='header_pfp'>
                <span className="pfp_dropdown">&#9207;</span>
                <img className="pfp_image" src={pfp} alt="" />
            </div>
        </header>
    )
}
export default Header;