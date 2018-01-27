define(['basic/entity', 'geo/v2', 'core/graphic', 'lib/animation', 'basic/image'],
	function(Entity, V2, graphics, Animation, ImageEntity) {
		graphics.add('img/patient1.png');

		function Patient(pos) {
			Entity.call(this);
			this.position = pos;
			this.add(new ImageEntity(Zero(), 'img/patient1.png'));
			this.currentY = this.position.y;
      this.health = 5;
			this.current_time = 0;
      this.jumpHeight = 50 + (50 * Math.random());
      this.jumpDuration = 2 + (2 * Math.random());
		}

		Patient.prototype = new Entity();

		Patient.prototype.wave = function(from, to, duration, offset, delta) {
			var dif = (to - from) * 0.5;
			return from + dif + (Math.sin((((this.current_time * 0.001) + duration * offset) / duration) * (Math.PI*2)) * dif);

		}

		Patient.prototype.onUpdate = function(delta) {
			this.current_time += delta;
			var hover = this.wave(this.currentY, this.currentY - this.jumpHeight, this.jumpDuration, 0, delta);
			this.position.y = hover;
		};

		Patient.prototype.down = function(key) {
			switch(key) {
				case 'up':  break;
				case 'down':  break;
				case 'left':  break;
				case 'right':  break;
			}
		};

		Patient.prototype.up = function(key) {
			switch(key) {
				case 'up':  case 'down':  break;
				case 'left':  case 'right':  break;
			}
		};

		return Patient;
	}
);
