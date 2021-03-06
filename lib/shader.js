//
// Shader
var util = require('util');
var self = this;

var Shader = function Shader( vert ) {
  if(!vert) return;
  
  this._handle = {};

  if(vert.isFormat){
    self.shader.createFromFormat(this._handle, vert.id);
  }
  else if(arguments.length == 1) {
    self.shader.create(this._handle, vert);
  }
  else if(arguments.length == 2) {
    self.shader.create(this._handle, vert, arguments[1]);
  }
  else if(arguments.length == 3) {
    self.shader.create(this._handle, vert, arguments[1], arguments[2]);
  }

};

// Convinience flag for type checking
Shader.prototype.__defineGetter__('isShader', function(){ return true; });

module.exports = Shader;

// TODO: Use factory methods Shader.fromFile(...) and Shader.fromString(...)

Shader.prototype.__defineGetter__('id', function(){
  return this._handle.id;
});

Shader.prototype.destroy = function(){
  self.shader.destroy(this._handle.id);
  this._handle = null;
};

Shader.prototype.bind = function() {
  self.shader.bind(this._handle.id);
};

/**
 * Convinience uniform method
 * Does type checks (which can be improved, but are still slow)
 * Warning: Numbers are not diverted between Float and Integer,
 * if the Float is a .0 it will be an Integer.
 */ 
Shader.prototype.uniform = function( name, value ){
  if ( util.isInteger(value) ) {
    console.log('int');
    self.shader.uniformInt(this._handle.id, name, value);
  } 
  else if ( util.isNumber(value) ) {
    console.log('number');
    self.shader.uniformFloat(this._handle.id, name, value);
  } 
  else {
    throw new Error('Shader uniform value type "' + (typeof value) + '" not (yet) supported.');
  }
}

Shader.prototype.uniformInt = function( name, value ) {
  self.shader.uniformInt(this._handle.id, name, value);
};

Shader.prototype.uniformFloat = function( name, value ) {
  self.shader.uniformFloat(this._handle.id, name, value);
};

Shader.prototype.uniformVec3 = function( name, vec ) {
  if(!vec.isVec3){
    throw new TypeError('Need a Vec3');
  }
  self.shader.uniformVec3(this._handle.id, name, vec.id);
};


Shader.getStockColor = function() {
  var handle = {};
  self.shader.getStockColor(handle);
  var shader = new Shader();
  shader._handle = handle;
  return shader;
};

Shader.getStockTexture = function( target ) {
  // TODO: take optional target num
  var handle = {};
  self.shader.getStockTexture(handle);
  var shader = new Shader();
  shader._handle = handle;
  return shader;
};

//
// Format
var Format = Shader.Format = function(){
  this._handle = {};
  self.shader.createFormat(this._handle);
};

// Convinience flag for type checking
Format.prototype.__defineGetter__('isFormat', function(){ return true; });

Format.prototype.__defineGetter__('id', function(){
  return this._handle.id;
});

Format.prototype.destroy = function(){
  self.shader.destroyFormat(this._handle.id);
  this._handle = null;
};

Format.prototype.vertex = function( shaderPath ){
  self.shader.formatVertex(this._handle.id, shaderPath);
  return this;
};

Format.prototype.fragment = function( shaderPath ){
  self.shader.formatFragment(this._handle.id, shaderPath);
  return this;
};

Format.prototype.geometry = function( shaderPath ){
  self.shader.formatGeometry(this._handle.id, shaderPath);
  return this;
};

Format.prototype.feedbackFormat = function( num ){
  self.shader.formatFeedbackFormat(this._handle.id, num);
  return this;
};

Format.prototype.feedbackVaryings = function( arr ){
  self.shader.formatFeedbackVaryings(this._handle.id, arr);
  return this;
};

Format.prototype.attribLocation = function( name, num ){
  self.shader.formatAttribLocation(this._handle.id, name, num);
  return this;
};
