define(['basic/entity', 'geo/v2', 'basic/text', 'basic/rect', 'basic/image', 'lib/animation'],
		function(Entity, V2, TextEntity, RectEntity, ImageEntity, Animation) {
			function Button(pos, callback) {
				Entity.call(this, pos);
				this.onClick = function(p) {
					callback(p);
					return true;
				}
			}

			Button.prototype = new Entity();

			Button.prototype.onMouseDown = function() {
				return true;
			};

			Button.prototype.onUpdate = function() {
				if (!this.hoverImg)
					return;
				if (this.hoverImg.visible && !this.hover())
					this.hoverImg.visible = false;
					if (!this.hoverImg.visible && this.hover())
						this.hoverImg.visible = true;
			};

			Button.create = function(pos, callback) {
				return new Button(pos, callback);
			};

			Button.prototype.text = function(text, font, w, h) {
				this.size.x = Math.max(w||0, this.size.x);
				this.size.y = Math.max(h||0, this.size.y);

				var self = this;
				var txt = new TextEntity(new V2(this.size.x/2, this.size.y/2), text, font);

				txt.hover = function() { return self.hover(); };
				this.setText = function(s) { txt.text = s };

				this.add(txt);
				return this;
			};

			Button.prototype.img = function(src, scale) {
				var img = new ImageEntity(Zero(), src, scale);
				this.size.x = Math.max(img.size.x, this.size.x);
				this.size.y = Math.max(img.size.y, this.size.y);
				this.add(img);
				this.image = img;
				return this;
			};
			Button.prototype.imgHover = function(src, scale) {
				var img = new ImageEntity(Zero(), src, scale);
				this.size.x = Math.max(img.size.x, this.size.x);
				this.size.y = Math.max(img.size.y, this.size.y);
				this.hoverImg = img;
				this.add(img);
				this.hoverImg.visible = false;
				return this;
			};

			Button.prototype.imgAnim = function(src, frames) {
				var img = new Animation(src, Zero(), frames, 0, false);
				this.size.x = Math.max(img.size.x, this.size.x);
				this.size.y = Math.max(img.size.y, this.size.y);
				this.add(img);
				this.animation = img;
				return this;
			};

			Button.prototype.imgAnimHover = function(src, frames) {
				var img = new Animation(src, Zero(), frames, 0, false);
				this.size.x = Math.max(img.size.x, this.size.x);
				this.size.y = Math.max(img.size.y, this.size.y);
				this.hoverImg = img;
				this.add(img);
				this.hoverImg.visible = false;
				return this;
			};

			Button.prototype.changePicture = function(value) {
				switch(value) {
					case 0.5:
						this.animation.state = 3;
						this.hoverImg.state = 3;
					break;
					case 1.0:
						this.animation.state = 0;
						this.hoverImg.state = 0;
					break;
					case 1.5:
						this.animation.state = 1;
						this.hoverImg.state = 1;
					break;
					case 2.0:
						this.animation.state = 2;
						this.hoverImg.state = 2;
					break;
				}
			};

			Button.prototype.rect = function(w, h, color) {
				var self = this;
				var rect = new RectEntity(Zero(), new V2(w,h), color);

				rect.hover = function() { return self.hover(); };

				this.size.x = Math.max(w, this.size.x);
				this.size.y = Math.max(h, this.size.y);
				this.add(rect);
				return this;
			};

			return Button;
		}
);
