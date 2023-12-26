import { useEffect, useState } from "react"


function CheckBoxInstall(props){
    // const [expContent, setExpContent] = useState('Disabled')

    // function passToParent(filterId, filterValue){
    //     props.function(filterId, filterValue)
    // }

    // useEffect(()=>{
    //     passToParent(props.id, {"explicit" : expContent})
    // },[expContent])


    // const handleCheckboxChange = (id) =>{
    //     const cb = document.getElementById(id);
    //     if(cb.checked)
    //         id === 'explicit' ? setExpContent('Enabled')
    //     else
    //         id === 'explicit' ? setExpContent('Disabled') 
    // }

    return(
        <div className="text-checkbox">
            {/* <input type="checkbox" className='checkbox-button' id="explicit" onChange={e=>handleCheckboxChange('explicit')}/> */}
            <label className='label-checkbox'>Ненормативная лексика</label>
        </div>
    )
}

export default CheckBoxInstall