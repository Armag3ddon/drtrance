define(['basic/entity', 'geo/v2', 'entity/enemy'],
	function(Entity, V2, Enemy) {
		function EnemyController(pos) {
			Entity.call(this);

			this.position = pos;
			this.nextSpawnIn = 1000;

			this.killzone = new V2(765, 935);

			this.keyDown = {
				up: false,
				down: false,
				left: false,
				right: false,
			};
		};

		EnemyController.prototype = new Entity();

		EnemyController.prototype.onUpdate = function (delta) {
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
			for (var i = this.entities.length - 1; i >= 0; i--) {
				this.entities[i].checkForKill(this.killzone, move);
			};
		};

		return EnemyController;
	}
);
