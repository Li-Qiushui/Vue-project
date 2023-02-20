<template>
    <div class="playlist">
        <div class="song"
            :class="{noCopyright:item.noCopyrightRcmd != undefined}"
            v-for="item,index in playlist"
            @click="playFun(index,$event)">
            <div class="num">{{index+1}}.</div>
            <div class="info">
                <p>{{item.name}}</p>
                <p>
                    <span v-for="s in item.ar">{{s.name}}</span>
                </p>
            </div>
            <div class="disk" 
                v-if="item.id == playing"
                :style="{animationPlayState:animation}">
                <img :src="diskImgUrl" >
            </div>
        </div>
    </div>
</template>

<script>
    import Bus from '../Bus.js'
	import diskImg from '@/assets/disk.png'
    
    export default{
        name:'playlist',
        props:['play'],
        data(){
            return{
                playlist:[],
                i:'',
                playing:'',
				diskImgUrl:diskImg,
                animation:''
                
            }
        },
        methods:{
            playFun(i,e){
				let main = this
                //如果为无版权音乐则返回
                if(e.currentTarget
                    .classList
                    .contains('noCopyright')
                ) return false;
                localStorage.playsongID = this.playlist[i].id;
                localStorage.playlistID = window.playlistID;
				let id = localStorage.playsongID;
				this.axios.get(this.ApiURl+'/song/detail',{
				    params:{
				        ids:id,
				        cookie:this.cookie
				    }
				}).then(function(res){
				    main.song = res.data.songs[0];
				    Bus.$emit('song',main.song);
					main.playing = main.song.id;
					main.axios.get(main.ApiURl+'/song/url',{
					    params:{
					        id:id,
					        cookie:main.cookie
					    }
					}).then(function(res){
					    localStorage.playsongID = id;
					    window.playsongID = id;
					    main.$parent.play = true;
					    main.$parent.audio.src = res.data.data[0].url;
					    localStorage.setItem("played",JSON.stringify(main.song));
					})
					
				})
            }
        },
        mounted() {
            const main = this;
			main.cookie = localStorage.user
            
            let id = this.$route.query.id;
            //确定正在播放的音乐
            this.playing = localStorage.playsongID;
            window.playlistID = id;
            if(!this.play) this.animation = 'paused'
            else this.animation = 'running';
            
            this.user = JSON.parse(localStorage.user)

            
            this.axios.get(this.ApiURl+'/playlist/track/all',{
                params:{
                    id:id,
                    cookie:this.cookie
                }
            }).then(function(res){
                main.playlist = res.data.songs;
                localStorage.setItem('playlist'+id,JSON.stringify(main.playlist))
            })
        },
        watch:{
            play:function(play){
                if(!play) this.animation = 'paused'
                else this.animation = 'running';
            }
        }
    }
</script>

<style>
    .playlist{
        width: 100%;
        height: 100%;
        padding: 5px;
        overflow: hidden;
        overflow-y: scroll;
    }
    .noCopyright *{
        color: #ccc !important;
    }
    .noCopyright:active{
        background-color: transparent !important;;
    }
    .song{
        transition: .1s;
        display: flex;
        padding: 5px;
        margin-bottom: 10px;
    }
    .song:active{
        background-color: #d6d6d6;
    }
    .song .num{
        width: 30px;
        color: #666;
        font-size: 14px;
        text-align: center;
        line-height: 30px;
    }
    .song .disk{
        width: 26px;
        height: 26px;
        margin: 5px 0;
        margin-left: auto;
        animation: quan 2s linear infinite;
    }
    @keyframes quan{
        0%{transform: rotate(0);}
        50%{transform: rotate(180deg);}
        100%{transform: rotate(360deg);}
    }
    .song .info{
        width: calc(100% - 60px);
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }
    .song .info p{
        background-image: linear-gradient(
            to left ,transparent, rgba(0, 0, 0, 1.0) 10%);
        -webkit-background-clip: text;
        color: transparent;
        white-space: nowrap;
        line-height: 20px;
    }
    .song .info p:last-child{
        background-image: linear-gradient(
            to left ,transparent, rgba(153, 153, 153, 1.0) 10%);
    }
    .song .info p:last-child span{
        font-size: 14px;
    }
    .song .info p span::after{
        content: ' / ';
        color: #888;
    }
    .song .info p span:last-child::after{
        content: '';
    }
</style>
