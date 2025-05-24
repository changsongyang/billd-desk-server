import { PROD_DOMAIN } from './spec-config';
import { resolveApp } from './utils';

export enum PROJECT_ENV_ENUM {
  dev = 'dev',
  prod = 'prod',
  beta = 'beta',
}

export const PROJECT_ALIAS = process.env
  .NODE_APP_RELEASE_PROJECT_ALIAS as string;
export const PROJECT_NAME = process.env.NODE_APP_RELEASE_PROJECT_NAME as string;
export const PROJECT_ENV = process.env
  .NODE_APP_RELEASE_PROJECT_ENV as PROJECT_ENV_ENUM;
export const PROJECT_PORT = process.env.NODE_APP_RELEASE_PROJECT_PORT as string;
export const PROJECT_NODE_ENV = process.env.NODE_ENV as string;
export const PROJECT_INIT_MYSQL = process.env.NODE_APP_INIT_MYSQL as string;

export const CORS_ALLOW_ORIGIN: string | string[] =
  PROJECT_NODE_ENV === 'development'
    ? '*'
    : [
        `http://www.${PROD_DOMAIN}`,
        `https://www.${PROD_DOMAIN}`,
        `http://admin.${PROD_DOMAIN}`,
        `https://admin.${PROD_DOMAIN}`,
        `http://live.${PROD_DOMAIN}`,
        `https://live.${PROD_DOMAIN}`,
        `http://live-admin.${PROD_DOMAIN}`,
        `https://live-admin.${PROD_DOMAIN}`,
        `http://nuxt2.${PROD_DOMAIN}`,
        `https://nuxt2.${PROD_DOMAIN}`,
        `http://next.${PROD_DOMAIN}`,
        `https://next.${PROD_DOMAIN}`,
        `http://project.${PROD_DOMAIN}`,
        `https://project.${PROD_DOMAIN}`,
        `http://desk.${PROD_DOMAIN}`,
        `https://desk.${PROD_DOMAIN}`,
      ];

/** 消息最大长度 */
export const MSG_MAX_LENGTH = 200;
export const MAX_TOKEN_EXP = 24 * 90; // token过期时间：90天

export const VIDEO_DIR =
  PROJECT_ENV === PROJECT_ENV_ENUM.prod
    ? resolveApp(`/dist/video/`)
    : resolveApp(`/video/`); // video文件目录

export const WEBM_DIR =
  PROJECT_ENV === PROJECT_ENV_ENUM.prod
    ? resolveApp(`/dist/webm/`)
    : resolveApp(`/webm/`); // webm文件目录

export const STATIC_DIR =
  PROJECT_ENV === PROJECT_ENV_ENUM.prod
    ? resolveApp('/dist/public/')
    : resolveApp('/public/'); // 静态文件目录

export const UPLOAD_DIR =
  PROJECT_ENV === PROJECT_ENV_ENUM.prod
    ? resolveApp('/dist/upload/')
    : resolveApp('/upload/'); // 上传文件接口接收到的文件存放的目录

export const SECRET_DEV_FILE =
  PROJECT_ENV === PROJECT_ENV_ENUM.prod
    ? resolveApp('/dist/secret/secret-dev.js')
    : resolveApp('/src/secret/secret-dev.ts'); // 秘钥文件

export const SECRET_BETA_FILE =
  PROJECT_ENV === PROJECT_ENV_ENUM.prod
    ? resolveApp('/dist/secret/secret-beta.js')
    : resolveApp('/src/secret/secret-beta.ts'); // 秘钥文件

export const SECRET_PROD_FILE =
  PROJECT_ENV === PROJECT_ENV_ENUM.prod
    ? resolveApp('/dist/secret/secret-prod.js')
    : resolveApp('/src/secret/secret-prod.ts'); // 秘钥文件

export const SECRET_TEMPLATE_FILE =
  PROJECT_ENV === PROJECT_ENV_ENUM.prod
    ? resolveApp('/dist/secret/secret-template.js')
    : resolveApp('/src/secret/secret-template.ts'); // 秘钥文件模板

export const COMMON_ERROR_CODE = {
  serverError: 10000, // 服务器错误
  frequent: 1000, // 当前ip请求频繁，已被禁用！
  admin_disable: 1001, // 你的账号已被禁用，请联系管理员处理！
  notFound: 1002, // 返回了404的http状态码
  errStatusCode: 1003, // 返回了即不是200也不是404的http状态码
  shutdown: 1004, // 停机维护
  idOrPwdError: 1005, // 账号或密码错误！
  usernameOrPwdError: 1006, // 用户名或密码错误！
  userStatusNoNormal: 1011, // 用户状态非正常
};

