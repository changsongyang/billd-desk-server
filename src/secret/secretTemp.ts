import { PROJECT_ENV, PROJECT_ENV_ENUM } from '../constant';
import { prodDomain } from '../spec-config';

export const JWT_SECRET = '**********'; // jwt秘钥

// 服务器ip地址，腾讯云：**********；阿里云：**********
export const IP_URL = {
  tencent: {
    localIp: 'localhost',
    serverIp: '**********',
  },
  ali: {
    localIp: 'localhost',
    serverIp: '**********',
  },
};

export const IP_WHITE_LIST = [IP_URL.tencent.serverIp, IP_URL.ali.serverIp]; // ip白名单

export const QQ_CLIENT_ID = '**********'; // qq登录APP ID
export const QQ_CLIENT_SECRET = '**********'; // qq登录APP Key
export const QQ_REDIRECT_URI = `**********${prodDomain}**********`; // qq登录回调地址

export const WECHAT_APPID = '**********'; // wechat登录APP ID
export const WECHAT_SECRET = '**********'; // wechat登录APP Key
export const WECHAT_REDIRECT_URI = '**********'; // wechat登录回调地址

export const QINIU_ACCESSKEY = '**********'; // 七牛云秘钥
export const QINIU_SECRETKEY = '**********'; // 七牛云秘钥
// WARN 七牛云直播服务属实拉胯，不用它了，QINIU_PILI_LIVE里面的值可以随便填（但一定要有值），反正用不到。
export const QINIU_PILI_LIVE = {
  // 推流鉴权方式：静态鉴权(static)，https://developer.qiniu.com/pili/6678/push-the-current-authentication
  // 推流地址格式：rtmp://<RTMPPublishDomain>/<Hub>/<streamTitle>?key=<PublishKey>
  RTMPPublishDomain: '**********', // 推流域名
  Hub: '**********', // 直播空间名称
  PublishKey: '**********', // 推流密钥
};

// https://console.cloud.tencent.com/cam/capi
export const TENCENTCLOUD_APPID = 666; // 腾讯云APPID
export const TENCENTCLOUD_SECRETID = '**********'; // 腾讯云SecretId
export const TENCENTCLOUD_SECRETKEY = '**********'; // 腾讯云SecretKey
export const TENCENTCLOUD_LIVE = {
  PushDomain: '**********', // 推流域名，可使用腾讯云直播提供的默认推流域名，也可以用自有已备案且 CNAME 配置成功的推流域名。
  PullDomain: '**********', // 拉流域名
  AppName: '**********', // 直播的应用名称，默认为 live，可自定义。
  Key: '**********', // 鉴权Key，https://console.cloud.tencent.com/live/domainmanage/detail/185429.push.tlivecloud.com?tab=pushConfig
};

export const MYSQL_CONFIG = {
  docker: {
    container: 'billd-desk-mysql',
    image: 'mysql:8.0',
    port: { 3306: 3306 },
    MYSQL_ROOT_PASSWORD:
      PROJECT_ENV === PROJECT_ENV_ENUM.development
        ? '*************'
        : '*************',
    volume:
      PROJECT_ENV === PROJECT_ENV_ENUM.development
        ? '*************'
        : '*************',
  },
  database:
    PROJECT_ENV === PROJECT_ENV_ENUM.development
      ? '*************'
      : '*************',
  host:
    PROJECT_ENV === PROJECT_ENV_ENUM.development
      ? '127.0.0.1'
      : '*************',
  port: 3306,
  username: 'root',
  password:
    PROJECT_ENV === PROJECT_ENV_ENUM.development
      ? '*************'
      : '*************',
}; // Mysql配置

export enum REDIS_DATABASE {
  blog,
  live,
}

export const REDIS_CONFIG = {
  docker: {
    container: 'billd-desk-redis',
    image: 'redis:7.0',
    port: { 6379: 6379 },
    volume:
      PROJECT_ENV === PROJECT_ENV_ENUM.development
        ? '*************'
        : '*************',
  },
  database: 0,
  socket: {
    port: 6379,
    host:
      PROJECT_ENV === PROJECT_ENV_ENUM.development
        ? '*************'
        : '*************',
  },
  username:
    PROJECT_ENV === PROJECT_ENV_ENUM.development
      ? '*************'
      : '*************',
  password:
    PROJECT_ENV === PROJECT_ENV_ENUM.development
      ? '*************'
      : '*************',
}; // Redis配置

export const SRS_CONFIG = {
  docker: {
    // docker启动srs时的容器名字（可随便填）
    container: 'billd-desk-srs',
    // docker镜像名，https://ossrs.net/lts/zh-cn/docs/v5/doc/getting-started
    image: 'registry.cn-hangzhou.aliyuncs.com/ossrs/srs:5.0.200',
    port: {
      1935: 1935,
      8080: 5001,
      1985: 1985,
      8000: 8000,
    },
    volume:
      PROJECT_ENV === PROJECT_ENV_ENUM.development
        ? '*************'
        : '*************',
  },
  // CANDIDATE填你的本机ip地址
  CANDIDATE:
    PROJECT_ENV === PROJECT_ENV_ENUM.development
      ? `$(ifconfig en0 inet | grep 'inet ' | awk '{print $2}')` // WARN mac可以这样获取本机ip，但是win不行，自己找本地ip
      : '*************',
}; // SRS配置

export const RABBITMQ_CONFIG = {
  docker: {
    // docker启动rabbitmq时的容器名字（可随便填）
    container: 'billd-desk-rabbitmq',
    // docker镜像名，https://www.rabbitmq.com/download.html
    image: 'rabbitmq:3.11-management',
    port: { 5672: 5672, 15672: 15672 },
  },
}; // RabbitMQ配置

export const ALIPAY_LIVE_CONFIG = {
  appId: '**********',
  privateKey:
    '**********************************************************************************************************************************************************************************************************************',
  alipayPublicKey:
    '**********************************************************************************************************************************************************************************************************************',
  gateway: '**********',
}; // 支付宝当面付-自然博客直播

export const SERVER_LIVE = {
  PushDomain:
    PROJECT_ENV === PROJECT_ENV_ENUM.development
      ? `rtmp://${IP_URL.ali.localIp}`
      : '**********', // 推流域名
  PullDomain:
    PROJECT_ENV === PROJECT_ENV_ENUM.development
      ? `http://${IP_URL.ali.localIp}:${SRS_CONFIG.docker.port['8080']}`
      : '**********', // 拉流域名
  AppName: '**********',
};

export const BILIBILI_LIVE_PUSH_KEY = '';

export const DOUYU_LIVE_PUSH_KEY = '';

export const HUYA_LIVE_PUSH_KEY = '';
