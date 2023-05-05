import requests from '@/utils/request';
// 获取产品列表
export const getProductList = () => requests({ url: '/v1/web/products', method: 'get'});