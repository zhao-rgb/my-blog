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
					<img :src="avatar" class="zh-avatar" v-if="this.user !== null" @click="toUserDetail(user.id)" />
					<p @click="logout()" v-if="this.user !== null" class="tui">退出</p>
				</div>
			</div>
		</div>
		<router-view class="zh-container" />
	</div>
</template>
<script>
export default {
	data() {
		return {
			user: JSON.parse(localStorage.getItem('user')),
			keywords: '',
			avatar: '',
			slideList: [
				{
					url: '#',
					description: 'one',
					image: 'https://cdn.dribbble.com/users/329207/screenshots/7824170/media/cc77353e67ca46a4da78553330209a72.jpg'
				},
				{
					url: '#',
					description: 'two',
					image: 'https://cdn.dribbble.com/users/63407/screenshots/7825858/media/547d13eb0522eabcbbaa6683c82bfe40.png'
				},
				{
					url: '#',
					description: 'three',
					image: 'https://cdn.dribbble.com/users/1018201/screenshots/7816965/media/2ed92a6a7ee0017e28f3bbcaf88b8138.png'
				}
			],
			currentIndex: 0,
			timer: null
		};
	},
	created() {
		this.axios.get(this.GLOBAL.baseUrl + '/detail/' + this.user.id).then(res => {
			console.log(res.data.data);
			this.userVo = res.data.data;
			this.avatar = this.userVo.user.avatar;
		});
	},
	methods: {
		logout() {
			this.user = null;
			this.$router.push('/');
			alert('退出');
			localStorage.clear();
		},
		search() {
			let currentPath = this.$route.path;
			if (currentPath != '/search' || currentPath != '/search/article' || currentPath != '/search/topic' || currentPath != '/search/usere') {
				this.$router.push({ path: '/search', query: { keywords: this.keywords } });
			} else {
				this.$router.push({ path: '/empty', query: { keywords: this.keywords } });
			}
		},
		toUserDetail(id) {
			this.$router.push('/user/person/' + id);
		}
	}
};
</script>

<style scoped>

li {
	margin-right: 100px;
}
.changeBox {
	display: flex;
}
.tui {
	cursor: pointer;
	margin-left: 30px;
	padding-top: 7px;
}
.nav {
	width: 100%;
	height: 30px;
	position: fixed;
	top: 0;
	z-index: 50;
}
.carousel-wrap {
	position: relative;
	width: 100%;
	height: 755px;
	overflow: hidden;
}
.slide-ul {
	width: 100%;
	height: 100%;
}
.slide-ul li {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}
.slide-ul li img {
	width: 100%;
	height: 100%;
}
.carousel-items {
	z-index: 100;
	position: relative;
	top: -80px;
	text-align: center;
	font-size: 0;
}
.carousel-items span {
	display: inline-block;
	width: 50px;
	height: 6px;
	margin: 0 5px;
	background-color: #eee;
	cursor: pointer;
}
.carousel-items .active {
	background-color: #ffa500;
}
/* 动画 */
.slide-enter-to {
	transition: all 1s ease;
	transform: translateX(0);
}
.slide-leave-active {
	transition: all 1s ease;
	transform: translateX(-100%);
}
.slide-enter {
	transform: translateX(100%);
}
.slide-leave {
	transform: translateX(0);
}

</style>
