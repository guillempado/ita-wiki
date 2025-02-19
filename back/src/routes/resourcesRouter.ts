import Router from '@koa/router'
import { z } from 'zod'
import { authMiddleware, validate } from '../middleware'
import { createResource, getResourcesByUserId } from '../controllers'
import { resourceCreateSchema } from '../schemas'
import { pathRoot } from './routes'

const resourcesRouter = new Router()

resourcesRouter.prefix(pathRoot.v1.resources)

resourcesRouter.post(
  '/create',
  authMiddleware,
  validate(z.object({ body: resourceCreateSchema })),
  createResource
)

resourcesRouter.get(
  '/me',
  authMiddleware,
  getResourcesByUserId
)

export { resourcesRouter }
