import express = require('express');
import path= require('path');

export default class  Server {
  public app: express.Application;
  public port:number;

  constructor(port:number){
    this.app=express();
    this.port=port;
  }

  // Llamar siempre la misma instancia.
  static init(port:number){
    return new Server(port);
  }

  //para definir un callback en lugar de hacer esto, callback:Function
  //remplazar por esto, callback: () => void
  start( callback: () => void ){
    this.app.listen(this.port, callback);
    this.publicFolder(); // para exporner la carpeta public luedo de que ya el server esta escuchando.
  }

  private publicFolder(){
    const publicPath = path.resolve(__dirname, '../public');
    this.app.use(express.static(publicPath));
  }
}
