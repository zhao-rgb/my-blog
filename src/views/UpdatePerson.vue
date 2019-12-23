<template>
	<div class="container-u">		
		<div class="a">
		<fieldset> 		
		 	 	<legend>个人资料</legend>         
		<div class="update border">
			<div class="c">		
			<div>
				<h3 style="color: black;">作者ID: {{this.user.id}} </h3>	
			</div>	
			<div>
				
				<input type="text" placeholder="您的昵称:" v-model="updateuser.nickname">
			</div>
			<div class="xb">	
					<h3>性别:</h3>					
					<div><input  type="radio"  value="男" checked="checked"  v-model="updateuser.gender"/><p>男</p></div>					
					<div><input  type="radio" value="女" v-model="updateuser.gender"/><p>女</p></div>							
			</div> 
			<div>
				<h3>生日:</h3>
				<input  class="date" type="date"  v-model="updateuser.birthday">
			</div>
			<div class="address"> 
			    <h3>所在地址:</h3>
				 	 	<select class="province-select" hidefocus="true" v-model="updateuser.address">  
				 	 	 	 <option value="北京">北京</option> 
				 	 	 	 <option value="天津">天津</option> 
				 	  	     <option value="河北">河北</option> 				 	 	 	       
				 	 	     <option value="上海">上海</option> 
				 	 	 	 <option value="江苏">江苏</option> 
				 	         <option value="浙江">浙江</option> 				 
				 	 	 	 <option value="安徽">安徽</option> 
				 	         <option value="新疆">新疆</option> 				 	 	 	      
				 	 	 	 <option value="贵州">贵州</option> 				 	 	 	     
				 	 	 	 <option value="台湾">台湾</option> 
				 	 	 	 <option value="澳门">澳门</option> 				
				 	 	     <option value="香港">香港</option> 
				 	         <option value="其他">其他</option> 				
				 	       </select> 				 	   
			</div>			
			<div>
				<input type="text" placeholder="您的简介:" v-model="updateuser.introduction">
			</div>
			<div>
				<input type="text" placeholder="您的主页地址:" v-model="updateuser.homepage">
			</div>				
			<a class="button" href="#" v-on:click="update()">确定</a>
		</div>
		</div>
		</fieldset> 
		</div>
	</div>		
</template>

<script>
	export default {
		data() {
			return {
				user: JSON.parse(localStorage.getItem('user')),
				userVo: {
					user: {},
					articleList: {}
				},
				updateuser:{
					nickname: '',
					gender : '',
					birthday : '',
					address : '',
					introduction: '',
					homepage: '',
					id: ''
				}		
			};
		},
		created() {
		},
		methods: {
			getImages(_url) {
				if (_url) {
					let _u = _url.substring(8);
					return 'https://images.weserv.nl/?url=' + _u;
				}
			},
			update(){
				this.updateuser.id = this.user.id;
				alert(this.user.id)
				this.axios.put(this.GLOBAL.baseUrl + '/user/update', this.updateuser)
					.then(res => {
						this.$router.go(0);
					});
					alert("成功")
			}
		}
	};
</script>

<style>
	.container-u{
		width: 90%;
		height: 800px;
		margin: auto;
	}
	.a{
	margin: 30px;
	}
	.c{
		margin-left: 50px;
	}
	.update{
		margin-top: 20px;
		margin-bottom: 20px;
		margin-right: 500px;
		margin-left: 420px;
	}
	.container{
		width: 100%;		
		margin: auto;
		align-items: center;	
	}
	.update input{
		display: flex;
		flex-direction: row;
		width: 300px;
		height: 40px;
		margin-top: 20px;
	}
	.xb{
		display: flex;
	}
	.xb input{
		width: 20px;
		margin-right: 10px;
	}
	.province-select{
		width: 80px;
		height: 30px;
	}
	.sex{
		width: 20px;
		height: 20px;
	}
	.date{
		width: 200px;
		height: 30px;
	}
    .button {
     display: block;
	 margin: 10px;
     background: #00B16A;
     color: #fff;
     width: 100px;
     height: 40px;
     line-height: 50px;
     text-align: center;
     font-family: 'Ubuntu', sans-serif;
     font-size: 15px;
     font-weight: bold;
     text-decoration: none;
     border-radius: 2px;
     overflow: hidden;
     -webkit-transition: all 0.15s ease-in;
     transition: all 0.15s ease-in;
    }   
   .button:before {
    content: ' ';
    position: absolute;
    background: #fff;
    width: 25px;
    height: 50px;
    top: 0;
    left: -45px;
    opacity: 0.3;
    -webkit-transition: all 0.25s ease-out;
    transition: all 0.25s ease-out;
    -webkit-transform: skewX(-25deg);
            transform: skewX(-25deg);
   }    
	.button:hover {
	 background: #26C281;
	}
	.button:hover:before {
	 width: 45px;
	 left: 205px;
	}       			       
</style>
