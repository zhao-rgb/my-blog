<template>
	<div>
		<div class="row">
			<div class="zh-col-4" v-for="(user, index) in users" :key="index">
				<div class="card zh-shadow flex flex-top-y">
					<div class="card-head flex zh-flex-center">
						<p class="zh-title">{{ user.nickname }}</p>
						<router-link :to="{ path: '/user/detail/' + user.id }"><img :src="user.avatar" /></router-link>
					</div>
					<div class="card-body flex zh-flex-left">
						<p class="zh-sub-title">{{user.introduction}}</p>
						<p class="meta"><strong>来自：{{user.address}}</strong></p>
						<p class="meta">{{user.articles}}篇文章，{{user.fans}}个粉丝</p>
					</div>
				</div>
			</div>
		</div>
		<div class="row"><button class="btn btn-lg btn-rd dark-fill" @click="loadMore">点击加载更多</button></div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			users: [],
			currentPage: 1,
			count: 6
		};
	},
	created() {
		this.axios
			.get(this.GLOBAL.baseUrl + '/user/', {
				params: {
					page: this.currentPage,
					count: this.count
				}
			})
			.then(res => {
				console.log(res.data.data.length);
				this.users = res.data.data;
			});
	},
	methods: {
		loadMore() {
			this.currentPage = this.currentPage + 1;
			this.axios
				.get(this.GLOBAL.baseUrl + '/user/', {
					params: {
						page: this.currentPage,
						count: this.count
					}
				})
				.then(res => {
					console.log(res.data.data.length);
					let temp = [];
					temp = res.data.data;
					for (var i = 0; i < temp.length; i++) {
						this.users.splice(this.currentPage * this.count, 0, temp[i]);
					}
					console.log(this.users.length);
				});
		},
		go(page) {
			window.location.href = page;
		}
	},
	computed: {
		// 解决403图片缓存问题
		getImages(_url) {
			if (_url) {
				let _u = _url.substring(8);
				return 'https://images.weserv.nl/?url=' + _u;
			}
		}
	}
};
</script>

<style scoped>
.card {
	width: 90%;
	height: 300px;
	/* background-image: url(../assets/img/user.png); */
	background-size: 100%, 100%;
	margin-bottom: 50px;
	padding: 20px;
}
.card-head {
	height: 30%;
	padding: 10px;
	display: flex;
	justify-content: center;
	align-items: center;
}
.card-head img {
	width: 80px;
	height: 80px;
	border-radius: 50%;
	margin-left: 20px;
}
.card-body {
	width: 80%;
	margin: 0 auto;
}
.card-body > p {
	line-height: 30px;
}
.card a {
	color: rgb(0, 98, 89);
	font-weight: 700;
}
</style>
