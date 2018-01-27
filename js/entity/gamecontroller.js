define(['basic/entity','geo/v2', 'entity/clock'],
function(Entity, V2, Clock) {
    function GameController(pos) {
      Entity.call(this);

      this.position = pos;
      this.current_time = 0;
      this.current_seconds = 0;
      this.current_minute = 0;
      this.clock = new Clock(new V2(50, 50), this.current_seconds, this.current_minute);
      this.add(this.clock);

      this.currentScore = 0;
      this.mulitplierer = 1;
    };

    GameController.prototype = new Entity();

    GameController.prototype.onUpdate = function (delta) {
      this.current_time += delta/1000;
      this.current_seconds = Math.floor(this.current_time)%60;
      this.current_minute = Math.floor(this.current_time)/60;
      this.clock.text.text = this.clock.setClock(Math.floor(this.current_seconds), Math.floor(this.current_minute));
      this.clock.text2.text = this.currentScore;
      this.clock.text3.text = '+=' + this.mulitplierer;
    };
    return GameController;
  }
);
