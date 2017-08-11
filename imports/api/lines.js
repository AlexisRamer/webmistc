import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check, Match } from 'meteor/check';
import { Notes } from './notes';
import { Slides } from './slides';

import AppState from '/imports/api/appState';

Meteor.methods({
  'line.insert'(line) {
    check(line, {
      type: String,
      data: {
        coords: [{
          x: Number,
          y: Number,
        }]
      },
      color: String,
      size: String,
    });
    line = Object.assign(line, {
      slide: Slides.activeSlide('_id'),
      createdAt: new Date()
    });
    Meteor.call('recordings.insert', 'line.insert', Array.from(arguments) );
    return Notes.insert(line);
  },
});