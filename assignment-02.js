
// i used the youtube video:  
// https://www.bing.com/videos/search?q=how+to+make+simon+game+js&docid=608011784729200739&mid=7AE8DF025FF3CE7BAE337AE8DF025FF3CE7BAE33&view=detail&FORM=VIRE

/**and for the flashing lights:
 * https://www.computerhope.com/javascript/flashing-colors-on-open.htm
 * 
 * and for timer:
 * https://www.youtube.com/watch?v=-RNu5m4G9S4&feature=emb_logo
 */

 /* 
    set interval reference:
    https://www.bitdegree.org/learn/javascript-setinterval

    set time out reference:
    https://www.sitepoint.com/javascript-settimeout-function-examples/#:~:text=JavaScript%20setTimeout%20%28%29%20Function%20Examples%201%20Basic%20setTimeout,...%208%20Wrapping%20Up.%20...%209%20Conclusion.%20
*/

// the browser i used for testing is Microsoft egde, but it works on chrome too
// i used windows computer
// microsoft edge version: Version 88.0.705.81 (Official build) (64-bit)
// chrome version: Version 88.0.4324.190 (Official Build) (64-bit)

let computerPattern = []; // computer turn array
let playerPattern = []; // player turn array
let flash; //  number of flashes that appear in the game
let turn; // keep track of what turn we are on
let correct; // boolean tract of how good the player is doing
let compTurn; // boolean to keep tract of comp or player turn
let intervalId; // the phase in the array we are on
let playersTurn = false; // if the player is able to hit the buttons or not
let score;
let speed = 800;

let onTime = true;

let counter = 5; // cound down
let t;              // timer 
let isTimerOn = false; // if the timer is on


// ----------------timer for the player input-----------------
function countdown()
{
    // document.getElementById("txt").value = counter;
    counter--; // decrease each time
    t = setTimeout("countdown();", 1000); // decrese every 1 sec

    if(counter <= 0) // stop if counter is  zero
    {
        stopMeNotClicked(); // if the user didnt clicked by then
        //alert("on time?: " + onTime);
    }
}

function stopMeNotClicked() // when the user didnt input something
{
    onTime = false; // not on time
    isTimerOn = false; // timer is off
    clearTimeout(t); // clear the timer like clear interval
    counter = 5; // set counter
    check(); // check the conditions for the uninput timer
} 

function stopMeClicked() // if user clicked during timer
{
    onTime = true; // if on time

    //alert("on time?: " + onTime)
    isTimerOn = false; // turn false
    clearTimeout(t); // clear
    counter = 5; // counter set for the next round
} 
function startMe() // when the counter begins
{
    if(!isTimerOn)
    {
        isTimerOn = true; // turn the timer on
        countdown(); // start coundown
    }
}

let highestScore = 0; // keep track f highest score 

/// ---------------start the game by presssng green button --------------------

document.getElementById("start").addEventListener("click", function()
{
    document.getElementById("light").style.backgroundColor = ("rgb(200, 255, 117)");
    setTimeout(function(){ //start in 3 seconds
        play()
        }, 3000);
})


// --------------- play the game, intiaise all variables --------------------
function play()
{
    computerPattern = []; // game array play orger
    playerPattern = []; // no order for ply input yet
    flash = 0;  //  zeroflashes
    turn =  1;
    score = 0;
    speed = 800;
    document.getElementById("left").innerHTML = "01"; // first round of the game
    correct = true; // no wrong hit yet
    
    for(var i = 0; i < 20; i++) // do 20 rounds before you win the game
    {
        computerPattern.push(Math.floor(Math.random() * 4) + 1);
    }

    compTurn= true;

    intervalId = 0;
    intervalId = setInterval(gameTurn, 800);
}

// -------------------------- Computer's turn ---------------------

function gameTurn()
{
    playersTurn = false; // whenver playersTurn is false, then the player cant click on any buttons

    if(flash == turn){ 
        
        // the no of time the lights have flashed = the turn we are on
        // then the computer's turn is over, 
        // then we will clear the interval

        clearInterval(intervalId);
        compTurn = false;
        empty();
        playersTurn = true; // then the player can now start pressing buttons
        startMe() // set timer
    }

    if(compTurn)
    {
        empty(); // clear the colour for the last time computer played a colour
        setTimeout(() => {
            // will flash a colour
            //   order is an array of random number one to four
            if(computerPattern[flash] == 1) greenButton(); // flash is the no. times we flashed a colour
            if(computerPattern[flash] == 2) redButton(); // the functions we will run if true
            if(computerPattern[flash] == 3) blueButton();
            if(computerPattern[flash] == 4) yellowButton();
            flash++;    // increment flash for the next light
        }, 300); // similar to setInterval, 
        // timeout will do something once after a certain no of milisec
    }
}

// --------- when the computer playes the buttons in the array -------------

function greenButton(){
    document.getElementById("grass").style.backgroundColor = "rgb(153, 255, 0)"; // flash the button
}

