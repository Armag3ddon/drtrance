define(['lib/scene', 'geo/v2', 'core/graphic', 'entity/player', 'entity/enemycontroller'],
		function(Scene, V2, g, Player, EnemyController) {
			g.add('img/PlayScene.jpg');

			function PlayScene() {
				Scene.call(this);

				this.drtrance = new Player(new V2(600, 300));
				this.enemycontroller = new EnemyController(Zero());

				this.keyAware.push(this.enemycontroller);

				this.add(this.enemycontroller);
				this.add(this.drtrance);
				this.bg = 'img/PlayScene.jpg';
			}

			PlayScene.prototype = new Scene();

			return PlayScene;
		}
);
