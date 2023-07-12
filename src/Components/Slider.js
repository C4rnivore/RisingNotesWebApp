import React from 'react';

class Slider extends React.Component {
    render() {
        function switchState() {

        }
        return (
            <label className="switch">
                <input type="checkbox"/>
                <span className="slider round" onClick={switchState}></span>
            </label>
        )
    }
}

export default Slider