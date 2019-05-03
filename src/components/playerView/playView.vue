<template>
	<div class="outroom">
		
		<div class="bg" :style="this.songinfo.bg"></div>
		
		<div class="inner">
			<van-row class="pv-main">
				
				<div class="pvHeader">
					<van-col span="3">
						<van-icon @click="gobcak" class="Icon-auto" name="arrow-left" />
					</van-col>
					
					<van-col span="21" class="music-info">
					
					<div>
						{{songinfo.currentData[songinfo.index].title}}
					</div>
					
					<div>
						{{songinfo.currentData[songinfo.index].author}} >	
					</div>
					
				</van-col>
				</div>
				
				
				<van-col span="24"><div class="underline"></div></van-col>
				
				<transition name="lrcfade">
				<van-col span="24" v-show="!isshowlrc">
					<div class="pv-imgparent">
						<div class="pv-img-parent">
							<img @click="showlyric" @error="err"  class="pv-img" ref="playviewImg" :src="songinfo.currentData[songinfo.index].pic"/>
						</div>
					</div>
				</van-col>
				</transition>
				
				<van-col span="24" class="music">
<!--					<audio @timeupdate="currentTime" @canplay="duration" ref="pvMusic" :src="songinfo.currentData[index].url" controls="controls" autoplay="autoplay"></audio>-->
				</van-col>
				
				<van-col span="24">
					<transition name="lrcfade">
					<div @click="isshowlrc = !isshowlrc" v-show="isshowlrc" class="lrc">
						
						<scroll class="middle-r" ref="lyricList" :data="currentLyric && currentLyric.lines">
				            <div class="lyric-wrapper">
				              <div v-if="currentLyric">
				                <p ref="lyricLine"
				                   class="text"
				                   :class="{'current': currentLineNum ===index}"
				                   v-for="(line,index) in currentLyric.lines">{{line.txt}}</p>
				              </div>
				            </div>
				          </scroll>
						
						<!--<p v-for="(item,index) in songinfo.lrcarr" :key="index">{{item}}</p>-->
						
					</div>
					</transition>
				</van-col>
				
				<van-col span="24">
					<van-row class="pv-main2">
						<van-col span="24" class="pv-content1">
							
							<div><van-icon ref="like" @click="islike" :style="{color:'red'}" name="like-o" /></div>
							<div><div class="download"><img class="img-auto" src="../../assets/icon/download.png"/></div></div>
							<div><van-icon name="comment-o" /></div>
							<div><van-icon name="ellipsis" /></div>
				
						</van-col>
						
						<van-col span="24" class="pv-songTime">
							
							<div>{{songinfo.songCurrentTime}}</div>
							
							<div ref="controlInfo">
								
								<div class="playlength"></div>
								<div class="playover" :style="{width:this.songinfo.playoverwidth}"></div>
								<div><img ref="mask" :style="{left:this.songinfo.yuanjvleft}" class="yuanjv" src="../../assets/icon/圆锯.png"/></div>
								<div class="layer" @touchstart="moveStart" @touchmove="move"></div>
								
							</div>
							<div>{{songinfo.songTime}}</div>
						</van-col>
						
						<van-col span="24" class="pv-content2">
							<!--<div><van-icon @click="isShowPlayWays = true" :name="playWayicon" /></div>-->
							<div><img @click="isShowPlayWays = true" class="preSong" :src="playWayicon"/></div>
							
							<div><img @click="preSong" class="preSong" src="../../assets/icon/forback.png"/></div>
							<!--<div><img @click="pause" ref="pvPlayOrPause" class="preSong" :src="songinfo.playicon"/></div>-->
							<div><img @click="pause" ref="pvPlayOrPause" class="preSong" :src="playicon"/></div>
							
							<!--<div><van-icon ref="pvPlayOrPause" @click="pause" :name="songinfo.playicon" /></div>-->
							<div><img @click="nextSong" class="preSong" src="../../assets/icon/forward.png"/></div>
							<div><img @click="playlist" class="preSong" src="../../assets/icon/Menu.png"/></div>

						</van-col>
						<transition name="fade">
						<div v-show="isShowPlayWays" class="playWays-overlay">
							<div @click="selectPlayWay(0)"><img src="../../assets/icon/xunhuan.png" alt="" /><p>顺序播放</p></div>
							<div @click="selectPlayWay(1)"><img src="../../assets/icon/suiji.png" alt="" /><p>随机播放</p></div>
							<div @click="selectPlayWay(2)"><img src="../../assets/icon/singelsong.png" alt="" /><p>单曲循环</p></div>
						</div>
						</transition>
					</van-row>
				</van-col>
			</van-row>
			
			
			
		</div>
		
			<transition name="fade">
				<div v-if="isShow" class="overLay" @click="playlistoff">
					<div class="overLaychild" @click="playlistoffstop">
					<van-row>
						
						<van-col span="24"><div @click="playlistoff" class="overLayOff">点击关闭</div></van-col>
						
						<van-col v-for="(item,index) in songinfo.currentData" :key="index" span="24">
							
							<div @click="selectSong(index)" class="pv-item" :id="index">
							<div><img class="download" src="../../assets/icon/speak.png"/></div>
								
								<div>{{index+1}}、{{songinfo.currentData[index].title}}</div>
								<div>--{{songinfo.currentData[index].author}}</div>
								<div><van-icon name="cross" /></div>
							</div>
							
						</van-col>
						
					</van-row>
					</div>
				</div>
			</transition>	
	</div>
