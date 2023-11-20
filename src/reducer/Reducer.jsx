export const log = (state = "Logger attatched", action) => {
  switch (action.type) {
    case "write":
      return action.value;
    default:
      return state;
  }
};

export const play = (state = false, action) => {
  switch (action.type) {
    case "play":
      return action.value;
    default:
      return state;
  }
};

export const nav = (state = false, action) => {
  switch (action.type) {
    case "nav":
      return action.value;
    default:
      return state;
  }
};
export const programState = (state = 0, action) => {
  switch (action.type) {
    case "pLine":
      return action.value;
    default:
      return state;
  }
};
export const arrayState = (state = [40, 60, 20, 10, 7, 35], action) => {
  switch (action.type) {
    case "arrayState":
      return action.value;
    default:
      return state;
  }
};
export const speed = (state = 500, action) => {
  switch (action.type) {
    case "speed":
      return action.value;
    default:
      return state;
  }
};
