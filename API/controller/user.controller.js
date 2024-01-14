import db from "../Connection/mysqlcon.js";
import jwt from "jsonwebtoken";
import rs from "randomstring";
import url from "url";

export const ForgetPass = (req,res,next) =>{
  let data = req.body;
  let sql = "update user set password = ? where email = ? ";
  let values =  [data.password , data.email ];
  console.log(data);

  db.query(sql,values , (err , result)=>{
    if(err){
      return res.status(500).json({ status: false , error : err}); 
    }
    else{
      return res.status(201).json({ status: true ,"msg" : "Password updated Successfully","Data" : result});
    }
  })
}

export const ChangePass = (req,res,next) =>{
    let data = req.body;
    let sql = "update user set password = ? where email = ? && password = ?";
    let values =  [data.newpass , data.email , data.oldpass];

    db.query(sql,values , (err , result)=>{
      if(err){
        return res.status(500).json({ status: false , error : err}); 
      }
      else{
        if(result.affectedRows == 0){
          return res.status(500).json({ status: false ,error : "Not Able to change Password Wrong Creadentials" }); 
        }
        else{
          return res.status(201).json({ status: true ,"msg" : "Password updated Successfully","Data" : result});
        }
      }
    })
}

export const manageStatus = (req,res,next) =>{
        let u_id = req.body.user_id;
        let status = req.body.status;
        let val = 0;

        status == 1 ? val =0 : val = 1;
    

        let sql = `update user set status = ${val} where user_id = ${u_id}`;

        let values = [u_id];
    
        db.query(sql,values, (err,result)=>{
          if(err){
            return res.status(500).json({ status: false ,error : err}); 
          }
          else{
            return res.status(201).json({ status: true ,statuscode : val , "msg" : "status updated Successfully","Data" : result});
          }
        })
} 

export const update = (req, res, next) => {
  var upData = req.body;
  var sql =
    "update user set first_name = ?, middle_name = ?, last_name = ?, mobile =?,gender = ? , alt_mobile = ? , address1 = ?, address2 = ?, country = ?, state = ? ,city = ? , pincode = ? where email = ?";
  var values = [
    upData.first_name,
    upData.middle_name,
    upData.last_name,
    upData.mobile,
    upData.gender,
    upData.alt_mobile,
    upData.address1,
    upData.address2,
    upData.country,
    upData.state,
    upData.city,
    // upData.profile_icon_name,
    upData.pincode,
    upData.email,
  ];
  console.log(values);

  db.query(sql,values, (err,result)=>{
    if(err){
      console.log(err);
      return res.status(500).json({ status: false , error : err }); 
    }
    else{
      console.log(result);
      return res.status(201).json({ status: true , msg : result });
    }
  })
};

export const del = (req, res, next) => {
  var sql = "delete from user where user_id = ?";
  var user_id = req.params.user_id;
  let values = [user_id];
  console.log(user_id);

  db.query(sql, values, (err, result) => {
    if (err) {
      return res.status(500).json({ status: false, error : err });
    } else {
        return res.status(200).json({ status: true, response: result });
    }
  });
};

export const fetchByEmail = (req, res, next) => {
  var sql = "select * from user where email = ?";
  var email = req.params.email;
  let values = [email];

  db.query(sql, values, (err, result) => {
    if (err) {
      return res.status(500).json({ status: false ,error : err });
    } else {
      if (result.length != 0) {
        return res.status(200).json({ status: true, response: result });
      } else {
        return res.status(500).json({ status: false, error : err });
      }
    }
  });
};

export const fetch = (req, res, next) => {
  var sql = "select * from user where user_id = ?";
  var user_id = req.params.user_id;
  let values = [user_id];

  db.query(sql, values, (err, result) => {
    if (err) {
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

export const fetchAll = (req, res, next) => {
  var sql = "select * from user where role = 'user'";

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ status: false ,error : err });
    } else {
      return res.status(201).json({ status: true, userDetails: result });
    }
  });
};

export var login = (req, res, next) => {
  var data = req.body;
  var sql =
    "select * from user where email = ? and password = ? and status = 1";

  var values = [data.email, data.password];

  db.query(sql, values, (err, result) => {
    if (err) {
      return res.status(500).json({ status: false ,error : err });
    } else {
      console.log(result);
      if (result.length != 0) {
        let payload = { subject: data.email };
        let key = rs.generate();
        let token = jwt.sign(payload, key);
        return res
          .status(201)
          .json({ status: true, token: token, userDeatails: result });
      } else {
        return res.status(500).json({ status: false, token: "error" });
      }
    }
  });
};

export var save = (req, res, next) => {
  var userData = req.body;
  console.log(userData);
  var sql =
    "insert into user (user_id,first_name, middle_name, last_name, email, password, mobile,gender,role, status, info) values (NULL , ?,?,?,?,?,?,?,'user',1,?)";
  var values = [
    userData.first_name,
    userData.middle_name,
    userData.last_name,
    userData.email,
    userData.password,
    userData.mobile,
    userData.gender,
    Date(),
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ status: false ,error : err});
    } else {
      return res.status(201).json({ status: true ,msg:"User added successfully"});
    }
  });
};

export default db;
