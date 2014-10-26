//
// Light
var Color = require('color').Color;

var LightWrapper = function LightWrapper(type){
  this.id = light.create(type || LightWrapper.DIRECTIONAL);
  
  // Defaults
  this._ambient = new Color(.9, .9, .9, 1);
  this._diffuse = new Color(.9, .9, .9, 1);
  this._specular = new Color(.9, .9, .9, 1);
}

// Convinience flag for type checking
LightWrapper.isLight = true;

// Types
LightWrapper.POINT = light.LIGHT_POINT;
LightWrapper.DIRECTIONAL = light.LIGHT_DIRECTIONAL;
LightWrapper.SPOTLIGHT = light.LIGHT_SPOTLIGHT;

exports.Light = LightWrapper;

LightWrapper.prototype.enable = function(){
  light.enable( this.id );
}

LightWrapper.prototype.disable = function(){
  light.disable( this.id );
}

LightWrapper.prototype.setAmbient = function( r, g, b, a ){
  this._ambient.set( r, g, b, a );
  light.setAmbient(
    this.id,
    this._ambient.r,
    this._ambient.g,
    this._ambient.b,
    this._ambient.a
  );
}
LightWrapper.prototype.ambient = LightWrapper.prototype.setAmbient;

LightWrapper.prototype.setDiffuse = function( r, g, b, a ){
  this._diffuse.set( r, g, b, a );
  light.setDiffuse(
    this.id,
    this._diffuse.r,
    this._diffuse.g,
    this._diffuse.b,
    this._diffuse.a
  );
}
LightWrapper.prototype.diffuse = LightWrapper.prototype.setDiffuse;

LightWrapper.prototype.setSpecular = function( r, g, b, a ){
  this._specular.set( r, g, b, a );
  light.setSpecular(
    this.id,
    this._specular.r,
    this._specular.g,
    this._specular.b,
    this._specular.a
  );
}
LightWrapper.prototype.specular = LightWrapper.prototype.setSpecular;

LightWrapper.prototype.setPosition = function( x, y, z ){
  light.setPosition(
    this.id, x, y, z
  );
}
LightWrapper.prototype.position = LightWrapper.prototype.setPosition;

LightWrapper.prototype.lookAt = function( ex, ey, ez, tx, ty, tz ){
  light.lookAt(
    this.id, ex, ey, ez, tx, ty, tz
  );
}