define(['basic/entity', 'geo/v2', 'entity/enemy'],
	function(Entity, V2, Enemy) {
		function EnemyController(pos) {
			Entity.call(this);

			this.position = pos;
			this.nextSpawnIn = 1000;

			this.killzone = new V2(765, 935);
			this.enemyHit = false;

			this.keyDown = {
				up: false,
				down: false,
				left: false,
				right: false,
			};
		};

		EnemyController.prototype = new Entity();

		EnemyController.prototype.onUpdate = function(delta) {
			this.nextSpawnIn -= delta;
			if (this.nextSpawnIn <= 0) {
				this.nextSpawnIn = Math.round(Math.random() * 3000 + 500);
				var rnd = Math.floor(Math.random() * 4);
				var type = '';
				switch(rnd) {
					case 0:
						type = 'purple';
					break;
					case 1:
						type = 'red';
					break;
					case 2:
						type = 'green';
					break;
					case 3:
						type = 'blue';
					break;
				}
				this.add(new Enemy(new V2(1300, 310), enemyData[type]));
			}

			if (this.entities.length > 0 && this.entities[0].isAtLifetimeMax) {
				this.enemyHit = true;
				this.remove(this.entities[0]);
				this.parent.gamecontroller.mulitplierer = 0;
			}
		};

		EnemyController.prototype.down = function(key) {
			if (this.keyDown[key])
				return;

			switch(key) {
				case 'up':
				case 'down':
				case 'left':
				case 'right':
				this.checkForKill(key);
			}

			this.parent.drtrance.down(key);
			this.keyDown[key] = true;
		};

		EnemyController.prototype.up = function(key) {
			this.keyDown[key] = false;
		};

		EnemyController.prototype.checkForKill = function(move) {
			var hit = false;
			for (var i = this.entities.length - 1; i >= 0; i--) {
				if(this.entities[i].checkForKill(this.killzone, move))
					hit = true;
			};
			if (hit == false)	this.parent.gamecontroller.mulitplierer = 0;
			this.parent.drtrance.slash(hit);
		};

		return EnemyController;
	}
);
