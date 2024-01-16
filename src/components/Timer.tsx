import { useState, useEffect, useRef } from "react";

interface TimerPropsI {
  run: boolean;
  workBreak: number;
}

function timerFormate(seconds: number): string {
  let minute: number = (seconds - (seconds % 60)) / 60;
  let second: number = seconds % 60;
  return `${minute > 9 ? minute : "0" + minute}:${
    second > 9 ? second : "0" + second
  }`;
}

export function Timer({ run, workBreak }: TimerPropsI) {
  //in milliseconds
  const [endTime, setEndTime] = useState(0);
  const [startTime, setStartTime] = useState(0);
  //in seconds
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    console.log(run);
    //set the need values if empty
    if (!endTime || !startTime) {
      //current time timestamp
      let timestamp = new Date().getTime();
      setStartTime(timestamp);
      //set to 25 mins in the future
      setEndTime(timestamp + workBreak * 1000);
    }
    console.log(
      new Date(startTime).getHours() +
        ":" +
        new Date(startTime).getMinutes() +
        ":" +
        new Date(startTime).getSeconds()
    );
    console.log(
      new Date(endTime).getHours() +
        ":" +
        new Date(endTime).getMinutes() +
        ":" +
        new Date(endTime).getSeconds()
    );
    if (run && startTime < endTime) {
      let shiftTimeInterval = setInterval(() => {
        setStartTime(startTime + 1000);
        setTimer(timer - 1);
      }, 1000);

      return () => {
        clearInterval(shiftTimeInterval);
      };
    }
  }, [run, timer]);

  useEffect(() => {
    //current time timestamp
    let timestamp = new Date().getTime();
    setStartTime(timestamp);
    //set to 25 mins in the future
    setEndTime(timestamp + workBreak * 1000);

    setTimer(workBreak);
  }, [workBreak]);

  return (
    <div className="startTime">
      <div>{timerFormate(timer)}</div>
      <button
        onClick={() => {
          //setRun(false);
          setEndTime(endTime + 60000);
          setTimer(timer + 60);
          //setRun(true);
        }}
      >
        +
      </button>
      <button
        onClick={() => {
          //setRun(false);
          //current time timestamp
          let timestamp = new Date().getTime();
          setStartTime(timestamp);
          console.log(workBreak, timer);
          //set to 25 mins in the future
          setEndTime(timestamp + workBreak * 1000);
          setTimer(workBreak);
          //setRun(true);
        }}
      >
        Reset
      </button>
      <button
        onClick={() => {
          //setRun(false);
          setEndTime(endTime - 60000);
          setTimer(timer - 60);
          //setRun(true);
        }}
      >
        -
      </button>
    </div>
  );
}
