# Display server
A server application for display pictures. It's accept Display-ui application's request and resonse the deal result to it.

Getting started
```javascript
  $ git clone
  $ cd display-server
  $ npm install
```

## Start server
You can start it directly or use nodejs process manager pm2 start. If you want use pm2 to start server, the commond is below:
```javascirpt
pm2 start npm --watch --name Diangong -- start
```
It's use pm2's usage. If use below commond:
```javascript
pm2 start 
```
It will have some problems. 

## Config
Here used two folders to upload files, create <code>tmp</code> folder

   

