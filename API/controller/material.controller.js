import db from "../Connection/mysqlcon.js";
import url from "url";

export const manageStatus = (req,res,next) =>{
  let u_id = req.body.material_id;
  let status = req.body.status;
  let val = 0;

  status == 1 ? val =0 : val = 1;


  let sql = `update material set status = ${val} where material_id = ${u_id}`;

  let values = [u_id];

  db.query(sql,values, (err,result)=>{
    if(err){
      console.log(err);
      return res.status(500).json({ status: false ,error : err}); 
    }
    else{
      console.log(result);
      return res.status(201).json({ status: true ,"msg" : "status updated Successfully","Data" : result , statuscode : val});
    }
  })
} 



export const fetch = (req,res,next) =>{
  var sql = "SELECT * FROM  material WHERE material_id = ? ";
  var material_id = req.params.material_id;
  let values = [
       material_id
  ]
  db.query(sql , values, (err,result) =>{

    console.log(sql);

           if(err){
            return res.status(500).json({ status: false ,error : err });
           }
           else{
              if(result.length != 0){
                return res.status(200).json({ status: true , "response" : result});
              }
              else{
                return res.status(500).json({ status: false,error : err });
              }
           }
  })

}


export const deleteMaterial = (req,res,next) =>{
    var sql = "delete from material where material_id = ?";
    var material_id = req.params.material_id;

    let values = [material_id];

    db.query(sql , values, (err,result) =>{
             if(err){
              return res.status(500).json({ status: false,error : err });
             }
             else{
                if(result.length != 0){
                  return res.status(200).json({ status: true , "response" : "Deleted Seccussfully"});
                }
                else{
                  return res.status(500).json({ status: false ,error : err});
                }
             }
    })

}


export const fetchAll = (req, res, next) => {
  var sql = "select * from material";

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ status: false,error : err });
    } else {
      return res.status(201).json({ status: true, moduleDetails: result });
    }
  });
};


export var update = (req, res, next) => {
  var materialData = req.body;

  console.log(materialData);
  var sql =
    "update material set  course_title = ? ,module_title = ?, material_title = ? , material_details = ? where material_id = ?";
  var values = [
    materialData.course_title,
    materialData.module_title,
    materialData.material_title,
    materialData.material_description,
    materialData.material_id,
  ];



  db.query(sql, values, (err, result) => {
    console.log(result);
    if (err) {
        console.log(err);
      return res.status(500).json({ status: false ,error : err});
    } else {
      return res.status(201).json({ status: true ,msg : result});
    }
  });
};

export var save = (req, res, next) => {
  var materialData = req.body;

  console.log(materialData);
  var sql =
    "insert into material (material_id, course_title, module_title, material_title, material_details,status,info) values (NULL , ?,?,?,?,1,?)";
  var values = [
    materialData.course_title,
    materialData.module_title,
    materialData.material_title,
    materialData.material_description,
    Date()
  ];

  db.query(sql, values, (err, result) => {
    console.log(result);
    if (err) {
        console.log(err);
      return res.status(500).json({ status: false ,error : err });
    } else {
      return res.status(201).json({ status: true , msg : result});
    }
  });
};

export default db;
