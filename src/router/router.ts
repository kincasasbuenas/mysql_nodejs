import {Router, Response, Request} from "express";
import MySQL from "../mysql/mysql";


const router=Router();

router.get('/heroes',(req:Request, resp:Response)=>{

  const query ="SELECT * FROM heroes";
  MySQL.ejecutarQuery(query,(err, heroes:Object[])=>{

    if(err){
      resp.status(400).json({
        ok:false,
        err:err
      })
    }else{
      resp.status(200).json({
        ok:true,
        heroes
      })
    }

  });

  /*resp.json({
    ok:true,
    message:'Get Heroes'
  });*/

});


router.get('/heroes/:id',(req:Request, resp:Response)=>{

  const id = req.params.id;
  const escapeId=MySQL.instace.conection.escape(id);

  const query =`SELECT * FROM heroes WHERE id=${escapeId}`;
  MySQL.ejecutarQuery(query,(err, heroes:Object[])=>{

    if(err){
      resp.status(400).json({
        ok:false,
        err:err
      })
    }else{
      resp.status(200).json({
        ok:true,
        heroes
      })
    }

  });


});

export default router;
