<template>
    <div class="login">
        <h1>Login</h1>
        <div class="input">
            <el-input placeholder="输入手机号" v-model="input.phone"></el-input>
            <el-input placeholder="输入密码" v-model="input.password" show-password></el-input>
			<el-link type="primary" @click="Qrlogin()">二维码登录</el-link>
            <el-button type="primary" @click="login()">登录</el-button>
        </div>
		<el-dialog
		  title="扫码登录"
		  :visible.sync="qrdialog"
		  @close="Closedialog"
		  width="50%"
		  custom-class="qr-dialog"
		  center>
		  <img :src="QrimgUrl" >
		  <p>{{loginStatus}} </p>
		</el-dialog>
        <p v-if="message != ''">{{message}}</p>
    </div>
</template>

<script>
    export default{
        name:"Login",
        data(){
            return{
                input:{
                    phone:'',
                    password:''
                },
				QrimgUrl:'',
                message:'',
				qrdialog:false,
				loginStatus:"  "
            }
        },
        mounted() {
            if(localStorage.user){
                this.$router.push('./')
            }
        },
        methods:{
            login:function(v){
                if(!window.localStorage){
                    alert("请更新浏览器");
                    return false;
                }
                let main = this;
                if(this.input.phone == '' || this.input.password == ''){
                    this.$message({
                        message:'请完成输入',
                        type:'warning' 
                    })
                }else{
                    this.axios.get(`${this.ApiURl}/login/cellphone`,{
						params:{
						    phone:this.input.phone,
						    password:this.input.password
						}
                    }).then(function(res){
                        console.log(res.data);
                        const data = res.data;
                        main.message = data.message;
                        if(data.code != 200) return false;
                        
                        localStorage.setItem("user",JSON.stringify(data.cookie));
                        main.$router.push('./');
                    }).catch(function(res){})
                }
            },
			Qrlogin:function(){
				let main = this;
				let timestamp1 = Date.parse(new Date())
				this.axios.get(`${this.ApiURl}/login/qr/key`,{
					params:{
						time:timestamp1
					}
				}).then(function(res) {
					let qrkey = res.data.data.unikey;
					main.axios.get(`${main.ApiURl}/login/qr/create`,{
						params:{
						    key:qrkey,
							qrimg:1,
							time:timestamp1
						}
					}).then(function(res) {
						if(res.data.code == 200){
							main.qrdialog = true
							main.QrimgUrl = res.data.data.qrimg
							main.Interval = setInterval(function() {
								let timestamp1 = Date.parse(new Date())
								main.axios.get(`${main.ApiURl}/login/qr/check`,{
									params:{
									    key:qrkey,
										time:timestamp1
									}
								}).then(function(res) {
									let code = res.data.code;
									if(code == 801){
										main.loginStatus = res.data.message
									}else if(code == 802){
										main.loginStatus = res.data.message
									}if(code == 803){
										main.loginStatus = res.data.message
										localStorage.setItem("user",JSON.stringify(res.data.cookie));
										clearInterval(main.Interval)
										main.$router.push('./');
									}
									console.log(main.loginStatus)
								})
							},1000)
						}
					})
				})
				
			},
			Closedialog:function(){
				clearInterval(this.Interval)
			}
        }
    }
</script>

<style>
    .login{
        width: 100%;
		max-width: 450px;
        height: 100%;
        padding: 10% 20px;
    }
    .login h1{
        margin-bottom: 30px;
        text-align: center;
        color: #409EFF;
    }
    .input{
        max-width: 450px;
        width: 100%;
        margin: 0 auto;
    }
    .el-input{
        margin-bottom: 30px;
    }
	.el-link{
		margin-bottom: 10px;
	}
    .el-button{
        width: 100%;
    }
	.qr-dialog{
		max-width: 450px;
		width: 100%;
	}
	.qr-dialog p{
		text-align: center;
	}
</style>
