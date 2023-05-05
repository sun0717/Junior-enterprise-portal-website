import requests from '@/utils/request';

// 获取职位列表
export const reqGetJobList = (data: any) => requests({ url: `/v1/web/job`, data, method: 'post'});
// export const reqGetJobList = (data: any) => requests.post('/v1/web/job', data);
// 职位过滤
export const reqGetJobFilter = () => requests({ url: '/v1/web/job-filters', method: 'get' });
// 获取职位详细信息
export const reqGetJobDetail = (path: any) => requests({ url: `/v1/web/job/${path}`, method: 'get'});