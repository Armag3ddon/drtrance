define(['lib/scene', 'basic/button', 'core/graphic', 'core/game', 'geo/v2', 'transitions/slideinright', 'basic/morph', 'definition/easing', 'basic/layout'],
	function(Scene, Button, g, game, V2, SlideInRightTransition, Morph, Easing, Layout) {
		g.add('img/main_menu_bg.jpg');
		g.add('img/button_start_normal.png');
		g.add('img/button_start_hover.png');
		g.add('img/button_help_normal.png');
		g.add('img/button_help_hover.png');
		g.add('img/button_credits_normal.png');
		g.add('img/button_credits_hover.png');
		function MenuScene() {
			Scene.call(this);

			var playButton = Button.create(new V2(490, 330), function() { game.scene = require('config/scenes').play; }).img('img/button_start_normal.png').imgHover('img/button_start_hover.png');
			var creditsButton = Button.create(new V2(490, 440), function() { game.scene = new SlideInRightTransition(require('config/scenes').credits, 1000, Easing.OUTQUAD); }).img('img/button_credits_normal.png').imgHover('img/button_credits_hover.png');
			var helpButton = Button.create(new V2(490, 550), function() { game.scene = require('config/scenes').help; }).img('img/button_help_normal.png').imgHover('img/button_help_hover.png');

			this.add(playButton);
			this.add(creditsButton);
			this.add(helpButton);

			this.bg = 'img/main_menu_bg.jpg';

			/*
			var easing = Easing.OUTELASTIC;
			var self = this;

			playButton.add(new Morph({ position: { y: 300 } }, 2500, easing));
			creditsButton.add(new Morph({ position: { y: 425 } }, 2500, easing));
			helpButton.add(new Morph({ position: { y: 550 } }, 2500, easing));
			*/
		}

		MenuScene.prototype = new Scene();

		return MenuScene;
	}
);
