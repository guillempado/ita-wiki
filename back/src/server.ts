import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import Koa from 'koa'
import cors from '@koa/cors'
import helmet from 'koa-helmet'
import { HttpMethodEnum, koaBody } from 'koa-body'
import yamljs from 'yamljs'
import { koaSwagger } from 'koa2-swagger-ui'
import * as Routes from './routes'
import { appConfig } from './config/config'
import { errorMiddleware } from './middleware'
import { generateOpenapiFile } from './openapi/generateFile'
import { openapiFilename, swaggeruiUrl } from './openapi/config'
import { swaggeruiCSPMiddleware } from './middleware/swaggeruiCSPMiddleware'

dotenv.config()

const app = new Koa()

app.use(cors())
app.use(helmet())
app.use(
  koaBody({
    parsedMethods: [
      HttpMethodEnum.POST,
      HttpMethodEnum.PUT,
      HttpMethodEnum.PATCH,
      HttpMethodEnum.DELETE,
    ],
  })
)
app.use(errorMiddleware)

// Routes
app.use(Routes.authRouter.routes())
app.use(Routes.resourcesRouter.routes())
app.use(Routes.topicsRouter.routes())
app.use(Routes.categoriesRouter.routes())

// Swagger UI
app.use(swaggeruiCSPMiddleware)
generateOpenapiFile()
const spec = yamljs.load(openapiFilename)
app.use(koaSwagger({ routePrefix: swaggeruiUrl, swaggerOptions: { spec } }))

// Only listen if launched from terminal
// eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle

app.listen(appConfig.port, () => {
  // eslint-disable-next-line no-console
  console.log(`🚀 Server ready at http://localhost:${appConfig.port}`)
})

export { app }
