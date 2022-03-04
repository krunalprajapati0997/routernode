
  
const path = require('path');
const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        if(!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
            var err = new Error();
            err.code = 'filetype';
            return cb(err);
        } else {
            cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname));
        }
    }
})


var upload = multer({
    storage:storage
}).single('profile_file');

module.exports=upload