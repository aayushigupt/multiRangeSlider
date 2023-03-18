import React from "react";
import "./multiRangeSlider.css";


function MultiRangeSlider(props) {
  const { min, max } = props;
  const [minVal, setMinVal] = React.useState(min);
  const [maxVal, setMaxVal] = React.useState(max);

  const minRef = React.useRef(null);
  const maxRef = React.useRef(null);
  const rangeRef = React.useRef(null);

  const getPercent = (value) => {
    return Math.round((value - min)/(max-min) * 100)
  }

  React.useEffect(() => {
    if(maxRef.current) { 
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(+maxRef.current.value);

      if(rangeRef.current) {
        console.log("hitting min val")
        rangeRef.current.style.left = `${minPercent}%`;
        rangeRef.current.style.width = `${maxPercent - minPercent}%`
      }
    }
  }, [minVal, getPercent])

  React.useEffect(() => {
    if(minRef.current) {
      const maxPercent = getPercent(maxVal);
      const minPercent = getPercent(+minRef.current.value);

      if(rangeRef.current) {
        rangeRef.current.style.width = `${maxPercent - minPercent}%`;
        // rangeRef.current.style.right = `${maxPercent}%`
      }
    }
  }, [maxVal, getPercent])

  const minLimitCond = minVal > max - 100;
  return (
    <div>
      <input
        type="range"
        min={min}
        max={max}
        value={minVal}
        className={`range-slider-1 thumb ${minLimitCond ? "zIndex-5" : ""}`}
        ref={minRef}
        onChange={(event) => {
            const val = Math.min(+event.target.value, maxVal-1)
            setMinVal(val)
            event.target.value = val.toString()
        }}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={maxVal}
        className="range-slider-2 thumb"
        ref={maxRef}
        onChange={(event) => {
            const val = Math.max(+event.target.value, minVal + 1)
            setMaxVal(val)
            event.target.value = val.toString()
        }}
      />
      <div className="range--slider">
        <div className="slider--track"> </div>
        <div ref={rangeRef} className="slider--range"> </div>
      </div>
    </div>
  );
}

export default MultiRangeSlider;
