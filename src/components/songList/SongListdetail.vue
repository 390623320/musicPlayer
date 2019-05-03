<template>
	<div class="songList">
		<div class="songList-header">
			<div class="goback-main clearfix">
				<div class="goback"><img class="img-auto" @click="goback" src="../../assets/icon/back (2).png"/></div>
				<p>歌单</p>
			</div>
			<div class="songList-main clearfix">
				<div class="header-cont">
					<img class="img-auto" :src="SongList.coverImgUrl"/>
				</div>
				<div class="header-cont1">
					<h2>{{SongList.name}}</h2>
					<div class="creater-info clearfix">
						<div class="header-cont2"><img class="img-auto" :src="SongList.creator.avatarUrl"/></div>
						<p>{{SongList.creator.nickname}}</p>
					</div>
				</div>
			</div>
			<div class="songList-header-bg"></div>
		</div>
		<div class="introduct">
			<span>简介： {{SongList.creator.signature}}</span>
		</div>
		
		<div class="songList-content-info" @click="changList">
			<h3 class="u-smtitle">歌曲列表</h3>
			<div class="songList-content" v-for="(item,index) in  SongList.songs" :key="index">
				<div class="sgi_fl">{{index+1}}</div>
				<div class="sgi_fr f-bd f-bd-btm">
					<div class="sgich_fl">
						<div class="f-thide sgich_tl">{{item.title}}</div>
						<div class="f-thide sgich_info">{{item.author}}</div>
					</div>
					<div class="sgich_fr">
						<span class="u-hmsprt sgich_ply"></span>
					</div>
				</div>
			</div>
		</div>
		
	</div>
</template>

<script>

	export default{
		name:"songlist",
		data(){
			return{
				SongList:null
			}
		},
		methods:{
			goPath(path){
				this.$router.push(path)
			},
			goback(){
				this.$router.go(-1)
			},
			changList(){
				var listarr = []
				this.SongList.songs.forEach(function(item,index){
					item.islike = false
					listarr.push(item)
				})
				localStorage.setItem("currentPlaylist",JSON.stringify(listarr))
				this.goPath({name:"PlayView"})
				return this.$emit('changeList')
			}
		},
		created(){
			this.SongList = JSON.parse(localStorage.getItem("publicsongList")).filter(item => item.id== this.$route.query.id)[0]
		},
		activated(){
			this.SongList = JSON.parse(localStorage.getItem("publicsongList")).filter(item => item.id== this.$route.query.id)[0]

		}
	}
	
</script>

<style lang="less" scoped>
	.songList{
			background-color: #F8F8F8;
		
		
		.songList-header{
			z-index: 100;
			width: 100%;
			position: relative;
			.goback-main{
				margin: 10px 10px 0;
				
				>*{
					float: left;
				}
				.goback{
					
					width: 20px;
					height: 20px;
					
				}
				>p{
					margin: 0;
					padding-left: 5px;
					height:20px;
					line-height: 20px;
					font-size: 16px;
					color: #FFFFFF;
				}
			
			}
			.songList-header-bg{
				width: 100%;
				height: 100%;
				background-image: url("http://p1.music.126.net/Kl-htwvbMgP3NpGiPZIEvw==/109951163465152797.jpg");
				background-position: center;
				background-repeat: no-repeat;
				background-size: cover;
				position: absolute;
				top: 0;
				left: 0;
				z-index: -1;
				filter: blur(20px);
				opacity: 0.7; 
			}
			.songList-main{
				box-sizing: border-box;
				width: 100%;
				padding: 15px 8px 25px;
				>div{
					float: left;
				}
				.header-cont{
					width: 126px;
					height: 126px;
				}
				.header-cont1{
					padding-left: 20px;
					width: calc(100% - 150px);
					>h2{
							margin-bottom: 20px;
							font-size: 15px;
							color: #fefefe;
							font-weight: 400;
							width: 209px;
							height: 49px;
							overflow: hidden;
							text-overflow: ellipsis;
						}
					.creater-info{
						>*{
							float: left;
						}
						
						.header-cont2{
						width: 30px;
						height: 30px;
						border-radius: 50%;
						overflow: hidden;
						}
						
						>p{
							margin-top: 6px;
							color: hsla(0,0%,100%,.7);
						}
					}
					
				}
					
			}
			
		}
		
		.introduct{
			margin: 15px 10px;
			width: calc(100% - 20px);
			background-color: #F8F8F8;
			font-size: 14px;
			color: #666666;
			word-break: break-all;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 3;
			overflow: hidden;
		}
		.songList-content-info{
			background-color: #EEEFF0;
			width: 100%;
			
			h3{
				margin: 0;
				padding: 0;
			}
			.u-smtitle {
			    height: 23px;
			    line-height: 23px;
			    padding: 0 10px;
			    font-size: 12px;
			    color: #666;
			    background-color: #eeeff0;
			}
			
		}
		.songList-content{
			background-color: #F8F8F8;
			width: 100%;
			height: 50px;
			display: flex;
			border-bottom: 1px solid #EEEFF0;

			
			.sgi_fl{
				    display: flex;
				        align-items: center;
				    justify-content: center;
				    width: 40px;
				    font-size: 17px;
				    color: #999;
			}
			
			.sgi_fr {
			    -ms-flex: 1 1 auto;
			    flex: 1 1 auto;
			    position: relative;
			        display: flex;
			        -webkit-tap-highlight-color: rgba(0,0,0,0);
			}
			.sgich_tl {
			    font-size: 17px;
			    color: #444444;
			    margin-top: 5px;
			}
			
			.sgich_info {
			    font-size: 12px;
			    color: #888;
			}
			
			.f-thide {
				width: 325px;
			    overflow: hidden;
			    text-overflow: ellipsis;
			    white-space: nowrap;
			    word-break: normal;
			}
		}
		
	}
</style>