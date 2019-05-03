<template>
	<div class="rank-detail">
		<div class="rank-header">
			<div class="goback">
				<img  @click="gostate" src="../../assets/icon/back.png"/>
			</div>
			
			<div class="rankCont clearfix">
				<div class="cover-img">
					<img class="img-auto" :src="topList[currentTopListIndex].picUrl"/>
				</div>
				<div class="rankover-info">
					<h1 class="album__name">{{topList[currentTopListIndex].topTitle}}</h1>
					<p class="album__desc">{{topList[currentTopListIndex].topTitle}} 第16周</p>
					<p class="album__desc">2019-04-25 更新</p>
				</div>
			</div>
		</div>
		
		<div class="rank-content2">
			
			<div class="rank-content2-header">
				<span>排行榜 共50首</span>
			</div>
			<ul class="rank-content2-item">
				<li class="rankli clearfix" v-for="(item,index) in songs" :key="index">
					<div class="qui_list__order" ><span>{{index + 1}}</span></div>
					<div class="qui_list__bd">
						<h3 class="qui_list__txt">{{item.name}}</h3>
						<p class="qui_list__txt1">{{item.singer}}</p>
					</div>
				</li>
			</ul>
			
		</div>
		
	</div>
</template>

<script>
	
	import {getMusicList} from '../../api/rank'
	import {ERR_OK} from '../../api/config'
	
	export default{
		name:"rankdetail",
		
		data(){
			return{
			songs: [],
			rank: true,
			topList:[],
			queryid:null,
			currentTopListIndex:null
			}
		},
		created(){
			this.topList = JSON.parse(localStorage.getItem("topList")) 
			this.currentTopListIndex = this.topList.findIndex( x =>x.id === this.$route.query.id)
		},
		activated() {
			this._getMusicList(this.$route.query.id)
			this.currentTopListIndex = this.topList.findIndex( x =>x.id === this.$route.query.id)
		},
		methods:{
			createSong(musicData) {
				return {
					id: musicData.songid,
					mid: musicData.songmid,
					singer: this.filterSinger(musicData.singer),
					name: musicData.songname,
					album: musicData.albumname,
					duration: musicData.interval,
					image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
					url: `http://ws.stream.qqmusic.qq.com/${musicData.songid}.m4a?fromtag=46`
				}
			},

			filterSinger(singer) {
			  let ret = []
			  if (!singer) {
			    return ''
			  }
			  singer.forEach((s) => {
			    ret.push(s.name)
			  })
			  return ret.join('/')
			},
			
			_getMusicList(id) {

		        getMusicList(id).then((res) => {
		          if (res.code === ERR_OK) {
		            this.songs = this._normalizeSongs(res.songlist)
		          }
		        })
		      },
		      
		      _normalizeSongs(list) {
		        let ret = []
		        list.forEach((item) => {
		          const musicData = item.data
		          if (musicData.songid && musicData.albummid) {
		            ret.push(this.createSong(musicData))
		          }
		        })
		        return ret
		      },
		      
		      
			gostate(){
				this.$router.go(-1)
			}
			
			
			
		}
		
	}
</script>

<style lang="less" scoped>

	ul,h3{
		padding: 0;
		margin: 0;
	}
		.rank-header{
			position: relative;
			width: 100%;
			background-color: rgba(0,0,0,.6);
			position: relative;
			.goback{
				padding: 10px 15px;
				background-color:rgba(40, 40, 37,.1);
				overflow: hidden;
				>img{
					height: 20px;
				}
			}
			.rankCont{
				padding: 10px 0 30px;
				>div{
					float: left;
				}
				
				.cover-img{
					width: 125px;
					height: 125px;
					padding: 0 10px 0 15px;
				}
				.rankover-info{
					height: 125px;
					margin-right:20px ;
					width: calc(100% - 170px);
					color: #fff;
					.album__name{
						font-size: 18px;
						font-weight: 500;
					}
					>p{
						margin: 0;
					}
					.album__desc{
						display: -webkit-box;
					    -webkit-box-orient: vertical;
					    -webkit-line-clamp: 2;
					    max-height: 36px;
					    overflow: hidden;
					    margin-top: 8px;
					}
					

					
				}
				
			}
		}
		
		.rank-content2{
			position: relative;
			
			.rank-content2-header{
				position: sticky;
				top: 0;
				left: 0;
				background-color: #FFFFFF;
				box-sizing: border-box;
				padding: 0 10px;
				height: 50px;
				width: 100%;
				border-bottom: 1px solid #f4f4f4;
				
				>span{
					font-size: 14px;
					line-height: 50px;
				}
			}
			.rankli{
				border-bottom: 1px solid #f4f4f4;
				>div{
					float: left;
				}
				
				.qui_list__order {
					font-size: 16px;
					color: #FF400B;
 					display: -webkit-box;
				    -webkit-box-orient: vertical;
				    -webkit-box-pack: center;
				    -webkit-box-align: center;
				    width: 45px;
				    height: 61px;
				    margin-right: -16px;
				}
				.qui_list__bd {
					width: calc(100% - 87px);
				    padding: 10px 16px;
				    

				    .qui_list__txt{
						    display: block;
						    max-width: 100%;
						    overflow: hidden;
						    white-space: nowrap;
						    text-overflow: ellipsis;
						    font-size: 14px;
							font-weight: 500;
				    }
				    .qui_list__txt1{
						    display: block;
						    max-width: 100%;
						    overflow: hidden;
						    white-space: nowrap;
						    text-overflow: ellipsis;
				    }
				}
			}
			
			
			
		}

</style>