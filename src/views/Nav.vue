<template>
	<div>
		<div class="zh-nav">
			<div class="zh-nav-bar zh-fx-between">
				<ul class="zh-list">
					<li><router-link to="/index">主页</router-link></li>
					<li><router-link to="/collection">专题</router-link></li>
					<li><router-link to="/article">文章</router-link></li>
					<li><router-link to="/user">作者</router-link></li>
				</ul>
				<div class="changeBox">
					<router-link to="/sign" v-if="this.user === null" class="sgin">去登录</router-link>
					<img :src="this.user.avatar" class="zh-avatar" v-if="this.user !== null" />
					<p @click="logout()" v-if="this.user !== null" class="tui" >退出</p>
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
			user: JSON.parse(localStorage.getItem('user'))
		};
	},
	created() {},
	methods: {
		
		logout() {
			this.user = null;
			this.$router.push('/')
			alert("退出")
		}
	}
};
</script>

<style scoped>
li {
	margin-right: 100px;
}

.changeBox{
	display: flex;
}

.tui{
	cursor: pointer;
	margin-left: 30px;
	padding-top: 7px;
}
	
</style>
