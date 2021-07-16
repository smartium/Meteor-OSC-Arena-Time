import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

time = new ReactiveVar()

Template.registerHelper('formatTime', (value)=> {
  minutes = parseInt(value / 60)
  seconds = value % 60
  return `${minutes < 10 ? '0'+minutes : minutes}:${seconds < 10 ? '0'+seconds : seconds}`
})

Template.body.onRendered(()=> {
  Meteor.setInterval(()=> {
    Meteor.call('getTime', (err, res)=> {
      // console.log(res)
      time.set(res)
    })
  }, 1000)
})

Template.body.helpers({
  getTime() {
    return time.get()
  } 
})