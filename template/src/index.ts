import 'module-alias/register'
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import schedule from './schedule'
import config from './config'
import router from './router'

// run schedule
schedule()

const app = new Koa()

app.use(bodyParser())
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(config.port, () => {
  console.log(`serve at port ${config.port}`)
})
