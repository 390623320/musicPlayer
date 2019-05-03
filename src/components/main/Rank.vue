<template>
	<div class="rank  clearfix">
		
		<div @click="gostate({name:'RankDetail',query:{ id:item.id}})" class="rank-main clearfix" v-for="(item,index) in topList" :key="index">
			<div class="rank-img">
				<img class="img-auto" :src="item.picUrl"/>
				<span class="listenCount"><i class="icon icon_listen"></i>{{item.listenCount/10000}}万</span>
			</div>
			
			<div class="rank-info">
					<h3 class="topic_tit">{{item.topTitle}}</h3>
					<p v-for="(itemchild,index) in item.songList">{{index+1}}<span class="text_name">{{itemchild.singername}}</span>-{{itemchild.songname}}</p>
				</div>
				
			</div>
		</div>
		
	</div>
</template>

<script>
	
	import {getTopList} from '../../api/rank'
	import {ERR_OK} from '../../api/config'
	export default{
		name:"rank",
		
		data(){
			return{
				topList:[]
				
			}
		},
		created(){
			
			this.getRankData()
			
		},
		methods:{
			
			getRankData(){
			
			getTopList().then((res) => {
				if (res.code === ERR_OK) {
				this.topList = res.data.topList
				localStorage.setItem("topList",JSON.stringify(res.data.topList))
				}
			})
		},
		
		gostate(path){
			
			this.$router.push(path)
			
		}
			
		}
		
	}
	
</script>

<style lang="less" scoped>

	p{
		margin: 0;
		padding: 0;
	}
	.rank{
		background-color: #F4F4F4;
		.rank-main{
			width: 100%;
			height: 100px;
			margin: 10px;
			/*background-color:#FFFFFF;*/
			
			>div{
				float: left;
			}
			
			.rank-img{
				width: 100px;
				height: 100px;
				position: relative;
				
				.listenCount{
					position: absolute;
					display: block;
					left: 5px;
					bottom: 7px;
					line-height: 12px;
					color: #fff;
					opacity: .6;
					font-size: 9px;
					z-index: 10;
					
					
					.icon_listen{
	
						display: block;
						float: left;
						width: 10px;
						height: 10px;
						background-position: 0 -50px;
						margin-right: 3px;

					}
				}
				
			}
			
			.rank-info{
				box-sizing: border-box;
				height: 100%;
				width: calc(100% - 120px);
				padding: 0 10px 0 15px;
				background-color: #FFFFFF;
				
				.topic_tit {
					font-size: 16px;
					color: #000;
					font-weight: 400;
					margin: 5px 0;
				}
				p {
					font-size: 14px;
					color: rgba(0,0,0,.5);
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
					
					.text_name {
						color: #000;
						margin-left: 8px;
						margin-right: 5px;
					}
				}
			}
			
			
			
		}
	}
</style>