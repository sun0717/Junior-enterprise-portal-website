import requests from '@/utils/request';
// 搜索新闻
export const reqSearchNewsList = (queryString: string) => requests({ url: `v1/web/searchnews/${queryString}`, method: 'get' });
// 获取新闻列表
export const reqGetNewsList = (data: any) => requests({ url: `/v1/web/newslist`, method: 'get', params: data});
// 获得推荐的新闻
export const reqGetRecomNews = () => requests({ url: `/v1/web/recomNews`, method: 'get' });
// 获取新闻详情
export const reqGetNewsDetails = (path: string) => requests({ url: `/v1/web/article/${path}`, method: 'get' });
// 获取热点新闻
export const reqGetHotNews = () => requests({ url: `/v1/web/hotnews`, method: 'get' });