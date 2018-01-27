define(['basic/entity', 'geo/v2', 'core/graphic', 'lib/animation'],
	function(Entity, V2, graphics, Animation) {
		graphics.add('img/DrTrance.png');

		function Player(pos) {
			Entity.call(this);
			this.position = pos;
			this.add(new Animation('img/DrTrance.png', Zero(), 1, 1, true));
			this.currentY = this.position.y;
			this.current_time = 0;
		}

		Player.prototype = new Entity();


		Player.prototype.wave = function(from, to, duration, offset, delta) {
			var dif = (to - from) * 0.5;
			return from + dif + (Math.sin((((this.current_time * 0.001) + duration * offset) / duration) * (Math.PI*2)) * dif);
		}

		Player.prototype.onUpdate = function(delta) {
			this.current_time += delta;
			var hover = this.wave(this.currentY, this.currentY - 25, 1, 0, delta);
			this.position.y = hover;
		};

		Player.prototype.down = function(key) {
			switch(key) {
				case 'up':  break;
				case 'down':  break;
				case 'left':  break;
				case 'right':  break;
			}
		};

		Player.prototype.up = function(key) {
			switch(key) {
				case 'up':  case 'down':  break;
				case 'left':  case 'right':  break;
			}
		};

		return Player;
	}
);
