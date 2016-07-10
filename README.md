# Shaka Api


### Run server:
node server

### TODO:
-make a config file for secret and db connection
-compare against https://scotch.io/tutorials/authenticate-a-node-js-api-with-json-web-tokens
and http://thejackalofjavascript.com/architecting-a-restful-node-js-app/


### Setup MongoDB - https://docs.mongodb.com/manual/mongo/
1. download and install the .msi file
2. Create directory C:/data
3. Create directory C:/data/db
4. Open terminal in ../MongoDB/Server/3.2 (this will start the db server)
   run cmd: mongod
5. Open another terminal in ../MongoDB/Server/3.2 (this will open a new connection for testing)
   run cmd: mongo

##### MongoDB Commands
Setup up as service made config file
https://sitecoresandbox.com/2016/04/12/10-steps-to-setup-mongodb-as-a-windows-service-with-sitecore-7-5/

C:\MongoDB\Server\3.2\bin\Mongod.exe --config C:\MongoDB\mongo.config --install
net start MongoDB

GUI setup
localhost: 127.0.0.1 port:27017

if it is running as a service then you do not need to run the server to connect you can just make a connection and then do CRUD
