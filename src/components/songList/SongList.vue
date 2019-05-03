<template>
	<div class="songList">
		<div class="songList-header">
			<div class="goback-main clearfix">
				<div class="goback"><img class="img-auto" @click="goback" src="../../assets/icon/back (2).png"/></div>
				<p>自建歌单</p>
			</div>
			<div class="songList-main clearfix">
				<div class="header-cont">
					<img class="img-auto" src="https://p1.music.126.net/mBboWnwZki8xNk92Z_Xrfw==/109951164011935621.jpg"/>
				</div>
				<div class="header-cont1">
					<h2>G.E.M.邓紫棋</h2>
					<div class="creater-info clearfix">
						<div class="header-cont2"><img class="img-auto" src="http://p1.music.126.net/VE7Oa9qeWwFQ7_xZeuxkmg==/109951163727754567.jpg"/></div>
						<p>是你妤哥</p>
					</div>
				</div>
			</div>
			<div class="songList-header-bg"></div>
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
			this.SongList = JSON.parse(localStorage.getItem("SongList"))
		}
	}
	
</script>

<style lang="less" scoped>
	.songList{
		
		
		.songList-header{
			width: 100%;
			position: relative;
			.goback-main{
				margin: 5px 10px;
				
				>*{
					float: left;
				}
				.goback{
					
					width: 25px;
					height: 25px;
					
				}
				>p{
					height:19px;
					line-height: 19px;
					font-size: 18px;
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
							font-size: 17px;
							color: #fefefe;
							font-weight: 400;
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