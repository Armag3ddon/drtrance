define(['basic/entity', 'geo/v2', 'core/graphic', 'basic/image'],
	function(Entity, V2, Graphic, Image) {
        var imageUrl = 'img/health.png';
        Graphic.add(imageUrl);

		function HealthbarController(pos) {
			Entity.call(this);
			this.position = pos;
			this.initial_health = 5;
			this.health = this.initial_health;

			this.reset();
		};

		HealthbarController.prototype = new Entity();

		HealthbarController.prototype.onUpdate = function (delta) {
			var entities_length = this.entities.length;
			if (this.health < entities_length) {
				this.remove(this.entities[0]);
			}
		};

		HealthbarController.prototype.reduce = function(value) {
			this.health -= 1;
		};

		HealthbarController.prototype.reset = function() {
			this.health = this.initial_health;
			for (var i = 0; i < this.initial_health; i++) {
				this.add(new Image(new V2(1000 + i * 45, 650), imageUrl));
			}
		};

		return HealthbarController;
	}
);
