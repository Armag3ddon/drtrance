define(['lib/scene', 'entity/back', 'basic/text', 'geo/v2', 'basic/button', 'core/graphic'],
		function(Scene, BackButton, TextEntity, V2, Button, g) {
		g.add('img/button_back_normal.png');
		g.add('img/button_back_hover.png');
			function CreditsScene() {
				Scene.call(this);
				this.center(new TextEntity(new V2(0, 100), "Judith Gastell"));
				this.center(new TextEntity(new V2(0, 150), "Tamara Meyendriesch"));
				this.center(new TextEntity(new V2(0, 200), "Andre Voigt"));
				this.center(new TextEntity(new V2(0, 250), "Felix Wagner"));
				this.center(new TextEntity(new V2(0, 300), "Felix Schmidt"));
				this.center(new TextEntity(new V2(0, 350), "Merlin B. Gyoery"));
				var BackButton = Button.create(new V2(0, 400), function() { game.scene = require('config/scenes').back; }).img('img/button_back_normal.png').imgHover('img/button_back_hover.png');
				this.center(BackButton);
			}

			CreditsScene.prototype = new Scene();

			return CreditsScene;
		}
);
