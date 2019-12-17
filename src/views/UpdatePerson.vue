<template>
	<div class="container">
		<fieldset> 		
		 	 	<legend>个人资料</legend> 
		<div class="update">
			<div>
				<p>头像:</p>
				<img :src="this.user.avatar" style="width: 100px;height: 100px;"/>
			</div>
			<div>
				 <label>ID:</label>
				 <input  class="id" type="number" placeholder="id" v-model="user.id" value="user.id" > 
			</div>	
			<div>
				<label>昵称</label>
				<input type="text" placeholder="昵称" v-model="updateuser.nickname">
			</div>
			<div class="xb">			
					<label>性别:</label>
					<input class="sex" type="radio"  value="男" checked="checked"  v-model="updateuser.gender"/>男
					<input class="sex" type="radio" value="女" v-model="updateuser.gender"/>女				
			</div>
			<div>
				<label>生日:</label>
				<input  class="date" type="date"  v-model="updateuser.birthday">
			</div>
			<div class="address"> 
			    <label >所在地址:</label>
				 	 	<select id="province-select" hidefocus="true" v-model="updateuser.address">  
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
				 <label >简介:</label>	
				<input type="text" placeholder="您的简介" v-model="updateuser.introduction">
			</div>
			<div>
				 <label >主页:</label>
				<input type="text" placeholder="主页" v-model="updateuser.homepage">
			</div>	
			<button class="ok" v-on:click="update()">确定</button>
		</div>
		</fieldset> 
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
	.container{
		width: 80%;
		align-items: center;
	}
	.update input{
		display: flex;
		flex-direction: row;
		width: 300px;
		height: 40px;
	}
	.id{
		width: 40px;
		height: 20px;
	}
	.sex{
		width: 20px;
		height: 20px;
	}
	.date{
		width: 200px;
		height: 30px;
	}
</style>
