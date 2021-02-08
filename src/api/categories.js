import request from "../utils/request";
//获取商品分类数据列表
export const getCategoriesList= (params) => {
  return request({
    method: 'GET',
    url: `categories`,
    params
  })
}
//添加商品分类
export const addCategoriesList= (data) => {
  return request({
    method: 'POST',
    url: `categories`,
    data
  })
}


