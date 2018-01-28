define(['basic/entity', 'geo/v2', 'core/graphic'],
	function(Entity, V2, g) {
		g.add('img/Slash.png');

		function SlashEffect(pos) {
			var width = g['img/Slash.png'].width;
			var height = g['img/Slash.png'].height;
			pos.x -= width/2;
			pos.y -= height/2;
			Entity.call(this, pos, new V2(width, height));

			this.lifetime = 0;
			this.maxStretch = 250;
			this.maxLifetime = 350;
		}

		SlashEffect.prototype = new Entity();

		SlashEffect.prototype.onUpdate = function(delta) {
			this.lifetime += delta;

			if (this.lifetime >= this.maxLifetime)
				this.parent.remove(this);
		};

		SlashEffect.prototype.onDraw = function(ctx) {
			try {
				var height = Math.min(Math.round(Math.min(this.lifetime / this.maxStretch, 100) * this.size.y), 1);
				var width = Math.min(Math.round(Math.min(this.lifetime / this.maxStretch, 100) * this.size.x), 1);
				ctx.drawImage(g['img/Slash.png'], 0, 0, width, height, 0, 0, width, height);
			}
			finally {
				return;
			}
		};

		return SlashEffect;
	}
);
