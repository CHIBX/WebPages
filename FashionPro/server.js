const fs = require('fs');
const express = require('express');
const app=express();
const readfile=function(filename){
    return new Promise((resolve, reject) => {
        fs.readFile(filename, (err, data)=>{
            if(err){
               reject(err);
            }
            else{
                resolve(data);
            }
        })
    })
}
readfile('./index.html')
.then((data)=>{
  app.get(data, (req, res) => {
    if(res.ok){
        res.send('')
    }
    
  })
})
.catch((err)=>{
    console.log(err)
})