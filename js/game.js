const numDivs = 36;
const maxHits = 10;

let hits = 0;
let firstHitTime = 0;

function round() {
  $(".game-field").removeClass("target");
  let divSelector = randomDivId();
  $(divSelector).addClass("target");
  $(divSelector).text(hits +1 );
  if (hits === 0) {
    firstHitTime = getTimestamp();
  }
  if (hits === maxHits) {
    endGame();
  }
}

function endGame() {
  $("#play-board").hide();
  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);
  $("#win-message").removeClass("d-none");
}

function handleClick(event) {

  $(".game-field").removeClass("miss");
  if ($(event.target).hasClass("target")) {
    $(".game-field").empty();
    hits = hits + 1;
    round();
  } else {
    $(event.target).addClass("miss");
  }
}

function init() {
  $("#button-play").hide();
  $("#button-reload").removeClass("d-none");
  round();
  $(".game-field").click(handleClick);
}

$("#button-reload").click(function() {
  location.reload();
});

$(".btn-success").on('click', init);

