import Vue from 'vue'
import VueRouter from 'vue-router'
import Nav from '@/views/Nav.vue'
import Index from '@/views/Index.vue'
import Articles from '@/views/Articles.vue'
import ArticleDetail from '@/views/ArticleDetail.vue'
import Users from '@/views/Users.vue'
import UserDetail from '@/views/UserDetail.vue'
import Sign from '@/views/Sign.vue'
import Topics from '@/views/Topics.vue'
import TopicDetail from '@/views/TopicDetail.vue'
import Search from '@/views/Search.vue'
import SearchUser from '@/views/SearchUser.vue'
import SearchTopic from '@/views/SearchTopic.vue'
import SearchArticle from '@/views/SearchArticle.vue'
import Basic from '@/views/Basic.vue'
import Setting from '@/views/Setting.vue'
import Empty from '@/views/Empty.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		component: Nav,
		children: [
			{
				path: '/',
				redirect: '/index'
			},
			{
				path: 'index',
				component: Index
			},
			{
				path: 'topic',
				component: Topics,
				children: [{
					path: ':id',
					component: TopicDetail
				}]
			},
			{
				path: 'article',
				component: Articles,
				children: [{
					path: ':id',
					component: ArticleDetail
				}]
			},
			{
				path: 'user',
				component: Users,
				children: [{
						path: ':id',
						component: UserDetail
					}],
			},
			{
				path: 'user/:id',
				component: UserDetail
			},
			// {
			// 	path: 'user/:id',
			// 	component: UserDetail,
			// 	children: [{
			// 			path: '/',
			// 			redirect: 'user/:id'
			// 		},
			// 		{
			// 			path: 'basic',
			// 			component: Basic
			// 		},
			// 		{
			// 			path: 'setting',
			// 			component: Setting
			// 		}
			// 	]
			// },
			{
				path: 'search',
				component: Search,
				children: [
					{
						path: '/',
						redirect: 'article'
					},
					{
						path: 'article',
						component: SearchArticle
					},
					{
						path: 'topic',
						component: SearchTopic
					},
					{
						path: 'user',
						component: SearchUser
					}
				]
			},
			{
				path: 'empty',
				component: Empty
			}
			
		]
	},
	{
		path: '/sign',
		component: Sign
	},
	{
		path: '/user/detail/*',
		component: UserDetail
	},
	{   
		path: '/article/detail/*',
	 	component: ArticleDetail
	},
	{
		path: '/topic/detail/*',
		component: TopicDetail
	}
	
]

const router = new VueRouter({
	routes
})

export default router
