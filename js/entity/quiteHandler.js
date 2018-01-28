define(['basic/entity', 'geo/v2', 'core/graphic', 'config/fonts', 'basic/text', 'basic/image'],
function(Entity, V2, g, fonts, TextEntity, ImageEntity) {
    g.add('img/highscore_time.png');
    g.add('img/highscore_score.png');
    g.add('img/highscore_sstreak.png');

    function QuiteHandler(pos, text) {
        Entity.call(this);
        this.position = pos;

        this.image = new ImageEntity(this.position, 'img/highscore_time.png');
        this.image2 = new ImageEntity(new V2(this.position.x, this.position.y + 60), 'img/highscore_score.png');
        this.image3 = new ImageEntity(new V2(this.position.x, this.position.y + 120), 'img/highscore_sstreak.png');

        this.text = new TextEntity(new V2(this.position.x + 180, this.position.y + 27), text, fonts.scoreCenter);
        this.text2 = new TextEntity(new V2(this.position.x + 220, this.position.y + 87), text, fonts.scoreRight);
        this.text3 = new TextEntity(new V2(this.position.x + 220, this.position.y + 147), text, fonts.scoreRight);

        this.add(this.image);
        this.add(this.image2);
        this.add(this.image3);

        this.add(this.text);
        this.add(this.text2);
        this.add(this.text3);
    };

    QuiteHandler.prototype = new Entity();

    return QuiteHandler;
    }
);
