define(['lib/scene', 'geo/v2', 'core/graphic', 'core/game', 'entity/player', 'entity/enemycontroller', 'entity/patientcontroller', 'entity/gamecontroller', 'entity/killZone', 'entity/heartcontroller', 'entity/healthbarcontroller', 'entity/arrowhelper'],
		function(Scene, V2, g, Game, Player, EnemyController, Patientcontroller, Gamecontroller, KillZone, Heartcontroller, HealthbarController, ArrowHelper) {
			var imageUrl = 'img/Background.jpg';
			g.add(imageUrl);

			function PlayScene() {
				Scene.call(this);

				// VERY COMPLICATED DESIGN NOTES, DO NOT DELETE!

				// Enemies move 1000 pixels in 10 seconds (100 pixels per seconds, 0,1pixels per ms)
				// We estimate one beat every 300 ms
				// Initial spot of the killzone should be somewhere where an enemy flies by in a beat
				// the three beat / spawn stages are: 1200, 900, 600 ms
				// First spot of bar is therefore:
				// five beats after lowest stage next: 6000ms -> enemy moved 600 pixels
				// but careful testing dertemined that 580 is a nicer start position!
				this.enemySpawnPosition = new V2(1300, 310);
				this.killzoneCenter = this.enemySpawnPosition.x - 580;
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
				this.bg = imageUrl;

				this.beatTimer = 0;

				this.started = false;
				this.playSpeed = 1.0;
				this.musicStage = 0;
				this.musicTimer = 0;
				this.beatTime = 1200 * this.playSpeed;
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
				if (this.musicTimer >= 30000*this.playSpeed && this.musicStage < 1)
					this.escalate(30000*this.playSpeed);
				if (this.musicTimer >= 59126*this.playSpeed && this.musicStage < 2)
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
				this.beatTime -= 300 * this.playSpeed;
			};

			return PlayScene;
		}
);
