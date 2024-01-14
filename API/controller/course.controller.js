import db from "../Connection/mysqlcon.js";
import url from "url";


export const manageStatus = (req,res,next) =>{
  let u_id = req.body.course_id;
  let status = req.body.status;
  let val = 0;

  status == 1 ? val =0 : val = 1;


  let sql = `update course set status = ${val} where course_id = ${u_id}`;

  let values = [u_id];

  db.query(sql,values, (err,result)=>{
    if(err){
      console.log(err);
      return res.status(500).json({ status: false,error : err }); 
    }
    else{
      return res.status(201).json({ status: true ,"msg" : "status updated Successfully","Data" : result , statusCode : val});
    }
  })
} 

export const fetch = (req,res,next) =>{
  var sql = "select * from course where course_id = ?";
  var data = req.params.course_id;

  let values = [data];

  db.query(sql , values, (err,result) =>{
           if(err){
            console.log(err);
            return res.status(500).json({ status: false ,error : err });
           }
           else{
              if(result.length != 0){
                return res.status(200).json({ status: true , "response" : result});
              }
              else{
                return res.status(500).json({ status: false  ,error : err});
              }
           }
  })

}



export const deleteCourse = (req,res,next) =>{
  var sql = "delete from course where course_id = ?";
  var course_id = req.params.course_id;

  let values = [course_id];

  db.query(sql , values, (err,result) =>{
           if(err){
            return res.status(500).json({ status: false,error : err });
           }
           else{
              if(result.length != 0){
                return res.status(200).json({ status: true , "response" : "Deleted Successfully"});
              }
              else{
                return res.status(500).json({ status: false,error : err });
              }
           }
  })

}


export const fetchAll = (req, res, next) => {
  var sql = "select * from course";

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ status: false,error : err });
    } else {
      return res.status(201).json({ status: true, courseDetails: result });
    }
  });
};


export var update = (req, res, next) => {
  var courseData = req.body;

  console.log(courseData);
  var sql =
    "update course set  course_title = ?, course_details = ?, age_group = ?, duration_period = ?, introduction = ?, keywords = ?,course_effective_price = ?,about_course_details = ? , course_description = ? where course_id = ?" ;
  var values = [
    courseData.course_title,
    courseData.course_details,
    courseData.age_group,
    courseData.duration_period,
    courseData.introduction,
    courseData.keywords,
    courseData.course_effective_price,
    courseData.about_course_details,
    courseData.course_description,
    courseData.course_id,
  ];



  db.query(sql, values, (err, result) => {
    console.log(result);
    if (err) {
        console.log(err);
      return res.status(500).json({ status: false ,error : err});
    } else {
      return res.status(201).json({ status: true , msg : result});
    }
  });
};


export var save = (req, res, next) => {
  var courseData = req.body;
  var sql =
    "insert into course (course_id,course_title, course_details, age_group, duration_period, introduction, keywords,course_effective_price,about_course_details, course_description,status,info) values (NULL , ?,?,?,?,?,?,?,?,?,1,?)";
  var values = [
    courseData.course_title,
    courseData.course_details,
    courseData.age_group,
    courseData.duration_period,
    courseData.introduction,
    courseData.keywords,
    courseData.course_effective_price,
    courseData.about_course_details,
    courseData.course_description,
    Date(),
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
        console.log(err);
      return res.status(500).json({ status: false,error : err });
    } else {
      return res.status(201).json({ status: true , msg : result });
    }
  });
};

export default db;
