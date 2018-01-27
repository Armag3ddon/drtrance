define(['basic/entity', 'geo/v2', 'core/graphic', 'lib/animation', 'basic/image'],
	function(Entity, V2, g, Animation, ImageEntity) {
		g.add('img/Cutsies.png');

		function Enemy(pos, type) {
			Entity.call(this);
			this.position = pos;

			this.type = type;
			this.image = new Animation('img/Cutsies.png', Zero(), new V2(4, 3), 0, false);
			this.image.frame = type;
			this.add(this.image);

			this.startPos = new V2(pos.x, pos.y);
			this.lifetime = 0;
			this.maxLifetime = 10000;
			this.speedFactor = 4;

			this.alive = true;
		}

		Enemy.prototype = new Entity();

		Enemy.prototype.onUpdate = function(delta) {
			if (!this.alive) {
				this.lifetime += delta;
				this.image.position.y =  Math.floor(this.lifetime*5 / 50);
				this.image2.position.y = -Math.floor(this.lifetime*5 / 50);

				if (this.lifetime >= 1500)
				{
					this.parent.remove(this);
				}

				return;
			}

			this.lifetime += delta * this.speedFactor;

			var percentage = this.lifetime / this.maxLifetime;
			var newX = Math.round(-1000 * percentage);
			var newY = Math.round(Math.pow(-(1 - percentage * 2), 2) * 100);

			this.position.x = this.startPos.x + newX;
			this.position.y = this.startPos.y + newY;

			if (this.lifetime >= this.maxLifetime) {
				this.parent.remove(this);
			}
		};

		Enemy.prototype.checkForKill = function(hitboxX) {
			console.log('checkForKill');
			if (!this.alive)
				return false;
			var rect = this.relativeArea();

			return rect.p1.x <= hitboxX;
		};

		Enemy.prototype.kill = function() {
			this.alive = false;

			this.image2 = new Animation('img/Cutsies.png', Zero(), new V2(4, 3), 0, false);
			this.image2.frame = this.type;
			this.image2.state = 1;
			this.image.state = 2;
			this.add(this.image2);
			this.lifetime = 0;
		};

		return Enemy;
	}
);
