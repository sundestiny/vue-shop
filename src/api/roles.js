import request from "../utils/request";
//获取角色列表
export const getRolesList= () => {
  return request({
    method:'GET',
    url:`roles`
  })
}
// 删除角色指定权限
export const removeRolesRights= (role,rightId) => {
  return request({
    method:'DELETE',
    url:`roles/${role.id}/rights/${rightId}`
  })
}
