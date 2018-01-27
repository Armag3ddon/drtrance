define(['basic/entity', 'basic/text', 'config/fonts'],
function(Entity, V2, fonts) {
    function GameController(pos) {
      Entity.call(this);

      this.position = pos;
      this.current_time = 0;
      this.current_date = new Date();
      this.current_seconds = 0;
      this.current_minute = 0;
    };

    GameController.prototype = new Entity();

    GameController.prototype.onUpdate = function (delta) {
      this.current_time += delta;
      console.log(this.current_date.getSeconds());
    };

    return GameController;
  }
);
