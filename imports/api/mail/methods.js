import { Email } from 'meteor/email';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import SimpleSchema from 'meteor/pathable-vendor/simpl-schema';

import { authorizedUserParamBuilder } from '/imports/lib/templates/param-builders';
import userMailers from '/imports/lib/mailers/users.js';

const communityUserSchema = new SimpleSchema({
  userId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
  communityId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
});

/**
 * Send the first email to admin after community creation.
 * Note that the community may not have been created along with the account
 * since communities are created over time.
 *
 * @param {Object} params Parameters object
 * @param {String} params.userId Id of the user to which we send the email
 * @param {String} params.communityId Id of the specific community created
 */
const communityWelcome = new ValidatedMethod({
  name: 'communityWelcome',
  validate: communityUserSchema.validator(),

  run({ userId, communityId }) {
    const {
      from,
      to,
      firstName,
      lastName,
      authUrl,
    } = authorizedUserParamBuilder(userId, communityId);

    const subject = '[Pathable] Welcome!';
    const html = userMailers.communityWelcome({ firstName, lastName, authUrl });

    Email.send({ subject, to, from, html });
  },
});

/**
 * Sends a password recovery email to a user with auth link
 *
 * @param {Object} params Parameters object
 * @param {String} params.userId Id of the user to which we send the email
 */
const passwordReset = new ValidatedMethod({
  name: 'passwordReset',
  validate: communityUserSchema.validator(),

  run({ userId, communityId }) {
    const {
      from,
      to,
      authUrl,
    } = authorizedUserParamBuilder(userId, communityId);

    const subject = '[Pathable] Reset your password';
    const html = userMailers.passwordReset({ authUrl });

    Email.send({ subject, to, from, html });
  },
});

export const mailMethods = { communityWelcome, passwordReset };
