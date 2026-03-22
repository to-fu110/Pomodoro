"use client";

import { useState, useEffect } from "react";
import "./pomodoro.css";

export default function Clockapp() {

  const [time, setTime] = useState(1*1);
  const [isActive, setIsActive] =  useState(false);
  const [mode,setMode] = useState<"work" | "break">("work");

  useEffect(() => {
    let timeId: any;
    if(isActive && time > 0){
      timeId =setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      },1000);

      const min = Math.floor(time / 60);
      const sec = (time % 60).toString().padStart(2,"0");
      const status = mode === "work" ? "💻": "☕";
      document.title = `${status} ${min}:${sec} - Pomodoro`

    }else if(time === 0) {
      setIsActive(false);

      if(mode === "work"){
        setMode("break");
        alert("時間です！休憩しましょう。");
        setTime(5*60)
      }else{
        setMode("work");
        alert("時間です！勉強を再開しましょう。");
        setTime(25*60);
      }
      setIsActive(true);
    };

    return () => {
        clearInterval(timeId);
    };
  },[isActive, time, mode]);


  return(
    <div className={`container ${mode === "work" ? "iswrk" : "isbrk"}`}>
      <h1>ポモドーロタイマー</h1>
      <button
        className="stp-stt"
        onClick={() => setIsActive(!isActive)}
      >
        {isActive ? "ストップ" : "スタート"}
      </button>

      <button
        className="reset"
        onClick={() => {setIsActive(false); 
          setTime(25*60);
          setIsActive(false);
          setMode("work");
        }}
      >
        リセット
      </button>

      <p>{Math.floor(time/60)}:{(time%60).toString().padStart(2,"0")}</p>
    </div>
  );

}