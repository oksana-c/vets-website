import './sass/profile-2.scss';
import 'platform/polyfills';

import startApp from 'platform/startup';

import routes from './routes';
// To start we'll reuse the reducer from the current Profile app. This new
// Profile app will be mostly a new UI/UX but continue using the same data and
// logic under the hood.
import reducer from '../profile360/reducers';
import manifest from './manifest.json';

startApp({
  url: manifest.rootUrl,
  reducer,
  routes,
  entryName: manifest.entryName,
});
