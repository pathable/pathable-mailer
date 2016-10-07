import MailTemplate from '/imports/server/templates/template';

const passwordReset = ({ authUrl }) => {
  const template = new MailTemplate('templates/accounts/password-reset.mjml');
  template.compile();

  return template.render({ authUrl });
};

const communityWelcome = ({ firstName, lastName, authUrl }) => {
  const template = new MailTemplate('templates/accounts/welcome.mjml');
  template.compile();

  return template.render({ firstName, lastName, authUrl });
};

export { communityWelcome, passwordReset };
