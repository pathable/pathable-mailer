import { Mailer } from 'meteor/lookback:emails';

export function passwordReset(to, token) {
  const subject = 'Password reset';
  const template = 'usersPasswordReset';

  Mailer.send({ subject, to, template, data: { token } });
}
