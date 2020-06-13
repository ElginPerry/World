import React, { useEffect, useState } from "react";
import windim from "../WindowDimensions";

function BuildTimer(props) {
 
  const [date, setDate] = useState(new Date());
  const [buildingName, setbuildingName] = useState('');
  const [finishTick, setFinishTick] = useState(false);
  const { width } = windim();
  const [timeLeft, setTimeLeft] = useState(null);  


  useEffect(() => {  
    setDate(props.Date); 
  }, [props.Date]);

  useEffect(() => {
    setbuildingName(props.buildingName);
  }, [props.buildingName]);

  useEffect(() => {
    setTimeLeft(calculateTimeLeft());
  },[date]);

  const calculateTimeLeft = () => {  
    const difference = +date - +new Date();
    let timeLeftchk = null;
    if (difference > 0) {
        timeLeftchk = {
          d: Math.floor(difference / (1000 * 60 * 60 * 24)),
          h: Math.floor((difference / (1000 * 60 * 60)) % 24),
          m: Math.floor((difference / 1000 / 60) % 60),
          s: Math.floor((difference / 1000) % 60)
        };
    }
    else if (timeLeft)
    {
      if (!finishTick)
        setFinishTick(true);
    } 
    return timeLeftchk;
  };    
  
  useEffect(() => {
    if (timeLeft)
    {
        setTimeout(() => {
        setTimeLeft(calculateTimeLeft());
        }, 1000);
     }
  },[timeLeft]);

  useEffect(() => {
    if (finishTick)
    {
      finish(buildingName);
    }
  },[finishTick]);

  function finish(item)
  {
      props.timeUp(item); 
      setFinishTick(false)
  }

  function pad(num) {
    var s = num+"";
    while (s.length < 2) s = "0" + s;
    return s;
  }

  function Displaytime(timeLeft)
  {  
      var tt = (timeLeft.d > 0 ? timeLeft.d + ':' : '')+
      (timeLeft.h > 0 ? pad(timeLeft.h) + ':' : '00:')+
      (timeLeft.m > 0 ? pad(timeLeft.m) + ':' : '00:')+
      (timeLeft.s > 0 ? pad(timeLeft.s) : '00');
      return tt;
  }

  return (
    <div>
      <div style={{textAlign: "center", width:"45%", display: "inline-block", fontSize: width>450 ? "12px" : "10px"}}>    
          {buildingName}
      </div>
      <div style={{textAlign: "right", width:"55%", maxWidth:"200px", display: "inline-block", paddingLeft: "5px", fontSize: width>450 ? "14px" : "12px", border: "1px solid blue",paddingRight: "10px" }}>    
          {timeLeft? Displaytime(timeLeft, props.item) 
            : <div /> 
          }  
      </div> 
    </div>
  );
}

export default BuildTimer;