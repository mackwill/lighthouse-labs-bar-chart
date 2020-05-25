const createChart = function (width, height, border = "1px solid black") {
  console.log("createChart width: ", width);
  console.log("createChart height: ", height);
  let tmp = document.createElement("div");
  tmp.setAttribute("id", "graph");
  tmp.style.width = width + "px";
  tmp.style.height = height + "px";
  tmp.style.border = border;

  $("body").append(tmp);
};

const createBarElement = function (newElem, xVal, yVal, i, options) {
  let backgroundColor = "";
  i % 2 === 0 ? (backgroundColor = "red") : (backgroundColor = "green");

  newElem.style.height = (yVal / options.height) * options.height + "px";
  console.log("height: ", (yVal / options.height) * options.height + "px");
  newElem.style.width = options.width / data.length - 10 + "px";
  console.log("width:" + options.width / data.length + "px");
  newElem.style.backgroundColor = backgroundColor;

  newElem.innerText = xVal;
  $("#graph").append(newElem);
  i++;
};

const drawBarChart = function (data, options) {
  let i = 0;

  createChart(options.width, options.height);

  for (let elem in data) {
    let tmp = document.createElement("div");
    tmp.setAttribute("id", data[elem][0]);
    tmp.setAttribute("class", "bar");

    createBarElement(tmp, data[elem][0], data[elem][1], i, options);
    i++;
  }
};
