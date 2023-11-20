export const log = (v) => {
  return {
    type: "write",
    value: v,
  };
};

export const playState = (v) => {
  return {
    type: "play",
    value: v,
  };
};

export const navState = (v) => {
  return {
    type: "nav",
    value: v,
  };
};

export const programState = (v) => {
  return {
    type: "pLine",
    value: v,
  };
};
export const arrayState = (v) => {
  return {
    type: "arrayState",
    value: v,
  };
};
export const speed = (v) => {
  return {
    type: "speed",
    value: v,
  };
};
