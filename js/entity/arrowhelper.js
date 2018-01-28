define(['basic/entity', 'geo/v2', 'lib/animation', 'core/graphic'],
	function(Entity, V2, Animation, g) {
		g.add('img/DanceDanceRevolution.png');

		function ArrowHelper(pos, playscene) {
			Entity.call(this);
			this.position = pos;

			var percentage = (1300 - pos.x) / 1000;

			var y = Math.round(enemyData['green'].a * Math.pow((1 - percentage * 2), 2) * 100 - enemyData['green'].a * 100);
			var anim1 = new Animation('img/DanceDanceRevolution.png', new V2(-50, y + playscene.enemySpawnPosition.y), 4, 0, false);
			anim1.frame = 2;
			y = Math.round(enemyData['purple'].a * Math.pow((1 - percentage * 2), 2) * 100 - enemyData['purple'].a * 100);
			var anim2 = new Animation('img/DanceDanceRevolution.png', new V2(-50, y + playscene.enemySpawnPosition.y), 4, 0, false);
			anim2.frame = 0;
			var y = Math.round(enemyData['red'].a * Math.pow((1 - percentage * 2), 2) * 100 - enemyData['red'].a * 100);
			var anim3 = new Animation('img/DanceDanceRevolution.png', new V2(-50, y + playscene.enemySpawnPosition.y), 4, 0, false);
			anim3.frame = 1;
			var y = Math.round(enemyData['blue'].a * Math.pow((1 - percentage * 2), 2) * 100 - enemyData['blue'].a * 100);
			var anim4 = new Animation('img/DanceDanceRevolution.png', new V2(-50, y + playscene.enemySpawnPosition.y), 4, 0, false);
			anim4.frame = 3;
			this.add(anim1);
			this.add(anim2);
			this.add(anim3);
			this.add(anim4);
		};

		ArrowHelper.prototype = new Entity();

		return ArrowHelper;
	}
);
