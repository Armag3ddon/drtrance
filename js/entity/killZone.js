define(['basic/entity', 'geo/v2', 'core/graphic', 'lib/animationExt', 'basic/morph', 'definition/easing'],
	function(Entity, V2, graphics, AnimationExt, Morph, Easing) {
		graphics.add('img/killZone.png');

    function killZone(pos, width) {
			Entity.call(this);
			this.position = pos;

			this.image = new AnimationExt('img/killZone.png', Zero(), 2, width, 1, 0, true);
			this.add(this.image);
		}

		killZone.prototype = new Entity();

		killZone.prototype.onUpdate = function(delta) {
			if (this.morphing) {
				this.morphTimer += delta;
				if (this.morphTimer >= 2500) {
					var morph = new Morph({ position: { y: this.morphTo } }, 3000, Easing.INOUTQUAD, function(parent) { parent.stopFlash(); });
					this.add(morph);
					this.morphTimer = 0;
					this.morphing = false;
				}
			}
		};

		killZone.prototype.startFlash = function(toX) {
			this.image.duration = 200;
			this.flash = true;

			this.morphTo = toX;
			this.morphTimer = 0;
			this.morphing = true;
		};

		killZone.prototype.stopFlash = function() {
			this.image.duration = 0;
			this.flash = false;
		};

		return killZone;
	}
);
