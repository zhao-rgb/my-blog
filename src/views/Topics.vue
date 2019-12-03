<template>
	<div>
		<div class="row">
			<div class="zh-col-4" v-for="(topic, index) in topics" :key="index">
				<div class="card zh-shadow flex flex-top-y">
					<div class="card-head">		
						<img :src="topic.logo" @click="toDetail(topic.id)" />
						<p class="titles">{{ topic.topicName }}</p>
					</div>
					
					<div class="card-body flex flex-left">
						<p class="sub-title">{{ topic.description }}</p>
						<p class="meta">{{ topic.articles }}篇文章，{{ topic.follows }}人关注</p>
					</div>
					<!-- <div class="media-right"><a :href="item.homepage" class="link" @click="go(item.homepage)">专题主页</a></div> -->
				</div>
			</div>
			<div class="row"><button class="btn btn-lg btn-rd dark-fill" @click="loadMore">点击加载更多</button></div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			topics: [],
			currentPage: 1,
			count: 6
		};
	},
	created() {
		this.axios
			.get(this.GLOBAL.baseUrl + '/topic/', {
				params: {
					page: this.currentPage,
					count: this.count
				}
			})
			.then(res => {
				console.log(res.data.data.length);
				this.topics = res.data.data;
			});
	},
	methods: {
		loadMore() {
			this.currentPage = this.currentPage + 1;
			this.axios
				.get(this.GLOBAL.baseUrl + '/topic/', {
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
						this.topics.splice(this.currentPage * this.count, 0, temp[i]);
					}
					console.log(this.topics.length);
				});
		},
		go(page) {
			window.location.href = page;
		},
		toDetail(id) {
			this.$router.push('/topic/detail/' + id);
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
		/* background-image: url(../assets/img/topic.png); */
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
		flex-direction: column;
	}
	.card-head img {
		width: 80px;
		height: 80px;
		border-radius: 10px;
		margin-left: 100px;
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
	.titles{
		font-size: 16px;
		font-weight: 600;
		color: rgba(0, 0, 0, 0.7);
		cursor: pointer;
		margin-left: 90px;
		margin-top: 20px;
	}
</style>
