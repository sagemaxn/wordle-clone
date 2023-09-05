import schedule from 'node-schedule';
import { selectNewWord } from './selectWord';

const newAnswer = schedule.scheduleJob('0 0 * * *', selectNewWord);

export default newAnswer;