</template>

<script>
	import formattime from "../../utils/formattime.js"
	import Lyric from "lyric-parser"
	import Scroll from './scroll'
	export default{
		name:'playVeiw',
		props:['songinfo','flag','ctindex'],
		data(){
			
			return{
//				songinfo.currentData: null,
				lrc:null,
				playindex:0,
				isShow:false,
				isshowlrc:false,
				lrcarr:[],
				playicon:require("../../assets/icon/play.png"),
				isShowPlayWays:false,
				playWayicon:require("../../assets/icon/xunhuan.png"),
				playWays:[require("../../assets/icon/xunhuan.png"),require("../../assets/icon/suiji.png"),require("../../assets/icon/singelsong.png")],
				currentTime:null,
				collectList:[],
				currentLyric:null,
				currentLineNum:0,
				currentLyric: null,
				playingLyric: ''
			}
			
		},
		components: {
	      Scroll
	   },
		
		methods:{

			pause(){
				this.songinfo.flag = !this.songinfo.flag
				this.playindex = this.songinfo.index
				var paramobj = {
					playindex:this.playindex,
					flag:this.songinfo.flag
				}
				return this.$emit('nextSong',paramobj)
			},
			
			nextSong(){
				switch (this.songinfo.playway)
					{
					case 0:
						if(this.playindex == this.songinfo.currentData.length - 1 )
							return
						this.playindex = this.songinfo.index;
						this.playindex = ++this.playindex;
						this.checkIsLike(this.playindex)
						break;
					case 1:
						this.playindex = Math.floor(Math.random()*this.songinfo.currentData.length)
						this.songinfo.flag = false
						this.checkIsLike(this.playindex)
						
								var paramobj = {
								playindex:this.playindex,
								flag:this.songinfo.flag,
								next:1
							}
							return this.$emit('nextSong',paramobj)
						break;
					case 2:
						if(this.playindex == this.songinfo.currentData.length - 1 )
							return
						this.playindex = this.songinfo.index;
						this.playindex = ++this.playindex;
						this.checkIsLike(this.playindex)
						
						break;
					default:
					alert("选择有误")
					} 
				

				
				this.songinfo.flag = false
				var paramobj = {
					playindex:this.playindex,
					flag:this.songinfo.flag
				}
				return this.$emit('nextSong',paramobj)

				
			},
			
			preSong(){
				
				//拦截顺序播放首歌切上一首
				if(this.songinfo.index == 0 && this.songinfo.playway != 1)
				return
				
				switch (this.songinfo.playway)
					{
					case 0:
						this.playindex = this.songinfo.index
						this.playindex = --this.playindex
						this.checkIsLike(this.playindex)
						
						break;
					case 1:
					if(this.songinfo.presongarr.length>1){
						this.songinfo.flag = false
						var paramobj = {
							playindex:this.songinfo.presongarr[this.songinfo.presongarr.length - 2],
							flag:this.songinfo.flag,
							pre:1
						}
						this.checkIsLike(this.songinfo.presongarr[this.songinfo.presongarr.length - 2])
						return this.$emit('nextSong',paramobj)
					}
						break;
					case 2:
						this.playindex = this.songinfo.index
						this.playindex = --this.playindex
						this.checkIsLike(this.playindex)
						break;
					default:
					alert("选择有误")
					} 
				

				
				this.songinfo.flag = false
				var paramobj = {
					playindex:this.playindex,
					flag:this.songinfo.flag
				}
				return this.$emit('nextSong',paramobj)
				
			},
			
			playlist(){
				this.isShow = true
				event.stopPropagation()
			},
			
			playlistoff(){
				if(!this.isShow){
					return
				}else{
					this.isShow = false
				}
			},
			playlistoffstop(){
				event.stopPropagation()
			},
			selectSong(index){
//				if(this.songinfo.currentData[index].islike){
//					
//					this.$refs.like.className = "van-icon van-icon-like"
//				}else{
//					this.$refs.like.className = "van-icon van-icon-like-o"
//				}

				this.checkIsLike(index)
				this.playindex = index
				this.songinfo.flag = false
				this.playlistoff()
				var paramobj = {
					playindex:this.playindex,
					flag:this.songinfo.flag
				}
				return this.$emit('nextSong',paramobj)
//				return this.$emit('nextSong',this.playindex,this.songinfo.flag)
				
			},
				
			gobcak(){
				this.$router.go(-1)
			},
			
			err(){
				this.$refs.playviewImg.src = require("../../assets/img/timg.jpg")
			},
			
			selectPlayWay(status){
				
				this.isShowPlayWays = false
				
				this.playWayicon = this.playWays[status]

				var paramobj = {
					palyway:status
				}
				
				return this.$emit('nextSong',paramobj)
				
			},
			//触摸点击
			moveStart(e){
				var pageX = e.targetTouches[0].pageX;
				var offsetLeft = this.$refs.controlInfo.offsetLeft;
				var controlInfoWidth = parseFloat(getComputedStyle(this.$refs.controlInfo).width);
				this.currentTime = ((pageX - offsetLeft) / controlInfoWidth).toFixed(5)
				this.currentLyric.seek(this.currentTime*this.songinfo.duration*1000)
				var paramobj = {
					currentTime:this.currentTime,
					flag:this.songinfo.flag
				}
				return this.$emit('nextSong',paramobj)
				
			},
			//触摸移动
			move(e) {
				//拦截移动超出
				if(this.currentTime>0.99)
					return
					
				this.moveStart(e);
			},
			islike(){
				if(this.getdata()[this.songinfo.index].islike){
					this.$refs.like.className = "van-icon van-icon-like-o"
					var arr = this.getdata()
					var obj = arr[this.songinfo.index]
					obj.islike = false
					arr.splice(this.songinfo.index,1,obj)
					this.setdata(arr)
				}else{
					
					this.$refs.like.className = "van-icon van-icon-like"
					var arr = this.getdata()
					var obj = arr[this.songinfo.index]
					obj.islike = true
					arr.splice(this.songinfo.index,1,obj)
					this.setdata(arr)

				}
					
					
//					
//					var obj = this.songinfo.currentData[0]
//					obj.islike = true
//					obj.id = new Date().getTime()
//					this.collectList.splice(0,1,obj)
//					localStorage.setItem("collectList",JSON.stringify(this.collectList))
//					this.$refs.like.className = "van-icon van-icon-like"
//					return
//				}
//				
//				
//				if(this.songinfo.currentData.islike){
//					this.$refs.like.className = "van-icon van-icon-like"
//
//				}else{
//					this.$refs.like.className = "van-icon van-icon-like-o"
//				}

			},
			getdata(){
				return JSON.parse(localStorage.getItem("currentPlaylist"))
			},
			setdata(val){
				localStorage.setItem("currentPlaylist",JSON.stringify(val))
			},
			checkIsLike(index){
				
				if(this.songinfo.currentData[index].islike){
					
					this.$refs.like.className = "van-icon van-icon-like"
				}else{
					this.$refs.like.className = "van-icon van-icon-like-o"
				}
				
			},
			getRankData(){
				
				this.axios({
							method: 'POST',
							url: this.songinfo.currentData[this.songinfo.index].lrc,
						}).then(result => {
								
								 this.currentLyric = new Lyric(result.data,this.handleLyric)
								 
								 if (!this.flag) {
									this.currentLyric.play()
									}
						})
		},
		handleLyric({lineNum, txt}) {
			this.currentLineNum = lineNum
			if (lineNum > 5) {
				let lineEl = this.$refs.lyricLine[lineNum - 5]
				this.$refs.lyricList.scrollToElement(lineEl, 1000)
			} else {
				this.$refs.lyricList.scrollTo(0, 0, 1000)
			}
      		  this.playingLyric = txt
			
		},
		showlyric(){
			this.isshowlrc = !this.isshowlrc
		}
			
			
		},
		watch: {
      ctindex(newSong, oldSong) {
          this.currentLyric.stop()
          this.getRankData()
      },
      
      flag(){
      	
      		if(this.songinfo.flag){
				
				this.playicon = require("../../assets/icon/play.png")
			}else{
				
				this.playicon = require("../../assets/icon/pause.png")
			}
			
			
			 this.currentLyric.togglePlay()
			 
			}
    },
		
//		watch:{
//			flag(){
//				if (!this.flag) {
//					this.currentLyric.play()
//				}else{
//					this.currentLyric.togglePlay()
//				}
//			},
//			ctindex(){
//				
//				this.currentLyric.stop()
//				this.getRankData()
//			}
//		},
		
		created(){
			//获取本地数据
//			this.songinfo.currentData = JSON.parse(localStorage.getItem("songinfo.currentData")).Body
			
//			this.songinfo.currentData = JSON.parse(localStorage.getItem("currentPlaylist"))
			this.getRankData()
			
	
		},
		activated(){
			
			if(this.getdata()[this.songinfo.index].islike){
				this.$refs.like.className = "van-icon van-icon-like"
			}else{
				this.$refs.like.className = "van-icon van-icon-like-o"
			}
		}
		
//		mounted(){
//			if(this.songinfo.currentData[this.songinfo.index].islike){
//				this.$refs.like.className = "van-icon van-icon-like"
//			}
//		}

	}
