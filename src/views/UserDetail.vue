<template>
	<div class="all">
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
		<div class="zh-containers ">
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
								<li class="nav-item border-bottom">写文章</li>
								<li class="nav-item border-bottom">留言板</li>
								<li class="nav-item border-bottom">个人资料</li>
							</ul>

							<div class="main">
								<ul class="items"></ul>
								<textarea name="" id="text" cols="30" rows="10" v-model="commentDto.content"></textarea>
								<button @click="ok()">点击留言</button>
							</div>
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
</template>

<script>
export default {
	data() {
		// return {
		// 	user: JSON.parse(localStorage.getItem('user'))
		// };
		return {
			userVo: {
				user: {},
				articleList: {}
			},
			commentDto: {
				content: '',
				nickname: ''
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

		ok() {
			var item = document.getElementsByClassName('items')[0]; //获取ul和下标；
			var val = text.value; //把textarea的内容取出来
			var li = document.createElement('li'); //创建li容器装textarea里输入的内容
			li.innerHTML = val; //创建li容器装textarea里输入的内容
			item.appendChild(li); //插入节点，把li放入合适位置
			text.value = '';
			var btn = document.createElement('button'); //创建按钮，用来删除li内容
			btn.innerHTML = '删除';
			li.appendChild(btn); //把按钮插入li后面

			// this.axios.post('http://localhost:8080/api/comment', JSON.stringify(this.commentDto)).then(response => {
			// 	if (response.data.msg == '注册成功') {
			// 		alert('注册成功');
			// 		// 将后台的用户信息存入本地存储
			// 		localStorage.comment = JSON.stringify(response.data.data);
			// 		// 路由跳转
			// 		// this.$router.push('/');
			// 	}
			// });
			this.axios({
				method: 'post',
				url: this.GLOBAL.baseUrl + '/comment',
				data: JSON.stringify(this.commentDto)
			}).then(res => {
				if (res.data.msg === '注册成功') {
					alert('留言成功');
					localStorage.setItem('comment', JSON.stringify(res.data.data));
					// this.$router.push('/');
				}
			});

			btn.onclick = function() {
				item.removeChild(li); //remoceChid删除节点，使button按钮生效
			};
		}
	},
	computed: {}
};
</script>

<style scoped>
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
