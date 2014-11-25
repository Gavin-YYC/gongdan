var express = require('express');
var router = express.Router();

/*判断工单状态*/
function renderStatus(status) {
  switch (status) {
    case 0:
      return "等待处理";
    case 1:
      return "已回复";
    case 2:
      return "已关闭";
    default:
      return "未知状态";
  }
};

/* 主页 */
router.get('/', function(req, res) {
  res.render('index');
});

/* 注册页面 */
router.get('/register',function(req,res){
    res.render('register');
});

/* 客户登录 */
router.post('/userLogin',function(req,res){
    var db = req.db;
    var collection = db.get('users');
    var o = req.body;
    collection.findOne({username:o.username,password:o.password},{},function(err,docs){
        if (err){
            console.log("登陆失败");
            return;
        }
        console.log("登陆成功！");
    })
});

/* 添加客户/客服 */
router.post('/userNew',function(req,res){
    var db = req.db;
    var collection = db.get('users');
    var o = req.body;
    var settime = new Date();
    collection.insert(o,function(err,doc){
        if (err) {
            res.send("There was a problem adding the user to the database.");
        }
        else {
            res.send(doc);
        }
    })
});

/* 工单列表 */
router.get('/postlist', function(req, res) {
    var db = req.db;
    var collection = db.get('post');
    collection.find({},{},function(e,docs){
        res.render('postlist', {
            "postlist" : docs
        });
    });
});

/* 查看单个工单 */
router.get('/postlist/:_id',function(req,res){
    var db = req.db;
    var collection = db.get('post');
    var collection_2 = db.get('commit');
    var o = req.params._id;
    collection.find({_id:o},{},function(err,doc){
        collection_2.find({id:o},{},function(err_2,doc_2){
            res.render('postdetail',{
                "postdetail":doc,
                "postCommit":doc_2
            })
        })
    })
});

/* 增加工单 */
router.post('/postNew', function(req, res) {
    var db = req.db;
    var o = req.body;
    var subdate = new Date();
    var email = o.email;
    var title = o.title;
    var content = o.content;
    var status = 0;
    var collection = db.get('post');
    collection.insert({
        "email": email,
        "title": title,
        "content": content,
        "subdate": subdate,
        "status": renderStatus(status)
    }, function (err, doc) {
        if (err) {
            res.send("There was a problem adding the information to the database.");
        }else{
            res.send(doc);
        }
    });
});

/* 删除工单 */
router.post('/postDelete',function(req,res){
    var db = req.db;
    var o = req.body;
    var collection = db.get('post');
    collection.remove({_id:o._id},{},function(err,doc){
        if(err){
            res.send("There was a problem deleting the information to the database.");
        }else{
            res.send(doc);
        }
    });
});

/* 回复工单 */
router.post('/postCommit',function(req,res){
    var db = req.db;
    var collection = db.get('commit');
    var o = req.body;
    o.subdate = new Date();
    console.log(o);
    collection.insert(o,function(err,docs){
        if(err){
            res.send("There was a problem deleting the information to the database.");
        }
        else{
            res.send(docs);
        }
    })
});

module.exports = router;
