define(['basic/entity', 'geo/v2', 'entity/enemy'],
	function(Entity, V2, Enemy) {
		function EnemyController(pos) {
			Entity.call(this);
			this.position = pos;

			this.nextSpawnIn = 1000;
		}

		EnemyController.prototype = new Entity();

		EnemyController.prototype.onUpdate = function (delta) {
			this.nextSpawnIn -= delta;
			if (this.nextSpawnIn <= 0) {
				this.nextSpawnIn = Math.round(Math.random() * 10000);
				this.add(new Enemy(new V2(1300, 300)));
			}
		}

		return EnemyController;
	}
);
