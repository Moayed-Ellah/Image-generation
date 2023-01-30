import { surpriseMePrompts } from '../constants';
import FileSaver from 'file-saver';

export function getRandomPrompt() {
  if (surpriseMePrompts.length === 0) {
    return 'No prompts to choose from';
  }
  const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
  if (randomIndex === surpriseMePrompts.length) {
    return 'Could not get a random prompt';
  }
  const randomPrompt = surpriseMePrompts[randomIndex];
  if(randomPrompt === prompt) {
    return getRandomPrompt(prompt);
  }
  return randomPrompt;
}

export async function downloadImage(_id, photo){
  FileSaver.saveAs(photo, `downloaded_${_id}.jpg`);
}