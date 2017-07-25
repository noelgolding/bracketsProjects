HealthComponent = function( value ){
    this.value = value || 20;
    return this;
};
HealthComponent.prototype.name = 'health';

PositionComponent = function( x, y) {
    this.x = x || 0;
    this.y = y || 0;
    return this;
}
PositionComponent.prototype.name = 'position';

AppearanceComponent = function( params ){
    params = params || {};
    this.color = params.color || {r: 0, g: 100, b: 150};
    this.size = params.size || (1 + (Math.random() * 30 | 0)); // TODO - should this be scale?
    return this;
};
AppearanceComponent.prototype.name = 'appearance';

PlayerControlledComponent = function( params ){
    this.pc = true;
    return this;
};
PlayerControlledComponent.prototype.name = 'player_controlled';

CollisionComponent = function( params ) {
    this.collides = true;
    return this;
};
CollisionComponent.prototype.name = 'collision'