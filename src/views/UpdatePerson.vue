<template>
	<div class="container">
		<div class="a">
		<fieldset> 		
		 	 	<legend>个人资料</legend> 
		<div class="update" style="margin: 20px;">
			<div style="margin: 20px;">
				<p>头像:</p>
				<img :src="this.user.avatar" style="width: 100px;height: 100px;"/>
			</div>
			<div>
				<h3 style="color: black;">作者ID: {{this.user.id}} </h3>	
			</div>	
			<div>
				<h3>{{updateuser.nickname}}</h3>
				<input type="text" v-model="updateuser.nickname">
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
				 	 	<select class="province-select" hidefocus="true" v-model="updateuser.address" >  
				 	 	 	 <option value="北京">北京</option> 
				 	 	 	 <option value="天津">天津</option> 
				 	  	     <option value="河北">河北</option> 				 	 	 	       
				 	 	     <option value="上海">上海</option> 
				 	 	 	 <option value="江苏" selected="selected">江苏</option> 
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
			<button class="ok" v-on:click="update()">确定</button>
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
	.a{
		margin: 30px;
	}
	.container{
		width: 100%;
		height: 100%;
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
	.ok{
		margin: 20px;
		width: 60px;
		height: 30px;
	}
</style>
