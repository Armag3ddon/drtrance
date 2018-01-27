define(['basic/entity', 'geo/v2', 'basic/rect'],
	function(Entity, V2, RectEntity) {
		function Healthbar(pos) {
			Entity.call(this);
            this.position = pos;
		};

		Healthbar.prototype = new Entity();

		Healthbar.prototype.onUpdate = function (delta) {
			
		};

		Healthbar.prototype.rect = function(w, h, color) {
			var self = this;
			var rect = new RectEntity(Zero(), new V2(w,h), color);

			rect.hover = function() { return self.hover(); };

			this.size.x = Math.max(w, this.size.x);
			this.size.y = Math.max(h, this.size.y);
			this.add(rect);
			return this;
		};

		return Healthbar;
	}
);
