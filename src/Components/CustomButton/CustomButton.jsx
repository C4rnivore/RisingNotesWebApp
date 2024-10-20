import { useEffect, useState } from "react";
import ok from '../../Images/controller/ok.svg';
import refresh from '../../Images/controller/refresh.svg';
import './CustomButton.css';
import { BsCloudArrowUp } from "react-icons/bs";

function CustomButton({func, text, icon, success, errorText='Повторите попытку'}) {
    const [verifiedText, setText] = useState(text);
    const [isSent, setIsSent] = useState(false);
    const [isSending, setIsSending] = useState(false);

    async function handleFunc() {
        setIsSending(true);
        try {
            await func();
            setText(success);
            setIsSent(true);
            setIsSending(false);
        }
        catch (err) {
            setIsSent(false);
            setIsSending(false);
            setText(errorText);
        }
    }

    return (
        <button className={`custom-button ${isSent ? 'sent' : ''}`}
            onClick={() => handleFunc()}>
            {isSending ? 
                <img draggable='false' alt='loading' src={refresh} className='loading'/> : 
                <></>
            }
            {!isSending && icon ? 
                <img draggable='false' alt='icon' src={isSent ? ok : icon}/> : <></>}
            {verifiedText}
        </button>
    )
}

export default CustomButton;