define(['basic/entity', 'geo/v2', 'core/graphic', 'lib/animation', 'core/sound', 'basic/image'],
	function(Entity, V2, g, Animation, s, ImageEntity) {
		g.add('img/dr_trance_animation.png');
		g.add('img/swoosh.png');

		s.add('snd/empty_slash.mp3');
		s.add('snd/slash_hit1.mp3');
		s.add('snd/slash_hit2.mp3');
		s.add('snd/slash_hit3.mp3');

		function Player() {
			Entity.call(this);
			this.initial_position = {
				x: 275,
				y: 300
			}
			this.fight_position_x = 800;
			this.position.x = this.initial_position.x;
			this.position.y = this.initial_position.y;

			this.image = new Animation('img/dr_trance_animation.png', Zero(), new V2(4, 4), 150, true);
			this.add(this.image);
			this.animation = 0;
			this.animationTime = 0;

			this.currentY = this.position.y;
			this.current_time = 0;
			this.isInFightPosition = false;
		}

		Player.prototype = new Entity();

		Player.prototype.onUpdate = function(delta) {
			if (this.goesInFightPosition) {
				if (!this.isInFightPosition) {
					this.fightPositionTime = 0;
					this.isInFightPosition = true;
					this.position.x = this.fight_position_x;
					this.image.state = 3;
					this.image.duration = 0;
					this.image.frame = Math.floor(Math.random() * 3);
				} else {
					this.fightPositionTime += delta;

					if (this.fightPositionTime >= 150) {
						this.isInFightPosition = false;
						this.goesInFightPosition = false;
						this.image.state = 0;
						this.image.frame = 0;
						this.image.duration = 150;
						this.position.x = this.initial_position.x;
						this.position.y = this.initial_position.y;
						this.remove(this.swoosh);
						this.swoosh = undefined;
					}
				}
			} else {
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
			}
		};

		Player.prototype.down = function(key) {
			switch(key) {
				case 'up':
				case 'down':
				case 'left':
				case 'right':
					this.moveToFightSpot();
			}
		};

		Player.prototype.moveToFightSpot = function() {
			this.goesInFightPosition = true;
			if (this.swoosh != undefined) return;
			this.swoosh = new ImageEntity(new V2(-650, 100), 'img/swoosh.png');
			this.add(this.swoosh);
		};

		Player.prototype.slash = function(hit) {
			if (!hit) {
				s.play('snd/empty_slash.mp3');
			} else {
				var rnd = Math.floor(Math.random() * 3) + 1;
				s.play('snd/slash_hit' + rnd + '.mp3');
			}

		};

		return Player;
	}
);
