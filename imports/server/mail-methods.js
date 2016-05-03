import { check } from 'meteor/check';
import { Random } from 'meteor/random';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Users } from 'meteor/pathable-collections';

import * as userMailers from './mailers/users.js';

export const passwordResetSchema = new SimpleSchema({
  userId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
});

/**
 * Sends a password recovery email to a user
 *
 * @param {Object} params Parameters object
 * @param {String} params.userId Id of the user to which we send the email
 */
export function passwordReset(params) {
  // TODO: Need to implement expiry logic here
  check(params, passwordResetSchema);

  const { userId } = params;
  const user = Users.findOne(userId);
  const token = Random.secret();
  const resetData = {
    token,
    createdAt: Date.now(),
  };

  if (!user) {
    // Should we throw this or exit silently?
    throw new Error('User does not exist');
  }

  const email = user.emails[0].address;

  Meteor.users.update(userId, { $set: {
    'services.password.reset': resetData,
  } });

  userMailers.passwordReset(email, token);
}
