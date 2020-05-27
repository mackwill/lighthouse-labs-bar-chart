const createGraphTitle = function (title, textColor, textSize) {
  let tmp = document.createElement("h1");
  tmp.setAttribute("class", "title");
  tmp.style.fontSize = textSize + "px";
  tmp.style.color = textColor;
  tmp.innerText = title;

  $("#graph").append(tmp);
};

const findYMax = function (data, height) {
  let yData = [];
  for (let elem in data) {
    yData.push(data[elem][1]);
  }

  return height / Math.max(...yData);
};

const xLabel = function (xVal, labelSize, labelColor) {
  let tmp = document.createElement("p");
  tmp.setAttribute("class", xVal + " xLabel");
  tmp.style.fontSize = labelSize;
  tmp.style.color = labelColor;

  tmp.innerText = xVal;
  $("#" + xVal).append(tmp);
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

// const defineBarColor = function(backgroundColor) {
//   for (let i = 0; i < )
// }

const createBarElement = function (xVal, yVal, barColor, yScale) {
  if (barColor === undefined) {
    barColor = "#FF8D33";
  }

  let tmp = document.createElement("div");
  tmp.setAttribute("id", xVal);
  tmp.setAttribute("class", xVal + " bar");

  tmp.style.height = yVal * yScale * 0.8 + "px";
  tmp.style.backgroundColor = barColor;
  tmp.innerText = yVal;

  $("#graph").append(tmp);
};

const drawBarChart = function (data, options) {
  let i = 0;

  let graphOpts = options.graph;
  let barOpts = options.bar;
  let barColor = "";

  let yScale = findYMax(data, graphOpts.height);

  createChart(graphOpts.width, graphOpts.height);
  createGraphTitle(graphOpts.title, graphOpts.titleColor, graphOpts.titleSize);

  for (let elem in data) {
    if (
      Array.isArray(barOpts.backgroundColor) &&
      typeof barOpts.backgroundColor[elem] !== "undefined"
    ) {
      barColor = barOpts.backgroundColor[elem];
    } else if (typeof barOpts.backgroundColor[elem] === "undefined") {
      barColor = undefined;
    } else {
      barColor = barOpts.backgroundColor;
    }

    // Create bar element
    createBarElement(data[elem][0], data[elem][1], barColor, yScale);

    //Create x-axis labels
    xLabel(data[elem][0], barOpts.labelSize, barOpts.labelColor);

    // Create parent div element for bar and x-axis label
    $("." + data[elem][0]).wrapAll(function () {
      return `<div class="${data[elem][0]} container
              id=${data[elem][0]}-wrapper"
              style="width: ${(graphOpts.width / data.length) * 0.7}px"></div>`;
    });

    i++;
  }
  $(".container").wrapAll('<div class="bars"></div>');

  // data.map((elem) => {
  //   console.log("data.map elem: ", elem);
  //   let tmp = document.createElement("div");
  //   tmp.setAttribute("id", elem[0]);
  //   tmp.setAttribute("class", elem[0] + " bar");

  //   createBarElement(tmp, elem[0], elem[1], i, options, yScale);
  //   xLabel(elem[0]);

  //   $("." + elem[0]).wrapAll(function () {
  //     return `<div class="${elem[0]} container
  //             id=${elem[0]}-wrapper"
  //             style="width: ${(options.width / data.length) * 0.7}px"></div>`;
  //   });

  //   i++;
  // });
};
