<template>
	<div class="hear-main">
		<van-search
		  v-model="value"
		  placeholder="请输入搜索关键词"
		  shape="round"
		  @focus="gopath({name:'Search'})"
		>
		</van-search>
		<div class="hear-swipe">
			<van-swipe :autoplay="3000" indicator-color="white">
			  <van-swipe-item><img src="../../assets/img/swiper (1).jpg" alt="" class="img-auto" /></van-swipe-item>
			  <van-swipe-item><img src="../../assets/img/swiper (2).jpg" alt="" class="img-auto" /></van-swipe-item>
			  <van-swipe-item><img src="../../assets/img/swiper (3).jpg" alt="" class="img-auto" /></van-swipe-item>
			  <van-swipe-item><img src="../../assets/img/swiper (4).jpg" alt="" class="img-auto" /></van-swipe-item>
			</van-swipe>
		</div>
		
		<div class="hear-content">
			<div class="hear-content1">
				<div class="hear-content1-1">
					<div><div><img src="../../assets/my-hear/音乐.png" alt="" /></div><p>乐库</p></div>
					<div><div><img src="../../assets/my-hear/日历.png" alt="" /></div><p>每日推荐</p></div>
					<div><div><img src="../../assets/my-hear/电台直播.png" alt="" /></div><p>电台</p></div>
					<div><div><img src="../../assets/my-hear/歌手.png" alt="" /></div><p>歌手</p></div>
					<!--<div>
						<div @click="isShowbar = !isShowbar">
							<img v-show="!isShowbar" src="../../assets/my-hear/分类.png" alt="" />
							<img v-show="isShowbar" src="../../assets/my-hear/向下.png" alt="" />
						</div>
						<p>更多</p>
					</div>-->
				</div>
				<!--<div v-if="isShowbar" class="hear-content1-2" @touchend ="stopdefault">
					<div class="content1-2-contain">
						<div><div><img src="../../assets/my-hear/喜欢.png" alt="" /></div><p>猜你喜欢</p></div>
						<div><div><img src="../../assets/my-hear/日历.png" alt="" /></div><p>每日推荐</p></div>
						<div><div><img src="../../assets/my-hear/人群.png" alt="" /></div><p>群聊</p></div>
						<div><div><img src="../../assets/my-hear/歌手.png" alt="" /></div><p>歌手</p></div>
						<div><div><img src="../../assets/my-hear/排行榜.png" alt="" /></div><p>排行榜</p></div>
						<div><div><img src="../../assets/my-hear/分类.png" alt="" /></div><p>分类</p></div>
					</div>
				</div>-->
			</div>
			
			<div class="hear-content2">
				
				<div>
					<van-tabs v-model="active" class="zindexlow">
					  <van-tab title="新歌"><hearNewSong></hearNewSong></van-tab>
					  <van-tab title="MV"><hearLiving></hearLiving></van-tab>
					  <van-tab title="歌单"><hear-songList></hear-songList></van-tab>
					  <van-tab title="资讯"><hear-info></hear-info></van-tab>
					</van-tabs>
				</div>
				
			</div>
			
		</div>
		
	</div>
</template>

<script>
	import { Swipe, SwipeItem,Tab, Tabs } from 'vant';
	import hearNewSong from "./hearNewSong.vue"
	import hearSongList from "./hearSongList.vue"
	import hearLiving from "./hearLiving.vue"
	import hearInfo from "./hearInfo.vue"
	import axios from "../../utils/axios.js"
	import qs from "qs"
	export default{
		name:'hear',
		
		data(){
			return{
				isShowbar:false,
				active:0,
				value:"",
				publicsongList:null,
				arr:[],
				listIdArr:["2692766234","2749330357","368196409","2520739691","2667641834"]
			}
		},
		components:{
			[Swipe.name]:Swipe,
			[SwipeItem.name]:SwipeItem,
			[Tab.name]:Tab,
			[Tabs.name]:Tabs,
			hearNewSong,
			hearSongList,
			hearLiving,
			hearInfo
			
		},
		methods:{
			
			gopath(path){
				this.$router.push(path)
			},
			stopdefault(){
				event.stopPropagation()
			},
			
			getMusic(ListId){
			
				var params =  {
					
					"TransCode": "020111",
					"OpenId": "Test",
					"Body": {
						"SongListId": ListId
					}
					
				};
				var paramsStr = qs.stringify(params);
				
				this.axios({
					
					method: 'POST',
					
					url: 'https://api.hibai.cn/api/index/index',
					
					data: paramsStr
					
				}).then(result => {
							this.arr.push(result.data.Body) 
							
							if(this.arr.length == this.listIdArr.length){
								localStorage.setItem("publicsongList",JSON.stringify(this.arr))
								this.publicsongList = this.arr
							}
					})
			}
			
			
			
		},
		created(){
			this.publicsongList = JSON.parse(localStorage.getItem("publicsongList"))
			
			if(this.publicsongList === null || this.publicsongList ===undefined){
				this.listIdArr.forEach((item,index) =>{
						this.getMusic(item)
					})
			}
		}
	}
	
	
</script>

<style scoped>
	.zindexlow{
		z-index: 80;
	}
	
	.hear-content{
		
	}
	
	
	.hear-content1{

	}
	.hear-content1 p{
		margin: 3px 0;
		font-size: 13px;
		text-align: center;
	}
	.hear-content1 img{
		margin:  10px;
	}
	
	.hear-content1-1{
		overflow: hidden;
		padding: 10px 0;
	}
	.hear-content1-1>div{
		float: left;
		width: 25%;
	}
	.hear-content1-1>div>div{
		width: 50px;
		height: 50px;
		border-radius: 50%;
		margin: 0 auto;
	}
	.hear-content1-1>div:nth-child(1)>div{
		background-color: #FFAB3A;
	}
	.hear-content1-1>div:nth-child(2)>div{
		background-color: #FF6565;
	}
	.hear-content1-1>div:nth-child(3)>div{
		background-color: #01A5FF;
	}
	.hear-content1-1>div:nth-child(4)>div{
		background-color: #8E6EEA;
	}
	
	
	.hear-content1-2{
		padding: 10px;
		width: 100%;
		overflow-x: scroll;
		background-color: #F4F4F4;
	}
	.content1-2-contain{
		width: 140%;
		overflow: hidden;
	}
	.content1-2-contain>div{
		float: left;
		margin: 0 10px;
	}
	.content1-2-contain>div>div{
		width: 60px;
		height: 60px;
		border-radius: 50%;
		background-color: blue;
		margin: 0 auto;
	}
	
</style>