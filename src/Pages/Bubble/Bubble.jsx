import React, { createRef, useEffect, useRef } from "react";
import "./Bubble.scss";
import Program from "../../components/Program/Program";
import Logs from "../../components/Logs/Logs";
import Chart from "../../components/Chart/Chart";
import { useDispatch, useSelector } from "react-redux";
import { playState, log as Log, programState } from "../../actions/index";

const Bubble = () => {
  const method = "Bubble Sort";
  const array = useSelector(({ arrayState }) => arrayState);
  const play = useSelector((state) => state.play);
  const speed = useSelector((state) => state.speed);
  const tileRef = useRef(array.map(() => createRef()));
  const dispatch = useDispatch();

  function swap(arr, A, B) {
    let temp = arr[A];
    arr[A] = arr[B];
    arr[B] = temp;
  }
  let activeColor = "black",
    activeColorTwo = "goldenrod",
    sortedColor = "yellowgreen",
    defaultColor = "grey";

  function swapTiles(r, A, B) {
    let currentA = r.current[A].current.style.transform
      .split("(")[1]
      .split("px")[0];
    let currentB = r.current[B].current.style.transform
      .split("(")[1]
      .split("px")[0];
    r.current[A].current.style.transform = `translateX(${
      parseInt(currentA) + 55 * (B - A)
    }px)`;
    r.current[B].current.style.transform = `translateX(${
      parseInt(currentB) - 55 * Math.abs(B - A)
    }px)`;
    let temp = r.current[A];
    r.current[A] = r.current[B];
    r.current[B] = temp;
  }
  async function delay() {
    await new Promise((res) => setTimeout(res, speed));
  }
  function changeColor(r, index, color) {
    if (r.current && r.current[index] && r.current[index].current) {
      r.current[index].current.style.backgroundColor = color;
    }
  }

  function reset(r) {
    for (let i = 0; i < r.current.length; i++) {
      r.current[i].current.style.transform = "translateX(0px)";
      r.current[i].current.style.backgroundColor = defaultColor;
    }
    return true;
  }

  async function bubbleSort(r, arr) {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        dispatch(programState(2));
        changeColor(r, j, activeColor);
        changeColor(r, j + 1, activeColorTwo);
        dispatch(Log(`comparing ${arr[j]} and ${arr[j + 1]}`));
        await delay();
        dispatch(programState(4));
        await delay();
        if (arr[j] > arr[j + 1]) {
          dispatch(programState(6));
          dispatch(Log(`${arr[j]} > ${arr[j + 1]} swapping...`));
          swap(arr, j, j + 1);
          swapTiles(r, j, j + 1);
        } else {
          dispatch(programState(2));
          dispatch(Log(`${arr[j]} <= ${arr[j + 1]} continue...`));
        }
        changeColor(r, j, defaultColor);
        changeColor(
          r,
          j + 1,
          j === arr.length - i - 2 ? sortedColor : defaultColor
        );
        await delay();
      }
      dispatch(programState(0));
      await delay();
    }
    changeColor(r, 0, sortedColor);
    dispatch(playState(false));
    dispatch(Log(`${arr} is the sorted array`));
    dispatch(programState(9));
    // callback();
  }

  useEffect(() => {
    if (tileRef.current[0].current) {
      if (play) {
        // reset
        reset(tileRef);
        bubbleSort(tileRef, [...array]);
      }
    }
  }, [tileRef, play]);

  return (
    <div className="bubble">
      <div className="box box1">
        <Chart tileRef={tileRef} />
      </div>
      <div className="box box2">
        <Logs method={method} />
      </div>
      <div className="box box3">
        <Program method={method} />
      </div>
    </div>
  );
};

export default Bubble;
