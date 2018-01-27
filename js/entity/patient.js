define(['basic/entity', 'geo/v2', 'core/graphic', 'lib/animation', 'basic/image'],
	function(Entity, V2, g, Animation, ImageEntity) {
		g.add('img/patients.png');
		g.add('img/patient1_animation.png');
		g.add('img/patient2_animation.png');
		g.add('img/patient3_animation.png');

		function Patient(pos, type) {
			Entity.call(this);
			this.position = pos;

			this.image = new Animation('img/patient' + type + '_animation.png', Zero(), new V2(4,4), 150, true);
			this.add(this.image);
			this.animation = 0;
			this.animationTime = 0;


			this.beatTime = 0;
			this.beatTimer = 0;
			this.beatDir = 1;

			this.startX = this.position.x;
			this.startY = this.position.y;
      		this.health = 5;
		}

		Patient.prototype = new Entity();

		Patient.prototype.onUpdate = function(delta) {
			if (this.health < 3)
				return;

			this.animationTime += delta;
			if (this.animation == 0) {
				if (this.animationTime >= 2000) {
					if (Math.random()*100 > 95) {
						var anim = Math.floor(Math.random() * 2 + 1);
						this.animation = anim;
						this.animationTime = 0;
						this.image.state = anim;
					}
				}
			} else {
				if (this.animationTime >= 150) {
					this.animation = 0;
					this.animationTime = 0;
					this.image.state = 0;
				}
			}
			return;

			/*
			this.beatTimer += delta;
			var percentage = this.beatTimer / this.beatTime;
			if (this.beatDir == 1)
				var newX = Math.round(this.startX + 40 * percentage);
			else {
				var newX = Math.round(this.startX + 40 - 40 * percentage);
				}
			var newY = Math.round(this.startY - 20 * Math.sin((180*percentage) / 180 * Math.PI));

			this.position.x = newX;
			this.position.y = newY;*/
		};

		Patient.prototype.beat = function(duration) {
			this.beatDir *= -1;
			this.beatTime = duration;
			this.beatTimer = 0;
		};

		Patient.prototype.setActive = function(value) {
			this.active = value;
		};

		Patient.prototype.reduceHealth = function() {
			//this.health -= 1;
			if (this.health < 3) {
				this.image.state = 3;
			}
		}

		Patient.prototype.isDefeated = function() {
			return this.health <= 0;
		}

		return Patient;
	}
);
