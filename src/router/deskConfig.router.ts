import Router from 'koa-router';

import deskConfigController from '@/controller/deskConfig.controller';

const deskConfigRouter = new Router({ prefix: '/desk_config' });

deskConfigRouter.get('/turnserver', deskConfigController.turnserver);

export default deskConfigRouter;
