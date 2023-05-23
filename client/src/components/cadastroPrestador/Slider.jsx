import { useState } from 'react';
// import '../../index.css';

function Slider(props) {
    const [value, setValue] = useState(50);

    const handleSliderChange = (e) => {
        setValue(e.target.value);
    };


    return (
        <div className=" flex flex-row">
            <div className="mt-4 text-center">{value}</div>
            <input
                type="range"
                min={0}
                max={100}
                step={1}
                value={value}
                onChange={handleSliderChange}
                className="slider"
            />
            <div className="mt-4 text-center">{value}</div>
        </div>
        
    );
}

export default Slider;