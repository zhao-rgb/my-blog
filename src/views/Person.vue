<template>
	<div>
		<div class="all">
			<div class="zh-nav">
				<div class="zh-nav-bar zh-fx-between">
					<ul class="zh-list">
						<li>
							<router-link to="/index">
								<i class="iconfont">&#xe616;</i>
								主页
							</router-link>
						</li>
						<li class="nav-item border-bottom">
							<router-link :to="{ path: '/writearticle' }">
								<i class="iconfont">&#xe601;</i>
								写文章
							</router-link>
						</li>
					</ul>
					<div class="changeBox">
						<router-link to="/sign" v-if="this.user === null" class="sgin">去登录</router-link>
						<img :src="avatar" class="zh-avatar" v-if="this.user !== null" @click="toUserDetail(user.id)" />
						<p @click="logout()" v-if="this.user !== null" class="tui">退出</p>
					</div>
				</div>
			</div>
			<div class="zh-containers ">
				<div class="row">
					<div class="zh-col-4 ">
						<div class="ku">
							<div class="first">
								<div class="left">
									<img :src="avatar" class="zh-avatars" @click="handleClick()" v-if="userVo.user.id === this.user.id"/>
									<img :src="avatar" class="zh-avatars" v-else />
									<input type="file" @change="changeAvatar($event)" style="display: none;" id="fileBox" />
								</div>
								<div class="right">
									<p class="title">昵称:{{ userVo.user.nickname }}</p>
									<p class="title">性别:{{ userVo.user.gender }}</p>
									<p class="title">
										注册时间:{{ userVo.user.createTime.date.year }}年{{ userVo.user.createTime.date.month }}月{{ userVo.user.createTime.date.day }}日
									</p>
									<p class="title">简介:{{ userVo.user.introduction.slice(0, 50) }}...</p>
								</div>
							</div>
							<div class="second">
								<ul class="zh-list">
									<li class="nav-item border-bottom">文章({{ userVo.user.articles }})</li>
									<li class="nav-item ">粉丝({{ userVo.user.fans }})</li>
									<li class="nav-item ">关注({{ userVo.user.follows }})</li>
								</ul>
							</div>
							<li class="bj">
								<router-link :to="{ path: '/updateperson' }">
									<i class="iconfont">&#xe60a;</i>
									编辑个人资料
								</router-link>
							</li>
							<div class="back" style="background-color: wheat;width: 100%; height: 220px; "></div>
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
								<h3>我写的文章:</h3>
							</div>
							<div class="border zh-col-4" v-for="(item, index) in userVo.articleList" :key="index">
								<div class="mywrite shadow border">
									<div class="zh-media-left"><img :src="getImages(item.article.cover)" class="thumnail-xs" /></div>
									<div class="zh-media-middle">
										<p class="title">标题:{{ item.article.title }}</p>
										<hr />
										<p class="sub-title">内容:{{ item.article.content }}</p>
									</div>
									<div class="media-bottom">
										<span @click="toDetail(item.article.id)" class="border more">
											<i class="iconfont">&#xe611;</i>
											阅读更多
										</span>
										<i class="iconfont" style="color:grey; font-size: 25px;float: right;" @click="dels(item.article.id, item.article.userId)">&#xe612;</i>
									</div>
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
			avatar: '',
			show: true
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
			this.avatar = this.userVo.user.avatar;
		});
	},
	methods: {
		getImages(_url) {
			if (_url) {
				let _u = _url.substring(8);
				return 'https://images.weserv.nl/?url=' + _u;
			}
		},
		toDetail(id) {
			this.$router.push('/article/detail/' + id);
		},
		dels(id, id1) {
			if (id1 !== this.user.id) {
				alert('不能删');
				return;
			}
			alert(id);
			this.axios.delete(this.GLOBAL.baseUrl + '/article/delete?id=' + id + '&userId=' + this.user.id).then(res => {
				this.user.articles--;
				// this.$router.go(0);
			});
			alert('删除文章成功');
		},
		//点击头像，即模拟点击文件选择组件
		handleClick: function() {
			document.getElementById('fileBox').click();
		},
		changeAvatar: function() {
			var _this = this;
			let formData = new FormData();
			alert(event.target.files[0].name);
			formData.append('file', event.target.files[0]);
			this.$http({
				method: 'post',
				url: this.GLOBAL.baseUrl + '/upload',
				headers: {
					'Content-Type': 'multipart/form-data'
				},
				data: formData,
				processData: false,
				contentType: false
			}).then(uploadFileRes=> {
				console.log(uploadFileRes.data.data)
				_this.avatar = uploadFileRes.data.data;
				this.updateAvatar(_this.avatar);
			});
			//调用修改头像的方法
			
		},
		updateAvatar: function(avatar) {
			var _this = this
			console.log(avatar)
			this.$http({
				method: 'put',
				url: this.GLOBAL.baseUrl + '/updateA',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				params: {
					mobile: this.user.mobile,
					avatar: avatar
				}
			}).then(res => {
				  console.log(res.data.code);
			});
		}
		
	}
};
</script>

<style scoped>
.all {
	background-image: url('https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1152000485,3169834010&fm=26&gp=0.jpg');
	background-size: calc(100%);
}
.bj {
	text-align: center;
}
.mywrite {
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	margin: 20px;
}
.zh-media-middle span {
	margin-top: 10px;
	text-align: center;
}
.zh-media-middle .title {
	font-size: 30px;
	text-align: center;
}
.zh-media-middle .sub-title {
	font-weight: 600;
	font-size: 25;
	line-height: 70px;
	text-indent: 2em;
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
	align-items: flex-start;
}
.first img {
	border: 2px solid #fff;
}
.ku p {
	margin: 10px;
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
	height: 70px;
	line-height: 50px;
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
