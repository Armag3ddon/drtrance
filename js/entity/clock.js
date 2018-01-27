define(['basic/entity', 'geo/v2', 'config/fonts', 'basic/text'],
function(Entity, V2, fonts, TextEntity) {
    function Clock(pos, text) {
      Entity.call(this);
      this.position = pos;

      this.text = new TextEntity(pos, text, fonts.default);
      this.add(this.text);
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
