define(['basic/entity', 'geo/v2', 'core/graphic', 'lib/animation'],
	function(Entity, V2, graphics, Animation) {
		graphics.add('img/DrTranceSpriteSheet.png');

		function Player() {
			Entity.call(this);
			this.initial_position = {
				x: 275,
				y: 300
			}
			this.fight_position_x = 800;
			this.position.x = this.initial_position.x;
			this.position.y = this.initial_position.y;

			this.image = new Animation('img/DrTranceSpriteSheet.png', Zero(), new V2(1, 2), 1, true);
			this.add(this.image);

			this.currentY = this.position.y;
			this.current_time = 0;
			this.isInFightPosition = false;
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

			if (this.goesInFightPosition) {
				if (!this.isInFightPosition) {
					this.fightPositionTime = 0;
					this.isInFightPosition = true;
					this.position.x = this.fight_position_x;
					this.image.state = 1;
				} else {
					this.fightPositionTime += delta;

					if (this.fightPositionTime >= 150) {
						this.isInFightPosition = false;
						this.goesInFightPosition = false;
						this.image.state = 0; 
						this.position.x = this.initial_position.x;
						this.position.y = this.initial_position.y;
					}
				}
			}
		};

		Player.prototype.down = function(key) {
			switch(key) {
				case 'up':
				case 'down':
				case 'left':
				case 'right':
					this.moveToFightSpot();
			}
		};

		Player.prototype.moveToFightSpot = function() {
			this.goesInFightPosition = true;
		};

		Player.prototype.fight = function() {
			if (false) {
			}

		};

		return Player;
	}
);
