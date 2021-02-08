import request from "../utils/request";
//获取左侧菜单列表
export const getMenuList= () => {
  return request({
    method:'GET',
    url:`menus`
  })
}
//获取所有权限列表
export const getRightsList= () => {
  return request({
    method:'GET',
    url:`rights/list`
  })
}
//获取所有权限列表
export const getRightsTree= () => {
  return request({
    method:'GET',
    url:`rights/tree`
  })
}
// 角色授权
export const getRights= (roleID,rids) => {
  return request({
    method:'POST',
    url:`roles/${roleID}/rights`,
    data:{
      rids
    }
  })
}
