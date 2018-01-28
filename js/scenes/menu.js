define(['lib/scene', 'basic/button', 'core/graphic', 'core/game', 'geo/v2', 'transitions/slideinright', 'basic/morph', 'definition/easing', 'basic/layout'],
	function(Scene, Button, g, game, V2, SlideInRightTransition, Morph, Easing, Layout) {
		g.add('img/main_menu_bg.jpg');
		g.add('img/button_start_normal.png');
		g.add('img/button_start_hover.png');
		g.add('img/button_diff_normal.png');
		g.add('img/button_diff_hover.png');
		g.add('img/button_help_normal.png');
		g.add('img/button_help_hover.png');
		g.add('img/button_credits_normal.png');
		g.add('img/button_credits_hover.png');
		function MenuScene() {
			Scene.call(this);

			var playButton = Button.create(new V2(330, 350), function() { game.scene = require('config/scenes').play; }).img('img/button_start_normal.png').imgHover('img/button_start_hover.png');
			this.difficultyButton = Button.create(new V2(670, 350), function() {
				require('config/scenes').play.playSpeed += 0.5;
				if (require('config/scenes').play.playSpeed > 2.0)
					require('config/scenes').play.playSpeed = 0.5;
				require('core/game').scene.difficultyButton.changePicture(require('config/scenes').play.playSpeed);
			}).imgAnim('img/button_diff_normal.png', new V2(1, 4)).imgAnimHover('img/button_diff_hover.png', new V2(1, 4));
			var creditsButton = Button.create(new V2(330, 500), function() { game.scene = new SlideInRightTransition(require('config/scenes').credits, 1000, Easing.OUTQUAD); }).img('img/button_credits_normal.png').imgHover('img/button_credits_hover.png');
			var helpButton = Button.create(new V2(670, 500), function() { game.scene = require('config/scenes').help; }).img('img/button_help_normal.png').imgHover('img/button_help_hover.png');

			this.add(playButton);
			this.add(this.difficultyButton);
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
