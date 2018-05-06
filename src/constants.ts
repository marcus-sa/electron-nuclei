export const PARAMTYPES_METADATA = 'design:paramtypes'
export const SELF_DECLARED_DEPS_METADATA = 'self:paramtypes'

export const SINGLE_SCOPE_METADATA = '__singleScope__'
export const WINDOW_METADATA = '__window__'
export const COMPONENT_METADATA = '__component__'

export const browserWindowOptions = [
  'width',
  'height',
  'x',
  'y',
  'useContentSize',
  'center',
  'minWidth',
  'minHeight',
  'maxWidth',
  'maxHeight',
  'resizable',
  'movable',
  'minimizable',
  'closable',
  'focusable',
  'alwaysOnTop',
  'fullscreen',
  'fullscreenable',
  'simpleFullscreen',
  'skipTaskbar',
  'kiosk',
  'title',
  'icon',
  'show',
  'frame',
  'parent', // this needs to be added manually by reflecting window class 
  /*
   * import { Window } from 'electron-nuclei'
   * import { ParentWindow } from './ParentWindow'  
   *
   * @Window({
   *   parent: ParentWindow
   * })
   * export class ChildWindow {}
   * 
   **/
  'modal',
  'acceptFirstMouse',
  'disableAutoHideCursor',
  'autoHideMenuBar',
  'enableLargerScreenThan',
  'backgroundColor',
  'hasShadow',
  'opacity',
  'darkTheme',
  'transparent',
  'type',
  'titleBarStyle',
  'fullscreenWindowTitle',
  'thickFrame',
  'vibrancy',
  'zoomToPageWidth',
  'tabbingIdentifier',
  'webPreferences'
]

export const componentMetadataKeys = []

export const windowMetadataKeys = [
  //'devTools', 
  'toggleDevtools',
  'template',
  ...browserWindowOptions
]

export const moduleMetadataKeys = [
  'windows',
  'components'
]

export enum WindowEvents {
  READY_TO_SHOW = 'ready-to-show'
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