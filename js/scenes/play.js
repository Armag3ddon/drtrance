define(['lib/scene', 'geo/v2', 'core/graphic', 'entity/player', 'entity/enemycontroller', 'entity/patientcontroller', 'entity/gamecontroller'],
		function(Scene, V2, g, Player, EnemyController, Patientcontroller, Gamecontroller) {
			g.add('img/PlayScene.jpg');

			function PlayScene() {
				Scene.call(this);

				this.gamecontroller = new Gamecontroller(Zero());
				this.drtrance = new Player(new V2(275, 300));
				this.enemycontroller = new EnemyController(Zero());
				this.patientcontroller = new Patientcontroller(Zero());

				this.keyAware.push(this.enemycontroller);

				this.add(this.gamecontroller);
				this.add(this.enemycontroller);
				this.add(this.patientcontroller);
				this.add(this.drtrance);
				this.bg = 'img/PlayScene.jpg';
			}

			PlayScene.prototype = new Scene();

			return PlayScene;
		}
);
