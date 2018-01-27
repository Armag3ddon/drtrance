define(['basic/entity', 'core/graphic', 'geo/v2'],
		function (Entity, graphics, V2) {
			function AnimationExt( img, pos, frames, xScale, yScale, speed, loop) {
				this.frames = typeof frames == 'number' ? new V2(frames, 1) : frames;
				this.img = graphics[img];
				this.loop = loop;

				this.duration = speed;
				this.anitime = 0;
				this.frame = 0;
				this.state = 0;

				this.xScale = xScale;
				this.yScale = yScale;

				Entity.call(this, pos, new V2(this.img.width / this.frames.x, this.img.height / this.frames.y ));
			}

			AnimationExt.prototype = new Entity();

			AnimationExt.prototype.onUpdate = function(delta) {
				this.anitime += delta;
				if (this.duration == 0)
					return;

				this.frame = Math.floor( this.anitime / this.duration );

				if(this.frame>=this.frames.x && !this.loop)
					this.parent.remove(this);

				this.frame %= this.frames.x;
				this.anitime %= this.frames.x*this.duration;
			};

			AnimationExt.prototype.onDraw = function(ctx) {
				ctx.drawImage( this.img, this.frame*this.size.x, this.state*this.size.y, this.size.x, this.size.y, 0, 0, this.size.x * this.xScale, this.size.y * this.yScale);
			};

			return AnimationExt;
		}
);
