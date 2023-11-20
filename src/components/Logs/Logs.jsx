import React, { useEffect, useState } from "react";
import "./Logs.scss";
import { useSelector } from "react-redux";

const Logs = ({ method }) => {
  const logMessage = useSelector((state) => state.log);
  const state = useSelector((state) => state.play);

  const [logs, setLogs] = useState([logMessage]);
  useEffect(() => {
    setLogs([...logs, logMessage]);
    let LogScreen = document.getElementById("logscreen");
    LogScreen.scrollTo({ top: LogScreen.scrollHeight, behavior: "smooth" });
  }, [logMessage, state]);

  useEffect(() => {
    state && setLogs(["is mounted"]);
  }, [state]);

  useEffect(() => {
    setLogs(["is mounted"]);
  }, [method]);
  return (
    <div className="logs">
      <h3 className="logs-heading">Logs Tracer</h3>
      <hr />
      <div className="log-tracer row">
        <div
          className="program"
          id="logscreen"
          style={{
            overflowY: "auto",
            display: "flex",
            alignItems: "flex-start",
            flexDirection: "column",
            width: "770px",
            height: "349px",
          }}
        >
          {logs.map((v, k) => {
            return (
              <div>
                <div key={k}>
                  <span style={{ color: "blue" }}>@{method}</span>
                  <span> {v}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Logs;
