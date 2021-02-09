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
//获取参数列表
export const getParamsList= (id,sel) => {
  return request({
    method: 'GET',
    url: `categories/${id}/attributes`,
    params:{
      sel
    }
  })
}
//添加动态参数或者静态属性
export const addParams= (id,attr_name,attr_sel) => {
  return request({
    method: 'POST',
    url: `categories/${id}/attributes`,
    data:{
      attr_name,
      attr_sel
    }
  })
}

