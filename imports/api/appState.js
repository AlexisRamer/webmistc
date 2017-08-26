// example: set value
// note: nested objects, e.g. buzz.ding
//
// state.insert({
//   buzz: {
//     ding: true
//   }
// });
// state.update( { buzz: { $exists: true } }, { $set: { 'buzz.ding': true } } );

// example: select field
// note: ignores nested objects, e.g. foo.bar.baz
// http://docs.meteor.com/api/collections.html#fieldspecifiers
//
// state.insert({
//   buzz: true,
//   ding: true,
//   foo: {
//     bar: {
//       baz: true
//     }
//   }
// });
// state.findOne( { }, { fields: { 'foo': 1, _id: 0 } } ); 

import { Mongo } from 'meteor/mongo'; 
import _ from 'lodash';

export default AppState = {};

const State = new Mongo.Collection(null);
const initialState = {
  /* WHITEBOARD */
  whiteboard_fullscreen: false,
  whiteboard_height: undefined, /*[undefined|Integer]*/ 
  whiteboard_width: undefined, /*[undefined|Integer]*/
  /* MICROPHONE */

  mic_muted: true,

  /* NOTES */
  notes_menu_open: false,
  note_type: 'drawing',   /* [drawing|text|line|arrow|circle|box|eraser] */
  note_color: 'blue',  /* [purple|blue|orange|green|red] */
  note_size: 'small', /* [tiny|small|medium|large|huge] */
  note_displaying: false,
  note_erasing: false,
  note_data: {/*
    coords: {
      x: Number,
      y: Number,
    },
    text: String*/
  },
  notes_sticky: true,
  note_sticky_next: '',

  /* FEATURES */
  features_menu_open: false,
  features_show: 'none', 
  /*[none|question|chat|message|role|sound|presentation|slides|vote]*/

  /* ROLES */
  roles_menu_open: false,
  roles_sort: 'attendee', /*[attendee|contributor|presenter|host]*/
  /* USER SERVER DATA*/
  user_role: 'host', /*[attendee|contributor|presenter|host]*/
  user_name: undefined, /*[undefined|username]*/

  /* COLORS */
  colors_menu_open: false,

  /* SIZES */
  sizes_menu_open: false,

  /* ERASER */
  erase_slide_menu_open: false,

  /* SOUND */
  sound_volume: .5, /*range [0,1]*/
  sound_audio_context: false,

  /* RECORD */
  record_start: false,

  /* PLAYBACK */
  playback_start: false,

  /* MESSAGES */
  messages_list_open: false,
  messages_recipient: 'none', /*[none|user_id]*/

  /* VOTE */
  vote_list_open: false,
  vote_start: false,
  vote_poll: 'none', /*[none|vote_poll_id]*/

  /* SLIDES */
  slides_nav_open: false,
  slide_height: undefined, /*[undefined|Integer]*/ 
  slide_width: undefined, /*[undefined|Integer]*/

  /* WINDOW */
  window_height: undefined, /*[undefined|Integer]*/ 
  window_width: undefined, /*[undefined|Integer]*/
}

State.insert(initialState);


AppState.getAll = (query) => {
  const fields = Object
    .keys(initialState)
    .filter( namespace => !!namespace.match( new RegExp(`^${query}_`)))
    .reduce( (fields, namespace) => Object.assign(fields, { [namespace]: 1 }), {})
  return State.findOne( { }, { fields } );
};

AppState.get = (query) => State.findOne( { }, { fields: { [query]: 1} } )[query];

AppState.set = (key, value) => {
  const query = (value !== undefined) ? { [key]: value } : key;
  State.update( {}, { $set: query });
}