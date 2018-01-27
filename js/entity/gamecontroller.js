define(['basic/entity', 'basic/text', 'config/fonts'],
function(Entity, V2, fonts) {
    function GameController(pos) {
      Entity.call(this);

      this.position = pos;
      this.current_time = 55;
      this.current_seconds = 0;
      this.current_minute = 0;
    };

    GameController.prototype = new Entity();

    GameController.prototype.onUpdate = function (delta) {
      this.current_time += delta/1000;
      this.current_seconds = Math.floor(this.current_time)%60;
      this.current_minute = Math.floor(this.current_time)/60;
    };

    return GameController;
  }
);
