import { mjml2html } from 'meteor/pathable-vendor/mjml';
import { SSR, Template } from 'meteor/meteorhacks:ssr';

export default class MailTemplate {
  constructor(fileName) {
    this.fileName = fileName;
    this.template = Assets.getText(fileName);
  }

  compile() {
    SSR.compileTemplate(this.fileName, this.template);
    Template[this.fileName].helpers = {};
  }

  render(data = {}) {
    const mjml = SSR.render(this.fileName, data);
    return mjml2html(mjml);
  }
}
