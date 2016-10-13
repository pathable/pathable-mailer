import { Email } from 'meteor/email';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { CommunityId as communityIdSchema, UserId as userIdSchema } from 'meteor/pathable-schema';

import { authorizedUserParamBuilder } from './templates/param-builders';
import userMailers from './mailers/users.js';

/**
 * A method to change a users password.
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

