/*
  Async Order Library
  Written by Smertos
*/

module.exports = (function(bindObject) {
  var self = this;
  this.callbacks = [];
  this.catches = [];

  this.step = function(callback) {
    self.callbacks.push(callback);
    return self;
  };

  this.catch = function(callback) {
    self.catches.push(callback);
    return self;
  };

  this.done = function(id) {
    id = (id === undefined) ? 0 : id;
    try {
      self.callbacks[id].apply(bindObject === undefined ? null : bindObject,
        [].concat(function() {

        if(self.callbacks[id + 1] !== undefined) self.done.apply(self.done, [].concat(id + 1, Array.prototype.slice.call(arguments)));
      }, Array.prototype.slice.call(arguments).splice(1)));
    } catch (err) {
      if(self.catches.length === 0) throw err;
      else self.catches.forEach((cb) => { cb(err); });
    }
    return self;
  };
});