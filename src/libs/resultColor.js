const resultColor = (result) => {
  switch (result) {
  case "A":
    return "#ff00ff";
  case "B":
    return "#ffd700";
  case "C":
    return "#ff0000";
  case "D":
    return "#0000ff";
  default:
    return "#ffffff";
  }
};

export default resultColor;
