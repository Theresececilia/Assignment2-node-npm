import chalk from 'chalk';
import fs from 'fs/promises'
import {formatDistanceToNow, differenceInDays, format, isAfter, isBefore, parseISO} from 'date-fns'
import {Command} from 'commander';
import getGitVersion from './src/getGitVersion.js';

const gitVersion = await getGitVersion()
const first = 'Therese'
const last = 'Johansson'
const name = `${chalk.bgBlue.magenta(first)} ${chalk.bgMagenta.blue(last)}`
const info = process.env.npm_config_user_agent
const startOfCourse = new Date(2023, 0, 31);
const courseStartToNow = formatDistanceToNow(startOfCourse);
const argumentParser = new Command();
argumentParser.option('--date')
argumentParser.parse();

const dateStringSentAsArgument = argumentParser.args[0]
const dateSentAsArgument = parseISO(dateStringSentAsArgument, 'yyyy-MM-dd', new Date())
const currentDate = new Date()
const difference = compareDates(dateSentAsArgument);
const formattedDate = format(currentDate, 'MM/dd/yyyy hh:mm a');
const isBeforeToday = isBefore(dateSentAsArgument, currentDate)
const isAfterToday = isAfter(dateSentAsArgument, currentDate)
let beforeOrAfter = '';



if (isBeforeToday === true) {
 beforeOrAfter = 'Your date is before today.';
} else if (isAfterToday === true) {
  beforeOrAfter = 'Your date is after today.';
} else {
  beforeOrAfter = 'Your date is today.';
}

function compareDates(date) {
    const difference = differenceInDays(date, currentDate);
    return difference;
  }

console.log(`git version: ${gitVersion}`);
console.log('name', name)
console.log(`npm & node: ${info}`)
console.log('Since we have started javascript frameworks its been', courseStartToNow)
console.log('Today is :',(formattedDate))
console.log(`Date sent in as Argument ${dateSentAsArgument}`)
console.log(`Number of days between todays date ${formattedDate} and your argument date ${dateSentAsArgument} is: ${difference}`);

const fileContent = `
name: ${first} ${last}
npm & node: ${info}
git version: ${gitVersion}
Today's date is ${formattedDate}
Date you sent in as an argument ${dateSentAsArgument}
${beforeOrAfter}
Number of days between todays date and your date is: ${difference}
Since we have started javascript frameworks its been ${courseStartToNow}
`;

const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Node assignment 2</title>
</head>
  <body style="background-color: #34312D; margin: 0; color: #F3F3F4;">
  <header style="text-align: center; padding: 48px; background-color: #161513;">
    <h1>Node & npm</h1>
  </header>
    <div class="conatiner" style="margin: 2%;">
    <h2>Here's some information</h2>
    <ul> 
      <li>Name: ${first} ${last}</li>
      <li>Npm & node: ${info}</li>
      <li>Git version: ${gitVersion}</li>
      <li>Today's date is ${formattedDate}</li>
      <li>Date you sent in as an argument ${dateSentAsArgument}</li>
      <li>${beforeOrAfter}</li>
      <li>Number of days between todays date and your date is: ${difference}</li>
      <li>Since we have started javascript frameworks its been ${courseStartToNow}</li>
    </ul>
    </div>
</body>
</html>
`

await fs.writeFile('index.html', htmlContent);
await fs.writeFile('index.md', fileContent);


