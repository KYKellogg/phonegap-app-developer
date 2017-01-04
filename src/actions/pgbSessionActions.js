import * as pgb from 'utils/pgb';

export function pgbLoginRequested() {
  return {
    type: 'PGB_LOGIN_REQUESTED',
  };
}

export function pgbLoginReceived(accessToken) {
  return {
    type: 'PGB_LOGIN_RECEIVED',
    accessToken,
  };
}

export function pgbLoggedOut(accessToken) {
  return {
    type: 'PGB_LOGGED_OUT',
  };
}

export function pgbAppsRequested() {
  return {
    type: 'PGB_APPS_REQUESTED',
  };
}

export function pgbAppsReceived(apps) {
  return {
    type: 'PGB_APPS_RECEIVED',
    apps,
  };
}

export function pgbCreateAppRequested() {
  return {
    type: 'PGB_CREATE_APP_REQUESTED',
  };
}

export function pgbCreateAppReceived(app) {
  return {
    type: 'PGB_CREATE_APP_RECEIVED',
    app,
  };
}

export function pgbPluginAnalysisRequested() {
  return {
    type: 'PGB_PLUGIN_ANALYSIS_REQUESTED',
  };
}

export function pgbPluginAnalysisReceived(plugins) {
  return {
    type: 'PGB_PLUGIN_ANALYSIS_RECEIVED',
    plugins,
  };
}

export function pgbCheckPhonegapVersion(state) {
  return {
    type: 'PGB_CHECK_PHONEGAP_VERSION',
    state,
  };
}

export function pgbAppZipUrlRequested() {
  return {
    type: 'PGB_APP_ZIP_URL_REQUESTED',
  };
}

export function pgbAppZipUrlReceived(url) {
  return {
    type: 'PGB_APP_ZIP_URL_RECEIVED',
    url,
  };
}

export function fetchApps(accessToken) {
  return (dispatch) => {
    dispatch(pgbAppsRequested());

    return pgb.fetchApps(accessToken)
    .then((apps) => {
      console.log(`${apps.length} apps found`);
      dispatch(pgbAppsReceived(apps));
    });
  };
}

export function checkPhonegapVersion(app) {
  return (dispatch) => {
    const result = pgb.checkPhonegapVersion(app);
    return dispatch(pgbCheckPhonegapVersion(result));
  };
}

export function login() {
  return (dispatch) => {
    dispatch(pgbLoginRequested());

    return pgb.login()
    .then((accessToken) => {
      dispatch(pgbLoginReceived(accessToken));
    });
  };
}

export function logout() {
  return (dispatch) => {
    pgb.logout();
    return dispatch(pgbLoggedOut());
  };
}

export function createSampleApp(accessToken) {
  return (dispatch) => {
    dispatch(pgbCreateAppRequested());

    return pgb.createSampleApp(accessToken)
    .then((app) => {
      dispatch(pgbCreateAppReceived(app));
    });
  };
}

export function analyzePlugins(appID, accessToken) {
  return (dispatch) => {
    dispatch(pgbPluginAnalysisRequested());

    return pgb.analyzePlugins(appID, accessToken)
    .then((plugins) => {
      dispatch(pgbPluginAnalysisReceived(plugins));
    });
  };
}

export function fetchAppZipUrl(appID, accessToken) {
  return (dispatch) => {
    dispatch(pgbAppZipUrlRequested());

    return pgb.fetchAppZipUrl(appID, accessToken)
    .then((url) => {
      dispatch(pgbAppZipUrlReceived(url));
    });
  };
}