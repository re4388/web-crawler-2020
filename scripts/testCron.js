

//sec, min, hour, day , mon, yr

// every 3 sec: */3 * * * * *
// every 3 min: 0 */3 * * * *
// every 1 hour: 0 0 */1 * * *


var CronJob = require('cron').CronJob;
var job = new CronJob('0 */3 * * * *', function() {
  console.log('You will see this message every second');
}, null, true, 'Asia/Hong_Kong');
job.start();

