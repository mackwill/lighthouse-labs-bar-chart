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

const createYTicks = function (graphHeight, tickSpacing) {
  let numOfTicks = Math.floor(graphHeight / tickSpacing);

  let tickHeight = 0;
  for (let i = 0; i <= numOfTicks; i++) {
    i === 0
      ? (tickHeight = graphHeight)
      : (tickHeight = (1 - (1 / numOfTicks) * i) * graphHeight);

    let tmp = document.createElement("div");
    tmp.setAttribute("class", "tick");
    tmp.style.position = "relative";
    tmp.style.border = "0.5px solid grey";
    tmp.style.top = tickHeight + "px";
    tmp.style.zIndex = 50;
    $(".bars").before(tmp);
  }
  $(".tick").wrapAll('<div id="tickMarks"></div>');
  document.getElementById("tickMarks").style.height = 0 + "px";
};

const xLabel = function (xVal, labelSize, labelColor, barWidth) {
  let tmp = document.createElement("p");
  tmp.setAttribute("class", xVal + " xLabel");
  tmp.style.width = barWidth + "px";
  tmp.style.fontSize = labelSize + "px";
  tmp.style.color = labelColor;

  tmp.innerText = xVal;
  $("#graph").append(tmp);
};

const createChart = function (width, height, border = "1px solid black") {
  let tmp = document.createElement("div");
  tmp.setAttribute("id", "graph");
  tmp.style.width = width + "px";
  tmp.style.height = height + "px";
  tmp.style.border = border;

  $("body").append(tmp);
};

const createBarElement = function (
  xVal,
  yVal,
  barColor,
  yScale,
  barWidth,
  barOpts
) {
  if (barColor === undefined) {
    barColor = "#FF8D33";
  }

  let tmp = document.createElement("div");
  tmp.setAttribute("id", xVal);

  switch (barOpts.dataLabelPos) {
    case "top":
    case "middle":
    case "bottom":
      tmp.setAttribute("class", `${xVal} bar ${barOpts.dataLabelPos}`);
      break;
    default:
      tmp.setAttribute("class", `${xVal} bar middle`);
  }

  tmp.style.width = barWidth + "px";
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
  let barWidth = (graphOpts.width / data.length) * 0.7;

  let yScale = findYMax(data, graphOpts.height);
  console.log(`yScale: ${yScale}`);

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
    createBarElement(
      data[elem][0],
      data[elem][1],
      barColor,
      yScale,
      barWidth,
      barOpts
    );

    //Create x-axis labels
    xLabel(data[elem][0], barOpts.labelSize, barOpts.labelColor, barWidth);

    i++;
  }
  $(".xLabel").wrapAll('<div class="xLabels container"></div>');
  $(".bar").wrapAll('<div class="bars container"></div>');

  createYTicks($(".bars").height(), graphOpts.yTickSpacing * yScale * 0.8);

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
