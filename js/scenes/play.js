define(['lib/scene', 'geo/v2', 'core/graphic'],
		function(Scene, V2, g) {
			g.add('img/PlayScene.jpg');

			function PlayScene() {
				Scene.call(this);

				this.bg = 'img/PlayScene.jpg';
			}

			PlayScene.prototype = new Scene();

			return PlayScene;
		}
);