function redButton(){
    document.getElementById("fire").style.backgroundColor = "rgb(252, 0, 0)"; // flash the button
}
function blueButton(){
    document.getElementById("electric").style.backgroundColor = "yellow"; // flash the button
}
function yellowButton(){
    document.getElementById("water").style.backgroundColor = "cyan"; // flash the button
}

/// ----------------------------empty all the colours -----------------------

function empty()
{
    document.getElementById("grass").style.backgroundColor = "green"; // check spellings with color
    document.getElementById("fire").style.backgroundColor = "rgb(126, 30, 30)";
    document.getElementById("electric").style.backgroundColor = "goldenrod";
    document.getElementById("water").style.backgroundColor = "darkblue";
}

// ---------- the speed of how the colours will turn back when flashed-------------
function ClearingSpeed()
{
    setTimeout(() => {
        empty();
    }, 300);
}

// ---------------------- clicking funtions for the player, -----------
//----------------------- only if its the player's turn

document.getElementById("grass").addEventListener("click", (event)=> {
    if(playersTurn)// we want the user to click there if program is on
    {
        stopMeClicked();
        playerPattern.push(1); // the section the player has clicked
                            // we wil push 1 into the player order array

        // now check if the player is correct
        check(); // function to check right
        greenButton(); // light up the colour

        ClearingSpeed();
    }
})

document.getElementById("fire").addEventListener("click", (event)=> {
    if(playersTurn)
    {
        stopMeClicked();
        playerPattern.push(2);
        check();
        redButton();

        ClearingSpeed();
    }
})

document.getElementById("electric").addEventListener("click", (event)=> {
    if(playersTurn)
    {
        stopMeClicked();
        playerPattern.push(3);
        check();
        blueButton();

        ClearingSpeed();
    }
})
document.getElementById("water").addEventListener("click", (event)=> {
    if(playersTurn)
    {
        stopMeClicked();
        playerPattern.push(4);
        check();
        yellowButton();
        
        ClearingSpeed();
    }
})

// ------------------------check if the player hit properly--------------

function check() // check if the user hits correctly
{
    // if playerOrder nt equals the reeal order (the last thing the player clicked)
    // alert(playerPattern[playerPattern.length - 1] + " != " + lightSignals[playerPattern.length - 1]);
    if(playerPattern[playerPattern.length - 1] !== computerPattern[playerPattern.length - 1] ) 
    correct = false; // player has something incorrect
    
    if(playerPattern.length == 20 && correct && onTime) // if youre in the 20th round and hit correctly each time
    {
        winGame(); // win
    }

    if(correct == false || onTime == false)
    {
        all4One(); // we will right this later
        document.getElementById("left").innerHTML= "OOP"; // print OOP

        // get the highest score and overwrite
        if(score > highestScore) highestScore = score;
        // alert("highest: here " + highestScore)

        setTimeout(() => { // set the turn back to "00" after 800mlsec
            document.getElementById("left").innerHTML = "00";
            empty();

            document.getElementById("light").style.backgroundColor = ("red");
            playersTurn = false; // no player touch
            // repeat
        }, 800);

        //red // there are the 5 flashes when you loose or game over
        setTimeout(function() { all4One()}, 0);
        //black
        setTimeout(function() { empty()}, 100);
        //purple
        setTimeout(function() {all4One()}, 200);
        //green
        setTimeout(function() {empty()}, 300);
        //blue
        setTimeout(function() {all4One()}, 400);
        //gray
        setTimeout(function() {empty()}, 500);
        //white (pause)
        setTimeout(function() {all4One()}, 600);
        setTimeout(function() {empty()}, 700);
        setTimeout(function() {all4One()}, 800);
        setTimeout(function() {empty()}, 900);
    }

    // the player got it correct and rounf not complete

    if(turn == playerPattern.length && correct && onTime)
    {
        //alert("here");
        onTime = false;
        turn++;
        playerPattern = [];
        compTurn = true;
        flash = 0;
        score = score + 5;
        document.getElementById("left").innerHTML = "0" + turn; // right the turn
        document.getElementById("right").innerHTML = "0" + score; //write the score
        // alert("highest: " + highestScore)

        if(score >= 10)  document.getElementById("right").innerHTML = score;
        if(turn >= 10)  document.getElementById("left").innerHTML = turn;

        if(score <= highestScore) document.getElementById("right").innerHTML = highestScore;
        
        //                      not a function: gameTurn
        if (turn == 5) speed = 600;
        if (turn == 9) speed = 500;
        if (turn == 13) speed = 400;
        intervalId = setInterval(gameTurn, speed);

    }
}

// a function to flash all lights
function all4One() 
{
    document.getElementById("grass").style.backgroundColor = "rgb(153, 255, 0)"; // check spellings with color
    document.getElementById("fire").style.backgroundColor = "rgb(252, 0, 0)";
    document.getElementById("electric").style.backgroundColor = "yellow";
    document.getElementById("water").style.backgroundColor = "cyan";
}


// then you win the game
function winGame()
{
    all4One();
    document.getElementById("left").innerHTML = "YAY";
    highestScore = 100;
    playersTurn = false;
    
    document.getElementById("light").style.backgroundColor = ("blue");
}
