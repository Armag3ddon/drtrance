define(['basic/entity', 'geo/v2', 'core/graphic', 'lib/animation', 'basic/image'],
	function(Entity, V2, graphics, Animation, ImageEntity) {
		function Enemy(pos) {
			Entity.call(this);
			this.position = pos;

			this.add(new ImageEntity(Zero(), 'img/back.png'));

			this.xDir = -10;
			this.yDir = -20;
			this.yChange = 1;
		}

		Enemy.prototype = new Entity();

		Enemy.prototype.onUpdate = function(delta) {
			var newX = Math.round(this.position.x + this.xDir/delta);
			var newY = Math.round(this.position.y + this.yDir/delta);
			this.yDir = this.yDir + this.yChange/delta;

			this.position.x = newX;
			this.position.y = newY;

			if (this.position.y > 800)
				this.parent.remove(this);
		};

		Enemy.prototype.checkForKill = function(hitboxX) {
			console.log('checkForKill');
			var rect = this.relativeArea();

			return rect.p1.x <= hitboxX;
		};

		return Enemy;
	}
);
