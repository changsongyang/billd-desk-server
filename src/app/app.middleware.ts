import { ParameterizedContext } from 'koa';

import {
  COMMON_ERROR_CODE,
  COMMON_HTTP_CODE,
  CORS_ALLOW_ORIGIN,
} from '@/constant';
import { CustomError } from '@/model/customError.model';
import { strSlice } from '@/utils';
import { chalkERROR, chalkINFO, chalkSUCCESS } from '@/utils/chalkTip';

// 全局错误处理中间件
export const catchErrorMiddle = async (ctx: ParameterizedContext, next) => {
  const insertLog = (info: {
    httpStatusCode: number;
    errorCode: number;
    duration: number;
    error: string;
    msg: string;
  }) => {
    console.log(info);
  };
  let duration = -1;
  try {
    const startTime = performance.now();
    const url = ctx.request.path;
    const client_ip = strSlice(
      String(ctx.request.headers['x-real-ip'] || ''),
      100
    );
    const consoleEnd = () => {
      duration = Math.floor(performance.now() - startTime);
      console.log(
        chalkINFO(
          `===== catchErrorMiddle中间件通过,耗时:${duration}ms,http状态码:${ctx.status} =====`
        )
      );
      console.log(
        chalkSUCCESS(`ip:${client_ip},响应请求 ${ctx.request.method} ${url}`)
      );
      console.log();
    };
    console.log();
    console.log(
      chalkINFO(`ip:${client_ip},收到请求 ${ctx.request.method} ${url}`)
    );
    console.log(chalkINFO('===== catchErrorMiddle中间件开始 ====='));
    await next();
    consoleEnd();
    const whiteList = [
      '/qiniu_data/upload_chunk',
      '/qiniu_data/upload',
      '/qiniu_data/progress',
    ];
    if (whiteList.includes(ctx.request.path)) {
      console.log('白名单，不插入日志');
      return;
    }
    const httpStatusCode = ctx.status;
    const msg = `【ERROR】客户端请求:${ctx.request.method} ${ctx.request.path},服务端响应http状态码:${httpStatusCode}`;
    /**
     * 如果通过了catchErrorMiddle中间件，但是返回的状态不是200，
     * 代表了在next前面没有设置ctx状态码，因此默认就是返回404！
     * 因此业务层必须在next前设置ctx的状态码200，让接口通过catchErrorMiddle中间件，让它返回数据，
     * 或者业务层直接throw new Error或者CustomError，不让这个接口通过catchErrorMiddle中间件，
     * 让catchErrorMiddle中间件判断错误，并且返回错误数据！
     */
    if (
      httpStatusCode !== COMMON_HTTP_CODE.success &&
      httpStatusCode !== COMMON_HTTP_CODE.apiCache
    ) {
      if (
        [COMMON_HTTP_CODE.notFound, COMMON_HTTP_CODE.methodNotAllowed].includes(
          httpStatusCode
        )
      ) {
        const defaultSuccess = {
          httpStatusCode,
          errorCode: httpStatusCode,
          error: msg,
          msg,
          duration,
        };
        // 服务端返回http状态码404、405，写入日志表
        console.log(chalkINFO(`服务端返回http状态码404、405，写入日志表`));
        insertLog(defaultSuccess);
      } else {
        const defaultSuccess = {
          httpStatusCode,
          errorCode: COMMON_ERROR_CODE.errStatusCode,
          error: msg,
          msg,
          duration,
        };
        // 服务端返回http状态码不是404、405，写入日志表
        console.log(
          chalkINFO(`服务端返回http状态码不是404、405，写入日志表，`)
        );
        insertLog(defaultSuccess);
      }
      throw new CustomError(msg, httpStatusCode, httpStatusCode);
    }
    // const defaultSuccess = {
    //   httpStatusCode,
    //   errorCode: httpStatusCode,
    //   error: '请求成功！',
    //   msg: '请求成功！',
    //   duration,
    // };
    // // 请求成功不写入日志表
    // insertLog(defaultSuccess);
  } catch (error: any) {
    console.log(chalkERROR(`===== catchErrorMiddle中间件捕获到错误 =====`));
    if (ctx.request.path.indexOf('/socket.io/') !== -1) {
      console.log('socket.io错误，return');
      return;
    }
    ctx.app.emit('error', error, ctx);
    if (!(error instanceof CustomError)) {
      const defaultError = {
        httpStatusCode: COMMON_HTTP_CODE.serverError,
        errorCode: COMMON_ERROR_CODE.serverError,
        error: error?.msg,
        msg: '服务器错误！',
        duration,
      };
      // 不是CustomError，也写入日志表
      insertLog(defaultError);
      return;
    }
    // 是CustomError，判断errorCode，非法的错误（频繁请求和被禁用）不写入日志
    if (
      ![COMMON_ERROR_CODE.frequent, COMMON_ERROR_CODE.admin_disable].includes(
        error.errorCode
      )
    ) {
      insertLog({
        httpStatusCode: error.httpStatusCode,
        error: error.message,
        errorCode: error.errorCode,
        msg: error.message,
        duration,
      });
    }
  }
};

// 跨域中间件
export const corsMiddle = async (ctx: ParameterizedContext, next) => {
  console.log(chalkINFO('===== corsMiddle中间件开始 ====='), ctx.header.origin);
  const startTime = performance.now();
  ctx.set(
    'Access-Control-Allow-Headers',
    'Content-Type, Content-Length, Authorization, Accept, X-Billd-Trace-Id, X-Requested-With, X-Billd-Env, X-Billd-App, X-Billd-Appver'
  ); // 允许的请求头
  ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS'); // 允许的方法

  // 如果是本地环境
  if (ctx.header.origin?.indexOf('http://localhost') !== -1) {
    ctx.set('Access-Control-Allow-Credentials', 'true'); // 允许携带cookie，Access-Control-Allow-Origin为*的时候不能设置Access-Control-Allow-Credentials:true！
    ctx.set('Access-Control-Allow-Origin', ctx.header.origin!); // 允许的源
  } else if (CORS_ALLOW_ORIGIN === '*') {
    ctx.set('Access-Control-Allow-Origin', '*'); // 允许所有源
  } else if (CORS_ALLOW_ORIGIN.includes(ctx.header.origin)) {
    ctx.set('Access-Control-Allow-Credentials', 'true'); // 允许携带cookie，Access-Control-Allow-Origin为*的时候不能设置Access-Control-Allow-Credentials:true！
    ctx.set('Access-Control-Allow-Origin', ctx.header.origin); // 允许的源
  } else {
    console.log('非法源！');
  }

  if (ctx.method === 'OPTIONS') {
    // 跨域请求时，浏览器会先发送options
    ctx.body = 'ok';
  } else {
    await next();
    const duration = Math.floor(performance.now() - startTime);
    console.log(
      chalkINFO(
        `===== corsMiddle中间件通过,耗时${duration}ms,http状态码:${ctx.status} ===== `
      ),
      ctx.header.origin
    );
  }
};
