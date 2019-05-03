<template>
		<div>
			<transition name="rouertoggle">
				<keep-alive>
					<router-view v-bind:songinfo="songInfomation" v-bind:flag="songInfomation.flag" v-bind:ctindex="songInfomation.index" v-on:nextSong="appnextSong" v-on:changeList="changeL"></router-view>
				</keep-alive>
			</transition>
			<!--<div>{{songInfomation.index}}</div>-->
			<audio @timeupdate="currentTime" @ended="playended" @canplay="duration" @error="error" ref="appmusic" class="music" :src="songInfomation.currentData[songInfomation.index].url" controls="controls" :autoplay="isautoplay"></audio>
		</div>
</template>

<script>
	import formattime from "./utils/formattime.js"
	import Lyric from "lyric-parser"
	export default{
		name:'APP',
		
		data(){
			return {
				songInfomation:{
					currentData:null,
					songTime:null,
					songCurrentTime:null,
					yuanjvleft:null,
					playoverwidth:null,
					bg:null,
					lrcarr:null,
					index:0,
					flag:true,
//					playicon:"http://127.0.0.1:8081/icon/play.png",
//					indexicon:"http://127.0.0.1:8081/icon/播放.png",
					playway:0,
					presongarr:[],
					CurrentTime:null,
					lrc:null,
					duration:0
				},
				lrc:null,
				isautoplay:false,
				currentLyric:null,
				okoko:"sdasd"
				
			}
		},
		
		methods:{
//			更改当前列表
			changeL(){
				this.songInfomation.currentData = JSON.parse(localStorage.getItem("currentPlaylist"))
			},
		
			duration(){
				this.songInfomation.songTime = formattime.formattime(parseInt(this.$refs.appmusic.duration))
				this.songTime1=parseInt(this.$refs.appmusic.duration)
				this.songInfomation.duration = parseInt(this.$refs.appmusic.duration)
				//切背景图
				this.songInfomation.bg = {backgroundImage:`url(${this.songInfomation.currentData[this.songInfomation.index].pic})`}
				
//				播放记录
				var histroy = JSON.parse(localStorage.getItem("recentHistroy"))

				if(histroy === null || histroy === undefined){
					var arr = [this.songInfomation.currentData[this.songInfomation.index]]
					localStorage.setItem("recentHistroy",JSON.stringify(arr))
				}else{
					histroy.splice(0,0,this.songInfomation.currentData[this.songInfomation.index])
					if(histroy.length>20)
					histroy.splice(20,1)
					localStorage.setItem("recentHistroy",JSON.stringify(histroy))
				}
				
				

//				//提取网络歌词
//				this.axios({
//						method: 'POST',
//						url: this.songInfomation.currentData[this.songInfomation.index].lrc,
//					}).then(result => {
//							this.lrc = result.data
//							this.songInfomation.lrc = result.data
//							//歌词时间戳
////							var timestamp =  this.lrc.match(/[[]{1}.{8,9}[\]]{1}/g)
////							
////							//歌词
////							this.songInfomation.lrcarr = this.lrc.split(/[[]{1}.{8,9}[\]]{1}/g)
////							
////							this.songInfomation.lrcarr.splice(0,1)
//					})
					
			},
			currentTime(){
				//获取currenttime
				this.songInfomation.songCurrentTime = formattime.formattime(parseInt(this.$refs.appmusic.currentTime))
				this.songInfomation.CurrentTime = this.$refs.appmusic.currentTime
				//播放条
				var aa = parseInt(this.$refs.appmusic.currentTime)/this.songTime1*100 +"%"
				this.songInfomation.yuanjvleft= `calc(${aa} - 9px)`
				this.songInfomation.playoverwidth = parseInt(this.$refs.appmusic.currentTime)/this.songTime1*100+"%"

			},
			buttonstatus(){
				if(this.songInfomation.flag){
						this.$refs.appmusic.pause()
//						this.songInfomation.playicon = "http://127.0.0.1:8081/icon/play.png"
//						this.songInfomation.indexicon="http://127.0.0.1:8081/icon/播放.png"
					}else{
						this.$refs.appmusic.play()
//						this.songInfomation.playicon = "http://127.0.0.1:8081/icon/pause.png"
//						this.songInfomation.indexicon="http://127.0.0.1:8081/icon/暂停.png"
					}
			},
			
			appnextSong(paramobj){
				
				if(!this.isautoplay){
					this.isautoplay = true
				}
				
				//设置时间跳转
				if(paramobj.currentTime !== undefined){

					this.$refs.appmusic.currentTime = this.$refs.appmusic.duration*paramobj.currentTime
					this.songInfomation.flag = paramobj.flag
					
					if(this.songInfomation.flag){
						this.$refs.appmusic.pause()
//						this.songInfomation.playicon = "http://127.0.0.1:8081/icon/play.png"
//						this.songInfomation.indexicon="http://127.0.0.1:8081/icon/播放.png"
					}else{
						this.$refs.appmusic.play()
//						this.songInfomation.playicon = "http://127.0.0.1:8081/icon/pause.png"
//						this.songInfomation.indexicon="http://127.0.0.1:8081/icon/暂停.png"
					}
					return
				}
				
				//历史播放
			
				if(paramobj.showhistory&&paramobj.showhistory !==undefined){
					this.songInfomation.index = paramobj.changeindex
					this.songInfomation.flag = false
					this.buttonstatus()
				}
			
				
				if(paramobj.dataStatus){
					this.songInfomation.currentData = JSON.parse(localStorage.getItem("currentPlaylist"))
					this.songInfomation.flag = false
					this.buttonstatus()
					return
				}
				//切换播放方式
				if(paramobj.palyway !==undefined){
					this.songInfomation.playway = paramobj.palyway
					
					if(this.songInfomation.playway == 1){
						this.songInfomation.presongarr.push(this.songInfomation.index)
					}else{
						this.songInfomation.presongarr = []
					}
					
					return
				}
				
				
//				修改当前播放的歌曲
				if( paramobj.playindex !== undefined && paramobj.flag !==undefined){
					this.songInfomation.index = paramobj.playindex
					this.songInfomation.flag = paramobj.flag
					
					//随机nextsong时
					if(this.songInfomation.playway == 1 && paramobj.next == 1){
						this.songInfomation.presongarr.push(paramobj.playindex)
					}
					
					//随机presong
					if(this.songInfomation.playway == 1 && paramobj.pre == 1){
						this.songInfomation.presongarr.splice(this.songInfomation.presongarr.length - 2,1)
						if(this.songInfomation.presongarr.length == 1){
							this.songInfomation.presongarr.splice(0,1,this.songInfomation.index)

							return
						}
					}
					
					if(this.songInfomation.flag){
						this.$refs.appmusic.pause()
//						this.songInfomation.playicon = "http://127.0.0.1:8081/icon/play.png"
//						this.songInfomation.indexicon="http://127.0.0.1:8081/icon/播放.png"
					}else{
						this.$refs.appmusic.play()
//						this.songInfomation.playicon = "http://127.0.0.1:8081/icon/pause.png"
//						this.songInfomation.indexicon="http://127.0.0.1:8081/icon/暂停.png"
					}
				}
				
			},
			
			playended(){
				
				if(this.songInfomation.playway == 0){
					if(this.songInfomation.index < this.songInfomation.currentData.length -1)
					this.songInfomation.index = ++this.songInfomation.index
					
					this.checkIsLike(this.songInfomation.index)
					return
				}
				
				if(this.songInfomation.playway == 1){
					this.songInfomation.index = Math.floor(Math.random()*this.songInfomation.currentData.length)
					this.checkIsLike(this.songInfomation.index)
					this.songInfomation.presongarr.push(this.songInfomation.index)
					return
				}
				
				if(this.songInfomation.playway == 2){
					this.songInfomation.index = this.songInfomation.index
					this.checkIsLike(this.songInfomation.index)
					this.$refs.appmusic.play()
					return
				}
			},
			
			error(){
				this.$toast(this.songInfomation.currentData[this.songInfomation.index].title + " --已失效")
				if( this.songInfomation.index != this.songInfomation.currentData.length -1){
					this.songInfomation.index++
				}else
				{
					this.songInfomation.flag =true
					this.$refs.appmusic.pause()
//					this.songInfomation.playicon = "http://127.0.0.1:8081/icon/play.png"
//					this.songInfomation.indexicon="http://127.0.0.1:8081/icon/播放.png"
				}

			},
			checkIsLike(index){
				
				if(this.songInfomation.currentData[index].islike){
					this.$children[0].$refs.like.className = "van-icon van-icon-like"
				}else{
					this.$children[0].$refs.like.className = "van-icon van-icon-like"
				}
				
			}
			
		},
		created(){
			
			//获取本地数据
//			this.songInfomation.currentData = JSON.parse(localStorage.getItem("songInfomation.currentData")).Body
//			this.songInfomation.currentData = JSON.parse(localStorage.getItem("currentPlaylist"))
			
			
			var cpl = JSON.parse(localStorage.getItem("currentPlaylist"))
			
			if(cpl === null || cpl === undefined){
				var arr = [
					{
						author:"陈芳语",
						lrc:"https://api.hibai.cn/music/Kgmusic/Music?id=bb8de6ad0fab51551feac5f36f579885&type=lrc",
						pic:"https://api.hibai.cn/music/Kgmusic/Music?id=bb8de6ad0fab51551feac5f36f579885&type=pic",
						time:206,
						title:"爱你",
						url:"https://api.hibai.cn/music/Kgmusic/Music?id=bb8de6ad0fab51551feac5f36f579885&type=url",
						islike:true,
						id:new Date().getTime()
					}
				]
				localStorage.setItem("currentPlaylist",JSON.stringify(arr))
			}
			this.songInfomation.currentData = JSON.parse(localStorage.getItem("currentPlaylist"))
//			this.songInfomation.currentData = JSON.parse(localStorage.getItem("currentPlaylist"))
		}
		
	}
	

</script>

<style>

	.rouertoggle-enter-active{
		transition: opacity 1s;
	}
	.rouertoggle-leave-active{
		transition: opacity 0s;
	}
	.rouertoggle-enter, .rouertoggle-leave-to{
		opacity: 0;
	}

	.img-auto{
		width: 100%;
	}
	
	p{
		margin: 3px;
	}
	.music{
		display: none;
	} 
	
	.clearfix{
		overflow: hidden;
	}
</style>
