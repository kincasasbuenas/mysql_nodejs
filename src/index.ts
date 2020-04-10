import Server from "./server/server";
import router from "./router/router";
import  MySQL from "./mysql/mysql";

const server = Server.init(3000);
server.app.use(router);

//const mysql = new MySQL;
//MySQL.instace;//utilizando patron singleton, utilizando una sola instancia.

server.start(()=>{
  console.log('Server run in port 3000');
});
