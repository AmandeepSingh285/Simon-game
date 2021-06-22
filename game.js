var buttonColors=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var count=0;
var level=0;
$(".btn").click(function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    var temp=userClickedPattern.length;
    temp-=1;
    checkAnswer(temp);
});

$(document).keypress(function(){
    if (count==0){
        $("h1").text("Level " + level);
        nextSequence();
        count+=1;
    }
});

function nextSequence()
{
    userClickedPattern=[];
    level+=1;
    $("h1").text("level " + level);
    var randomNumber=Math.random()*3+1;
    randomNumber=Math.floor(randomNumber);
    var randomChosenColour=buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut().fadeIn();
    playSound(randomChosenColour);    
}

function playSound(name){
    var audio=new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    },100);
}


function checkAnswer(currentLevel){
    if (gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log("success");
        if (userClickedPattern.length===gamePattern.length){
            setTimeout(function() {
                nextSequence();
                },1000);
        }
    }
    else{
        var audioWrong=new Audio("sounds/wrong.mp3");
        audioWrong.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game over press any key to restart");
        console.log("wrong");
        startOver();
    }
}

function startOver()
{
    level=0;
    gamePattern=[];
    count=0;
}