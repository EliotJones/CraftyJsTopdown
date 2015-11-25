Game = {
    start: function () {
        Crafty.init(500, 500);

        Crafty.e("2D, DOM, Color, Fourway, Topdown")
            .color("#0AE")
            .fourway(1)
        .attr(
        {
            x: 100,
            y: 100,
            h: 30,
            w: 30
        });
    }
}