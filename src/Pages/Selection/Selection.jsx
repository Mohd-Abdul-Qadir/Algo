import React, { createRef, useEffect, useRef } from "react";
import Chart from "../../components/Chart/Chart";
import Logs from "../../components/Logs/Logs";
import Program from "../../components/Program/Program";
import { useDispatch, useSelector } from "react-redux";

import { playState, log as Log, programState } from "../../actions/index";

const Selection = () => {
  const method = "Selection Sort";
  const array = useSelector(({ arrayState }) => arrayState);
  const play = useSelector((state) => state.play);
  const dispatch = useDispatch();
  const speed = useSelector((state) => state.speed);
  const tileRef = useRef(array.map(() => createRef()));

  function swap(arr, A, B) {
    let temp = arr[A];
    arr[A] = arr[B];
    arr[B] = temp;
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

  async function delay() {
    await new Promise((res) => setTimeout(res, speed));
  }

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
  // const delay = () => new Promise((r) => setTimeout(r, 500));

  let activeColor = "black",
    activeColorTwo = "goldenrod",
    sortedColor = "yellowgreen",
    defaultColor = "grey";

  // function changeColor(r, index, color) {
  //   r.current[index].current.style.backgroundColor = color;
  // }

  // async function selectionSort(r, arr) {
  //   for (let i = 0; i < arr.length - 1; i++) {
  //     dispatch(programState(2));
  //     let min = i;
  //     dispatch(Log(`let min = ${arr[min]}`));
  //     await delay();
  //     for (let j = i + 1; j < arr.length; j++) {
  //       dispatch(programState(3));
  //       changeColor(r, j, activeColorTwo);
  //       changeColor(r, min, activeColor);
  //       dispatch(Log(`compare ${arr[min]} and ${arr[j]}`));
  //       await delay();
  //       dispatch(programState(5));
  //       await delay();
  //       if (arr[j] < arr[min]) {
  //         dispatch(programState(7));
  //         dispatch(Log(`${arr[j]} < ${arr[min]}. So min = ${arr[j]}`));
  //         changeColor(r, min, defaultColor);
  //         min = j;
  //         changeColor(r, min, activeColor);
  //         await delay();
  //       } else {
  //         dispatch(programState(3));
  //         dispatch(Log(`${arr[j]} >= ${arr[min]}. Continue..`));
  //         changeColor(r, j, defaultColor);
  //         await delay();
  //       }
  //     }
  //     if (arr[min] === arr[i]) {
  //       changeColor(r, i, sortedColor);
  //       await delay();
  //       continue;
  //     }
  //     dispatch(programState(9));
  //     dispatch(Log(`Swap ${arr[i]} and ${arr[min]}`));
  //     swap(arr, i, min);
  //     swapTiles(r, i, min);
  //     await delay();
  //     changeColor(r, i, sortedColor);
  //     dispatch(programState(0));
  //     await delay();
  //   }
  //   dispatch(programState(11));
  //   changeColor(r, arr.length - 1, sortedColor);
  //   // callback();
  // }

  async function selectionSort(r, arr, callback) {
    for (let i = 0; i < arr.length - 1; i++) {
      dispatch(programState(2));
      let min = i;
      dispatch(Log(`let min = ${arr[min]}`));
      await delay();
      for (let j = i + 1; j < arr.length; j++) {
        dispatch(programState(3));
        changeColor(r, j, activeColorTwo);
        changeColor(r, min, activeColor);
        dispatch(Log(`compare ${arr[min]} and ${arr[j]}`));
        await delay();
        dispatch(programState(5));
        await delay();
        if (arr[j] < arr[min]) {
          dispatch(programState(7));
          dispatch(Log(`${arr[j]} < ${arr[min]}. So min = ${arr[j]}`));
          changeColor(r, min, defaultColor);
          min = j;
          changeColor(r, min, activeColor);
          await delay();
        } else {
          dispatch(programState(3));
          dispatch(Log(`${arr[j]} >= ${arr[min]}. Continue..`));
          changeColor(r, j, defaultColor);
          await delay();
        }
      }
      if (arr[min] === arr[i]) {
        changeColor(r, i, sortedColor);
        await delay();
        continue;
      }
      dispatch(programState(9));
      dispatch(Log(`Swap ${arr[i]} and ${arr[min]}`));
      swap(arr, i, min);
      swapTiles(r, i, min);
      await delay();
      changeColor(r, i, sortedColor);
      dispatch(programState(0));
      await delay();
    }
    dispatch(programState(11));
    changeColor(r, arr.length - 1, sortedColor);
    callback();
  }
  useEffect(() => {
    if (tileRef.current[0].current) {
      if (play) {
        reset(tileRef);
        selectionSort(tileRef, [...array]);
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

export default Selection;
