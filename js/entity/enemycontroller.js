define(['basic/entity', 'geo/v2', 'entity/enemy'],
	function(Entity, V2, Enemy) {
		function EnemyController(pos) {
			Entity.call(this);

			this.position = pos;
			this.nextSpawnIn = 1000;

			this.killzone = new V2(765, 935);
<<<<<<< HEAD
			this.enemiesHit = [];
=======

			this.keyDown = {
				up: false,
				down: false,
				left: false,
				right: false,
			};
>>>>>>> b8a86acc403ea2276de6d73cd4f1314c416cbbf5
		};

		EnemyController.prototype = new Entity();

		EnemyController.prototype.onUpdate = function(delta) {
			if (this.enemiesHit.length > 0) {
				for (var i = 0; i < this.enemiesHit.length; i++) {
					this.remove(this.enemiesHit[i]);
				}
			}

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

			this.setEnemiesHit();
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
			this.parent.drtrance.slash(hit);
		};

		EnemyController.prototype.setEnemiesHit = function() {
			for (var i = this.entities.length - 1; i >= 0; i--) {
				if (this.entities[i].isAtLifetimeMax) {
					this.enemiesHit.push(this.entities[i]);
				}
			};
		};

		EnemyController.prototype.getEnemiesHit = function() {
			return this.enemiesHit;
		};

		return EnemyController;
	}
);