export const COMMON_HTTP_CODE = {
  success: 200, // 成功
  apiCache: 304, // 接口缓存
  paramsError: 400, // 参数错误
  unauthorized: 401, // 未授权
  forbidden: 403, // 权限不足
  notFound: 404, // 未找到
  methodNotAllowed: 405, // 方法不允许，如：服务端提供了一个get的/api/list接口，但客户端却post了/api/list接口
  serverError: 500, // 服务器错误
};

export const COMMON_ERROE_MSG = {
  frequent: '当前ip请求频繁，已被禁用！', // 当前ip请求频繁，已被禁用！
  jwtExpired: '登录信息过期！', // 登录信息过期！
  invalidToken: '非法token！', // 非法token！
  admin_disable: '你的账号已被禁用，请联系管理员处理！', // 你的账号已被禁用，请联系管理员处理！
  userStatusNoNormal: '用户状态非正常', // 你的账号已被管理员禁用，请联系管理员处理！
  shutdown: '停机维护中', // 停机维护中

  noLogin: '未登录', // 未登录
  paramsError: '参数错误！', // 参数错误！
  unauthorized: '未授权！', // 未授权！
  forbidden: '权限不足！', // 权限不足！
  notFound: '未找到！', // 未找到！
  serverError: '服务器错误！', // 服务器错误！
  idOrPwdError: '用户ID或密码错误！', // 用户ID或密码错误！
  usernameOrPwdError: '用户名或密码错误！', // 用户名或密码错误！
};

export const COMMON_SUCCESS_MSG = {
  GET: '获取成功！',
  POST: '新增成功！',
  PUT: '修改成功！',
  DELETE: '删除成功！',

  loginSuccess: '登录成功！',
};

export const SUPER_ADMIN_UUID = ['superhss'];

export const SCHEDULE_TYPE = {
  liveRoomIsLive: 'liveRoomIsLive',
};

export const REDIS_PREFIX_ENV = `${PROJECT_NAME}-${PROJECT_ENV}-`;

// redis key前缀
export const REDIS_KEY = {
  qrCodeLogin: `${REDIS_PREFIX_ENV}qrCodeLogin___`, // 二维码登录
  deskUserUuid: `${REDIS_PREFIX_ENV}deskUserUuid___`,
  socketIdAlive: `${REDIS_PREFIX_ENV}socketIdAlive___`,
  uuidInRemoting: `${REDIS_PREFIX_ENV}uuidInRemoting___`,
  deskInviteId: `${REDIS_PREFIX_ENV}deskInviteId___`,
  screenWall: `${REDIS_PREFIX_ENV}screenWall___`,
};

// redis 频道
export const REDIS_CHANNEL = {};

// 平台类型
export const THIRD_PLATFORM = {
  website: 1, // 站内（user表里面的用户就是这个类型，但是不记录在third_user表里）
  qq: 2, // qq
  wechat: 3, // wechat
};

export const DEFAULT_AUTH_INFO = {
  ALL_AUTH: {
    id: 1,
    auth_value: 'ALL_AUTH',
  },
  USER_MANAGE: {
    id: 2,
    auth_value: 'USER_MANAGE',
  },
  ROLE_MANAGE: {
    id: 3,
    auth_value: 'ROLE_MANAGE',
  },
  AUTH_MANAGE: {
    id: 4,
    auth_value: 'AUTH_MANAGE',
  },
  LOG_MANAGE: {
    id: 5,
    auth_value: 'LOG_MANAGE',
  },
};

export const DEFAULT_ROLE_INFO = {
  ALL_ROLE: {
    id: 1,
    role_value: 'ALL_ROLE',
  },
  ADMIN: {
    id: 2,
    role_value: 'ADMIN',
  },
  SUPER_ADMIN: {
    id: 3,
    role_value: 'SUPER_ADMIN',
  },
  USER: {
    id: 4,
    role_value: 'USER',
  },
  VIP_USER: {
    id: 5,
    role_value: 'VIP_USER',
  },
  SVIP_USER: {
    id: 6,
    role_value: 'SVIP_USER',
  },
  TOURIST_USER: {
    id: 7,
    role_value: 'TOURIST_USER',
  },
};
