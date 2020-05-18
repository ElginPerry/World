import React, { useEffect, useState } from "react";



function CountdownTimer(props) {
  const calculateTimeLeft = () => {
    // const difference = +new Date("2020-05-17 09:32:30") - +new Date();   
    const difference = +props.Date - +new Date();
    //console.log(difference);
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        d: Math.floor(difference / (1000 * 60 * 60 * 24)),
        h: Math.floor((difference / (1000 * 60 * 60)) % 24),
        m: Math.floor((difference / 1000 / 60) % 60),
        s: Math.floor((difference / 1000) % 60)
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    if (timeLeft)
    {
        setTimeout(() => {
        setTimeLeft(calculateTimeLeft());
        }, 1000);
    }
  });

  function Displaytime(timeLeft)
  {
    var dt = `${props.item}- ${timeLeft.d > 0 ? 'd:' + timeLeft.d + ' ' : ''}${timeLeft.h > 0 ? 'h:' + timeLeft.h + ' ' : ''}
    ${timeLeft.m > 0 ? 'm:' + timeLeft.m + ' ' : ''}${timeLeft.s ? 's:' + timeLeft.s + ' ' : ' s:0'}`    
    return dt;
  }

  return (
    <div>
      {console.log(props.item + ':' + timeLeft.s)}
      {timeLeft.s > 0 ? Displaytime(timeLeft, props.item) 
      : props.timeUp(props.item)}      
    </div>
  );
}

export default CountdownTimer;