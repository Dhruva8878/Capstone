import db from "../Connection/mysqlcon.js";
import url from "url";

export const manageStatus = (req,res,next) =>{
  let m_id = req.body.module_id;
  let status = req.body.status;
  let val = 0;

  status == 1 ? val =0 : val = 1;

  let sql = `update module set status = ${val} where module_id = ${m_id}`;

  let values = [m_id];

  db.query(sql,values, (err,result)=>{
    if(err){
      console.log(err);
      return res.status(500).json({ status: false ,error : err }); 
    }
    else{
      console.log(result);
      return res.status(201).json({ status: true ,"msg" : "status updated Successfully","Data" : result, statuscode : val});
    }
  })
} 


export var update = (req, res, next) => {
  var moduleData = req.body;
  var sql =
    "update module set module_title = ?, course_title = ?, details = ?, number_of_questions = ?, number_of_chapters = ? where module_id = ?"; 
  var values = [
    moduleData.module_title,
    moduleData.course_title,
    moduleData.details,
    moduleData.number_of_questions,
    moduleData.number_of_chapters,
    moduleData.module_id,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
        console.log(err);
      return res.status(500).json({ status: false ,error : err });
    } else {
      return res.status(201).json({ status: true , msg : result });
    }
  });
};




export const fetch = (req, res, next) => {
  var sql = "select * from module where module_id = ?";
  var data = req.params.module_id;
  let values = [data];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ status: false ,error : err });
    } else {
      if (result.length != 0) {
        return res.status(200).json({ status: true, response: result });
      } else {
        return res.status(500).json({ status: false ,error : err });
      }
    }
  });
};

export const deleteModule = (req, res, next) => {
  var sql = "delete from module where module_id = ?";
  var module_id = req.params.module_id;

  let values = [module_id];

  db.query(sql, values, (err, result) => {
    if (err) {
      return res.status(500).json({ status: false ,error : err});
    } else {
      if (result.length != 0) {
        return res
          .status(200)
          .json({ status: true, response: "Deleted Seccussfully" });
      } else {
        return res.status(500).json({ status: false ,error : err});
      }
    }
  });
};

export const fetchAll = (req, res, next) => {
  var sql = "select * from module";

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ status: false ,error : err });
    } else {
      return res.status(201).json({ status: true, moduleDetails: result });
    }
  });
};

export var save = (req, res, next) => {
  var moduleData = req.body;
  var sql =
    "insert into module (module_id,module_title, course_title, details, number_of_questions, number_of_chapters,status,info) values (NULL , ?,?,?,?,?,1,?)";
  var values = [
    moduleData.course_title,
    moduleData.module_title,
    moduleData.details,
    moduleData.number_of_questions,
    moduleData.number_of_chapters,
    Date()
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ status: false ,error : err});
    } else {
      return res.status(201).json({ status: true });
    }
  });
};

export default db;
