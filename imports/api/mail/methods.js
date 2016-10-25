import { Email } from 'meteor/email';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { CommunityId as communityIdSchema, UserId as userIdSchema } from 'meteor/pathable-schema';

import { authorizedUserParamBuilder } from '/imports/lib/templates/param-builders';
import userMailers from '/imports/lib/mailers/users.js';

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
  validate: new SimpleSchema([userIdSchema, communityIdSchema]).validator(),

  run({ userId, communityId }) {
    const {
      from,
      to,
      firstName,
      lastName,
      authUrl,
    } = authorizedUserParamBuilder(userId, communityId);

    const html = userMailers.communityWelcome({ firstName, lastName, authUrl });

    Email.send({ to, from, html });
  },
});

/**
 * Sends a password recovery email to a user
 *
 * @param {Object} params Parameters object
 * @param {String} params.userId Id of the user to which we send the email
 */
const passwordReset = new ValidatedMethod({
  name: 'passwordReset',
  validate: new SimpleSchema([userIdSchema, communityIdSchema]).validator(),

  run({ userId, communityId }) {
    const {
      from,
      to,
      authUrl,
    } = authorizedUserParamBuilder(userId, communityId);

    const html = userMailers.passwordReset({ authUrl });
    Email.send({ to, from, html });
  },
});

export const mailMethods = { communityWelcome, passwordReset };

