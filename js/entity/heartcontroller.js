define(['basic/entity', 'geo/v2', 'entity/heart'],
	function(Entity, V2, Heart) {
		function HeartController(pos) {
			Entity.call(this);

			this.position = pos;
			this.nextSpawnIn = 1000;
		};

		HeartController.prototype = new Entity();

		HeartController.prototype.onUpdate = function (delta) {
			this.nextSpawnIn -= delta;
			var heartScale = Math.random() * (0.8 - 0.5) + 0.5;
			if (this.nextSpawnIn <= 0) {
				this.nextSpawnIn = Math.round(Math.random() * 5000 + 500);
				switch (Math.floor(Math.random() * 3)) {
					case 0:
					{
						this.add(new Heart(new V2(160, 270), heartScale));
						break;
					}
					case 1:
					{
						this.add(new Heart(new V2(80, 350), heartScale));
						break;
					}
					case 2:
					{
						this.add(new Heart(new V2(280, 360), heartScale));
						break;
					}
					default:
					break;
				}
			}
			for (var i = 0; i < this.entities.length; i++)
			{
				if(this.entities[i].position.y <= -50)
				{
					this.remove(this.entities[i]);
				}
			}
		};

		return HeartController;
	}
);
