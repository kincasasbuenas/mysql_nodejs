import  mysql = require('mysql');

//Patron singleton
export default class MySQL{
  private static _instace:MySQL;
  conection:mysql.Connection;
  status:boolean=false; //indicar estado de conexion.

  constructor(){
    this.conection = mysql.createConnection({
      host:'127.0.0.1',
      user:'root',
      password:'qpalwosk10',
      database:'node_db',
      port: 3306
    });

    this.conectarDB();
  }

  public static get instace(){
    return this._instace || (this._instace = new this() );
  }

  private conectarDB(){
    this.conection.connect( (err:mysql.MysqlError) =>{
      if(err){
        console.log(err.message);
        return;
      }
      this.status=true;
      console.log('Conexion a database is success!!!');
    });
  }

  static ejecutarQuery(query:string, callback: (error:any,result:Object[],fields:any) => void ){
    this.instace.conection.query(query,(error, result:Object[], fields )=>{

      if(error){
        console.log('Error en la query');
        console.log(error);
        return callback(error,result,fields);
      }

      if(result.length === 0){
        callback('El registro solicitado no existe',result,fields);
      }else{
        callback(error,result,fields);
      }

    });
  }

}
