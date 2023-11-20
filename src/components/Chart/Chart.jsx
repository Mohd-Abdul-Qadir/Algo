import React from "react";
import "./Chart.scss";
import { useSelector } from "react-redux";

const Chart = (props) => {
  const array = useSelector((state) => state.arrayState);

  return (
    <div className="chart">
      <h3 className="chart-heading"> Chart Tracer</h3>
      <hr />
      <div className="tile-container">
        {array.map((c, i) => {
          return (
            <div className="tile-main" key={i * 3.5}>
              <div
                className="tile"
                ref={props.tileRef.current[i]}
                style={{ height: c * 3, transform: "translateX(0px)" }}
              >
                {c}
              </div>
              <p className="indx">{i}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Chart;
