define(['basic/entity', 'geo/v2', 'core/graphic', 'lib/animationExt', 'basic/image', 'entity/slasheffect', 'basic/rect'],
	function(Entity, V2, g, AnimationExt, ImageEntity, SlashEffect, RectEntity) {
		g.add('img/VirusSpreadsheet.png');
		g.add('img/pointer.png');

		function Enemy(pos, type) {
			Entity.call(this);
			this.position = pos;
			this.type = type;
			this.image = new AnimationExt('img/VirusSpreadsheet.png', Zero(), new V2(5, 3), 1, 1, 0, false);
			this.image.frame = this.type.column;
			this.add(this.image);
			if (require('config/config').debug) {
				this.add(new ImageEntity(Zero(), 'img/pointer.png'));
				this.centerRect = new RectEntity(new V2(49,49), new V2(2,2))
				this.add(this.centerRect);
			}

			this.startPos = new V2(pos.x, pos.y);
			this.lifetime = 0;
			this.maxLifetime = 10000;
			this.speedFactor = 4;

			this.hitCount = 0;
			this.alive = true;
			this.current_time = 0;
			this.isAtLifetimeMax = false;

			this.inheritSize();
		};

		Enemy.prototype = new Entity();

		Enemy.prototype.onUpdate = function(delta) {
			this.current_time += delta;

			var squishyX, squishyY;
			squishyX = this.wave(0.9, 1.1, 0.8, 0.0);
			squishyY = this.wave(0.9, 1.1, 0.8, 0.0);
			this.image.xScale = squishyX;
			this.image.yScale = squishyY;

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

			this.lifetime += delta * this.speedFactor * this.parent.parent.playSpeed;

			var percentage = this.lifetime / this.maxLifetime;
			var newX = Math.round(-1000 * percentage);
			var newY = Math.round(this.type.a * Math.pow((1 - percentage * 2), 2) * 100 - this.type.a * 100);

			this.position.x = this.startPos.x + newX;
			this.position.y = this.startPos.y + newY;

			this.isAtLifetimeMax = this.lifetime >= this.maxLifetime;
		};

		Enemy.prototype.onDraw = function(ctx) {
			if (require('config/config').debug) {
				this.centerRect.position.x = this.size.x/2-1;
				this.centerRect.position.y = this.size.y/2-1;
			}
		};

		Enemy.prototype.wave = function(from, to, duration, offset) {
			var dif = (to - from) * 0.5;
			return from + dif + (Math.sin((((this.current_time * 0.001) + duration * offset) / duration) * (Math.PI*2)) * dif);
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

			this.image2 = new AnimationExt('img/VirusSpreadsheet.png', Zero(), new V2(5, 3), 1, 1, 0, false);
			this.image2.frame = this.type.column;
			this.image2.state = 1;
			this.image.state = 2;
			this.add(this.image2);
			this.lifetime = 0;
			this.add(new SlashEffect(Zero()));
			this.parent.parent.gamecontroller.currentScore += 1 * this.parent.parent.gamecontroller.multiplierer;
			this.parent.parent.gamecontroller.multiplierer += 1;
		};


		return Enemy;
	}
);
