define(['lib/scene', 'entity/back', 'basic/text', 'geo/v2'],
		function(Scene, BackButton, TextEntity, V2) {
			function CreditsScene() {
				Scene.call(this);
				this.center(new TextEntity(new V2(0, 100), ""));
				this.center(new TextEntity(new V2(0, 200), ""));
				this.center(new TextEntity(new V2(0, 300), ""));
				this.center(new TextEntity(new V2(0, 400), ""));
				this.center(new TextEntity(new V2(0, 500), ""));
				this.center(BackButton('menu'));
			}

			CreditsScene.prototype = new Scene();

			return CreditsScene;
		}
);