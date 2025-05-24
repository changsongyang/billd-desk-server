import Router from 'koa-router';

import wsController from '@/controller/ws.controller';

const wsRouter = new Router({ prefix: '/ws' });

wsRouter.post('/keep_alive', wsController.keepAlive);

wsRouter.post('/send_msg', wsController.seneMsg);

export default wsRouter;
