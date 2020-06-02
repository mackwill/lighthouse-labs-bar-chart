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
    if (data[elem].length > 2) {
      let tmp = data[elem].slice(1);
      yData.push(tmp.reduce((a, b) => a + b, 0));
    } else {
      yData.push(data[elem][1]);
    }
  }

  return height / Math.max(...yData);
};

const createYTicks = function (graphHeight, tickSpacing) {
  let numOfTicks = graphHeight / tickSpacing;
  console.log("number of ticks: ", numOfTicks);

  let tickHeight = 0;
  for (let i = 0; i <= numOfTicks; i++) {
    // i === 0
    //   ? (tickHeight = graphHeight)
    //   : (tickHeight = (graphHeight / numOfTicks) * i);
    // tickHeight = (1 - (1 / numOfTicks) * i) * graphHeight;
    tickHeight = graphHeight - (graphHeight / numOfTicks) * i;
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
    totalWdith += children[i].clientWidth;
    totalWdith += parseInt(children[i].style.marginLeft);
    totalWdith += parseInt(children[i].style.marginRight);
  }
  console.log("totalWidth > graphWidth:", totalWdith, totalWdith > graphWidth);
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

const createChart = function (
  width,
  height,
  element,
  border = "0.5px solid grey"
) {
  console.log("createChart element: ", element);
  let tmp = document.createElement(element);
  tmp.setAttribute("id", "graph");
  tmp.style.width = width + "px";
  tmp.style.height = height + "px";
  tmp.style.border = border;

  $("body").append(tmp);
};

const createSingleBar = function (values, barOpts) {
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

  $("#bars").append(tmp);
};

const stylizeBar = function (
  xVal,
  yVal,
  selectedElem,
  barOpts,
  barWidth,
  barColor,
  yScale
) {
  if (barColor === undefined) {
    barColor = "#FF8D33";
  }
  console.log("stylize bar barwidth:", xVal, barWidth);

  barOpts.barShadow === "yes"
    ? (selectedElem.style.boxShadow = "4px -3px 2px -1px rgba(0,0,0,0.75)")
    : null;

  modifyElementMargin(barOpts.barSpacing, xVal);

  $(selectedElem).css({
    height: yVal * yScale * 0.8 + "px",
    "background-color": barColor,
    width: barWidth + "px",
  });

  selectedElem.innerText = yVal;
};

const createMultiBar = function (values, barOpts, index) {
  let tmp = document.createElement("div");
  tmp.setAttribute("id", values[0] + "-" + values[index]);

  switch (barOpts.dataLabelPos) {
    case "top":
    case "middle":
    case "bottom":
      tmp.setAttribute("class", `${values[0]} bar ${barOpts.dataLabelPos}`);
      break;
    default:
      tmp.setAttribute("class", `${values[0]} bar middle`);
  }

  $("#" + values[0] + "-container").append(tmp);
};

const drawBarChart = function (data, options, element) {
  let graphOpts = options.graph;
  let barOpts = options.bar;
  let barColor = "";
  let barWidth = (graphOpts.width / data.length) * 0.7;

  let yScale = findYMax(data, graphOpts.height);

  console.log("main function element: ", element);
  createChart(graphOpts.width, graphOpts.height, element);
  createGraphTitle(graphOpts.title, graphOpts.titleColor, graphOpts.titleSize);

  $("#graph").append(
    $(document.createElement("div")).attr({
      id: "bars",
      class: "bars conrtainer",
    })
  );

  for (let elem in data) {
    console.log(data[elem]);
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

    // // Create bar element
    // createSingleBar(data[elem], barOpts);
    // stylizeBar(
    //   data[elem][0],
    //   data[elem][1],
    //   document.getElementById(data[elem][0]),
    //   barOpts,
    //   barWidth,
    //   barColor,
    //   yScale
    // );

    // Multi Bar Element

    console.log(
      "before multi element check, data[elem].length: ",
      data[elem].length
    );
    if (data[elem].length > 2) {
      $("#bars").append(
        $(document.createElement("div"))
          .attr({
            id: data[elem][0] + "-container",
            class: data[elem][0],
          })
          .css({
            display: "block",
            "margin-top": "auto",
            "margin-bottom": 0,
          })
      );

      for (let i = data[elem].length - 1; i >= 1; i--) {
        createMultiBar(data[elem], barOpts, i);
        stylizeBar(
          data[elem][0],
          data[elem][i],
          document.getElementById(data[elem][0] + "-" + data[elem][i]),
          barOpts,
          barWidth,
          barColor,
          yScale
        );
      }
    } else {
      createSingleBar(data[elem], barOpts);
      stylizeBar(
        data[elem][0],
        data[elem][1],
        document.getElementById(data[elem][0]),
        barOpts,
        barWidth,
        barColor,
        yScale
      );
    }

    //Create x-axis data labels
    labelXData(data[elem][0], barOpts, barWidth);
  }

  $(".xLabel").wrapAll('<div class="xLabels container" id="xLabels"></div>');

  createYTicks($(".bars").height(), graphOpts.yTickSpacing * yScale * 0.8);
  labelXAxis(barOpts);

  // This block of code checks the width of bar elements with the inputted bar spacing against the graph width.
  // If it is greater, then the container will have the justifyContent space-around property set

  if (checkTotalBarWidth("bars", graphOpts.width)) {
    modifyElementMargin(0, "bar");
    modifyElementMargin(0, "xLabel");
    document.getElementById("bars").style.justifyContent = "space-around";
    document.getElementById("xLabels").style.justifyContent = "space-around";
  }
};
