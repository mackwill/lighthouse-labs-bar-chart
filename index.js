const createBarElement = function (newElem, xVal, yVal, i, options) {
  let backgroundColor = "";
  i % 2 === 0 ? (backgroundColor = "red") : (backgroundColor = "green");

  newElem.style.height = (yVal / options.height) * options.height + "px";
  console.log("height: ", (yVal / options.height) * options.height + "px");
  newElem.style.width = options.width / data.length + "px";
  console.log("width:" + options.width / data.length + "px");
  newElem.style.margin = "10px";
  newElem.style.backgroundColor = backgroundColor;

  newElem.innerText = xVal;
  $(".graph").before(newElem);
  i++;
};

const drawBarChart = function (data, options) {
  let i = 0;

  for (let elem in data) {
    let tmp = document.createElement("div");
    tmp.setAttribute("id", data[elem][0]);

    createBarElement(tmp, data[elem][0], data[elem][1], i, options);
    i++;
  }
};
