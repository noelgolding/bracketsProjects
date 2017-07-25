// Constructor
Entity = function(){
    // Generate a pseudo random number
    this.id = (+new Date()).toString(16) + (Math.random() * 100000000 | 0).toString(16) + Entity.prototype._count;
    // increment counter
    Entity.prototype._count++;
    
    // the component data will live in this object
    this.components = {};
    
    return this;
};

// Keep track of the entities created
Entity.prototype._count = 0;

// Methods
Entity.prototype.addComponent = function( component ){
    // Add component data to this entity, expects a component to have a name property
    this.components[component.name] = component;
    return this;  // is this like a builder pattern?
};

Entity.prototype.removeComponent = function( component_name ) {
    delete this.components[component_name]; 
    return this; // is this like a builder pattern that removes components?
};

Entity.prototype.print = function(){
    console.log(JSON.stringify(this, null, 4));
    return this;
};
    