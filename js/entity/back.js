define(['require', 'basic/button', 'core/graphic', 'core/game', 'geo/v2', 'transitions/slideinleft', 'definition/easing'],
	function(require, Button, graphics, game, V2, SlideInLeftTransition, Easing) {
		graphics.add('img/button_back_normal.png');
		graphics.add('img/button_back_hover.png');

		function BackButton(scene) {
			this.x = 490;
			this.y = 550;
			return Button.create(new V2(this.x, this.y), function() { game.scene = new SlideInLeftTransition(require('config/scenes')[scene], 1000, Easing.OUTQUAD); }).img('img/button_back_normal.png').imgHover('img/button_back_hover.png');;
		}

		return BackButton;
	}
);
