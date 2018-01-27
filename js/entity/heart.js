define(['basic/entity', 'geo/v2', 'core/graphic', 'lib/animationExt'],
	function(Entity, V2, graphics, AnimationExt) {
		graphics.add('img/heart.png');

    function heart(pos, scale) {
			Entity.call(this);
			this.position = pos;
			this.currentX = this.position.x;
			this.baseScale = scale;

			this.image = new AnimationExt('img/heart.png', Zero(), new V2(1, 1), 1, 1, 1, true);
			this.add(this.image);

			this.current_time = 0;
		}

    heart.prototype = new Entity();

		heart.prototype.onUpdate = function (delta) {
			this.current_time += delta;
			var squishyX = this.wave(this.baseScale - 0.1, this.baseScale + 0.1, 1.0, 0.0);
			var squishyY = this.wave(this.baseScale + 0.1, this.baseScale - 0.1, 1.0, 0.0);
			var posX = this.wave(this.currentX - 15, this.currentX + 15, 2.0, 0.0);
			this.image.xScale = squishyX;
			this.image.yScale = squishyY;
			this.position.x = posX;
			this.position.y -= 1;
		}

		heart.prototype.wave = function(from, to, duration, offset) {
			var dif = (to - from) * 0.5;
			return from + dif + (Math.sin((((this.current_time * 0.001) + duration * offset) / duration) * (Math.PI*2)) * dif);
		}


		return heart;
	}
);
