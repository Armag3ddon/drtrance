define(['basic/entity', 'geo/v2', 'lib/animation', 'core/graphic'],
	function(Entity, V2, Animation, g) {
		g.add('img/DanceDanceRevolution.png');

		function ArrowHelper(pos, playscene) {
			Entity.call(this);
			this.position = pos;

			this.anim1 = new Animation('img/DanceDanceRevolution.png', new V2(-50, 0), 4, 0, false);
			this.anim1.frame = 2;
			this.anim2 = new Animation('img/DanceDanceRevolution.png', new V2(-50, 0), 4, 0, false);
			this.anim2.frame = 0;
			this.anim3 = new Animation('img/DanceDanceRevolution.png', new V2(-50, 0), 4, 0, false);
			this.anim3.frame = 1;
			this.anim4 = new Animation('img/DanceDanceRevolution.png', new V2(-50, 0), 4, 0, false);
			this.anim4.frame = 3;
			this.add(this.anim1);
			this.add(this.anim2);
			this.add(this.anim3);
			this.add(this.anim4);

			this.setArrowPositions(playscene);
		};

		ArrowHelper.prototype = new Entity();

		ArrowHelper.prototype.setArrowPositions = function(parent) {
			var percentage = (1300 - this.position.x) / 1000;

			var y = Math.round(enemyData['green'].a * Math.pow((1 - percentage * 2), 2) * 100 - enemyData['green'].a * 100);
			this.anim1.position.x = -50;
			this.anim1.position.y = y + parent.enemySpawnPosition.y;
			y = Math.round(enemyData['purple'].a * Math.pow((1 - percentage * 2), 2) * 100 - enemyData['purple'].a * 100);
			this.anim2.position.x = -50;
			this.anim2.position.y = y + parent.enemySpawnPosition.y;
			y = Math.round(enemyData['red'].a * Math.pow((1 - percentage * 2), 2) * 100 - enemyData['red'].a * 100);
			this.anim3.position.x = -50;
			this.anim3.position.y = y + parent.enemySpawnPosition.y;
			y = Math.round(enemyData['blue'].a * Math.pow((1 - percentage * 2), 2) * 100 - enemyData['blue'].a * 100);
			this.anim4.position.x = -50;
			this.anim4.position.y = y + parent.enemySpawnPosition.y;
		};

		ArrowHelper.prototype.moveHelper = function(toX) {
			this.position.x = toX;
			this.setArrowPositions(this.parent);
		};

		return ArrowHelper;
	}
);
