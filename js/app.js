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

    this.snd1 = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");
    this.snd2 = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");
    this.snd3 = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3");
    this.snd4 = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");
    this.snd5 = new Audio("https://www.dropbox.com/s/6tydremc4y2q9g2/SadError.mp3?dl=1");
    this.sounds = [this.snd1,this.snd2,this.snd3,this.snd4,this.snd5];
    this.tempArr = [];
    this.song = [];
    this.strict = false;
    this.start = false;
    this.state = false;
};
Game.prototype = (function () {


        //@param 2 integers, return integer
        var getRandom = function (min, max) {
                return Math.floor(Math.random () * (max - min) - min);
            },

            initShow = function () {
                for (var i = 0; i < 3; i++){
                    //parpadean 3 veces y luego una vez cada uno
                }
            },

            reset = function () {
                this.tempArr = [];
                this.song = [];
                this.strict = false;
                this.start = false;
                this.state = false;
            },

            gameOver = function () {

            },

            nextPlay = function () {
                this.song.push(getRandom(0, 4));
                this.tempArr = this.song.slice(0);
                sequenceStart(this.song);
            },

            compareSnd = function (snd) {
                var snd1 = this.song.shift();
                if (snd !== snd1) {
                    this.gameOver();
                } else {
                    this.nextPlay();
                }
            },

        //@param array , return audio
            playSndColor = function (bip) {
                bip.play();

            },

            sequenceStart = function (song) {
                 var count = 0
                     , lapso = setInterval(function(){
                         playSndColor(song[count]);
                         count++;
                         if (count >= song.length ) {
                             clearInterval(lapso);

                     }
                 },700);

            },

        //@param , return array
            startGame = function () {
                //playSnd(this.sounds[num]);
                this.reset();

                this.nextPlay();
            },
            getInput = function () {
                $(".color").on("click", function () {
                        game.compareSnd(parseInt(this.getAttribute('data-num')));
                        })
                        .on("mousedown", function () {
                            $(this).toggleClass('.color', '.light');
                        })
                        .on("mouseup", function () {
                            $(this).toggleClass('.light', '.color');
                        });

            };


        return {
            nextPlay: nextPlay,
            compareSnd: compareSnd,
            initShow: initShow,
            startGame: startGame,
            getRandom: getRandom,
            playSndColor: playSndColor,
            sequenceStart: sequenceStart,
            getInput: getInput,
            gameOver: gameOver,
            reset: reset
        };


    })();

    $(document).ready(function () {
        'use strict';

        var game = new Game();

        $("#onOff").click(function () {
            game.state = !game.state;
            game.initShow();
        });
        $("#strict").click(function(){
            var onoffText = $("#strict") ;
            game.strict = !game.strict;
            game.strict ? onoffText.html("ON") : onoffText.html("OFF");
        });
        $("#start").click(function(){
            if (!game.state) {
            } else {
                game.start = !game.start;
                if (game.start)game.startGame();
            }
        });


    });

