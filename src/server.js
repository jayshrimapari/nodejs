const express = require('express');
const bodyparser = require('body-parser')
const Joi = require('joi');

const app = express();

app.use(bodyparser.json());
const students = [
    {
        "name": "jayshri",
        "id": "1",
        "lang": "marathi",
        "std": "5"
    },
    {
        "name": "yogeshwar",
        "id": "2",
        "lang": "maths",
        "std": "10"
    }
];

app.get('/api/studentdata', (req,res)=>{
  return res.send(students)
})

app.get('/api/studentdata/:studentId', (req,res)=>{
     const {studentId} =req.params;
     const student = students.find(el => el.id ===studentId)
    // console.log(req.studentId, "<----------This is the studentId");
    if (student){
        return res.send(student)
      }else{
        return res.status(404).send({error:"student not found.Try with a valid id"})
      }
   
  })
  const postStudentSchema = Joi.object({
    name: Joi.string().min(5).max(30).required(),
    id: Joi.number().integer().min(1),
    lang: Joi.string().min(5).max(10).required(),
    std: Joi.number().integer().min(1),

  })


app.post('/api/studentdata', (req,res)=>{
    const student=req.body;
    const {error} = postStudentSchema.validate(student)
    if (error){
        return res.status(400).send({
            msg:error.message
        })  
    }
    
      students.push(student)
      return res.status(201).send({
        msg:"student created successfully"
      })
    }

)
app.delete('/api/studentdata/:studentId', (req,res)=>{
    const {studentId} =req.params;
    const studentIndex =students.findIndex(students => students.id === studentId);
    if (studentIndex === -1){
        return res.status(404).send({error:"student not found.plevalid idase try with a id"})
    }
    students.splice(studentIndex,1);
    return res.status(200).send({msg:"Student removed successfully"})
})

app.put('/api/studentdata/:studentId', (req,res)=>{
    const {studentId} =req.params;
    const student=req.body;
    const studentIndex =students.findIndex(students => students.id === studentId);
    if (studentIndex === -1){
        return res.status(404).send({error:"student not found.plevalid idase try with a id"})
    }
    students[studentIndex] ={
        name:student.name,
        id:studentId,
        lang:student.lang,
        std:student.std
    }
        return res.status(200).send(students[studentIndex])
})

app.listen(8000,() =>{
    console.log("server started on port 8000")
})