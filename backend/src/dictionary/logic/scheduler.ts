import * as schedule from 'node-schedule';
import * as moment from 'moment-timezone';

import { selectNewWord } from './selectWord';

// This function returns the time for the next midnight in EST/EDT
function getNextMidnightEst() {
    const now = moment.tz('America/New_York');
    return now.add(1, 'days').startOf('day').toDate();
}

const newAnswer = schedule.scheduleJob(getNextMidnightEst(), () => {
    console.log(`Running scheduled job at ${new Date().toISOString()}`);
    selectNewWord();
    newAnswer.reschedule(getNextMidnightEst());
});

export default newAnswer;

export function test() {
    setTimeout(() => {
        console.log('Running selectNewWord for testing...');
        selectNewWord();
    }, 10000);
}
