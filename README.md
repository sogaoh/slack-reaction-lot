# slack-reaction-lot

Choose 1 user randomly from some slack post.

## Preparation

```
$ npm install
$ cp .env.sample .env

edit SLACK_TOKEN
```

## Usage

Choose from the message post:

```
$ TARGET_POST=https://{workspacename}.slack.com/archives/C0EDXXXXX/p1497849999999999 npm start
```

Choose from the file:

```
$ TARGET_POST=https://files.slack.com/files-pri/T00000000-F5WXXXXXX/image_uploaded_from_ios.jpg npm start
```


## Example

```
% TARGET_POST=https://files.slack.com/files-pri/T00000000-F5XXXXXXX/image_uploaded_from_ios.jpg npm start

🎉 Sotaro Karasawa (@sotarok)
```
