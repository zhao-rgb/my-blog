<template>
	<div>
	<div class="all" v-if="show">
		<div class="zh-navs">
			<div class="zh-nav-bar zh-fx-between">
				<ul class="zh-list">
					<li><router-link to="/index">主页</router-link></li>
					<li>发现</li>
					<li>等你来答</li>
					<li class="nav-item"><input type="text" class="input-box" placeholder="搜索" v-model="keywords" /></li>
					<li class="nav-item"><button class="btn btn-lg btn-rd dark-border" @click="search">搜索</button></li>
				</ul>
				<div class="changeBox">
					<img :src="userVo.user.avatar" class="zh-avatar" @click="toUserDetail(user.id)" />
					<p @click="logout()" v-if="this.user !== null" class="tui">退出</p>
				</div>
			</div>
		</div>
		<div class="zh-containers " >
			<div class="row">
				<div class="zh-col-4 ">
					<div class="ku ">
						<div class="first">
							<img :src="userVo.user.avatar" class="zh-avatars " />
							<p class="title">{{ userVo.user.nickname }}</p>
							<p class="meta">注册时间:{{ userVo.user.createTime.date.year }}年{{ userVo.user.createTime.date.month }}月{{ userVo.user.createTime.date.day }}日</p>
							<p class="sub-title">简介:{{ userVo.user.introduction.slice(0, 50) }}...</p>
							<hr />
						</div>
						<div class="second">
							<ul class="zh-list">
								<li class="nav-item border-bottom">文章({{ userVo.user.articles }})</li>
								<li class="nav-item ">粉丝({{ userVo.user.fans }})</li>
								<li class="nav-item ">关注({{ userVo.user.follows }})</li>
							</ul>
							<hr />
							<ul class="title ">
								<li class="nav-item border-bottom" v-on:click="changeshow()">写文章</li>
								<li class="nav-item border-bottom" v-on:click="changeshow()">修改个人资料</li>
							</ul>							
						</div>
						<hr />
						<div class="third">
							<h3>个人站点</h3>
							<hr />
							<div class="imf">
								<p>电子邮箱：2623327266@qq.com</p>
								<p>QQ号：2673327266</p>
								<p>电话号码:18805167526</p>
								<p>个人主页：{{ userVo.user.homepage }}</p>
								<p>家庭住址：{{ userVo.user.address }}</p>
								<p>出生日期：{{ userVo.user.birthday.year }}年{{ userVo.user.birthday.month }}月{{ userVo.user.birthday.day }}日</p>
							</div>
						</div>
					</div>
				</div>
				<div class="zh-col-8 border-left">
					<div class="row">
						<div class="banner flex zh-flex-center zh-col-12">
							<img src="https://i0.hippopx.com/photos/170/829/152/summerfield-woman-girl-sunset-thumb.jpg" class="cover" />
							<div class="lab zh-col-12 border shadow"></div>
						</div>
						<div class=" love zh-col-12 " v-for="(item, index) in userVo.articleList" :key="index">
							<div class="zh-media-wraaper shadow">
								<div class="zh-media-left"><img :src="getImages(item.article.cover)" class="thumnail-xs" /></div>
								<div class="zh-media-middle">
									<p class="title" @click="toDetail(item.article.id)">{{ item.article.title }}</p>
									<hr />
									<p class="sub-title">{{ item.article.content }}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div> 
	</div>
	
	
<!-- 	<div class="writearticle border" v-if="!show">
		<span style="color: white;">作者ID: {{this.user.id}} </span>			
		<div class="con">
			<div class="con-head">
				<input type="text" placeholder="标题:" v-model="writeArticle.title">
				<input type="text" placeholder="简介:" v-model="writeArticle.content">
				<input type="text" placeholder="专题ID::" v-model="writeArticle.topicId">
				<input type="text" placeholder="输入图片地址:" v-model="writeArticle.cover">
			</div>
			<div class="con-body">				
				<textarea rows="10" cols="30" placeholder="内容:" v-model="writeArticle.text"></textarea>
				<button @click="changeshow()" v-on:click="release">发布</button>
			</div>
		</div>       						
	</div> -->
	
	
	<div class="update" v-if="!show">
		<input type="text" placeholder="昵称" v-model="updateuser.nickname">
		<input type="text" placeholder="性别" v-model="updateuser.gender">
		<input type="text" placeholder="生日" v-model="updateuser.birthday">
		<input type="text" placeholder="地址" v-model="updateuser.address">
		<input type="text" placeholder="简介" v-model="updateuser.introduction">
		<input type="text" placeholder="主页" v-model="updateuser.homepage">
		<input type="text" placeholder="id" v-model="user.id">
		<button v-on:click="update()">确定</button>
	</div>
	
	
	
	</div>
</template>

