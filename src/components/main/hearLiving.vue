<template>
	<div class="h-living-main">
		<div class="l-content">
			<div><img class="l-img-cover" src="../../assets/img/timg.jpg" alt="" /></div>
			<div>
				<p>大熊猫</p>
				<div class="l-title"><img class="l-img-icon" src="../../assets/my-hear/歌手.png" alt="" />1234</div>
			</div>
		</div>
		
		<div class="l-content">
			<div><img class="l-img-cover" src="../../assets/img/timg.jpg" alt="" /></div>
			<div>
				<p>大熊猫</p>
				<div class="l-title"><img class="l-img-icon" src="../../assets/my-hear/歌手.png" alt="" />1234</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:"hearLiving"
	}
</script>

<style scoped>
	.l-img-cover{
		width: 100%;
		border-radius: 5px;
	}
	.l-img-icon{
		height: 16px;
	}
	
	.h-living-main{
		overflow: hidden;
	}
	.h-living-main>div{
		float: left;
	}
	.l-content{
		box-sizing: border-box;
		width: 50%;
		overflow: hidden;
		padding: 10px;
	}
	.l-content>div{
		float: left;
		font-size: 14px;
	}
	.l-title{
		height: 20px;
		font-size: 12px;
		color: darkgray;
	}
</style>