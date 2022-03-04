const express = require("express");
const User = require("../model/user")
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
      return router;
}