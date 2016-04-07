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
	this.flag = true;
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
					sndTag.append('<source src="https://www.dropbox.com/s/apx3q76poawll4x/Yeah.mp3?dl=1" type="audio/mp3" />');
				}
            	reset();
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

				var gameIn = this.song.shift();

				this.flag = (gameIn === idColor);

				if(this.song.length === 0 && this.flag){
					$(".color[data-num]").off("click" );
					nextPlay.call(this);
					//console.log("hasta aki llego",this.flag);
				}else if (!this.flag){
					$(".color[data-num]").off("click" );
					console.log(this);
					gameOver(true);
				}
			},
		    getInput = function () {

				var thisObj = this;
				if (this.start) {
						$(".color").on("click", function () {

							playSndColor(this.getAttribute('data-num'));
							compareSnd.call(thisObj, parseInt(this.getAttribute('data-num')));
						});
					}
			},
            sequenceStart = function (arr) {

                var thisObj = this,
                    count = 0,
                    lapso = setInterval(function() {
                        playSndColor(arr[count]);
						console.log(arr[count]);
                        count++;
                        if (count >= arr.length ) {
                            clearInterval(lapso);
							thisObj.playerTurn = true;
							console.log(thisObj);
							getInput.call(thisObj);
                        }
                    }, 700);
            },
            nextPlay = function () {
				var thisObj = this;

				window.setTimeout(function(){
					$("#counter").html(++thisObj.counter );
					thisObj.tempArr.push(getRandom(1, 5));
					thisObj.song = thisObj.tempArr.slice(0);

					sequenceStart.call(thisObj, thisObj.tempArr);
				}, 400);
			},
			gameStart = function () {
				this.tempArr = [];
				this.song = [];
				this.counter = 0;
				this.start = true;
				console.log(this);
				nextPlay.call(this);

			};

        return {
            initShow: initShow, //public
            gameStart: gameStart //public
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

