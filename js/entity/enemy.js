define(['basic/entity', 'geo/v2', 'core/graphic', 'lib/animation', 'basic/image', 'entity/slasheffect'],
	function(Entity, V2, g, Animation, ImageEntity, SlashEffect) {
		g.add('img/VirusSpreadsheet.png');

		function Enemy(pos, type) {
			Entity.call(this);
			this.position = pos;
			this.type = type;
			this.image = new Animation('img/VirusSpreadsheet.png', Zero(), new V2(5, 3), 0, false);
			this.image.frame = this.type.column;
			this.add(this.image);

			this.startPos = new V2(pos.x, pos.y);
			this.lifetime = 0;
			this.maxLifetime = 10000;
			this.speedFactor = 4;

			this.hitCount = 0;
			this.alive = true;

			this.isAtLifetimeMax = false;

			this.inheritSize();
		};

		Enemy.prototype = new Entity();

		Enemy.prototype.onUpdate = function(delta) {
			if (!this.alive) {
				this.lifetime += delta;
				this.image.position.y =   Math.floor(this.lifetime*5 / 50);
				this.image.position.x =  -Math.floor(this.lifetime*5 / 50);
				this.image2.position.y = -Math.floor(this.lifetime*5 / 50);
				this.image2.position.x =  Math.floor(this.lifetime*5 / 50);

				if (this.lifetime >= 1500)
				{
					this.parent.remove(this);
				}

				return;
			}

			this.lifetime += delta * this.speedFactor;

			var percentage = this.lifetime / this.maxLifetime;
			var newX = Math.round(-1000 * percentage);
			var newY = Math.round(this.type.a * Math.pow((1 - percentage * 2), 2) * 100 - this.type.a * 100);

			this.position.x = this.startPos.x + newX;
			this.position.y = this.startPos.y + newY;

			this.isAtLifetimeMax = this.lifetime >= this.maxLifetime;
		};

		Enemy.prototype.checkForKill = function(killzone, killmove) {
			if (!this.alive)
				return false;

			var x = this.position.x + this.size.x/2;
			if (!(x >= killzone.x && x <= killzone.y))
				return false;

			if (killmove == this.type.toKill[this.hitCount]) {
				this.hitCount++;
				if (this.hitCount >= this.type.toKill.length)
					this.kill();
				return true;
			}

			return false;
		};

		Enemy.prototype.kill = function() {
			this.alive = false;

			this.image2 = new Animation('img/VirusSpreadsheet.png', Zero(), new V2(5, 3), 0, false);
			this.image2.frame = this.type.column;
			this.image2.state = 1;
			this.image.state = 2;
			this.add(this.image2);
			this.lifetime = 0;
			this.add(new SlashEffect(Zero()));
			this.parent.parent.gamecontroller.currentScore += 1 * this.parent.parent.gamecontroller.mulitplierer;
			this.parent.parent.gamecontroller.mulitplierer += 1;
		};


		return Enemy;
	}
);
