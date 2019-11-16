<template>
	<div class="zh-row">
		<div class="zh-col-8">
			<div class="zh-row">
				<div class="zh-col-12" v-for="(article,index) in articles" :key="index">
				<div class="box xu-sub-title">
										<p>{{ article.title }}</p>
										<p>
											<img :src="article.avatar" class="zh-avatar" />
											<span class="zh-meta">{{ article.nickname }}</span>
											<button class="zh-btn zh-warning-theme  zh-btn-circle zh-title zh-shadow">关注</button>
										</p>
									</div>
		</div>
		<div class="zh-col-4">
			
		</div>
	</div>
	</div>
	</div>
	
</template>

<script>
	export default{
		data(){
			return{
				articles: []
			}
		},
		created(){
			this.axios.get('http://27z34d3886.wicp.vip:46912/api/articles/hot').then(res =>{
				console.log(res.data.data)
				this.articles = res.data.data
			})
		},
		methods:{
			
		},
		computed:{
			
		}
	}
</script>

<style scoped>
	
</style>
