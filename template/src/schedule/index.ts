import cron from 'node-cron'
import config from '../config'

export default function init() {
  cron.schedule(
    config.schedule,
    async function () {
      // console.log('schedule running')
    }, { timezone: 'Asia/Shanghai' })
}
