/*globals playerjs:true*/

playerjs.PopcornAdapter = function(popcornInstance){
  if (!(this instanceof playerjs.PopcornAdapter)) {
    return new playerjs.PopcornAdapter(popcornInstance);
  }
  this.init(popcornInstance);
};

playerjs.PopcornAdapter.prototype.init = function(popcornInstance){
      
  var receiver = new playerjs.Receiver();
  
  popcornInstance.on('canplay', function() {
    receiver.ready();
  });
          
  popcornInstance.on ('play', function() {
    receiver.emit('play');
  });
  
  popcornInstance.on ('pause', function() {
    receiver.emit('pause');
  });
  
  popcornInstance.on ('timeupdate', function () {
    receiver.emit('timeupdate', {
       seconds: popcornInstance.currentTime(),
       duration: popcornInstance.duration()
     });
  });
  
  popcornInstance.on ('progress', function() {
    receiver.emit('buffered', {
      percent: popcornInstance.buffered().length
    });
  });
  
  popcornInstance.on ('ended', function() {
    receiver.emit('ended');
  });

  /* Methods */
  receiver.on('play', function(){
    popcornInstance.play();
  });

  receiver.on('pause', function(){
    popcornInstance.pause();
  });

  receiver.on('getPaused', function(callback){
    callback(popcornInstance.paused());
  });

  receiver.on('getCurrentTime', function(callback){
    callback(popcornInstance.currentTime());
  });

  receiver.on('setCurrentTime', function(value){
    popcornInstance.currentTime(value);      
  });

  receiver.on('getDuration', function(callback){
    callback(popcornInstance.duration());      
  });

  receiver.on('getVolume', function(callback){
    callback(popcornInstance.volume() * 100);
  });

  receiver.on('setVolume', function(value){
    popcornInstance.volume (value/100);
  });

  receiver.on('mute', function(){
    popcornInstance.mute();
  });

  receiver.on('unmute', function(){
    popcornInstance.unmute();
  });

  receiver.on('getMuted', function(callback){
    callback (popcornInstance.volume() > 0);
  });

  receiver.on('getLoop', function(callback){
    callback (popcornInstance.loop());
  });

  receiver.on('setLoop', function(value){
    popcornInstance.loop (value);
  });

}