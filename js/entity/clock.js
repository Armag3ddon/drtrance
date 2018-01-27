define(['basic/entity', 'geo/v2', 'core/graphic', 'config/fonts', 'basic/text', 'basic/image'],
function(Entity, V2, g, fonts, TextEntity, ImageEntity) {
    g.add('img/highscore_time.png');
  	g.add('img/highscore_score.png');
    g.add('img/highscore_sstreak.png');

    function Clock(pos, text) {
      Entity.call(this);
      this.position = pos;

      this.image = new ImageEntity(pos, 'img/highscore_time.png');
      this.add(this.image);
      this.text = new TextEntity(new V2(pos.x + 180, pos.y + 27), text, fonts.scoreCenter);
      this.add(this.text);
      this.image2 = new ImageEntity(new V2(pos.x + 0, pos.y + 60), 'img/highscore_score.png');
      this.add(this.image2);
      this.text2 = new TextEntity(new V2(pos.x + 220, pos.y + 87), text, fonts.scoreRight);
      this.add(this.text2);
      this.image3 = new ImageEntity(new V2(pos.x + 0, pos.y + 120), 'img/highscore_sstreak.png');
      this.add(this.image3);
      this.text3 = new TextEntity(new V2(pos.x + 220, pos.y + 147), text, fonts.scoreRight);
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
