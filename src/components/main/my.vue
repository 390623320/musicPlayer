<template>
	<div class="my">
	
		<div class="my-main">
			
			<van-search
				  v-model="value"
				  placeholder="请输入搜索关键词"
				  shape="round"
				  @focus="gopath({name:'Search'})"
				>
			</van-search>
			<div class="my-content">
				
				<div class="my-content1">
					<div><img class="my-img" src="../../assets/img/timg.jpg"/></div>
					<div> <p>杰斌Bin</p> <p>尊贵的程序猿</p></div>
					<div><img  class="my-img2" src="../../assets/img/信封.png"/></div>
				</div>
				
				<div class="my-content2">
					<div><img @click="gopath({name:'LocalMusic'})" src="../../assets/img/phone.png" alt="" class="my-imgs" /><p>本地音乐</p></div>
					<div><img @click="gopath({name:'Collection'})" src="../../assets/img/heart.png" alt="" class="my-imgs" /><p>我的收藏</p></div>
					<div><img @click="gopath({name:'Download'})" src="../../assets/img/download.png" alt="" class="my-imgs" /><p>下载</p></div>
					<div><img @click="gopath({name:'RecentPlay'})" src="../../assets/img/clock.png" alt="" class="my-imgs" /><p>最近播放</p></div>
				</div>
				
				<div class="my-content3">
					<div @click="gopath({name:'MusicCircle'})">
						<p>音乐圈</p><p>></p>
					</div>
					<div @click="gopath({name:'KSing'})" >
						<p>K歌作品</p><p>></p>
					</div>
					<div @click="isshowcollection = !isshowcollection">
						<p>收藏歌单</p><p>></p>
					</div>
					
						<div v-if="isshowcollection" class="selfbuiltPL">
							<div class="selfbuiltPLC" @click="gopath({name:'SongList'})">
								<div><img class="sb-img" :src="SongList.coverImgUrl"/></div>
								<div class="sb-content"> <p>{{SongList.name}}</p> <p>{{SongList.songs.length}}首</p></div>
								<div><img  class="sb-img2" src="../../assets/icon/ellipsis.png"/></div>
							</div>
						</div>
					
					<div>
						<p>自娱自乐，绝无广告</p><p>></p>
					</div>
				</div>
			</div>
	
		</div>
		
	</div>	
</template>

<script>
	import axios from "../../utils/axios.js"
	export default{
		name:'my',
		
		data(){
			return{
				value:"",
				isselfbuiltPL:false,
				isshowcollection:false,
				collectList:null,
				SongList:null
			}
		},
		methods:{
			
			gopath(path){
				this.$router.push(path)
			}
		},
		created(){
			this.collectList = JSON.parse(localStorage.getItem("collectList"))
			
			axios.getMusic(this,"020111","21036784","SongList",true)
			this.SongList = JSON.parse(localStorage.getItem("SongList"))
		}
	}
</script>

<style scoped>
	
	.my-content{
		background: #F4F4F4;
		padding-bottom: 0.1px;
	}
	
	
	
	.my-content1{
		overflow: hidden;
		background: white;
		padding: 10px 0;
		
	}
	.my-content1>div{
		float: left;
	}
	.my-content1>div:nth-of-type(3){
		float: right;
		margin: 8.5px 20px 0;
	}
	p{
		margin: 4px;
	}
	.my-img{
		height: 44px;
		border-radius: 50%;
		padding: 0 15px;
	}
	.my-img2{
		height: 30px;
	}
	
	
	
	.my-content2{
		margin: 2px 0 10px;
		overflow: hidden;
		background: white;
	}
	.my-content2>div{
		float: left;
		width: 25%;
		text-align: center;
	}
	.my-imgs{
		height: 38px;
	}
	
	
	.my-content3{
		
	}
	.my-content3>div{
		/*height: 60px;*/
		font-size: 16px;
		font-weight: 600;
		overflow: hidden;
		background: white;
		padding: 0 20px;
		margin-bottom: 2px;
	}
	
	.my-content3>div>p{
		float: left;
		margin: 0 auto;
		line-height: 60px;
	}
	.my-content3>div>p:nth-of-type(2){
		float: right;
	}
	
	
	
	.selfbuiltPL{
		/*height: 400px !important;*/
		overflow-y: scroll;
	}
	.selfbuiltPLC{
		overflow: hidden;
		/*padding-top: 10px;*/
		border-bottom:  1px solid darkgray;
	}
	.selfbuiltPLC>div{
		float: left;
	}
	.selfbuiltPLC>div:nth-of-type(3){
		float: right;
		margin: 8.5px 20px 0;
	}
	.sb-img{
		height: 50px;
		margin: 10px 0 0;
		border-radius:10px ;
	}
	.sb-img2{
		height: 20px;
		padding-top:15px ;
	}
	.sb-content>p{
		font-weight: 500;
		margin: 10px 10px;
		width: 180px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		
	}
	.sb-content>p:nth-of-type(1){
		font-size: 16px;
	}
	.sb-content>p:nth-of-type(2){
		font-size: 8px;
	}
</style>