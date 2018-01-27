define(['basic/entity', 'geo/v2', 'lib/animation', 'core/graphic'],
	function(Entity, V2, Animation, g) {
		g.add('img/DanceDanceRevolution.png');

		function ArrowHelper(pos) {
			Entity.call(this);
			this.position = pos;

			var anim1 = new Animation('img/DanceDanceRevolution.png', new V2(0, 50), 4, 0, false);
			anim1.frame = 2;
			var anim2 = new Animation('img/DanceDanceRevolution.png', new V2(0, 210), 4, 0, false);
			anim2.frame = 0;
			var anim3 = new Animation('img/DanceDanceRevolution.png', new V2(0, 400), 4, 0, false);
			anim3.frame = 1;
			var anim4 = new Animation('img/DanceDanceRevolution.png', new V2(0, 550), 4, 0, false);
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