<script>
export default {
	data() {
		 // return {
		 // 	user: JSON.parse(localStorage.getItem('user'))
		 // };
		return {
			user: JSON.parse(localStorage.getItem('user')),
			userVo: {
				user: {},
				articleList: {}
			},
			
			writeArticle: {
				topicId:'',
				userId: '',
				title:'',
				content: '',
				cover:'',
				diamond:0,
				comments:0,
				likes:0,
				text:''
			},
			show:'true',
			watch:'true',
			
			
			
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
		var query = window.location.href;
		//锁定到最后一个"/"的位置
		var begin = query.lastIndexOf('/') + 1;
		//取出地址中最后的id值
		var usersId = query.substring(begin);
		this.axios.get(this.GLOBAL.baseUrl + '/detail/' + usersId).then(res => {
			console.log(res.data.data);
			this.userVo = res.data.data;
		});
	},
	methods: {
		// logout() {
		// 	this.user = null;
		// 	this.$router.push('/');
		// 	alert('退出');
		// 	localStorage.clear();
		// }

		getImages(_url) {
			if (_url) {
				let _u = _url.substring(8);
				return 'https://images.weserv.nl/?url=' + _u;
			}
		},
		toDetail(id) {
			this.$router.push('/article/detail/' + id);
		},
		release() {
			if(this.writeArticle.text==''||this.writeArticle.text==''||this.writeArticle.content==''||this.writeArticle.topicId==''){
				alert("类容不能为空")
				return;
			}			
			this.writeArticle.userId= this.user.id;
			//alert(this.user.id);
			// alert(this.comment.content);
			this.axios.post(this.GLOBAL.baseUrl + '/article/new', this.writeArticle)
			.then(res => {
				// alert(res.data.msg);
				this.$router.go(0);
			});
			alert("发布成功")
			
		},
		update(){
			// let data = {
			// 	"id": user.id,
			// 	"nickname": user.nickname,
			// 	"address": user.address,
			// 	"birthday":user.birthday,
			// 	"gender":user.gender,
			// 	"introduction":user.introduction,
			// 	"homepage":user.homepage,
			// };
			this.updateuser.id = this.user.id;
			alert(this.user.id)
			this.axios.put(this.GLOBAL.baseUrl + '/user/update', this.updateuser)
				.then(res => {
					this.$router.go(0);
				});
				alert("成功")
		},
		changeshow(){			
			this.show=!this.show;
		},       			
	},
	computed: {}
};
</script>

<style scoped>
	.writearticle{
		background-image: url(../assets/img/4.jpg);		
		padding: 20px;
		height: 800px;
	}
	.con .con-head{
		display: flex;
		flex-direction: column;
		margin-bottom: 20px;
	}
	.con .con-head input{
		width: 500px;
		height: 40px;
		margin-top: 20px;
	}
	.con .con-body{
		width: 500px;
		height: 40px;
		margin-top: 20px;
	}
	.con .con-body textarea{
		width: 800px;
		height: 100px;
		margin-top: 30px;
		margin-bottom: 30px;
	}
	.con .con-body button{			
		width: 100px;
		height: 40px;
		background-color: orange;
	}
.all {
	background-image: url('https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1152000485,3169834010&fm=26&gp=0.jpg');
	background-size: calc(100%);
}
.banner {
	width: 100%;
	height: 200px;
	margin-top: 50px;
	padding-bottom: 40px;
}
.cover {
	width: 90%;
	height: 100%;
	margin-left: 38px;
}
.love {
	display: flex;
	flex-flow: column;
	margin-top: 20px;
}
.ku {
	margin-top: 50px;
	margin-right: 10px;
}
.lab {
	height: 50px;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin-top: 5px;
	background-color: wheat;
}

.lab p {
	font-size: 30px;
	font-weight: 600;
	color: white;
}

.first {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.first img {
	border: 2px solid #fff;
}

.ku p {
	margin-bottom: 10px;
}

.row {
	display: flex;
	margin-top: -50px;
	flex-wrap: wrap;
}
.zh-navs {
	height: 70px;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 999;
	background-color: rgba(172, 91, 155);
	cursor: pointer;
}
li {
	margin-right: 60px;
}
.changeBox {
	display: flex;
}
.tui {
	cursor: pointer;
	margin-left: 30px;
	padding-top: 7px;
}
.zh-containers {
	width: 80%;
	margin: auto;
	margin-top: 100px;
}
.nav-item {
	height: 70px;
	line-height: 70px;
}
/* 下边框 */
.border-bottom {
	border-bottom: 1px solid #ddd;
	padding-bottom: 20px;
}
.zh-avatars {
	width: 100px;
	height: 100px;
	border-radius: 50%;
	cursor: pointer;
}
.thumnail-xs {
	width: 150px;
	height: 150px;
	border-radius: 10px;
}
</style>
