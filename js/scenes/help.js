define(['lib/scene', 'entity/back'],
		function(Scene, BackButton) {

			function HelpScene() {
				Scene.call(this);
				this.add(BackButton('menu'));
			}

			HelpScene.prototype = new Scene();

			return HelpScene;
		}
);
