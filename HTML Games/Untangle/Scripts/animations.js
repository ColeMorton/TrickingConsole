var Animations = {};

Animations.guideReady = true;

$(function() {

    // load the guide sprite image
    Animations.guide = new Image();
    Animations.guide.onload = function() {

        Animations.guideReady = true;
        
        // setup timer to switch the display frame of the guide sprite
        Animations.guideFrame = 0;
        setInterval(Animations.guideFrameNext, 500);
    };
    
    Animations.guide.src = "Images/guide_sprite.png";
});

Animations.guideFrameNext = function() {

    Animations.guideFrame++;
    // there are only six frames (0-5) in the guide animation.
    // we loop back the frame number to frame 0 after frame 5
    if (Animations.guideFrame > 5) {
        Animations.guideFrame = 0;
    }
};