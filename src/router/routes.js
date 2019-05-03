import components from './routescomponents.js'

export default [

	{
		path:'/',
		name:'MainPalyer',
		component:components.MainPalyer,
		
		children:[
			{
				path:'/',
				redirect:'/index'
			},
		
			{
				path:'/index',
				name:'Index',
				component:components.Index
			},
			
			{
				path:'/localmusic',
				name:'LocalMusic',
				component:components.LocalMusic
			},
			
			{
				path:'/collection',
				name:'Collection',
				component:components.Collection
			},
			
			{
				path:'/download',
				name:'Download',
				component:components.Download
			},
			
			{
				path:'/recentplay',
				name:'RecentPlay',
				component:components.RecentPlay
			},
			
			{
				path:'/musiccircle',
				name:'MusicCircle',
				component:components.MusicCircle
			},
			
			{
				path:'/ksing',
				name:'KSing',
				component:components.KSing
			},
			{
			path:'/search',
			name:'Search',
			component:components.Search
			}
		
		]
	},
	{
		path:'/playview',
		name:'PlayView',
		component:components.PlayView
	},
	{
		path:'/rankdetail',
		name:'RankDetail',
		component:components.RankDetail
	},
	{
		path:'/songlist',
		name:'SongList',
		component:components.SongList
	},
	{
		path:'/songlistdetail',
		name:'SongListDetail',
		component:components.SongListDetail
	}
	
]
