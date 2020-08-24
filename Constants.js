// snack
var SNACKCELLWIDTH  = 25;
var SNACKCELLHeight = 25;
var LASTPRESSEDKEY  = "none";
var SNACKHEADCOLOR = "yellow";
var SNACKBODYCOLOR = 'red';


// food
/*
this width and height garantee that 
the food will not be too close to the border
as if so the snack will not be able to reach it
*/
var FOODCELLWIDTH  = 60;
var FOODCELLHeight = 60;
var APPLESCOREGAIN = 5;
var WINNINGSCORE = 5;

// global variables
// canvas 
var canvas = document.getElementById("can");
var ctx = canvas.getContext("2d");

// game state trackers
var scoreLabel = document.getElementById("score");
var levelLabel = document.getElementById("level");
var snackLength = document.getElementById('snack_length');
var wrapBorders = document.getElementById('wrap_borders');

// style the canvas 
canvas.width = parseInt((window.innerWidth - 20) / SNACKCELLWIDTH )
                         * SNACKCELLWIDTH;
canvas.height = parseInt((window.innerHeight - 60) / SNACKCELLHeight) 
                         * SNACKCELLHeight;




// images paths 
var APPLEIMAGEPATH = "./Images/apple.png";
var MYFACEIMAGEPATH  = "";
var GAMEOVERIMAGEPATH = "./Images/gameOver.jpg";
var LEVELUPIMAGEPATH = "./Images/levelUp.png"