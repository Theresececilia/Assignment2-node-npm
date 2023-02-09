import chalk from 'chalk';
import fs from 'fs/promises'
import {formatDistanceToNow, differenceInDays, parse, set} from 'date-fns'
import {Command} from 'commander';
import getGitVersion from './src/getGitVersion.js';

const gitVersion = await getGitVersion()
console.log(`git version: ${gitVersion}`);

const first = 'Therese'
const last = 'Johansson'
const name = `${chalk.bgBlue.magenta(first)} ${chalk.bgMagenta.blue(last)}`
const info = process.env.npm_config_user_agent
console.log('name', name)
console.log(`npm & node: ${info}`)

const startOfCourse = new Date(2023, 0, 31);
const courseStartToNow = formatDistanceToNow(startOfCourse);
console.log('Since we have started javascript frameworks its been', courseStartToNow)

const argumentParser = new Command();
argumentParser.option('--date')
argumentParser.parse();

const dateStringSentAsArgument = argumentParser.args[0]
const dateSentAsArgument = parse(dateStringSentAsArgument, 'yyyy-MM-dd', new Date())
const currentDate = set(new Date(), {hours: 0, minutes: 0, seconds: 0})
const difference = compareDates(dateSentAsArgument);

console.log(`Date sent in as Argument ${dateSentAsArgument}`)
console.log('Today is :',(currentDate))

function compareDates(date) {
    const difference = differenceInDays(date, currentDate);
    return difference;
  }

  console.log(`Number of days between todays date ${currentDate} and your argument date ${dateSentAsArgument} is: ${difference}`);

const fileContent = `
name: ${first} ${last}
npm & node: ${info}
git version: ${gitVersion}
Today's date is ${currentDate}
Date sent in as Argument ${dateSentAsArgument}
Since we have started javascript frameworks its been ${courseStartToNow}
Number of days between todays date ${currentDate} and your argument date ${dateSentAsArgument} is: ${difference}
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
      <li>Today's date is ${currentDate}</li>
      <li>Date sent in as Argument ${dateSentAsArgument}</li>
      <li>Since we have started javascript frameworks its been ${courseStartToNow}</li>
      <li>Number of days between todays date ${currentDate} and your argument date ${dateSentAsArgument} is: ${difference}</li>
    </ul>
    </div>
</body>
</html>
`

await fs.writeFile('index.html', htmlContent);
await fs.writeFile('index.md', fileContent);


