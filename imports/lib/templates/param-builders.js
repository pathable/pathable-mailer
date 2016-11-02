import { createAuthorizedUrl } from 'meteor/pathable-utilities';
import { Users, Communities, People } from 'meteor/pathable-collections';

export const authorizedUserParamBuilder = (userId, communityId) => {
  const user = Users.findOne(userId);
  const community = Communities.findOne(communityId);
  const person = People.findOne({ userId, 'memberships.communityId': communityId });

  if (!user) throw new Error('User could not be found');
  if (!community) throw new Error('Community could not be found ');
  if (!person) throw new Error('No person with the provided userId or communityId could be found');

  const { from } = Meteor.settings.public.emailDefaults;
  const to = user.emails[0].address;
  const { firstName, lastName } = person;

  const token = Users.createLoginToken(userId);
  const authUrl = createAuthorizedUrl(community.adminHost(), token);

  return { from, to, firstName, lastName, authUrl };
};
