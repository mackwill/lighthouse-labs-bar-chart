

# Lighthouse Labs Bar Chart Project

## About
This is an HTML/CSS/JavaScript project that produces either a single or stacked bar chart based on user input. This project is created as part of the prep work for the Lighthouse Labs boot camp.

## Examples of Project In Use
Basic bar chart:

![Basic bar chart example](https://github.com/mackwill/lighthouse-labs-bar-chart/blob/master/singleBarChartExample.png)

Stacked bar chart:

![Stacked bar chart example](https://github.com/mackwill/lighthouse-labs-bar-chart/blob/master/stackedBarChartExample.png)
## Main Function

The main function of this project is the *drawBarChart(data, options, element)* function.
This function takes in three arguments:
* data: Takes a multi-dimensional array as an argument in the form of *[[xLabel1, yValue1, yValue2], [xLabel2, yValue1]]*
* options: Takes an object of options required to draw the graph, and an object of options is required each for the graph and the bar. It is in the following format:
	* {graph : {...}, bar: {...}}
* With the current version, it is recommended that all inputs are provided. The following is a full list of options:
	* Graph: width , height, title, titleColor, titleSize, yTickSpacing
	* Bar: backgroundColor, xAxisLabel, labelColor, labelSize, dataLabelPos, barSpacing, barShadow
* element: Takes an html element (i.e div, h1, p) as a string that the user would like to render the graph

Here is an example call of the function:
drawBarChart( [["May", 21.4], ["June", 30.0],  ["July", 33.0], ["August", 31.2], ["September", 29], ["October", 19.3], ["November", 10.5]],
{
graph: {
width:  600,
height:  500,
title:  "Average Monthly Temperature 2019",
titleColor:  "red",
titleSize:  20,
yTickSpacing:  5,
},
bar: {
backgroundColor: ["#3368FF", "#ff0000", "purple", "blue", "yellow", "red"],
xAxisLabel:  "Month",
labelColor:  "black",
labelSize:  16,
dataLabelPos:  "mid",
barSpacing:  10,
barShadow: "yes",
},
},
"div"
);

## What This Project Supports
This project supports the creation of a customizable bar chart graph or stacked bar chart graph based on user input (i.e graph height/width, inputted data).
Currently supported customizable options:
* Graph height/width
* Individual bar colour
* Bar spacing
* Y-axis tick spacing
* X-axis label size/colour
* X-axis data label position (top, middle, bottom of bar)
* Title size/colour 

## Known Issues
* If the x-axis labels are too long and the bars are spaced too close together, then the x-axis labels become too crowded and will overlay each other to maintain their position.
* The font size for the data labels is not customizable yet, so if a data point is much smaller than the others (i.e data point of 2 when the maximum of the data set is 50) the data labels will overcrowd the bar 
* If the user wants to plot a basic bar chart but inputs an array of colours for a single data point, then that bar element will have no colour background.

## Future Implementations
* Add a y-axis label
* Combining createSingleBar and createMultiBar into a single function to simplify code
* Change the random colour generator to create a gradient of similar colours for the stacked bar chart option
* Transferring library to React framework
* Improving the processing of the options to more automate the assignment of CSS properties
* Allow the user to choose if they want to rotate the x-axis label text
* Rotate the x-axis text automatically if the labels get too close to each other
* General code structure clean-up

### External Resources
[https://api.jquery.com/](https://api.jquery.com/)
