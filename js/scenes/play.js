define(['lib/scene', 'geo/v2', 'core/graphic', 'entity/player', 'entity/enemycontroller', 'entity/patientcontroller', 'entity/gamecontroller', 'entity/killZone', 'entity/heartcontroller', 'entity/healthbarcontroller', 'entity/arrowhelper'],
		function(Scene, V2, g, Player, EnemyController, Patientcontroller, Gamecontroller, KillZone, Heartcontroller, HealthbarController, ArrowHelper) {
			var imageUrl = 'img/Background.jpg';
			g.add(imageUrl);

			function PlayScene() {
				Scene.call(this);

				this.gamecontroller = new Gamecontroller(Zero());
				var killzoneX = 800;
				this.killZone = new KillZone(new V2(killzoneX, 0));
				this.arrowhelper = new ArrowHelper(new V2(killzoneX, 0));
				this.drtrance = new Player(new V2(275, 300));
				this.enemycontroller = new EnemyController(Zero());
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
			}

			PlayScene.prototype = new Scene();

			PlayScene.prototype.onUpdate = function(delay) {
				this.healthbarcontroller.reduce(this.enemycontroller.getEnemiesHit().length);
			}

			return PlayScene;
		}
);
