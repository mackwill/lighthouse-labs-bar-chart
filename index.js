//const jquery = require("jquery");

// let data = [
//   ["May", 18],
//   ["June", 10],
//   ["July", 15],
// ];

// let options = {
//   width: 50,
//   height: 350,
//   // color: "red",
//   // textColor: "white",
//   // labels: ["xVals", "yVals"]
// };

const drawBarChart = function (data) {
  //Take the options and create in-line css or stylesheet css

  //take the data

  let options = {
    width: 50,
    height: 350,
    // color: "red",
    // textColor: "white",
    // labels: ["xVals", "yVals"]
  };

  let xVal = null;
  let yVal = null;
  let barWidth = options.width / data.length;
  let i = 0;

  for (let elem in data) {
    xVal = data[elem][0];
    yVal = data[elem][1];
    let backgroundColor = "";
    i % 2 === 0 ? (backgroundColor = "red") : (backgroundColor = "green");

    let tmp = document.createElement("div");
    tmp.setAttribute("id", xVal);
    console.log("xVal:", xVal);

    tmp.style.height = yVal / options.height + "px";
    console.log("height: ", yVal / options.height + "px");
    tmp.style.width = options.width / data.length + "px";
    console.log("width:" + options.width / data.length + "px");
    tmp.style.margin = "10px";
    tmp.style.backgroundColor = backgroundColor;

    //tmp.innerText = xVal
    $(".graph").before(tmp);
    i++;
  }
};

// export default drawBarChart();
