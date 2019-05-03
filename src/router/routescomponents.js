export default{
	Index: r =>require(['@/components/index'],r),
	PlayView: r =>require(['@/components/playerView/playView'],r),
	LocalMusic: r =>require(['@/components/my/localmusic'],r),
	MainPalyer: r =>require(['@/components/mainpalyer'],r),
	Collection: r =>require(['@/components/my/collection'],r),
	Download: r =>require(['@/components/my/download'],r),
	RecentPlay: r =>require(['@/components/my/recentPlay'],r),
	MusicCircle: r =>require(['@/components/my/musicCircle'],r),
	KSing: r =>require(['@/components/my/KSing'],r),
	Search: r =>require(['@/components/search/search'],r),
	RankDetail: r =>require(['@/components/rankDetail/RankDetail'],r),
	SongList: r =>require(['@/components/songList/SongList'],r),
	SongListDetail: r =>require(['@/components/songList/SongListdetail'],r)
	
	
	
	
}
