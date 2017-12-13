import { expect } from 'chai';
import MailTemplate from './template';

if (Meteor.isServer) {
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
}
