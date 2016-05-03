import { send } from './methods.js';
import { assert, expect } from 'chai';
import { spy } from 'sinon';

import * as mailMethods from '/imports/server/mail-methods.js';

describe('methods', () => {
  describe('.send', () => {
    describe('Invalid Params', () => {
      it('throws a validation error', () => {
        expect(() => (send.call({ foo: 'bar' }))).to.throw();
        expect(() => (send.call({ params: { some: 'param' } }))).to.throw();
        expect(() => (send.call())).to.throw();
      });
    });

    describe('Valid Params', () => {
      it('calls a mail method that matches mailMethod param', () => {
        const params = { foo: 'bar' };
        const callback = spy();

        mailMethods.example = callback;
        send.call({ mailMethod: 'example', params });

        expect(callback.calledWith(params)).to.eql(true);
      });
    });
  });
});
