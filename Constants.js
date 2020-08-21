// snack
var SNACKCELLWIDTH  = 25;
var SNACKCELLHeight = 25;
var LASTPRESSEDKEY  = "none";
var SNACKHEADCOLOR = "yellow";
var SNACKBODYCOLOR = 'red';


// food 
var FOODCELLWIDTH  = 25;
var FOODCELLHeight = 25;
var APPLESCOREGAIN = 5;
// global variables
var canvas = document.getElementById("can");
var ctx = canvas.getContext("2d");

var scoreLabel = document.getElementById("score");
var levelLabel = document.getElementById("level");

// style the canvas 
canvas.width = window.innerWidth - 20;
canvas.height = window.innerHeight - 60;




// images paths 
APPLEIMAGEPATH = "./Images/apple.png";
MYFACEIMAGEPATH  = "";

