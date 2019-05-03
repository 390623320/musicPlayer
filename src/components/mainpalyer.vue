<template>
	<div>
		<transition name="rouertoggle">
			<router-view v-bind:songinfochild="songInfomationchild" v-on:changeinfo="changeinfo"></router-view>
		</transition>
		<!--<div class="main-header">
			<van-tabs v-model="active" animated swipeable sticky background="#5FAAFF" color="#e4393c" >
			  <van-tab class="main-padding-bottom" title="我"><my></my></van-tab>
			  <van-tab class="main-padding-bottom" title="听"><hear></hear></van-tab>
			  <van-tab class="main-padding-bottom" title="看" disabled>功能研发中...</van-tab>
			  <van-tab class="main-padding-bottom" title="唱" disabled>功能研发中...</van-tab>
			</van-tabs>
		</div>-->
		<div @click="gopath({name:'PlayView'})" class="main-bottom">
			<div class="main-img" ><img  @error="err" ref="img" class="main-img1" :src="songinfo.currentData[songinfo.index].pic"/></div>
			
			<div class="main-bottom-content">
				
				<div class="main-playload" ref="controlInfo">
						<div class="playlength"></div>
						<div ref="playover" class="playover" :style="{width:this.songinfo.playoverwidth}"></div>
						<div><img  ref="yuanjv" class="yuanjv" :style="{left:this.songinfo.yuanjvleft}" src="../assets/icon/圆锯.png"/></div>
						<div class="layer" @touchstart.prevent="moveStart" @touchmove.prevent="move"></div>
				</div>
				
				<div class="main-func">
					<div class="main-songinfo">
						<p>{{songinfo.currentData[songinfo.index].title}}</p>
						<p>{{songinfo.currentData[songinfo.index].author}}</p>
					</div>
					<div class="main-func-key">
						<img ref="indexPlayOrPause" @click="pause" class="main-icon" :src="playicon"/>
						<img @click="nextSong" class="main-icon" src="../assets/icon/下一个 下一首.png"/>
						<img @click="playlist" class="main-icon" src="../assets/icon/播放列表.png"/>
					</div>
				</div>
				
			</div>
		</div>
		
		<transition name="fade">
		<div v-if="isShow" class="overLay" @click="playlistoff">
			<div class="overLaychild" @click="playlistoffstop">
			<van-row>
				
				<van-col span="24"><div @click="playlistoff" class="overLayOff">点击关闭</div></van-col>
				
				<van-col v-for="(item,index) in songinfo.currentData" :key="index" span="24">
					
					<div @click="selectSong(index)" class="pv-item" :id="index">
						<div class="download"><img class="img-auto" src="../assets/icon/speak.png"/></div>
						<div>{{index+1}}、{{songinfo.currentData[index].title}}</div>
						<div>--{{songinfo.currentData[index].author}}</div>
						<div><van-icon @click="delinfo(index)" name="cross" /></div>
					</div>
					
				</van-col>
				
			</van-row>
			</div>
		</div>
		</transition>
	</div>
</template>

<script>
	
	import qs from 'qs'
//	import { Tab, Tabs } from 'vant';
//	import My from "./main/my"
//	import Hear from "./main/hear"
	
	export default{
		name:'mainpalyer',
		props:['songinfo','flag'],
		data(){
			return{
//				active:1,
//				songinfo.currentData:null,
				index:0,
				isShow:false,
				playindex:0,
				playicon :require("../assets/icon/播放.png"),
				songInfomationchild:null
			}
		},
		
//		components:{
//					[Tab.name]:Tab,
//					[Tabs.name]:Tabs,
//					My,
//					Hear
//				},
		
		methods: {
				//请求数据
				getMusic() {
				
					var params =  {
						
						"TransCode": "020112",
						"OpenId": "123456789",
						"Body": {
							"SongListId": "21036784"
						}
						
					};
					
					var paramsStr = qs.stringify(params);
					
					this.axios({
						
						method: 'POST',
						
						url: 'https://api.hibai.cn/api/index/index',
						
						data: paramsStr
						
					}).then(result => {
							localStorage.setItem("songinfo.currentData",JSON.stringify(result.data))
						})
				
				},
				//打印数据
				getdata(){
					
					
				},
				gopath(path){
					this.$router.push(path)
				},
				
				pause(){
					event.stopPropagation()
					this.playindex = this.songinfo.index
					this.songinfo.flag = !this.songinfo.flag
					
					var paramobj = {
					playindex:this.playindex,
					flag:this.songinfo.flag
				}
				return this.$emit('nextSong',paramobj)
					
				},
				
				nextSong(){
					event.stopPropagation()
					
					
					switch (this.songinfo.playway)
					{
						case 0:
							if(this.playindex == this.songinfo.currentData.length - 1 )
								return
							this.playindex = this.songinfo.index;
							this.playindex = ++this.playindex;
							break;
						case 1:
							this.playindex = Math.floor(Math.random()*this.songinfo.currentData.length)
								this.songinfo.flag = false
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
							break;
						default:
						alert("选择有误")
					} 
					
					
//					if(this.playindex == this.songinfo.currentData.length - 1 )
//						return
//					
//					this.playindex = this.songinfo.index
//					this.playindex = ++this.playindex
					
					this.songinfo.flag = false
					var paramobj = {
					playindex:this.playindex,
					flag:this.songinfo.flag
				}
				return this.$emit('nextSong',paramobj)
//					return this.$emit('nextSong',this.playindex,this.songinfo.flag)
				
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
					this.playindex = index
					this.songinfo.flag = false
					this.playlistoff()
					var paramobj = {
					playindex:this.playindex,
					flag:this.songinfo.flag
				}
				return this.$emit('nextSong',paramobj)
//					return this.$emit('nextSong',this.playindex,this.songinfo.flag)
//					return this.$emit('nextSong',index)
				},
				err(param){
					this.$refs.img.src = require("../assets/img/timg.jpg")
				},
				
					//触摸点击
				moveStart(e){
					event.stopImmediatePropagation();
					var pageX = e.targetTouches[0].pageX;
					var offsetLeft = this.$refs.controlInfo.offsetLeft;
					var controlInfoWidth = parseFloat(getComputedStyle(this.$refs.controlInfo).width);
					this.currentTime = ((pageX - offsetLeft) / controlInfoWidth).toFixed(5)
					
					var paramobj = {
						currentTime:this.currentTime,
						flag:this.songinfo.flag
					}
					return this.$emit('nextSong',paramobj)
					
				},
				//触摸移动
				move(e) {
					
					event.stopImmediatePropagation();
					//拦截移动超出
					if(this.currentTime>0.99)
						return
						
					this.moveStart(e);
				},
				//父组件回调函数
				changeinfo(childparams){
					
					if(childparams.dataStatus && childparams.dataStatus !==undefined){
						var paramobj = {
							dataStatus:true,
							flag:this.songinfo.flag
						}
					}else{
						
						var paramobj = {
							changeindex:childparams.changeindex,
							showhistory:true,
							flag:this.songinfo.flag
						}
						
					}
					
					return this.$emit('nextSong',paramobj)
					
				},
				
				delinfo(index){
					event.stopPropagation()
					var currentPlaylist = JSON.parse(localStorage.getItem("currentPlaylist")) 
					currentPlaylist.splice(index,1)
					localStorage.setItem("currentPlaylist",JSON.stringify(currentPlaylist))
					var paramobj = {
									dataStatus : true
								}
					return this.$emit('nextSong',paramobj)
				}
				
				
				
			},
			watch: {
				flag(){
				if(this.songinfo.flag){
					
					this.playicon = require("../assets/icon/播放.png")
				}else{
					
					this.playicon = require("../assets/icon/暂停.png")
				}
				}
		    },
			
			created(){
				
				this.songInfomationchild = this.songinfo
			
	
		}
		
		
	}
