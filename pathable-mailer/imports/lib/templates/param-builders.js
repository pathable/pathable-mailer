import { createAuthorizedUrl } from 'meteor/pathable-utilities';
import { Users, Communities, People } from 'meteor/pathable-collections';

export const authorizedUserParamBuilder = (userId, communityId) => {
  const user = Users.findOne(userId);
  if (!user) {
    throw new Meteor.Error('not-found', 'User could not be found', { userId });
  }

  const community = Communities.findOne(communityId);
  if (!community) {
    throw new Meteor.Error('not-found', 'Community could not be found ', {
      communityId,
    });
  }

  const { _id: accountId } = community.account();
  const person = People.findOne({ userId, accountId });
  if (!person) {
    throw new Meteor.Error(
      'not-found',
      'No person with the provided userId or communityId could be found',
      { userId, accountId }
    );
  }

  const { from } = Meteor.settings.public.emailDefaults;
  const to = user.emails[0].address;
  const { firstName, lastName } = person;

  const token = Users.createLoginToken(userId);
  const authUrl = createAuthorizedUrl(community.adminHost(), token);

  return { from, to, firstName, lastName, authUrl };
};
