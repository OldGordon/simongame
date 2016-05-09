//************************************************************//
//                           Toni Julia                                                  //
//                          OldGordon                                                //
//                      FreeCodeCamp                                             //
//                Simon Game Zipline 2016                                   //
//            My worst work ever(I want 2 forget it)                     //
//               spaguetti var passing ,                                         //
//                bad structure ,                                                    //
//              I wanted it with more interactivity but                  //
//                 I just messed up every step I made :(                 //
//                      Keep  on learning btw :)                                //
//************************************************************//
/*jslint browser: true*/
/*jslint node: true*/
/*jshint strict: false*/
/*global $, jQuery, alert*/

var Game;
Game = function () {
    this.tempArr = [];
    this.song = [];
    this.strict = 'Strict';
	this.go = 1;
    this.start = false;
    this.state = 0;
	this.counter = 0;
	this.level = 700;
};
Game.prototype = (function () {
	    var  $audio = $('audio'),
			  startSnd5 = $audio[5],
			  startSnd6  = $audio[6],
			  startSnd4 = $audio[4];
        //@param 2 integers, return integer
        var getRandom = function (min, max) {
                return Math.floor(Math.random () * (max - min) + min);
            },
            initShow = function () {
				var time = 0 ,
					startSnd5 = $('<audio autoplay></audio>');
				    startSnd5.append( '<source src ="https://www.dropbox.com/s/gs3qxobi0tfebjf/init.mp3?dl=1" type="audio/mpeg" />');
				var interval = setInterval(function (){
				   //parpadean 2 veces
					$(".color").toggleClass("lightOn","lightOff")
							   .toggleClass("lightOff","lightOn");
					/*for(var i = 0 ; i < 5; i++){
						$(".color[data-num=" + i + "]").toggleClass("lightOn","lightOff")
					}*/
					++time;
					if(time >= 4)clearInterval(interval);
                }, 300);
			 },
            reset = function () {
				this.tempArr = [];
				this.song = [];
				this.start = false;
				this.go = 1;
     			this.level = 700;
                $('#cmn-toggle-8').checked = true;
            },
            gameOver = function ( endSnd) {
				var $message = $('.message'),
				      pe2 = document.getElementById('cmn-toggle-8');
				if (endSnd === 2) {
					var startSnd7  = $("<audio autoplay></audio>");
					startSnd7.append('<source src="https://www.dropbox.com/s/apx3q76poawll4x/Yeah.mp3?dl=1" type="audio/mp3" />');
						$message.text("You Win - Your score : " + this.counter + " !")
						.animate({opacity: 1.0}, 750);
					$("#counter").text(this.counter);
				} else  if (endSnd === 1){
					console.log(this.counter);
					var startSnd6  = $("<audio autoplay></audio>");
					startSnd6.append('<source src="https://www.dropbox.com/s/6tydremc4y2q9g2/SadError.mp3?dl=1" type="audio/mp3" />')
					$("#counter").text(this.counter);
					$message.text("Game Over ¡  Score :  "+ this.counter)
					.animate({opacity: 1.0}, 750);

					//this.flag = 1;
				}
				console.log("sisisisi");
				reset();
				pe2.checked = true;
			},
            //@param array , return audio
            playSndColor = function (bip) {
				console.log(bip);
				var startSndX  = $("<audio autoplay></audio>");
				startSndX.append('<source src="https://s3.amazonaws.com/freecodecamp/simonSound' + bip + '.mp3" type="audio/mp3" />');
                $(".color[data-num=" + bip + "]").addClass("lightOn");
				window.setTimeout(function () {
					$(".color[data-num=" + bip + "]").removeClass("lightOn");
				}, 250);
            },
			compareSnd = function (idColor) {
				console.log(this.tempArr , this.song);
				var gameIn = this.song.shift(),
					  flag = (gameIn === idColor);
				//key matches sequence
				if(this.song.length === 0 && flag){
					$(".color[data-num]").off("click" );
					//next sequence of sounds
					$('.message').text('Good')
						.animate({opacity: 1.0}, 750)
					     .animate({opacity: 0.0}, 950);
					$("#counter").text(++this.counter);
					nextPlay.call(this, "strict");
				}else if (!flag){
					$(".color[data-num]").off("click" );
					console.log(this.strict);
					if (this.strict === "Strict") {
						gameOver.call(this, 1);
					} else if(this.strict === "NoStrict"){
						$('.message').text('Not good , start again ¡')
							.animate({opacity: 1.0}, 750)
							nextPlay.call(this, "nostrict");
					}
				}
			},
		    getInput = function () {
					var thisObj = this;
				if (this.start && this.go === 0) {
					$(".color").on("click", function () {
						var colorPicked = parseInt(this.getAttribute('data-num'));
						console.log(colorPicked);
						playSndColor(colorPicked);
						compareSnd.call(thisObj, colorPicked);
					});
				}
				this.start = false;
			},
            sequenceStart = function (arr) {
				if(this.counter >= 10) this.level = 500;
				if (this.counter >= 16 ) this.level = 300;
				var thisObj = this,
                    count = 0,
                    lapso = setInterval(function() {
                        playSndColor(arr[count]);
						count++;
						if (count >= arr.length ) {
                            clearInterval(lapso);
							thisObj.start= true;
							getInput.call(thisObj);
                        }
                    }, thisObj.level);
				//if (this.counter === 3) gameOver(2);
			},
			nextPlay = function (nostrict) {
				var thisObj = this;
				if (this.counter === 6){
				$(".color[data-num]").off("click" );
				gameOver.call(this, 2);
			    }else if (nostrict  === "nostrict") {
					window.setTimeout(function () {
						thisObj.song = thisObj.tempArr.slice(0);
						sequenceStart.call(thisObj, thisObj.tempArr);
					}, 400);
				} else if (nostrict === "strict") {
					window.setTimeout(function () {
						thisObj.tempArr.push(getRandom(1, 5));
						thisObj.song = thisObj.tempArr.slice(0);
						sequenceStart.call(thisObj, thisObj.tempArr);
					}, 400);
				}
			},
			gameStart = function (strict) {
				this.tempArr = [];
				this.song = [];
				this.counter = 0;
				this.go = 0;
				$('.message').text(' Game in progress')
				nextPlay.call(this, strict);
			};
        return {
               initShow: initShow, //public
               gameStart: gameStart, //public
               reset: reset//public
        };
})();
    $(document).ready(function () {
        'use strict';
		//variables
		var $counter = $('#counter'),
	          game = new Game,
			  $message = $('.message'),
		      $startBox = $('.startgame'),
		      $strictBox = $('#cmn-toggle-8');
		console.log( "strict= " +  game.strict + "    ",
							"state= " + game.state+ "    ",
							"tempArr[] " + game.tempArr+ "    ",
							"song[] " + game.song + "    ",
							"start= " + game.start + "    ",
							"go= " + game.go + "    "
		);
		$message.html("Simon is ON")
			.animate({opacity: 1.0}, 750)
			game.initShow();
		$startBox.click(function(){
					$counter.text(this.counter);
					$message.html("Starting game")
						.animate({opacity: 1.0}, 750)
					game.reset();
					$("#counter").text("0");
					game.gameStart("strict");
		});
		$strictBox.click(function () {
			if (!($strictBox.checked !== false))$strictBox.checked = true;
			if ($strictBox.checked === true)$strictBox.checked = false;
			game.strict === "NoStrict" ? game.strict = "Strict" : game.strict = "NoStrict";
			console.log(game.strict);
		});
        	game.strict = "Strict";
     });

