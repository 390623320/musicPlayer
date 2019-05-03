<template>
	<div>
		<div v-for="(item,index) in publicsongList" :key="index">
			<div class="h-sl-main">
				<div class="h-sl-content1" @click="gopath({name:'SongListDetail',query:{id:item.id}})">
					<div><img class="h-sl-img" :src="item.coverImgUrl" alt="" /></div>
					<div class="h-sl-contentchild">
						<p class="h-sl-p overellipsis">{{item.name}}</p>
						<p class="overellipsis">{{item.songs[0].author}} - {{item.songs[0].title}}</p>
						<p class="overellipsis">{{item.songs[1].author}} - {{item.songs[1].title}}</p>
						<p class="overellipsis">{{item.songs[2].author}} - {{item.songs[2].title}}</p>
					</div>
				</div>
				<div class="h-sl-content2">
					<div>
						<p class="overellipsis">{{item.creator.nickname}}</p>
						<p class="overellipsis">{{parseInt(item.id/10000000)}}万次播放</p>
					</div>
					<div>
						<img src="../../assets/my-hear/消息.png" alt="" />
					</div>
				</div>
			</div>
	
		</div>
	</div>
</template>

<script>
	export default{
		name:"hearSongList",
		data(){
			return{
				publicsongList:null
			}
		},
		methods:{
			gopath(path){
				this.$router.push(path)
			}
		},
		created(){
			this.publicsongList = JSON.parse(localStorage.getItem("publicsongList"))
		}
	}
</script>

<style scoped>
	.h-sl-main{
		margin: 10px;
		border-bottom: 1px #F4F4F4 solid;
	}
	
	.h-sl-img{
		height: 100px;
		border-radius: 5px;
	}
	
	
	.h-sl-content1{
		overflow: hidden;
	}
	.h-sl-content1>div{
		float: left;
	}
	.h-sl-content1>div:nth-of-type(2){
		width: calc(100% - 110px);
		margin-left:10px ;
	}
	.h-sl-content1 p{
		color: darkgray;
		margin: 5px 0;
	}
	.h-sl-p{
		width: 100%;
		font-size: 16px;
		color: black !important;
		margin: 5px 0 10px!important;
	}
	
	
	.h-sl-content2{
		overflow: hidden;
	}
	.h-sl-content2>div:nth-of-type(1){
		width: 80%;
		float: left;
		overflow: hidden;
	}
	.h-sl-content2>div:nth-of-type(2){
		float: right;
	}
	.h-sl-content2>div:nth-of-type(2)>img{
		height: 22px;
	}
	.h-sl-content2>div>p{
		max-width: 40%;
		float: left;
		padding-right: 10px;
	}
	
	.overellipsis{
		
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		
		
	}
</style>