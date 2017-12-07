var ObjectID = require('mongodb').ObjectID;
const mongoose = require('mongoose');
var fs = require('fs');
var path = require('path');
var formidable = require('formidable');

module.exports = {

     saveFile: function(req, res){
    
        var path = req.file.filename;
        console.log(path);
        res.end(path);
        
 },
    //function(req, res){

    //     var form =  new formidable.IncomingForm();
    //     //Thiết lập thư mục chứa file trên server
    //     form.uploadDir = "uploads/";
    //     //xử lý upload
    //     form.parse(req,function (err, fields, file) {
    //         //thiết lập path mới cho file
            
    //         var newpath = form.uploadDir;
    //         console.log(newpath);
    //         fs.rename(newpath, newpath, function (err) {
    //             if (err) throw err;
    //               return res.status(200).json({
    //                 message: file
    //             });
    //         });
    //     });
    // },
    downFile: function(req, res){
        var file = 'uploads/'+ req.params.path;
        console.log(file);
        res.download(file); // Set disposition and send it.
      },

  
}