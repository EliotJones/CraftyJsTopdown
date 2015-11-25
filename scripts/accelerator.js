Crafty.c("Topdown", {
    require: "Motion, Keyboard, 2D",

    _maxAx: 100,
    _maxAy: 100,
    _maxVx: 100,
    _maxVy: 100,
    _axStep: 5,
    _ayStep: 5,
    _perFrameSpeed: 50,
    _friction: 25,
    _currentRotation: 0,
    _currentX: 0,
    _currentY: 0,

    init: function () {
        this.origin(15, 15);
        this.vx = 0;
        this.vy = 0;
        this.ax = 0;
        this.ay = 0;
    },

    events: {
        "Moved": function () {
            var isRightPressed = this._keyIsDown.Right(this);
            var isLeftPressed = this._keyIsDown.Left(this);
            var isUpPressed = this._keyIsDown.Up(this);
            var isDownPressed = this._keyIsDown.Down(this);

            if (!isRightPressed && !isLeftPressed && this.vx !== 0) {
                var xSign = (this.vx >= 0) ? 1 : -1;
                this.ax = this._decayAcceleration(this.ax, xSign, this._friction);
            }

            if (!isUpPressed && !isDownPressed && this.vy !== 0) {
                var ySign = (this.vy >= 0) ? 1 : -1;
                this.ay = this._decayAcceleration(this.ay, ySign, this._friction);
            }

            if (isRightPressed) {
                this.vx = this._changeVelocity(this.vx, this._maxVx, 1);
                if (this.ax < this._maxAx) {
                    this.ax += this._axStep;
                }
            }

            if (isLeftPressed) {
                this.vx = this._changeVelocity(this.vx, this._maxVx, -1);
                if (this.ax < this._maxAx) {
                    this.ax -= this._axStep;
                }
            }
            if (isUpPressed) {
                this.vy = this._changeVelocity(this.vy, this._maxVy, -1);
                if (this.ay < this._maxAy) {
                    this.ay -= this._ayStep;
                }
            }
            if (isDownPressed) {
                this.vy = this._changeVelocity(this.vy, this._maxVy, 1);
                if (this.ay < this._maxAy) {
                    this.ay += this._ayStep;
                }
            }

            // TODO: Rotate the object on changing direction. 
            // NewDirection not working due to logging all direction changes.
            //if ((isLeftPressed || isRightPressed) && (isUpPressed || isDownPressed)) {
            //    if (isRightPressed) {
            //        this.rotation = (isDownPressed) ? 45 : 135;
            //    }
            //    if (isLeftPressed) {
            //        this.rotation = (isDownPressed) ? 315 : 225;
            //    }
            //} else if (isLeftPressed || isRightPressed) {
            //    this.rotation = (isRightPressed) ? 270 : 90;
            //} else if (isUpPressed || isDownPressed) {
            //    this.rotation = (isDownPressed) ? 0 : 270;
            //}
        },
        "NewDirection": function (e) {
            console.log(e);
            var x = e.x;
            var y = e.y;
            
            if (x) {
                this.ax = 0;
                this.vx = 0;
            }

            if (y) {
                this.ay = 0;
                this.vy = 0;
            }
        }
    },

    _keyIsDown: {
        Right: function (o) {
            return o.isDown(Crafty.keys.RIGHT_ARROW)
                || o.isDown(Crafty.keys.D);
        },
        Left: function (o) {
            return o.isDown(Crafty.keys.LEFT_ARROW)
                || o.isDown(Crafty.keys.A);
        },
        Up: function (o) {
            return o.isDown(Crafty.keys.UP_ARROW)
                || o.isDown(Crafty.keys.W);
        },
        Down: function (o) {
            return o.isDown(Crafty.keys.DOWN_ARROW)
                || o.isDown(Crafty.keys.S);
        }
    },

    _changeVelocity: function (currentV, maxV, sign) {
        currentV *= sign;
        currentV = this._clamp(currentV + this._perFrameSpeed, 0, maxV);
        return currentV * sign;
    },

    _decayAcceleration: function (currentA, sign, friction) {
        currentA *= sign;
        if (currentA > 0) {
            currentA = 0;
        }
        currentA = this._clamp(currentA - friction, -this._friction * 10, 0);
        return currentA * sign;
    },

    _clamp: function (i, min, max) {
        return (i > max) ? max : (i < min) ? min : i;
    },

    _getVelocitySign(v) {
        return (v > 0) ? 1 : (v < 0) ? -1 : 0;
    },

    friction: function(frictionCoefficient) {
        if (typeof(frictionCoefficient) === "number") {
            this._friction = frictionCoefficient;
        }
    }
});