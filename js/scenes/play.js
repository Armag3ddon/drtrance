define(['lib/scene', 'geo/v2', 'core/graphic', 'core/sound', 'core/game', 'config/fonts', 'basic/text', 'basic/image', 'entity/player', 'entity/enemycontroller', 'entity/patientcontroller', 'entity/gamecontroller', 'entity/killZone', 'entity/heartcontroller', 'entity/healthbarcontroller', 'entity/arrowhelper', 'entity/quiteHandler', 'entity/back'],
		function(Scene, V2, g, s, Game, fonts, text, Image, Player, EnemyController, Patientcontroller, Gamecontroller, KillZone, Heartcontroller, HealthbarController, ArrowHelper, QuiteHandler, BackButton) {
			var imageUrl = 'img/Background.jpg';
			var gameStartUrl = 'img/game_start.png';
			var gameStart1Url = 'img/game_start_countdown1.png';
			var gameStart2Url = 'img/game_start_countdown2.png';
			var gameStart3Url = 'img/game_start_countdown3.png';
			var gameOver = 'img/game_over.png';
			var darker = 'img/darker.png';

			g.add(imageUrl);
			g.add(gameStartUrl);
			g.add(gameStart1Url);
			g.add(gameStart2Url);
			g.add(gameStart3Url);
			g.add(gameOver);
			g.add(darker);
			g.add('img/button_back_normal.png');
			g.add('img/button_back_hover.png');

			s.add('snd/start.mp3');
			s.add('snd/game_over.mp3');

			function PlayScene() {
				Scene.call(this);

				// VERY COMPLICATED DESIGN NOTES, DO NOT DELETE!
				this.beatTimer = 0;

				this.started = false;
				this.playSpeed = 1.0;
				this.musicStage = 0;
				this.musicTimer = 0;
				this.oneBeat = 464;
				this.beatTime = this.oneBeat * 4 * this.playSpeed;
				this.delay = 0;
				this.gameStart = [
						new Image(Zero(), darker),
					new Image(Zero(), gameStartUrl),
						new Image(Zero(), darker),
					new Image(Zero(), gameStart3Url),
						new Image(Zero(), darker),
					new Image(Zero(), gameStart2Url),
						new Image(Zero(), darker),
					new Image(Zero(), gameStart1Url),
				]
				this.gameEnded = false;
				// Enemies move 1000 pixels in 10 seconds (100 pixels per second, 0,1pixels per ms)
				// We estimate one beat every ??? ms
				// Initial spot of the killzone should be somewhere where an enemy flies by in a beat
				this.enemySpawnPosition = new V2(1300, 310);
				this.killzoneCenter = this.getBeatX(15);
				this.killzoneWidth = 50; // left and right, so 80 in total!
				this.killzoneTolerance = 10; // unseen extra tolerance for the killzone

				this.flashing = false;

				this.gamecontroller = new Gamecontroller(Zero());
				this.killZone = new KillZone(new V2(this.killzoneCenter - this.killzoneWidth, 0), this.killzoneWidth*2);
				this.arrowhelper = new ArrowHelper(new V2(this.killzoneCenter, 0), this);
				this.drtrance = new Player(new V2(275, 300));
				this.enemycontroller = new EnemyController(Zero(), this);
				this.patientcontroller = new Patientcontroller(Zero());
				this.heartcontroller = new Heartcontroller(Zero());
				this.healthbarcontroller = new HealthbarController(Zero());

				//this.keyAware.push(this.drtrance);
				this.keyAware.push(this.enemycontroller);

				this.add(this.gamecontroller);
				this.add(this.killZone);
				this.add(this.arrowhelper);
				this.add(this.enemycontroller);
				this.add(this.patientcontroller);
				this.add(this.heartcontroller);
				this.add(this.drtrance);
				this.add(this.healthbarcontroller);
				this.add(this.gameStart[0]);
				this.center(this.gameStart[1]);
				this.bg = imageUrl;
				this.gamepadbuttons = [false, false, false, false];

				//this.musicTimer = 89000;
				//this.musicStage = 3;
				//this.increaseInterval = true;
				//this.increaseIntervalTimer = 0;
			}

			PlayScene.prototype = new Scene();

			PlayScene.prototype.onUpdate = function(delay) {
				var gamepad = window.controllers[0];

				if (gamepad) {
					var buttonPressed = this.gamepadbuttons.findIndex(function (gamepadbutton) {
						return gamepadbutton === true;
					});

					if (buttonPressed >= 0 && !gamepad.buttons[buttonPressed].pressed) {
						if (buttonPressed === 2) {
							console.log(button);
							this.up('up');
							this.gamepadbuttons[buttonPressed] = false
						}

						if (buttonPressed === 0) {
							console.log(button);
							this.up('left');
							this.gamepadbuttons[buttonPressed] = false
						}

						if (buttonPressed === 1) {
							console.log(button);
							this.up('down');
							this.gamepadbuttons[buttonPressed] = false
						}

						if (buttonPressed === 3) {
							console.log(button);
							this.up('right');
							this.gamepadbuttons[buttonPressed] = false
						}
						buttonPressed = -1;
					}

					if (buttonPressed < 0) {
						for (var button in gamepad.buttons) {
							var btn = gamepad.buttons[button]
							if (button === '2' && btn.pressed) {
								console.log(button);
								this.down('up');
								this.gamepadbuttons[button] = true
							}
							else if (button === '0' && btn.pressed) {
								console.log(button);
								this.down('left');
								this.gamepadbuttons[button] = true
							}
							else if (button === '1' && btn.pressed) {
								console.log(button);
								this.down('down');
								this.gamepadbuttons[button] = true
							}
							else if (button === '3' && btn.pressed) {
								console.log(button);
								this.down('right');
								this.gamepadbuttons[button] = true
							}
						}
					}
				}

				if (!this.started) {

					this.delay += delay;

					if (this.delay <= 1000) {
						return;
					}
					else if (this.delay > 1000 && this.gameStart.length > 0) {
						this.remove(this.gameStart.shift());
						this.remove(this.gameStart.shift());

						if (this.gameStart.length > 0) {
							this.add(this.gameStart[0]);
							this.center(this.gameStart[1]);
							this.delay = 0;
							return;
						}
					}

					s.play('snd/start.mp3');

					document.getElementById("game_music").play();
					document.getElementById("game_music").currentTime = 0;
					//document.getElementById("game_music").playbackRate = this.playSpeed;
					document.getElementById("game_music").onended = function() {
						var game = require('core/game');
						if (game.scene.musicStopped)
							game.scene.musicStopped();
					};

					this.started = true;
				}

				if (this.patientcontroller.patientsLeft() <= 0 && this.gameEnded == false) { // GAME OVER!!!
					var scenes = require('config/scenes');
					//Game.scene = scenes.menu;
					//var center = new V2(640, 384);
					var center = new V2(255, 165);
					this.gameEnded = true;
					this.image = new Image(new V2(0, 0), darker);
					this.add(this.image);

					this.image2 = new Image(new V2(495.5, 305.5-200), gameOver);
					this.add(this.image2);

					this.quiteHandler = new QuiteHandler(center, 'test');
					this.add(this.quiteHandler);

					this.quiteHandler.text.text = this.gamecontroller.clock.time;
					this.quiteHandler.text2.text = this.gamecontroller.currentScore;
					this.quiteHandler.text3.text = this.gamecontroller.highestMultiplierer;
					this.gamecontroller.remove(this.gamecontroller.clock);

					scenes.play = new PlayScene();

					this.button = BackButton('menu');
					this.add(this.button);
					document.getElementById("game_music").pause();
					document.getElementById("game_music").currentTime = 0;

					s.play('snd/game_over.mp3');
					return;
				}

				if (this.gameEnded)
					return;

				if (this.enemycontroller.enemyHit) {
					this.enemycontroller.enemyHit = false;

					if (this.patientcontroller.reduceHealthAndGetDefeated()) {
						this.healthbarcontroller.reduce();
						this.healthbarcontroller.setTo(5, this.patientcontroller.patientsLeft());
					}
					else {
						this.healthbarcontroller.reduce();
					}
				}

				this.musicTimer += delay * this.playSpeed;
				if (this.musicTimer >= 29590 && this.musicStage < 1)
					this.escalate(29590);
				if (this.musicTimer >= 59126 && this.musicStage < 2)
					this.escalate(59126);
				if (this.musicTimer >= 90000 && this.musicStage < 3)
					this.escalate(90000);
				if (this.musicStage >= 3) {
					this.increaseIntervalTimer += delay * this.playSpeed;
					if (this.increaseIntervalTimer >= 20000) {
						this.escalate();
						this.increaseIntervalTimer = 0;
					}
				}

				this.beatTimer += delay * this.playSpeed;
				if (this.beatTimer >= this.beatTime) {
					this.beat(this.beatTimer - this.beatTime);
					this.beatTimer = 0;
				}
			}

			PlayScene.prototype.musicStopped = function() {
				document.getElementById("game_music").play();
				document.getElementById("game_music").currentTime = 207;
			};

			PlayScene.prototype.beat = function(difference) {
				if (!this.flashing)
					this.enemycontroller.beat(difference);
			};

			PlayScene.prototype.getBeatX = function(beats) {
				return this.enemySpawnPosition.x - Math.floor(beats * this.oneBeat * 0.1);;
			};

			PlayScene.prototype.escalate = function(step) {
				this.musicStage++;
				if (this.musicStage == 1)
					this.beatTime -= this.oneBeat * 1.0/this.playSpeed;
				if (this.musicStage == 2)
					this.beatTime -= this.oneBeat * 1.0/this.playSpeed;
				if (this.musicStage == 3) {
					this.flashing = true;
					this.killZone.startFlash(this.getBeatX(12));
					this.increaseInterval = true;
					this.increaseIntervalTimer = 0;
					this.musicStage++;
				}
				if (this.increaseInterval) {
					this.beatTime -= 200;
					if (this.beatTime < 0)
						this.beatTime = 1;
				}
			};

			PlayScene.prototype.killzoneFixed = function() {
				this.flashing = false;
			};

			PlayScene.prototype.moveKillzone = function(toX) {
				toX += this.killzoneWidth;
				this.killzoneCenter = toX;
				this.enemycontroller.moveKillzone(toX);
				this.arrowhelper.moveHelper(toX);
			};

			PlayScene.prototype.center = function (obj) {
				obj.position.x = this.size.x / 2 - obj.size.x / 2;
				obj.position.y = this.size.y / 2 - obj.size.y / 2;
				this.add(obj);
			};

			PlayScene.prototype.mousedown = function(mouse) {
				this.mouseStart = new V2(mouse.x, mouse.y);
			};

			PlayScene.prototype.mouseup = function(mouse) {
				if (!this.mouseStart)
					return;

				var mouseEnd = new V2(mouse.x, mouse.y);

				var sum = mouseEnd.dif(this.mouseStart);

				if (Math.abs(sum.x) > Math.abs(sum.y)) {
					if (sum.x < 0) {
						this.down('left');
						this.up('left');
					} else {
						this.down('right');
						this.up('right');
					}
				} else {
					if (sum.y < 0) {
						this.down('up');
						this.up('up');
					} else {
						this.down('down');
						this.up('down');
					}
				}
			};

			PlayScene.prototype.down = function(key) {
				for (var entity in this.keyAware) {
					this.keyAware[entity].down(key);
				}
			}

			PlayScene.prototype.up = function(key) {
				for (var entity in this.keyAware) {
					this.keyAware[entity].up(key);
				}
			}

			return PlayScene;
		}
);
