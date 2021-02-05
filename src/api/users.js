import request from "../utils/request";
//获取左侧菜单列表
export const getUsersList= (params) => {
  return request({
    method:'GET',
    url:`users`,
    params
  })
}
//修改用户状态
export const getUsersStatus= (data) => {
  return request({
    method:'PUT',
    url:`users/${data.id}/state/${data.mg_state}`,
  })
}
//添加用户
export const addUser= (data) => {
  return request({
    method:'POST',
    url:`users`,
    data
  })
}
//根据id查询用户信息
export const queryUserInfo= (id) => {
  return request({
    method:'GET',
    url:`users/${id}`
  })
}
//根据id提交编辑后的用户信息
export const editsUserInfo= (data) => {
  return request({
    method:'PUT',
    url:`users/${data.id}`,
    data
  })
}

//根据id删除的用户信息
export const deleteUserInfo= (id) => {
  return request({
    method:'DElETE',
    url:`users/${id}`
  })
}
