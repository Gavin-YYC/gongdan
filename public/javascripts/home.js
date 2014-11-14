$('.ui.modal').modal('attach events','#subPost','show');

/* 用户登录 */
avalon.define("userLogin",function(vm){
	vm.o = {
		username:"",
		password:""
	};
	loginInfo = vm.o.$model;
	vm.submit = function(){
		$.post('/userLogin',loginInfo,function(){
			console.log(loginInfo);
		})
	}
});

/* 添加客户 */
avalon.define("userRegister",function(vm){
	vm.o = {
		username:"",
		tel:"",
		password1:"",
		password2:""
	};
	var userInfo = {};
	vm.submit = function(){
		if(vm.o.password1 == vm.o.password2){
			userInfo.password = vm.o.password1;
			userInfo.username = vm.o.username;
			userInfo.tel = vm.o.tel;
			userInfo.settime = new Date;
			userInfo.power = "user";
			$.post('/userNew',userInfo,function(){
				$('#setsuc').modal('show');
				console.log(userInfo);
			});
		}else{
			vm.err = "两次密码不一致";
		}
	};
});

/* 添加工单 */
avalon.define("postNew",function(vm){
	vm.o={
		email:"",
		title:"",
		content:""
	};
	o = vm.o.$model;
	vm.submit = function(){
		$.post('/postNew',o,function(){
            window.location.reload(true);
		})
	};
});

/* 删除工单 */
avalon.define("posts",function(vm){
	var posts = posts;
	vm.remove = function(rm,o){
		$.post('/postDelete',o,function(){
			console.log("delete suc");
		})
	};
});