</script>

<style scoped>
	
	.fade-enter-active{
		transition: opacity 1s;
	}
	.fade-leave-active{
		transition: opacity .7s;
	}
	.fade-enter, .fade-leave-to{
		opacity: 0;
	}
	
	.lrcfade-enter-active{
		transition: opacity 3s;
	}
	.lrcfade-leave-active{
		transition: opacity 0s;
	}
	.lrcfade-enter, .lrcfade-leave-to{
		opacity: 0;
	}
	
	.outroom{

		width: 100%;
		height: 100%;
		
	}
	.bg{
		background-color: #1D82FE;
		position:absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-size: cover;
		background-position: center;
		filter: blur(50px);
		opacity: 0.7; 
		z-index: -1;
		
	}
	.inner{
		width: 100%;
		height: 100%;
	}
	.music{
		display: none;
	}
	.pvHeader{
		overflow: hidden;
		padding: 10px 0;
	}
	.underline{
		width: 40%;
		overflow: hidden;
		margin: 0 auto;
		height: 1px;
		background: linear-gradient(left, rgba(141, 138, 131,0), rgba(183, 181, 175,1),rgba(141, 138, 131,0));
	}
	
	.Icon-auto{
		font-size: 25px;
		padding: 10.5px 0 0 10px;	
	}
	.pv-imgparent{
		overflow: hidden;
	}
	.pv-img-parent{
		
		width:251.2px;
		height:251.2px;
		margin: 94.5px auto 0;
		border-radius: 50%;
		overflow: hidden;
		transform-origin: center center;
		animation: pvimg 30s linear infinite;
	}
	
	.pv-img{
		width: 100%;
		height: 100%;
	}
	
	@keyframes pvimg{
		from{
			transform: rotate(0);
		}
		to{
			transform: rotate(360deg);
		}
	}
	.music-info>div{
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		padding-right: 30px;
	}

	.music-info>div:nth-of-type(1){
		font-size: 18px;
	}
	.music-info>div:nth-of-type(2){
		font-size: 10px;
		color: lightgray;
	}

	
	.pv-content1>div{
		width: 25%;
		float:left;
	}
	.pv-content1>div>*{
		display: block;
		font-size: 25px;
		margin: 0 auto;
		text-align: center;
	}



	.pv-main2{
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
	}

	
	.pv-songTime{
		padding: 10px 20px;
		
	}
	
	.pv-songTime>div{
		height: 16px;
		width: 18%;
		float: left;
		font-size: 12px;
		text-align: center;
		
	}
	
	.pv-songTime>div:nth-of-type(2){
		position: relative;
		width: 64%;
		height: 16px;
	}
	
	
	.layer{
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height:100%;
			z-index: 13;
		}
	
	
	.pv-songTime>div:nth-of-type(2) img{
		z-index: 12;
	}
	.pv-songTime .playlength{
		position: absolute;
		top: 7px;
		left: 0px;
		background: #A19D94;
		height: 2px;
		width: 100%;
		z-index: 10;
	}
	.pv-songTime .playover{
		position: absolute;
		top: 7px;
		left: 0px;
		background: #D33A31;
		height: 2px;
		width: 0;
		z-index: 11;
	}
	
	.pv-songTime .yuanjv{
		width: 20px;
		position: absolute;
		top: -2px;
		left: -9px;
		border-radius: 50%;
		box-shadow: 0 0 20px 5px rgba(255, 0, 0,.3);
		animation: light 2s linear 0s infinite alternate;
	}
	@keyframes light {
		from{
			box-shadow: 0 0 20px 1px rgba(255, 0, 0,.3);
		}

		to{
			box-shadow: 0 0 20px 3px rgba(255, 0, 0,1);
		}
	}
	
	.pv-songTime>div:nth-of-type(3){
		float: right;
	}
	
	
	
	
	.pv-content2{
		overflow: hidden;
		margin: 29px 0;
		
	}
	.pv-content2>div{
		width: 20%;
		float:left;
	}
	.pv-content2>div>*{
		display: block;
		font-size: 35px;
		margin: 0 auto;
		text-align: center;
	}
	
	
	.playWays-overlay{
		padding: 0 10px;
		position: absolute;
		top: -20%;
		left: 3%;
		background: #D6D6D6;
		z-index: 12;
	}
	.playWays-overlay>div{
		font-size: 16px;
		height: 32px;
		line-height:32px;
		padding: 2px;
		text-align: center;
		overflow: hidden;
		border-bottom: 1px solid gray;
	}
	.playWays-overlay>div>*{
		margin: 0;
		float: left;
	}
	
	.overLay{
		z-index: 15;
		position:absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
	}
	.overLaychild{
		position:absolute;
		left: 0;
		bottom: 0;
		overflow-y: scroll;
		width: 100%;
		height: 40%;
		background: linear-gradient(left, rgba(141, 138, 131,1), rgba(183, 181, 175,1),rgba(141, 138, 131,1));

	}
	.pv-item{
		border-bottom: 1px red solid;
		overflow: hidden;
		margin: 5px 15px;
	}
	.pv-item div{
		margin-right: 10px;
		font-size: 14px;
		float: left;
	}
	.pv-item div:nth-of-type(1){
		font-size: 20px;
	}
	.pv-item div:nth-of-type(2){
		max-width: 182px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.pv-item div:nth-of-type(3){
		font-size: 10px;
		margin-top: 2px;
	}
	.pv-item div:nth-of-type(4){
		font-size: 20px;
		float: right;
	}
	.overLayOff{
		position: fixed;
		top: 380.2px;
		left: 0;
		width: 100%;
		height: 20px;
		background: lightslategrey;
		text-align: center;
		line-height: 20px;
	}
	
	
	.lrc{
		margin: 20px;
		font-size: 18px;
		width: calc(100% - 40px);
		height: 395px;
		text-align: center;
		overflow-y: scroll;
	}
	
	
	
	.middle-r{
          display: inline-block;
          vertical-align: top;
          width: 100%;
          height: 100%;
          overflow: hidden;
          }
          .lyric-wrapper{
            width: 80%;
            margin: 0 auto;
            overflow: hidden;
            text-align: center;
            }
            .text{
              line-height: 32px;
              color: rgba(249, 39, 63,.8);
              font-size: 16px;
              }
              .current{
                color: #31E5F2;
                }
                
                
		.download{
			height: 25px;
			width: 25px;
		}
		.preSong{
			height: 35px;
			width: 35px;
		}

	
</style>