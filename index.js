require('dotenv').config();
const { WebClient } = require('@slack/client');

const slackToken = process.env.SLACK_TOKEN;
const targetPost = process.env.TARGET_POST;

if (!targetPost) {
  console.error(`Please specify TARGET_POST=url

  Example:
    $ TARGET_POST=https://{workspacename}.slack.com/archives/C0EDXXXXX/p1497849999999999 npm start
    $ TARGET_POST=https://files.slack.com/files-pri/T00000000-F5WXXXXXX/image_uploaded_from_ios.jpg npm start
  `);
  process.exit();
}

async function main() {
  const web = new WebClient(slackToken);

  const option = getOptionByTargetPost(targetPost);

  const res = await web.reactions.get(option);
  const reactions = res.file ? res.file.reactions : res.message.reactions;
  const users = []
  for (const r in reactions) {
    users.push(...reactions[r].users)
  }

  const appliedUsers = [...new Set(users)];

  while(true) {
    const chosen = chooseRandomly(appliedUsers);
    const chosenUser = (await web.users.info({user: chosen})).user;
    if (chosenUser.deleted) {
      console.log(`${chosenUser.name} is deleted, skip.`);
      continue;
    }

    console.log(`🎉 ${chosenUser.real_name} (@${chosenUser.profile.display_name})`);
    break;
  }
}

function getOptionByTargetPost(url) {
  let m;
  if (m = url.match(/\/\/files\.slack\.com\/.*(?<file>F[\dA-Z]{8})\//)) {
    return { ...m.groups };
  } else if (m = url.match(/\/archives\/(?<channel>C[A-Z\d]{8})\/p(?<timestamp>[\d]{16})/)) {
    const timestamp = `${m.groups.timestamp.substring(0, 10)}.${m.groups.timestamp.substring(10)}`
    return { channel: m.groups.channel, timestamp }
  }

  throw new Error('URL format error.');
}

function chooseRandomly(list) {
  return list[getRandomInt(list.length)];
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

main()
