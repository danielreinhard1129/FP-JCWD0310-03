import Home from './user/page';

describe('<Home />', () => {
  it('mounts', () => {
    cy.mount(<Home />);
  });
});
