// Generate keyboard
var
  turns  = 6,
  wins   = 1,
  losses = 1
;
// Display Keyboard
$('document').ready(() => {
  var alpha = "QWERTYUIOPASDFGHJKLZXCVBNM";
  var div = $(".keyboard");
  var hold = "";
  for(var i = 0; i < alpha.length; i++){
    hold += "<span id='"
    + alpha[i] +"'><input type=button value="
             + alpha[i] + " class='keyboard_button' onclick=disable('"+alpha[i]+"');guessLetter('"+alpha[i]+"');></span> ";
    if(alpha[i] === 'P' || alpha[i] === 'L'){
      hold += "<br>";
    }
  }
  div.html(hold);
});

function disable (letter) {
  document.getElementById(letter).innerHTML = "<input type=button value='"
  + letter +"' disabled class='button_disabled'>";
}

function returnWord(){
  var wordArray = new Array("RADICAL", "AUGMENT", "TRADITIONAL", "CONCEPTUAL", "CONVENTIONAL",
                          "PEDANTIC", "EXPERIMENTAL", "ESOTERIC", "PERCEPTIVE", "ALCHEMY",
                          "TRUANT", "DESIRABLE", "QUESTIONABLE", "CONDEMN", "DECEIVE",
                          "ARRANGE", "DEFY", "PSYCHOLOGICAL", "SADISTIC", "OBSERVANT");
  var num = parseInt(Math.random()*wordArray.length);
  return wordArray[num];
}

function displayUnderscores(){
  var word = returnWord();
  var len = returnWord().length;
  var hold = "";
  for(var i = 0; i < len; i++ ){
    if(word.charAt(i) === " "){// Accounts for spaces in the word or phrase
      hold += word.charAt(i) + " ";
    }else{
      hold += "_";
    }
  }
  $("#text").text(hold);
}

function guessWord(){
  swal({
    title: "Guess the Word!",
    text: "An incorrect guess counts as a loss, Enter the word or phrase: ",
    type: "input",
    showCancelButton: true,
    closeOnConfirm: false,
    animation: "slide-from-top",
    inputPlaceholder: "guess the word"
  },
  function(inputValue) {
    var actualWord = returnWord();
    if (inputValue === false) return false;
    if (inputValue === "") {
      swal.showInputError("You need to write something!");
      return false
    }
  if(inputValue.toUpperCase() != actualWord){
    swal("Incorrect", "You guessed: " + inputValue, "error");
    lostGame();
    returnWord();
    displayUnderscores();
  }
  if(inputValue.toUpperCase() === actualWord){
    swal("Nice!", "You wrote: " + inputValue, "success");
    wonGame();
    returnWord();
    displayUnderscores();
  }
  });
}
function displayTurns(){
  $('.turns').append(turns--);
}

function lostGame(){
  swal("You have lost the game!", "Try Again", "error");
  $('.losses').text(losses++);
}

function wonGame(){
  swal("You have won the game!", "Congragulations!", "success");
  $('.wins').text(wins++);
}

function guessLetter(letter){
  var
    word = returnWord(),
    underscores = ""
  ;
  for(var i = 0; i < word.length; i++){
    if(letter === word.charAt(i)){
      underscores += letter;
    }else{
      underscores += "_"
    }
  }
  $("#text").text(underscores);
}
