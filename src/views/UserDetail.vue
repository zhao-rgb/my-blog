<template>
	<div>
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
				<img :src="this.user.avatar" class="zh-avatar"  @click="toUserDetail(user.id)" />
				<p @click="logout()" v-if="this.user !== null" class="tui">退出</p>
			</div>
		</div>
	</div>
	<div class="zh-containers">
		<div class="top">
		<img :src ="user.avatar" />
		<p class="k">{{user.nickname}}</p>
		</div>
		<div class="right">
			<p>简介:{{user.introduction}}</p>
			<p>性别:{{user.gender}}</p>
			<p>生日:{{user.birthday.year}}.{{user.birthday.month}}.{{user.birthday.day}}</p>
			</div>
		<div class="under">
			<div class="c"><p>动态</p></div>
			<div class="c"><p>回答</p></div>
			<div class="c"><p>提问</p></div>
			<div class="c"><p>文章</p></div>
			<div class="c"><p>专栏</p></div>
			<div class="c"><p>想法</p></div>
			<div class="c"><p>更多</p></div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			user: JSON.parse(localStorage.getItem('user'))
		};
	},
	created() {},
	methods: {
		logout() {
			this.user = null;
			this.$router.push('/');
			alert('退出');
			localStorage.clear();
		}
	},
	computed: {}
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
.zh-navs{
	height: 70px;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 999;
	background-color: rgba(246,246,246);
	cursor: pointer;
}
.c{
	margin-top: 25px;
	border-length:80%;
	margin-left: 20px;
	margin-bottom: 20px;
	height:30px;
	display: flex;
	color: rgb(68,68,98);
	width: 60px;
	
}
.c:hover{
	color: rgb(0,132,255);
	background-color: rgb(235,245,255);
}
.zh-containers{
	display: flex;
	width: 80%;
	margin: auto;
	margin-top: 70px;
}
.top{
	flex: 1 1 30%;
}
.right{
	flex: 1 1 60%;
}
	
</style>
