define(['lib/scene', 'basic/text', 'geo/v2', 'core/game', 'basic/button', 'transitions/slideinright', 'definition/easing',  'core/graphic'],
		function(Scene, TextEntity, V2, game, Button, SlideInRightTransition, Easing, g) {
		g.add('img/credits_bg.jpg');
		g.add('img/button_back_normal.png');
		g.add('img/button_back_hover.png');
			function CreditsScene() {
				Scene.call(this);

				var easing = Easing.OUTELASTIC;
				var self = this;

				var BackButton = Button.create(new V2(0, 550), function() { game.scene = new SlideInRightTransition(require('config/scenes').menu, 1000, Easing.OUTQUAD);  }).img('img/button_back_normal.png').imgHover('img/button_back_hover.png');
				this.center(BackButton);
				this.bg = 'img/credits_bg.jpg';
			}

			CreditsScene.prototype = new Scene();

			return CreditsScene;
		}
);
