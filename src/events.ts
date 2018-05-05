export enum WindowEvents {
  READY = 'ready-to-show'
}

export enum AppEvents {
  READY = 'ready',
  ALL_WINDOW_CLOSED = 'window-all-closed',
  WILL_FINISH_LAUNCHING = 'will-finish-launching',
  BEFORE_QUIT = 'before-quit',
  WILL_QUIT = 'will-quit',
  OPEN_FILE = 'open-file',
  OPEN_URL = 'open-url',
  ACTIVATE = 'activate',
  CONTINUE_ACTIVITY = 'continue-activity',
  WILL_CONTINUE_ACTIVITY = 'will-continue-activity',
  CONTINUE_ACTIVITY_ERROR = 'continue-activity-error',
  ACTIVITY_WAS_CONTINUED = 'activity-was-continued',
  UPDATE_ACTIVITY_STATE = 'update-activity-state',
  NEW_WINDOW_FOR_TAB = 'new-window-for-tab',
  BROWSER_WINDOW_BLUR = 'browser-window-blur',
  BROWSER_WINDOW_FOCUS = 'browser-window-focus',
  BROWSER_WINDOW_CREATED = 'browser-window-created',
  WEB_CONTENTS_CREATED = 'web-contents-created',
  CERTIFICATE_ERROR = 'certificate-error',
  SELECT_CLIENT_CERTIFICATE = 'select-client-certificate',
  LOGIN = 'login',
  GPU_PROCESS_CRASHED = 'gpu-process-crashed',
  ACCESSIBILITY_SUPPORT_CHANGED = 'accessibility-support-changed'
}