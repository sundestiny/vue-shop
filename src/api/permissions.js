import request from "../utils/request";
//获取左侧菜单列表
export const getMenuList= () => {
  return request({
    method:'GET',
    url:`menus`
  })
}
