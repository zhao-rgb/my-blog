<template>
	<div>
			<div class="bl-df-around">
				<router-link to="/user/follows">我关注的</router-link>
				<router-link to="/user/fans">我的粉丝</router-link>
			</div>
			<router-view class="box"/>
		</div>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		created(){
			
		},
		methods:{
			
		},
		computed:{
			
		}
	}
</script>

<style scoped>
	.box {
		background-color: lightblue;
		min-width: 300px;
		min-height: 400px;
	}
	a{
		color: #aaa;
	}
</style>
