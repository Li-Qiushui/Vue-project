<template>
    <div class="songslists">
        <div class="songs" 
            v-for="item,index in Songslists"
            @click="songsFun(index)"
            >
            <div class="cover">
                <img :src="item.coverImgUrl+'?param=100y100'" alt="">
            </div>
            <div class="info">
                <p>{{item.name}}</p>
                <p>{{item.trackCount}} 首</p>
            </div>
        </div>
        <el-button @click="uLogin">退出登录</el-button>
    </div>
</template>

<script>
    export default{
        name:'Songslists',
        data(){
            return{
                Songslists:[]
            }
        },
        mounted() {
            if(localStorage.user){
				const main = this;
                main.cookie =  localStorage.user;
				this.axios.get(this.ApiURl+'/user/account',{
				    params:{
				        cookie:main.cookie
				    }
				}).then(function(res){
					if(!res.data.account){
						main.$router.push('./Login');
					}
				   let id = res.data.account.id
				   main.axios.get(main.ApiURl+'/user/playlist',{
				       params:{
				           uid:id
				       }
				   }).then(function(res){
					   main.Songslists = res.data.playlist;
					   localStorage.Songslists = JSON.stringify(main.Songslists)
				   })
				})
                if(localStorage.Songslists != undefined){
                    this.Songslists = JSON.parse(localStorage.Songslists);
                    return false;
                }
                
            }
        },
        methods:{
            songsFun:function(i){
                this.$router.push({
                    path: '/playlist',
                    query: {
                        id: this.Songslists[i].id,
                    }
                })
            },
            uLogin:function(){
                localStorage.clear()
                location.reload()
            }
        }
    }
</script>

<style>
    .songslists{
        width: 100%;
        height: 100%;
        padding: 5px;
        overflow-y: scroll;
    }
    .songs{
		cursor: default;
        transition: .1s;
        border-radius: 3px;
        display: flex;
        padding: 5px;
        margin-bottom: 5px;
    }
    .songs:active{
        background-color: #cecece;
    }
    .songs .cover{
        width: 45px;
        height: 45px;
        margin-right: 5px;
        border-radius: 3px;
        overflow: hidden;
    }
    .songs .info{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }
    .songs .info p{
        font-size: 14px;
    }
    .songs .info p:last-child{
        color: #999;
    }
</style>
