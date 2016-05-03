export default {
  path: '/users/password-reset.html',
  helpers: {
    preview: () => ('This email was sent to you because you requested to reset your password.'),
    pathableAppUrl() {
      return Meteor.settings.pathableAppUrl;
    },
    token() {
      return this.token;
    },
  },
  route: {
    path: '/users/password-reset',
    data: () => ({
      token: 'example-token',
    }),
  },
};
