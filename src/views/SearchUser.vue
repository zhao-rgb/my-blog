<template>
	<div class="row">
		<div v-for="(user, index) in users" :key="index" class="zh-col-12">
			<div class="zh-media-wraaper zh-shadow">
				<div class="zh-media-left">
					<img :src="user.avatar" class="avatar-lg link" @click="toDetail(user.id)" />
					<p>{{ user.nickname }}</p>
				</div>
				<div class="zh-media-middle">
					<p>{{ user.introduction }}</p>
					<p>
						<span class="meta gutter">写了{{ user.articles }}篇文章</span>
						<span class="meta gutter">{{ user.fans }}个粉丝</span>
						<span class="meta gutter">关注了{{ user.follows }}人</span>
					</p>
				</div>
				<div class="zh-media-right"><button class="btn btn-lg btn-rd warning-fill">关注</button></div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			users: [],
			keywords: ''
		};
	},
	created() {
		this.keywords = this.$route.query.keywords;
		console.log(this.keywords);
		this.axios
			.get(this.GLOBAL.baseUrl + '/user/', {
				params: {
					keywords: this.keywords
				}
			})
			.then(res => {
				console.log(res.data.data.length);
				this.users = res.data.data;
			});
	},
	methods: {
		toDetail(id) {
			this.$router.push('/user/detail/' + id);
		}
	}
};
</script>

<style></style>
