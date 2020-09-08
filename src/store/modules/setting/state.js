/* eslint-disable */
import Cookie from 'js-cookie'
const state = {
  theme: Cookie.get('layout') ? Cookie.get('layout') : 'dark',
  color: Cookie.get('themeColor') ? Cookie.get('themeColor') : '#1890ff',
  layoutMode: Cookie.get('layoutMode') ? Cookie.get('layoutMode') : 'inline',
  sideFixed: Cookie.get('sideFixed') === 'false' ? false : true,
  headerFixed: Cookie.get('headerFixed') === 'false' ? false : true
}
export default state
