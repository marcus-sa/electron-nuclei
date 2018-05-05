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
  'maximizable',
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