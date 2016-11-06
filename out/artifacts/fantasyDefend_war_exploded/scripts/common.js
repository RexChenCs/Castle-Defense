/**
 * Created by Rex on 11/4/16.
 */


var btn_press = document.getElementById("btn_press");
var btn_click = document.getElementById("btn_click");

function playAudio(btn) {
    if(btn === "btn_press"){
        btn_press.play();
    }else if(btn=="btn_click"){
        btn_click.play();
    }
}

function pauseAudio() {
    x.pause();
}