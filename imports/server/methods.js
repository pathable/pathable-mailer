import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import * as mailMethods from '/imports/server/mail-methods.js';

export const send = new ValidatedMethod({
  name: 'send',

  validate: new SimpleSchema({
    mailMethod: { type: String },
    params: {
      type: Object,
      optional: true,
    },
  }).validator(),

  run({ mailMethod, params }) {
    mailMethods[mailMethod](params);
  },
});
