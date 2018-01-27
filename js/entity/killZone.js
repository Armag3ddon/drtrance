define(['basic/entity', 'geo/v2', 'core/graphic', 'lib/animationExt'],
	function(Entity, V2, graphics, AnimationExt) {
		graphics.add('img/killZone.png');

    function killZone(pos, width) {
			Entity.call(this);
			this.position = pos;

			this.image = new AnimationExt('img/killZone.png', Zero(), 2, width, 1, 0, true);
			this.add(this.image);
		}

    killZone.prototype = new Entity();

		return killZone;
	}
);
