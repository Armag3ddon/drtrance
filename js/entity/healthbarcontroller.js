define(['basic/entity', 'geo/v2', 'core/graphic', 'basic/image'],
	function(Entity, V2, Graphic, Image) {
		var imageHealthbarUrl = 'img/UI.png';
		var imageLives1Url = 'img/lives_1.png';
		var imageLives2Url = 'img/lives_2.png';
		var imageLives3Url = 'img/lives_3.png';
		var imageHealthFullUrl = 'img/health_full.png';
		var imageHealthMediumUrl = 'img/health_medium.png';
		var imageHealthLowUrl = 'img/health_low.png';
		Graphic.add(imageHealthbarUrl);
		Graphic.add(imageLives1Url);
		Graphic.add(imageLives2Url);
		Graphic.add(imageLives3Url);
		Graphic.add(imageHealthFullUrl);
		Graphic.add(imageHealthMediumUrl);
		Graphic.add(imageHealthLowUrl);
		
		function HealthbarController(pos) {
			Entity.call(this);
			this.position = pos;
			this.initial_health = 5;
			this.health = this.initial_health;
			this.add(new Image(new V2(900, 500), imageHealthbarUrl));
			this.health_blobs = [];
			this.imageLives = '';

			this.setTo(5, 3);
		};

		HealthbarController.prototype = new Entity();

		HealthbarController.prototype.onUpdate = function (delta) {
			var health_blobs_length = this.health_blobs.length;
			if (this.health < health_blobs_length) {
				this.remove(this.health_blobs.pop());
			}

			this.setTo(this.health_blobs.length);
		};

		HealthbarController.prototype.reduce = function(value) {
			this.health -= 1;
		};

		HealthbarController.prototype.setTo = function(value, lives) {
			var health_blob, image, image_lives = '', offset;

			if (lives === 3) {
				image_lives = imageLives3Url;
			}
			else if (lives === 2) {
				image_lives = imageLives2Url;
			}
			else if (lives === 1) {
				image_lives = imageLives1Url;
			}

			if (value === 5) {
				image = imageHealthFullUrl;
				offset = 1;
			}
			else if (value === 3) {
				image = imageHealthMediumUrl;
				offset = 3;
			}
			else if (value === 1) {
				image = imageHealthLowUrl;
				offset = 5;
			}
			else {
				return;
			}

			this.removeHealthBlobs();
			
			for (var i = value - 1; i >= 0; --i) {
				health_blob = new Image(new V2(883 + (i + offset) * 58, 606), image);
				this.add(health_blob);
				this.health_blobs.push(health_blob);
			}

			if (image_lives !== '') {
				this.remove(this.imageLives);
				this.imageLives = new Image(new V2(956, 518), image_lives);
				this.add(this.imageLives);
			}

			this.health = value;
		};

		HealthbarController.prototype.removeHealthBlobs = function() {
			for (var i = 0; i < this.health_blobs.length; i++) {
				this.remove(this.health_blobs[i]);
			}

			this.health_blobs = [];
		}

		return HealthbarController;
	}
);
