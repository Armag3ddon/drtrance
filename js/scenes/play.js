define(['lib/scene', 'geo/v2', 'core/graphic', 'entity/player', 'entity/enemycontroller', 'entity/patientcontroller', 'entity/gamecontroller', 'entity/killZone', 'entity/heartcontroller', 'entity/healthbar'],
		function(Scene, V2, g, Player, EnemyController, Patientcontroller, Gamecontroller, KillZone, Heartcontroller, Healthbar) {
			g.add('img/PlayScene.jpg');

			function PlayScene() {
				Scene.call(this);

				this.gamecontroller = new Gamecontroller(Zero());
				this.killZone = new KillZone(new V2(800, 0));
				this.drtrance = new Player(new V2(275, 300));
				this.enemycontroller = new EnemyController(Zero());
				this.patientcontroller = new Patientcontroller(Zero());
				this.heartcontroller = new Heartcontroller(Zero());
				this.healthbar = (new Healthbar(Zero())).rect(300, 80);

				this.keyAware.push(this.drtrance);
				this.keyAware.push(this.enemycontroller);

				this.add(this.gamecontroller);
				this.add(this.killZone);
				this.add(this.enemycontroller);
				this.add(this.patientcontroller);
				this.add(this.heartcontroller);
				this.add(this.drtrance);
				this.add(this.healthbar);
				this.bg = 'img/PlayScene.jpg';
			}

			PlayScene.prototype = new Scene();

			return PlayScene;
		}
);
