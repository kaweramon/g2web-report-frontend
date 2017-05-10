import { G2reportFrontendPage } from './app.po';

describe('g2report-frontend App', () => {
  let page: G2reportFrontendPage;

  beforeEach(() => {
    page = new G2reportFrontendPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
