import { expect } from 'chai';
// import { spy, match } from 'sinon';

// import '/imports/server/startup';
// import * as userMailer from '/imports/server/mailers/users';
//
import MailTemplate from './template';

describe('Renderer', () => {
  describe('rendering MJML templates with Blaze SSR', () => {
    let template;

    beforeEach(() => {
      template = new MailTemplate('templates/accounts/welcome.mjml');
    });

    it('compiles and renders', () => {
      expect(() => {
        template.compile();
        template.render();
      }).to.not.throw();
    });

    it('compiles with parameters', () => {
      expect(() => {
        template.compile({ firstName: 'firstName', lastName: 'lastName' });
      }).to.not.throw();
    });
  });
});
