define(['basic/text', 'config/fonts'],
function(Entity, V2, fonts) {
    function Clock(pos, text) {
      Entity.call(this);
      this.position = pos;
      this.text = text;
    };

    Clock.prototype = new Text();


		TextEntity.prototype.onDraw = function(ctx) {
			this.font.apply(ctx, this.hover());
			ctx.fillText(this.text, 0, 0);
		};

    return Clock;
  }
);
