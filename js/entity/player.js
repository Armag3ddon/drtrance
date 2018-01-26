define(['basic/entity', 'geo/v2', 'core/graphic', 'lib/animation'],
	function(Entity, V2, graphics, Animation) {
		graphics.add('img/DrTrance.png');

		function Player(pos) {
			Entity.call(this);
			this.position = pos;
			this.add(new Animation('img/DrTrance.png', Zero(), 1, 1, true));

			this.wobbled = false;
			this.wobbleTime = 0;
		}

		Player.prototype = new Entity();

		Player.prototype.onUpdate = function(delta) {
			this.wobbleTime += delta;
			if (this.wobbleTime >= 200)
			{
				this.wobbleTime -= 200;
				if (this.wobbled)
				{
					this.position.y = this.position.y + 2;
					this.wobbled = false;
				} else {
					this.position.y = this.position.y - 2;
					this.wobbled = true;
				}
			}
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