</script>

<style scoped>
	/*.main-padding-bottom{
		padding-bottom: 74px;
	}*/
	
	.fade-enter-active, .fade-leave-active{
		transition: opacity 0.7s;
	}
	.fade-enter, .fade-leave-to{
		opacity: 0;
	}
	
	
	
	
	.main-bottom{
		position: fixed;
		left: 0;
		bottom: 0;
		overflow: hidden;
		width: 100%;
		box-sizing: border-box;
		padding: 5px 10px;
		border-top: 1px #F4F4F4 solid;
		background-color: white;
		z-index: 100;
	}
	.main-bottom>div{
		float: left;
	}
	.main-bottom-content{
		width: calc(100% - 60px);
		box-sizing: border-box;
		padding: 5px 0 5px 15px ;
	}
	
	.main-func{
		overflow: hidden;
		margin-top: 10px;
	}
	.main-songinfo{
		float: left;
	}
	.main-func-key{
		float: right;
	}
	
	.main-img{
		box-sizing: border-box;
		height: 60px;
		width: 60px;
		overflow: hidden;
		border-radius: 50%;
		border: 1px solid bisque;
		animation: pvimg 30s linear infinite;
	}
	@keyframes pvimg{
		from{
			transform: rotate(0);
		}
		to{
			transform: rotate(360deg);
		}
	}
	.main-img1{
		box-sizing: border-box;
		/*max-width: 100%;*/
		max-height: 100%;
		
	}
	
	.main-playload{
		position: relative;
		height: 5px;
	}
	.playlength{
		position: absolute;
		top: 7px;
		left: 0px;
		background: #A19D94;
		height: 2px;
		width: 100%;
		z-index: 10;
	}
	.playover{
		position: absolute;
		top: 7px;
		left: 0px;
		background: #D33A31;
		height: 2px;
		width: 0;
		z-index: 11;
	}
	
	.animationShow{
		animation: light 2s linear 0s infinite alternate;
	}
	.yuanjv{
		width: 20px;
		position: absolute;
		top: -1px;
		left: -9px;
		z-index: 12;
		border-radius: 50%;
		box-shadow: 0 0 20px 5px rgba(255, 0, 0,.3);
	}
		@keyframes light {
		from{
			box-shadow: 0 0 20px 1px rgba(255, 0, 0,.3);
		}

		to{
			box-shadow: 0 0 20px 3px rgba(255, 0, 0,1);
		}
	}
	
	.main-songinfo>p{
		font-size:10px ;
		color: darkgray;
		margin: 0;
		width: 150px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.main-songinfo>p:nth-of-type(1){
		font-size:15px ;
		color: black;
	}
	
	.main-func-key>img{
		padding-left: 10px;
	}
	
	
	
	.overLay{
		z-index: 9999;
		position:fixed;
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
		/*background: linear-gradient(left, rgba(29, 130, 254,1), rgba(183, 181, 175,1),rgba(29, 130, 254,1));*/
		background-color: white;

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
	
	.layer{
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height:20px;
			z-index: 15;
		}
		
	.download{
		width: 25px;
		height: 25px;
	}	

</style>
