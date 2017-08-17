import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check, Match } from 'meteor/check';
import { Notes } from './notes';
import { Slides } from './slides';

import AppState from '/imports/api/appState';

Meteor.methods({
  'circle.insert'(circle) {
    check(circle, {
      type: String,
      data: {
        coords: [{
          x: Number,
          y: Number,
        }]
      },
      color: String,
      size: String,
      slide: Match.Maybe(String)
    });
    circle = Object.assign(circle, {
      slide: Slides.activeSlide('_id'),
    });
    Meteor.call('recordings.insert', 'circle.insert', Array.from(arguments) );
    return Notes.insert(circle);
  },
});