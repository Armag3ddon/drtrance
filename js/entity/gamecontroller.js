define(['basic/entity', 'basic/text', 'config/fonts'],
function(Entity, V2, fonts) {
    function GameController(pos) {
      Entity.call(this);

      this.position = pos;
      this.current_time = 0;
    };

    GameController.prototype.onUpdate = function (delta) {
      this.current_time += delta;
    };
    return GameController;
  }
);
