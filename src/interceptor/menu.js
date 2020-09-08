export const generatorDynamicMenu = (routes) => {
  let menu = routes.map(item => {
    var menuItem = {
      title: item.meta.title,
      key: item.path,
      type: item.meta.icon
    }
    if (item.meta.hiddenHeaderContent && !item.children.length) {
      return ''
    }
    if (item.children && item.children.length) {
      menuItem.children = generatorDynamicMenu(item.children)
    }
    return menuItem
  })
  menu = menu.filter(item => item !== '')
  return menu
}
