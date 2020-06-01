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
  let numOfTicks = graphHeight / tickSpacing;

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
  $(".tick").wrapAll('<div id="tickMarks" class="container"></div>');
  document.getElementById("tickMarks").style.height = 0 + "px";
};

const checkTotalBarWidth = function (className, graphWidth) {
  let children = document.getElementById(className).children;
  let totalWdith = 0;

  for (let i = 0; i < children.length; i++) {
    // console.log(children[i].clientWidth);
    console.log(children[i]);
    totalWdith += children[i].clientWidth;
    totalWdith += parseInt(children[i].style.marginLeft);
    totalWdith += parseInt(children[i].style.marginRight);
  }

  console.log("checkTotalBarWidth: ", totalWdith, totalWdith > graphWidth);
  return totalWdith > graphWidth;
};

const modifyElementMargin = function (spacing, className) {
  $("." + className).css({
    "margin-left": spacing + "px",
    "margin-right": spacing + "px",
  });
};

const labelXData = function (xVal, barOpts, barWidth) {
  let tmp = document.createElement("p");
  tmp.setAttribute("class", xVal + " xLabel");
  tmp.style.marginLeft = barOpts.barSpacing + "px";
  tmp.style.marginRight = barOpts.barSpacing + "px";
  tmp.style.width = barWidth + "px";
  tmp.style.fontSize = barOpts.labelSize + "px";
  tmp.style.color = barOpts.labelColor;

  tmp.innerText = xVal;
  $("#graph").append(tmp);
};

const labelXAxis = function (barOpts) {
  let tmp = document.createElement("h1");
  tmp.setAttribute("class", "xAxisLabel");
  tmp.style.fontSize = barOpts.labelSize + "px";
  tmp.innerText = barOpts.xAxisLabel;
  $(".xLabels").after(tmp);
};

const createChart = function (width, height, border = "0.5px solid grey") {
  let tmp = document.createElement("div");
  tmp.setAttribute("id", "graph");
  tmp.style.width = width + "px";
  tmp.style.height = height + "px";
  tmp.style.border = border;

  $("body").append(tmp);
};

const createBarElement = function (
  values,
  barColor,
  yScale,
  barWidth,
  barOpts
) {
  if (barColor === undefined) {
    barColor = "#FF8D33";
  }

  let tmp = document.createElement("div");
  tmp.setAttribute("id", values[0]);

  switch (barOpts.dataLabelPos) {
    case "top":
    case "middle":
    case "bottom":
      tmp.setAttribute("class", `${values[0]} bar ${barOpts.dataLabelPos}`);
      break;
    default:
      tmp.setAttribute("class", `${values[0]} bar middle`);
  }

  barOpts.barShadow === "yes"
    ? (tmp.style.boxShadow = "4px -3px 2px -1px rgba(0,0,0,0.75)")
    : null;

  // if (checkTotalBarWidth("bars"))
  tmp.style.marginLeft = barOpts.barSpacing + "px";
  tmp.style.marginRight = barOpts.barSpacing + "px";

  tmp.style.width = barWidth + "px";

  tmp.style.height = values[1] * yScale * 0.8 + "px";
  tmp.style.backgroundColor = barColor;
  tmp.innerText = values[1];

  // $(".bars container").append(tmp);
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
  // $("#graph").append(
  //   document.createElement("div").setAttribute("class", "bars container")
  // );

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
    createBarElement(data[elem], barColor, yScale, barWidth, barOpts);

    //Create x-axis data labels
    labelXData(data[elem][0], barOpts, barWidth);

    i++;
  }
  $(".xLabel").wrapAll('<div class="xLabels container" id="xLabels"></div>');
  $(".bar").wrapAll('<div class="bars container" id="bars"></div>');

  createYTicks($(".bars").height(), graphOpts.yTickSpacing * yScale * 0.8);
  labelXAxis(barOpts);

  // This block of code checks the width of bar elements with the inputted bar spacing against the graph width.
  // If it is greater, then the container will have the justifyContent space-around property set

  if (checkTotalBarWidth("bars", graphOpts.width)) {
    console.log("Width greater than graph");
    modifyElementMargin(0, "bar");
    modifyElementMargin(0, "xLabel");
    document.getElementById("bars").style.justifyContent = "space-around";
    document.getElementById("xLabels").style.justifyContent = "space-around";
  }
};
