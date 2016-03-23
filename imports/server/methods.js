import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Mailer } from 'meteor/lookback:emails';

export const send = new ValidatedMethod({
  name: 'send',

  validate: new SimpleSchema({
    template: { type: String },
    subject: { type: String, optional: true },
    userId: {
      type: String,
      regEx: SimpleSchema.RegEx.Id,
      optional: true,
      custom() {
        if (this.isSet || this.field('to').isSet) {
          return true;
        }
        return 'required';
      },
    },
    to: {
      type: String,
      regEx: SimpleSchema.RegEx.Email,
      optional: true,
    },
  }).validator(),

  run({ subject, to, template }) {
    Mailer.send({ subject, to, template });
  },
});
