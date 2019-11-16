<template>
	<div class="container">
		<div class="zh-col-4">
			<div class="media" v-for="(user, index) in users" :key="index">
				<div class="zh-avatar">
					<img :src="user.avatar" />
					<p class="sub-title">{{ user.nickname }}</p>
				</div>
			</div>
			
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				users :[]
			}
		},
		created(){
			this.axios.get('http://localhost:8080/api/users').then(res => {
				console.log(res.data.data);
				this.articles = res.data.data;
			});
			
		},
		methods:{
			
		},
		computed:{
			
		}
	}
</script>

<style scoped>
	.container{
		margin-top: 100px;
	}
	
</style>
