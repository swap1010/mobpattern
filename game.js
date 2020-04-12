var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
function nextSequence(){
  var randomNumber = Math.floor(Math.random()*4);

  $("h1").text("Level "+level);
  level+=1;
var randomChosenColour = buttonColours[randomNumber];
gamePattern.push(randomChosenColour);
$("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
playSound(randomChosenColour);
}


$(".btnn").click(function (){
  var userChosenColour = $(this).attr('id');
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length);
});

function playSound(name){
  var sound ="sounds/"+name+".mp3";
  var effect = new Audio(sound);
  effect.play();
}


function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
  $("#"+currentColour).removeClass("pressed");},100);
}


$(document).keypress(function() {
  if (!started) {
  $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {
  if (!started) {
  $("#level-title").text("Level " + level);
  $(".btn").hide();
    nextSequence();
    started = true;

  }
});
function checkAnswer(currentLevel){
if(userClickedPattern[currentLevel-1] == gamePattern[currentLevel-1]){
  if (userClickedPattern.length === gamePattern.length){
      userClickedPattern = [];
    setTimeout(function () {
      nextSequence();
    }, 1000);
}}
else{
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function(){
  $("body").removeClass("game-over");},200);
    $("h1").text("");
    $(".btn").show();
    $(".btn").text("Restart");
    startOver();
}
}


function startOver(){
  level =0;
  started=false;
  gamePattern=[];
  userClickedPattern=[];
}
