<template>
	<div class="all">
	<div class="zh-nav">
		<div class="zh-nav-bar zh-fx-between">
			<ul class="zh-list">
				<li><router-link to="/index"><i class="iconfont">&#xe616;</i>主页</router-link></li>
				<li><router-link to="/topic"><i class="iconfont">&#xe634;</i>专题</router-link></li>
				<li><router-link to="/article"><i class="iconfont">&#xe643;</i>文章</router-link></li>
				<li><router-link to="/user"><i class="iconfont">&#xe688;</i>作者</router-link></li>
				<li class="nav-item">
					<div class="bar1">
						<input type="text" class="input-box" placeholder="搜索" v-model="keywords" />
						<button class="btn " @click="search"></button>
					</div>
				</li>
			</ul>
			<div class="changeBox">
				<router-link to="/sign" v-if="this.user === null" class="sgin">去登录</router-link>
				<img :src="this.user.avatar" class="zh-avatar" v-if="this.user !== null" @click="toUserDetail(user.id)" />
				<p @click="logout()" v-if="this.user !== null" class="tui">退出</p>
			</div>
		</div>
	</div>
		<div class="zh-containers" >
			<div class="row">
				<div class="zh-col-4 ">
					<div class="ku ">
						<div class="first">
							<img :src="userVo.user.avatar" class="zh-avatars " />
							<p class="title">{{ userVo.user.nickname }}</p>
							<p class="meta">注册时间:{{ userVo.user.createTime.date.year }}年{{ userVo.user.createTime.date.month }}月{{ userVo.user.createTime.date.day }}日</p>
							<p class="sub-title">简介:{{ userVo.user.introduction.slice(0, 50) }}...</p>
							<p class="sub-title">性别:{{ userVo.user.gender}}</p>
							<hr/>
						</div>
						<div class="second">
							<ul class="zh-list">
								<li class="nav-item border-bottom">文章({{ userVo.user.articles }})</li>
								<li class="nav-item ">粉丝({{ userVo.user.fans }})</li>
								<li class="nav-item ">关注({{ userVo.user.follows }})</li>
							</ul>
							<hr />													
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
							<img src="https://i0.hippopx.com/photos/367/415/619/paper-romance-symbol-valentine-thumb.jpg" class="cover" />
				            <h3>他的文章:</h3>
						</div>
						<div class=" zh-col-12 " v-for="(item, index) in userVo.articleList" :key="index">
							<div class="zh-media-wraaper  bordert">
								<div class="zh-media-left"><img :src="getImages(item.article.cover)" class="thumnail-xs" /></div>
								<div class="zh-media-middle">
									<p class="title">标题:{{ item.article.title }}</p>
									<hr/>
									<p class="sub-title">{{ item.article.content.slice(0, 50)}}....</p>	
									<span @click="toDetail(item.article.id)"  style="font-weight: 600; cursor: pointer;" ><i class="iconfont">&#xe611;</i>阅读更多</span>
								</div>					
							</div>
						</div>
					</div>
				</div>
			</div>
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
		toUserDetail(id) {
			this.$router.push('/user/person/' + id);
		}
		}
};
</script>

<style scoped>
	.zh-media-wraaper span{
		position: absolute;
		bottom: 10%;
	}
	.sub-title{
		margin-bottom: 80px;
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
	height:100%;
	margin: auto;
	margin-top: 120px;
}
.nav-item {
	height: 70px;
	line-height: 50px;
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