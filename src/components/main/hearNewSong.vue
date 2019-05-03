<template>
	<div>
			<div class="new-song">
				<div><img src="../../assets/my-hear/加号.png" alt="" /></div>
				<div><img src="../../assets/img/timg.jpg" alt="" /></div>
				
				<div class="ns-content1">
					<div>
						<p>天亮以后说再见</p>
						<p>曲肖冰 - 天亮以后说再见</p>
					</div>
					
					<div>
						<div><img src="../../assets/my-hear/消息.png" alt="" /></div>
						<div><img src="../../assets/my-hear/MV.png" alt="" /></div>
					</div>
				</div>
				
			</div>
			
			<div class="new-song">
				<div><img src="../../assets/my-hear/加号.png" alt="" /></div>
				<div><img src="../../assets/img/timg.jpg" alt="" /></div>
				
				<div class="ns-content1">
					<div>
						<p>天亮以后说再见</p>
						<p>曲肖冰 - 天亮以后说再见</p>
					</div>
					
					<div>
						<div><img src="../../assets/my-hear/消息.png" alt="" /></div>
						<div><img src="../../assets/my-hear/MV.png" alt="" /></div>
					</div>
				</div>
				
			</div>
	</div>
</template>

<script>
	export default{
		name:'hearNewSong'
	}
</script>

<style scoped>
	.new-song{
		overflow: hidden;
		margin: 10px 5px;
	}
	
	.new-song img{
		height: 20px;
	}
	
	.new-song>div:nth-of-type(2)>img{
		height: 60px;
		border-radius: 10%;
	}
	
	.new-song>div{
		float: left;
	}
	
	.new-song>div:nth-of-type(1){
		margin-top:12.5px ;
	}
	.ns-content1{
		margin-left: 10px;
		border-bottom: 1px #F4F4F4 solid;
		width: calc(100% - 100px);
	}
	.ns-content1 p{
		margin: 3px;
	}
	.ns-content1>div{
		overflow: hidden;
	}
	.ns-content1>div>div{
		float: left;
		width: 50px;
	}
</style>