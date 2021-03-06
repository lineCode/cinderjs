//
// Fbo
var util = require('util');
var Texture = require('texture');
var self = this;

var Fbo = function Fbo( width, height, alpha, depth, stencil ) {
  this._handle = {};
  
  if(alpha.isFormat){
    self.fbo.createFromFormat(this._handle, width, height, alpha.id);
  } 
  else {
    depth = depth === false ? false : true;
    self.fbo.create(this._handle, width, height, alpha, depth, stencil);
  }

  // TODO: Use real vector here (Vector bindings not implemented yet)
  this.size = { x: width, y: height };

  // Buffers
  this._colorTexture = null;
  this._depthTexture = null;
};

// Convinience flag for type checking
Fbo.prototype.__defineGetter__('isFbo', function(){ return true; });
Fbo.prototype.__defineGetter__('isBuffer', function(){ return true; });
Fbo.prototype.__defineGetter__('bufferType', function(){ return 0; });

Fbo.prototype.__defineGetter__('width', function(){ return this.size.x; });
Fbo.prototype.__defineGetter__('height', function(){ return this.size.y; });


module.exports = Fbo;

Fbo.prototype.__defineGetter__('id', function(){
  return this._handle.id;
});

Fbo.prototype.destroy = function(){
  self.fbo.destroy(this._handle.id);
  this._handle = null;
};

Fbo.prototype.bindBuffer = function( target ) {
  if(typeof target == 'undefined'){
    self.fbo.bindBuffer(this._handle.id);
  } else {
    self.fbo.bindBuffer(this._handle.id, target);
  }
};

Fbo.prototype.unbindBuffer = function() {
  self.fbo.unbindBuffer(this._handle.id);
};

Fbo.prototype.bindTexture = function( textureUnit, attachment ) {
  if(typeof textureUnit == 'undefined'){
    self.fbo.bindTexture(this._handle.id);
  } else {
    self.fbo.bindTexture(this._handle.id, textureUnit, attachment);
  }
};

Fbo.prototype.unbindTexture = function( textureUnit, attachment ) {
  if(!textureUnit){
    self.fbo.unbindTexture(this._handle.id);
  } else {
    self.fbo.unbindTexture(this._handle.id, textureUnit, attachment);
  }
};

Fbo.prototype.getColorTexture = function(){
  if(this._colorTexture != null){
    return this._colorTexture;
  }

  var handle = {};
  self.fbo.getColorTexture(this._handle.id, handle);
  this._colorTexture = new Texture();
  this._colorTexture._handle = handle;
  return this._colorTexture;
};

Fbo.prototype.getDepthTexture = function(){
  if(this._depthTexture != null){
    return this._depthTexture;
  }

  var handle = {};
  self.fbo.getDepthTexture(this._handle.id, handle);
  this._depthTexture = new Texture();
  this._depthTexture._handle = handle;
  return this._depthTexture;
};

Fbo.prototype.getAspectRatio = function(){
  return this.size.x / this.size.y;
};


//
// Format
var Format = Fbo.Format = function(){
  this._handle = {};
  self.fbo.createFormat(this._handle);
};

// Convinience flag for type checking
Format.prototype.__defineGetter__('isFormat', function(){ return true; });

Format.prototype.__defineGetter__('id', function(){
  return this._handle.id;
});

Format.prototype.destroy = function(){
  self.fbo.destroyFormat(this._handle.id);
  this._handle = null;
}

Format.prototype.setSamples = function( num ){
  self.fbo.formatSetSamples(this._handle.id, num);
}

Format.prototype.depthTexture = function( textureFormat ){
  if(!textureFormat){
    self.fbo.formatDepthTexture(this._handle.id);
  } else {
    throw new Error('Not implemented yet');
    self.fbo.formatDepthTexture(this._handle.id, textureFormat);
  }
  return this;
}

