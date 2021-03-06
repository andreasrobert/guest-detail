import asyncComponent from '../helpers/AsyncFunc';

const routes = [
  {
    path: 'guestDetails',
    component: asyncComponent(() => import('./containers/GuestDetails'))
  },
  {
    path: 'githubSearch',
    component: asyncComponent(() => import('./containers/GithubSearch'))
  },
  {
    path: 'blank_page',
    component: asyncComponent(() => import('./containers/blankPage'))
  }
];
export default routes;
