import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Mailer } from 'meteor/lookback:emails';

export const send = new ValidatedMethod({
  name: 'send',

  validate: new SimpleSchema({
    mail: { type: String },
    params: {
      type: Object,
      optional: true,
    },
  }).validator(),

  run({ subject, to, template }) {
    Mailer.send({ subject, to, template });
  },
});
