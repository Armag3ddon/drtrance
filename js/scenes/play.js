define(['lib/scene', 'geo/v2'],
		function(Scene, V2) {
			function PlayScene() {
				Scene.call(this);


			}

			PlayScene.prototype = new Scene();

			return PlayScene;
		}
);
