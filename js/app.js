//************************************************************//
//                      Toni Julia                            //
//                       OldGordon                            //
//                      FreeCodeCamp                          //
//                Simon Game Zipline 2016                     //
//                                                            //
//************************************************************//
/*jslint browser: true*/
/*jslint node: true*/
/*jshint strict: false*/
/*global $, jQuery, alert*/

var Game;
Game = function () {
    this.tempArr = [];
    this.song = [];
    this.strict = false;
    this.start = false;
    this.state = false;
    this.counter = 0;
    this.playerTurn = false;
};
Game.prototype = (function () {
    //@param 2 integers, return integer
    var getRandom = function (min, max) {
            return Math.floor(Math.random () * (max - min) + min);
        },

        initShow = function () {
            var time = 0 ,
                interval = setInterval(function (){
                    //parpadean 3 veces y luego una vez cada uno
                    $(".color").toggleClass("lightOn","lightOff")
                        .toggleClass("lightOff","lightOn");
                    ++time;
//console.log(time);
                    if(time >= 6)clearInterval(interval);
                    state = false;
                }, 200)
        },
        reset = function () {
            this.tempArr = [];
            this.song = [];
            this.strict = false;
            this.start = false;
            this.state = false;
            this.counter = 0;
            this.playerTurn = false;
        },
        gameOver = function (endSnd) {
            var sndTag  = $("<audio autoplay></audio>");
            if(endSnd) {
                sndTag.append('<source src="https://www.dropbox.com/s/6tydremc4y2q9g2/SadError.mp3?dl=1" type="audio/mp3" />');
            }else {
                console.log(endSnd);
                sndTag.append('<source src="https://www.dropbox.com/s/apx3q76poawll4x/Yeah.mp3?dl=1" type="audio/mp3" />');
            }
            this.reset();
        },

    //@param array , return audio
        playSndColor = function (bip) {

            var sndTag  = $("<audio autoplay></audio>");
            sndTag.append('<source src="https://s3.amazonaws.com/freecodecamp/simonSound' + bip + '.mp3" type="audio/mp3" />');
            $(".color[data-num=" + bip + "]").addClass("lightOn");
            window.setTimeout(function () {
                $(".color[data-num=" + bip + "]").removeClass("lightOn");
            }, 250);

        },

        compareSnd = function (idColor) {
            var playerSong = [],
                flag;
            playerSong.push(idColor);

            for(var i = 0, j = this.song.length; i < j ; i++){
                if (playerSong[i] !== this.song[i]) {
                    console.log(playerSong[i],this.song[this.counter]);
                    break;
                } else if (playerSong[i] === this.song[i]){
                    this.counter++;
                    this.nextPlay();
                }
            }
            console.log(playerSong);
            //this.gameOver(true);
            //this.counter = 0;
            $("#counter").html("<p>" + this.counter + "</p>");
        },

        getInput = function () {

            var thisObj = this;
            if(this.playerTurn) {
                if (this.start) {
                    $(".color").on("click", function () {
                        thisObj.playSndColor(this.getAttribute('data-num'));
                        thisObj.compareSnd(parseInt(this.getAttribute('data-num')));
                    });
                }
            }
        },
        sequenceStart = function (arr) {

            var thisObj = this,
                count = 0,
                lapso = setInterval(function() {
                    thisObj.playSndColor(arr[count]);

                    count++;

                    if (count >= arr.length ) {
                        clearInterval(lapso);
                        thisObj.playerTurn = true;
                        thisObj.getInput();
                    }

                }, 700);
        },
        nextPlay = function () {
            if(this.tempArr.length > 0) {
                var element = this.tempArr.shift();
                this.song.push(element);
                console.log(this.song);
                this.sequenceStart(this.song);
            }else {
                this.gameOver(false);
            }
        },
        gameStart = function () {

            if (!this.state) {
            } else {
                this.reset();
                $("#counter").html("<p>" + this.counter + "</p>");
                for ( var i = 0; i < 20; i++)this.tempArr.push(this.getRandom(1, 5));
                this.start = !this.start;
                if (this.start)this.nextPlay();
            }
        };

    return {
        nextPlay: nextPlay,
        compareSnd: compareSnd,
        initShow: initShow,
        getRandom: getRandom,
        playSndColor: playSndColor,
        sequenceStart: sequenceStart,
        getInput: getInput,
        gameStart: gameStart,//public
        gameOver: gameOver,
        reset: reset
    };

})();
$(document).ready(function () {
    'use strict';
    var game = new Game();
    $("#onOff").click(function () {
        game.state = !game.state;
        if (game.state)game.initShow();
        game.counter = 0;
    });
    $("#strict").click(function(){
        var onoffText = $("#strict");
        game.strict = !game.strict;
        game.strict ? onoffText.css("background-color","green") : onoffText.css("background-color","black");
    });
    $("#start").click(function(){
        game.gameStart();
    });
});

