const findYMax = function (data, height) {
  let yData = [];
  for (let elem in data) {
    yData.push(data[elem][1]);
  }

  return height / Math.max(...yData);
};

const xLabel = function (xVal) {
  let tmp = document.createElement("p");
  tmp.setAttribute("class", xVal + " xLabel");

  tmp.innerText = xVal;
  $("#" + xVal).append(tmp);

  $;
};

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

const createBarElement = function (newElem, xVal, yVal, i, options, yScale) {
  let backgroundColor = "";
  i % 2 === 0 ? (backgroundColor = "red") : (backgroundColor = "green");

  newElem.style.height = yVal * yScale * 0.8 + "px";
  //newElem.style.width = (options.width / data.length) * 0.5 + "px";
  console.log("width:" + newElem.style.width);
  newElem.style.backgroundColor = backgroundColor;

  newElem.innerText = yVal;
  $("#graph").append(newElem);
  i++;
};

const drawBarChart = function (data, options) {
  let i = 0;

  createChart(options.width, options.height);
  let yScale = findYMax(data, options.height);

  for (let elem in data) {
    let tmp = document.createElement("div");
    tmp.setAttribute("id", data[elem][0]);
    tmp.setAttribute("class", data[elem][0] + " bar");

    createBarElement(tmp, data[elem][0], data[elem][1], i, options, yScale);
    xLabel(data[elem][0]);

    $("." + data[elem][0]).wrapAll(function () {
      return `<div class="${data[elem][0]} container
              id=${data[elem][0]}-wrapper"
              style="width: ${(options.width / data.length) * 0.7}px"></div>`;
    });

    i++;
  }
};
