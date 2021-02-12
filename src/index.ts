export {
  /**
   * @deprecated From 0.2.0 new name 'travisciPlugin' should be used
   */
  travisciPlugin as plugin,
  travisciPlugin,
} from './plugin';
export * from './api';
export {
  /**
   * @deprecated From 0.2.0 composability API should be used
   */
  Router,
  /**
   * @deprecated From 0.2.0 new name 'isTravisciAvalilable' should be used
   */
  isTravisciAvailable as isPluginApplicableToEntity,
  isTravisciAvailable,
} from './Router';
export {
  /**
   * @deprecated From 0.2.0 composability API should be used
   */
  RecentTravisCIBuildsWidget,
} from './components/RecentTravisCIBuildsWidget';
