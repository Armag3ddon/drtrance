define(['lib/scene', 'entity/back', 'basic/text', 'geo/v2'],
		function(Scene, BackButton, TextEntity, V2) {
			function CreditsScene() {
				Scene.call(this);
				this.center(new TextEntity(new V2(0, 100), "Judith Gastell"));
				this.center(new TextEntity(new V2(0, 200), "Tamara Meyendriesch"));
				this.center(new TextEntity(new V2(0, 300), "Andre Voigt"));
				this.center(new TextEntity(new V2(0, 400), "Felix Wagner"));
				this.center(new TextEntity(new V2(0, 500), "Felix Schmidt"));
				this.center(new TextEntity(new V2(0, 500), "Merlin B. Gyoery"));
				this.center(BackButton('menu'));
			}

			CreditsScene.prototype = new Scene();

			return CreditsScene;
		}
);
