import { check } from 'meteor/check';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import * as userMailers from './mailers/user.js';

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
  const user = Meteor.users.findOne(userId);
  const token = Random.secret();
  const resetData = { token };

  if (!user) {
    // Should we throw this or exit silently?
    throw new Error('User does not exist');
  }

  const email = user.emails[0].address;

  Meteor.users.update(userId, { $set: {
    passwordReset: resetData,
    createdAt: Date.now(),
  } });

  userMailers.passwordReset(email, token);
}
