// Systems and Components are unique per game - how to make a framework/toolkit?

// Here, we've implemented systems as functions which take in an array of
// entities. An optimization would be to have some layer which only 
// feeds in relevant entities to the system, but for demo purposes we'll
// assume all entities are passed in and iterate over them.

// ==================== START RENDER SYSTEM ===============
// FIXME how to do this right?
function clearCanvas(){
    // FIXME - anyway to get away from global var ctx?
    ctx.save();
    
    ctx.setTransform(1,0,0,1,0,0);
    // FIXME - anyway to get away from global vars canvas_width, canvas_height?
    ctx.clearRect(0, 0, canvas_width, canvas_height);
    
    ctx.restore();
}

RenderSystem = function( entities ){
    // This happens each tick, so we need to clear out the previous rendered state
    clearCanvas();
    
    var currEntity, fillStyle;
    
    for(var entityId in entities) {
        currEntity = entities[entityId];
        // Only run logic if entity has relevant components
        // For rendering, we need appearance and position. Your own render 
        // system would use whatever other components specific for your game
        if( currEntity.components.appearance && currEntity.components.position ){
            var pos = currEntity.components.position;
            var size = currEntity.components.appearance.size;
            var color = currEntity.components.appearance.color;
            fillStyle = 'rgba(' + [color.r, color.g, color.b];
            var transparency = curEntity.components.collision ? 1 : 0.1;
            fillStyle += ',' + transparency + ')';
            
            // FIXME - anyway to get away from global var?
            ctx.fillStyle = fillStyle;
            
            // if not player and big, color it differently
            if (!currEntity.components.player_controlled && size > 12) {
                ctx.fillStyle = 'rgba(0,0,0,0.8)';
            }
            
            // every box gets an outline
            ctx.strokeStyle = 'rgba(0,0,0,1)';
            
            // draw the rect.
            ctx.fillRect(
                pos.x - size,
                pos.y - size,
                size * 2,
                size * 2
            );
            // stroke the rect.
            ctx.strokeRect(
                pos.x - size,
                pos.y - size,
                size * 2,
                size * 2
            );
        }
    }
};
// ==================== END RENDER SYSTEM ===============

// ==================== START COLLISION SYSTEM ===============
function doesIntersect(obj1, obj2) {
    // Takes in two objects with position and size properties
    //  obj1: player controlled position and size
    //  obj2: object to check
    //
    var rect1 = {
        x: obj1.position.x - obj1.size,
        y: obj1.position.y - obj1.size,
        height: obj1.size * 2,
        width: obj1.size * 2
    };
    var rect2 = {
        x: obj2.position.x - obj2.size,
        y: obj2.position.y - obj2.size,
        height: obj2.size * 2,
        width: obj2.size * 2
    };

    return (rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.height + rect1.y > rect2.y);
}

CollisionSystem = function( entities ){
    var currEntity;
    var collidesWith = [];
    for(var entityId in entities) {
        
    }
};
// ==================== END COLLISION SYSTEM ===============

// ==================== START DECAY SYSTEM ===============
DecaySystem = function(){};
// ==================== END DECAY SYSTEM ===============

// ==================== START USER INPUT SYSTEM ===============
UserInputSystem = function(){};
// ==================== END USER INPUT SYSTEM ===============
