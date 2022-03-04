const express = require("express");
const User = require("../model/user")
const multer  = require('multer');
const upload = require("../middleware/upload");


module.exports = function(router){

    router.get('/', (req, res) => {
        console.log('hey get')
        res.send('Hello World!')
    })
    router.post("/", async (req, res) => {
        console.log('hey... post')
        const data = await User(req.body)
        data.save()
        res.send(req.body)
      })
      router.put("/:id", async (req, res) => {
        console.log('hey... put')
        const id=req.params.id
        const data = await User.findByIdAndUpdate(req.params.id,req.body)
        data.save()
        res.send(req.body)
      })

      // router.delete('/:id',async(req,res)=>{
      //   console.log('het ...delete')
      //   const id = req.params.id
      //   const data = await User.findByIdAndDelete(req.params.id,req.body)
      //   res.send(req.body)
      // })

      router.delete("/:id",async(req,res)=>{
        const id = req.params.id
         const user2 = await User.findByIdAndDelete(req.params.id);
         
         res.send(user2)
     })

     router.post('/profile' , (req , res)=>{
     upload(req, res, function(err) {
      if(err) {
          if( err.code === 'LIMIT_FILE_SIZE'){
              res.json({ success: false, message: 'Profile Image too large !!!'});
          } else if( err.code === 'filetype' ) {
              res.json({ success: false, message: 'Invaild : Only jpeg, jpg and png supported !!!'});
          } else {
              console.log(err);
              res.json({ success: false, message: 'Profile Image not upload !!!'});
          }
      } else {
          if(!req.file) {
              res.json({ success: false, message: 'No file selected !!!'});
          } else{
              let user = new User();

              user.name = req.body.name;
              user.email = req.body.email;
              user.mobile = req.body.mobile;
              // user.password = req.body.password;
              user.address = req.body.address;
              user.profile_file = req.file.filename;
              user.profile_path = req.file.path;
              user.save(function(err){
                  if(err){
                      console.log(err.errors.name);
                      if(err.errors.name) {
                          res.json({ success: false, message: "Name is required" });    
                      } else if(err.errors.email) {
                          res.json({ success: false, message: "E-mail is required" });    
                      } else if(err.errors.mobile) {
                          res.json({ success: false, message: "Mobile is required" });    
                      } else if(err.errors.password) {
                          res.json({ success: false, message: "Password is required" });    
                      } else {
                          res.json({ success: false, message: err });
                      }
                  } else {
                      res.json({ success: true, message: 'Registration Successfully' });
                  }
              });
          }
      }
  })

})
    
        
        return router;
}