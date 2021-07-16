import { Meteor } from 'meteor/meteor'

var duration = null
var time = null

var OscReceiver = require('osc-receiver')
var receiver = new OscReceiver()
 
receiver.bind(7001)
 
Meteor.startup(() => {
  // receiver.on('/composition/layers/3/clips/4/transport/position/behaviour/duration', function(dur) {
  //   duration = 604800 * dur;
  //   console.log(dur);
  // });
  
  receiver.on('/composition/selectedclip/transport/position', function(pos) {
    time = parseInt(duration-(duration*pos))
  });
   
  receiver.on('message', function() {
    // handle all messages
    var address = arguments[0];
    var splt = address.split('/')
    if (splt[9] == 'duration') {
      duration = 604800 * arguments[1];
      console.log(arguments[1]);
    }
    // var args = Array.prototype.slice.call(arguments, 1);
    // console.log(address);
  });
});

Meteor.methods({
  getTime() {
    return time;
  }
})