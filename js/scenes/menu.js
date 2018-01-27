define(['lib/scene', 'basic/button', 'core/graphic', 'core/game', 'geo/v2', 'transitions/slideinright', 'basic/morph', 'definition/easing', 'basic/layout'],
	function(Scene, Button, g, game, V2, SlideInRightTransition, Morph, Easing, Layout) {
		g.add('img/main_menu_bg.jpg')
		function MenuScene() {
			Scene.call(this);

			var playButton = Button.create(new V2(0, 680), function() { game.scene = require('config/scenes').play; }).rect(360, 80).text("Play");
			var creditsButton = Button.create(new V2(0, 680), function() { game.scene = new SlideInRightTransition(require('config/scenes').credits, 1000, Easing.OUTQUAD); }).rect(350, 80).text("Credits");
			var helpButton = Button.create(new V2(0, 680), function() { game.scene = require('config/scenes').help; }).rect(340, 80).text("Help");

			var vLayout = new Layout.vertical(new V2(0, 20), 20, 50);
			vLayout.add(playButton);
			vLayout.add(creditsButton);
			vLayout.add(helpButton);
			vLayout.align("center");
			this.center(vLayout);
			this.bg = 'img/main_menu_bg.jpg';

			var easing = Easing.OUTELASTIC;
			var self = this;

			playButton.add(new Morph({ position: { y: 260 } }, 1500, easing));
			creditsButton.add(new Morph({ position: { y: 390 } }, 1500, easing));
			helpButton.add(new Morph({ position: { y: 520 } }, 1500, easing));
		}

		MenuScene.prototype = new Scene();

		return MenuScene;
	}
);
