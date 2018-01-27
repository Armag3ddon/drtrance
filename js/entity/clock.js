define(['basic/entity', 'geo/v2', 'config/fonts', 'basic/text'],
function(Entity, V2, fonts, TextEntity, TextEntity2, TextEntity3) {
    function Clock(pos, text) {
      Entity.call(this);
      this.position = pos;

      this.text = new TextEntity(pos, text, fonts.defaultLeft);
      this.add(this.text);
      this.text2 = new TextEntity(new V2(pos.x + 0, pos.y + 40), text, fonts.defaultLeft);
      this.add(this.text2);
      this.text3 = new TextEntity(new V2(pos.x + 0, pos.y + 80), text, fonts.defaultLeft);
      this.add(this.text3);
    };

    Clock.prototype = new Entity();

    Clock.prototype.setClock = function(seconds, minutes) {
      var str_seconds, str_minutes;
      if (seconds <= 9) str_seconds = '0' + seconds;
      else str_seconds = seconds;
      if (minutes <= 9) str_minutes = '0' + minutes;
      else str_minutes = minutes;
      return str_minutes + ':' + str_seconds;
    };

    return Clock;
  }
);
