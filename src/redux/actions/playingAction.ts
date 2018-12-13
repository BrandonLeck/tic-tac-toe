export const CHECK = "CHECK";

export const addCheck = (position: number) => ({
  type: CHECK,
  payload: {
    position
  }
});
