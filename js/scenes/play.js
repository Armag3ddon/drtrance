define(['lib/scene', 'geo/v2', 'core/graphic', 'core/game', 'basic/image', 'entity/player', 'entity/enemycontroller', 'entity/patientcontroller', 'entity/gamecontroller', 'entity/killZone', 'entity/heartcontroller', 'entity/healthbarcontroller', 'entity/arrowhelper'],
		function(Scene, V2, g, Game, Image, Player, EnemyController, Patientcontroller, Gamecontroller, KillZone, Heartcontroller, HealthbarController, ArrowHelper) {
			var imageUrl = 'img/Background.jpg';
			var gameStartUrl = 'img/game_start.png';
			var gameStart1Url = 'img/game_start_countdown1.png';
			var gameStart2Url = 'img/game_start_countdown2.png';
			var gameStart3Url = 'img/game_start_countdown3.png';

			g.add(imageUrl);
			g.add(gameStartUrl);
			g.add(gameStart1Url);
			g.add(gameStart2Url);
			g.add(gameStart3Url);

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
					new Image(Zero(), gameStartUrl),
					new Image(Zero(), gameStart3Url),
					new Image(Zero(), gameStart2Url),
					new Image(Zero(), gameStart1Url),
				]
				// Enemies move 1000 pixels in 10 seconds (100 pixels per second, 0,1pixels per ms)
				// We estimate one beat every ??? ms
				// Initial spot of the killzone should be somewhere where an enemy flies by in a beat
				this.enemySpawnPosition = new V2(1300, 310);
				this.killzoneCenter = this.enemySpawnPosition.x - Math.floor(15 * this.oneBeat * 0.1);
				this.killzoneWidth = 50; // left and right, so 80 in total!
				this.killzoneTolerance = 10; // unseen extra tolerance for the killzone

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
				this.center(this.gameStart[0]);
				this.bg = imageUrl;
			}

			PlayScene.prototype = new Scene();

			PlayScene.prototype.onUpdate = function(delay) {
				if (!this.started) {
					document.getElementById("game_music").play();
					document.getElementById("game_music").currentTime = 0;
					document.getElementById("game_music").playbackRate = this.playSpeed;
					document.getElementById("game_music").onended = function() {
						var game = require('core/game');
						if (game.scene.musicStopped)
							game.scene.musicStopped();
					};
					
					this.delay += delay;

					if (this.delay <= 1000) {
						return;
					}
					else if (this.delay > 1000 && this.gameStart.length > 0) {
						this.remove(this.gameStart.shift());

						if (this.gameStart.length > 0) {
							this.center(this.gameStart[0]);
							this.delay = 0;
							return;
						}
					}

					this.started = true;
				}

				if (this.patientcontroller.entities.length <= 0) { // GAME OVER!!!
					var scenes = require('config/scenes');
					Game.scene = scenes.menu;
					scenes.play = new PlayScene();
					document.getElementById("game_music").pause();
					document.getElementById("game_music").currentTime = 0;
					return;
				}

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

				this.musicTimer += delay;
				if (this.musicTimer >= 29590*this.playSpeed && this.musicStage < 1)
					this.escalate(30000*this.playSpeed);
				if (this.musicTimer >= 29590*this.playSpeed && this.musicStage < 2)
					this.escalate(59126*this.playSpeed);

				this.beatTimer += delay;
				if (this.beatTimer >= this.beatTime) {
					this.beat(this.beatTimer - this.beatTime);
					this.beatTimer = 0;
				}
			}

			PlayScene.prototype.musicStopped = function() {
				document.getElementById("game_music").play();
				document.getElementById("game_music").currentTime = 207;
				this.musicTimer = 207000;
			};

			PlayScene.prototype.beat = function(difference) {
				this.enemycontroller.beat(difference);
			};

			PlayScene.prototype.escalate = function(step) {
				this.musicStage++;
				this.beatTime -= this.oneBeat * this.playSpeed;
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

			return PlayScene;
		}
);
