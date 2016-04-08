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
	this.level = 700;
};
Game.prototype = (function () {
        //@param 2 integers, return integer
        var getRandom = function (min, max) {
                return Math.floor(Math.random () * (max - min) + min);
            },
            initShow = function () {
				var time = 0 ,
					startSnd = 	$("<audio autoplay></audio>");
				    startSnd.append('<source src="https://www.dropbox.com/s/gs3qxobi0tfebjf/init.mp3?dl=1" />');
				var interval = setInterval(function (){
							   //parpadean 3 veces y luego una vez cada uno
								$(".color").toggleClass("lightOn","lightOff")
								           .toggleClass("lightOff","lightOn");
								/*for(var i = 0 ; i < 5; i++){
									$(".color[data-num=" + i + "]").toggleClass("lightOn","lightOff")
								}*/
								++time;
//console.log(time);
								if(time >= 8)clearInterval(interval);
								state = false;
                }, 300)
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
				if(endSnd === "lose") {
					sndTag.append('<source src="https://www.dropbox.com/s/6tydremc4y2q9g2/SadError.mp3?dl=1" type="audio/mp3" />');
				}else if ( endSnd === "win") {
					sndTag.append('<source src="https://www.dropbox.com/s/apx3q76poawll4x/Yeah.mp3?dl=1" type="audio/mp3" />');
				}
            	reset();
				console.log(this.tempArr,this.counter,this.start);
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
				var gameIn = this.song.shift(),
					flag = (gameIn === idColor);
				if(this.song.length === 0 && flag){
					$(".color[data-num]").off("click" );
					nextPlay.call(this);
					//console.log("hasta aki llego",this.flag);
				}else if (!flag){
					$(".color[data-num]").off("click" );
					console.log(this);
					gameOver("lose");
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
				if(this.counter > 10) {
					this.level = 500;
				}else if (this.counter > 16){
					this.level = 300;
				}else if(this.counter === 20 ) {
					console.log(this.counter);
					gameOver("win");
				}
                var thisObj = this,
                    count = 0,
                    lapso = setInterval(function() {
                        playSndColor(arr[count]);
						count++;
                        if (count >= arr.length ) {
                            clearInterval(lapso);
							thisObj.playerTurn = true;
							getInput.call(thisObj);
                        }
                    }, thisObj.level);
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

