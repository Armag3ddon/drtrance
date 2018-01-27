define(['basic/entity', 'geo/v2', 'core/graphic', 'basic/image'],
	function(Entity, V2, Graphic, Image) {
        var imageUrl = 'img/health.png';
        Graphic.add(imageUrl);

		function HealthbarController(pos) {
			Entity.call(this);
			this.position = pos;
			this.initial_health = 5;
			this.health = this.initial_health;

			for (var i = 0; i < this.initial_health; i++) {
				this.add(new Image(new V2(1000 + i * 45, 650), imageUrl));
			}
		};

		HealthbarController.prototype = new Entity();

		HealthbarController.prototype.onUpdate = function (delta) {
		};

		HealthbarController.prototype.reduce = function(value) {
			var diff = this.initial_health - value;
			var minus_health = this.health - diff;

			for (var i = 0; i < this.health - diff; i++) {
				this.remove(this.entities[i]);
			}

			this.health = diff;
		};

		return HealthbarController;
	}
);
