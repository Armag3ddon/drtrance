define(['lib/scene', 'basic/text', 'geo/v2', 'core/game', 'basic/button', 'core/graphic'],
		function(Scene, TextEntity, V2, game, Button, g) {
		g.add('img/button_back_normal.png');
		g.add('img/button_back_hover.png');
			function CreditsScene() {
				Scene.call(this);
				this.center(new TextEntity(new V2(0, 150), "Judith Gastell"));
				this.center(new TextEntity(new V2(0, 200), "Tamara Meyendriesch"));
				this.center(new TextEntity(new V2(0, 250), "Andre Voigt"));
				this.center(new TextEntity(new V2(0, 300), "Felix Wagner"));
				this.center(new TextEntity(new V2(0, 350), "Felix Schmidt"));
				this.center(new TextEntity(new V2(0, 400), "Merlin B. Gyoery"));
				var BackButton = Button.create(new V2(0, 500), function() { game.scene = require('config/scenes').menu; }).img('img/button_back_normal.png').imgHover('img/button_back_hover.png');
				this.center(BackButton);
			}

			CreditsScene.prototype = new Scene();

			return CreditsScene;
		}
);
