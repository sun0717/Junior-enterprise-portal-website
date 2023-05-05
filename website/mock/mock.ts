export default [
  // 用户登录
  {
    // 请求地址
    url: "/api/user/login",
    // 请求方法
    method: "post",
    // 响应数据
    response: () => {
      return {
        code: 20000,
        message: "success",
        data: {
          token: "e35b72e6uv6ifdhe338rci",
          username: "坤坤",
        },
      };
    },
  },
  // 退出登录
  {
    // 请求地址
    url: "/api/user/logout",
    // 请求方法
    method: "post",
    // 响应数据
    response: () => {
      return {
        code: 20000,
        message: "success",
      };
    },
  }
];
