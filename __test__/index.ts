
import { logger } from 'node-console';

logger.log('log', 'logger1')
logger.error('log', 'logger1')
logger.warn('log', 'logger1')
logger.info('log', 'logger1')
logger.debug('debug', 'logger1')
logger.table([{
    id: 1,
    name: 'logger1',
    age: 30
}]);
logger.setConfig({
    table: false,
    debug: false,
})
logger.log('log', 'logger1')
logger.error('log', 'logger1')
logger.warn('log', 'logger1')
logger.info('log', 'logger1')
logger.debug('debug', 'logger1').then((res) => {
    console.log(res)
})

// @ts-ignore
const logger2 = require('node-console').logger

logger2.log('log', 'logger2')
logger2.error('log', 'logger2')
logger2.warn('log', 'logger2')
logger2.info('log', 'logger2')
logger2.debug('debug', 'logger2', {
    a: 1,
    b: '2',
    c: true,
    d: [1, 2, 3]
})
logger2.table([{
    id: 1,
    name: 'logger2',
    age: 31
}])