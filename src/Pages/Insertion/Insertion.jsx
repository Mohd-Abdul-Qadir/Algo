import React, { createRef, useEffect, useRef } from "react";
import Chart from "../../components/Chart/Chart";
import Logs from "../../components/Logs/Logs";
import Program from "../../components/Program/Program";
import { useDispatch, useSelector } from "react-redux";
import { playState, log as Log, programState } from "../../actions/index";

const Insertion = () => {
  const method = "Insertion Sort";
  const array = useSelector(({ arrayState }) => arrayState);
  const play = useSelector((state) => state.play);
  const speed = useSelector((state) => state.speed);

  const dispatch = useDispatch();
  const tileRef = useRef(array.map(() => createRef()));
  function swap(arr, A, B) {
    let temp = arr[A];
    arr[A] = arr[B];
    arr[B] = temp;
  }
  let activeColor = "black",
    activeColorTwo = "goldenrod",
    sortedColor = "yellowgreen",
    defaultColor = "grey";

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
  // const delay = () => new Promise((r) => setTimeout(r, 500));

  // function changeColor(r, index, color) {
  //   r.current[index].current.style.backgroundColor = color;
  // }

  function changeColor(r, index, color) {
    if (r.current && r.current[index] && r.current[index].current) {
      r.current[index].current.style.backgroundColor = color;
    }
  }

  async function insertionSort(r, arr) {
    for (let i = 1; i < arr.length; i++) {
      for (let j = i - 1; j >= 0; j--) {
        dispatch(programState(2));
        changeColor(r, j, activeColor);
        changeColor(r, j + 1, activeColorTwo);
        await delay();
        dispatch(programState(4));
        await delay();
        dispatch(Log(`comparing ${arr[j + 1]} and ${arr[j]}`));
        if (arr[j + 1] < arr[j]) {
          dispatch(programState(6));
          dispatch(Log(`${arr[j + 1]} < ${arr[j]} swapping...`));
          swap(arr, j, j + 1);
          swapTiles(r, j, j + 1);
          changeColor(r, j, sortedColor);
          changeColor(r, j + 1, sortedColor);
          await delay();
        } else {
          dispatch(programState(8));
          dispatch(Log(`${arr[j + 1]} >= ${arr[j]} break...`));
          changeColor(r, j, sortedColor);
          changeColor(r, j + 1, sortedColor);
          await delay();
          break;
        }
      }
      // dispatch(programState(0));
      await delay();
    }
    dispatch(programState(10));
    dispatch(Log(`${arr} is the sorted array`));
    // callback();
  }

  useEffect(() => {
    if (tileRef.current[0].current) {
      if (play) {
        reset(tileRef);

        insertionSort(tileRef, [...array]);
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

export default Insertion;
