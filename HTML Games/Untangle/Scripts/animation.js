Animation = function (image, clippingX, clippingY) {
    this.speed = 0;
    this.frame = 0;
    this.lastFrame = null;
    this.firstFrame = null;
    this.image = image;
    this.clippingX = clippingX;
    this.clippingY = clippingY;
    this.animationInterval = null;
    var self = this;
    
    this.setSpeed = function(speed) {
        this.speed = speed;

        if (this.animationInterval !== null || speed === 0) {
            clearInterval(this.animationInterval);
        }

        this.animationInterval = setInterval(function () { self.incrementFrame(); }, speed);
    };
    
    this.incrementFrame = function () {
        this.frame++;

        if (this.lastFrame !== null & this.frame > this.lastFrame) {
            this.frame = this.startFrame;
        }
    };
    
    this.setFirstFrame = function (startFrame) {
        this.startFrame = startFrame;
    };
    
    this.setLastFrame = function (lastFrame) {
        this.lastFrame = lastFrame;
    };
    
    this.getImage = function () {
        return this.image;
    };
    
    this.getFrameX = function () {
        return this.frame * clippingX;
    };
    
    this.getFrameY = function () {

        return this.frame * clippingY;
    };
};