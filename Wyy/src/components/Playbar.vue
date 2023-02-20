<template>
    <div class="playbar" @click="playFun(song.id)">
        <audio id="audio"
            autoplay
            @timeupdate="durationUpdate" 
            @ended="playend('next')" />
        <div class="cover">
            <img :src="song.al.picUrl" >
        </div>
        <div class="info">
            <p>{{song.name}}</p>
            <p><span v-for="item in song.ar">{{item.name}}</span></p>
        </div>
        <div class="openw" @click.stop="audioPlay(song.id)">
            <openBtn :isBtn='$parent.play'></openBtn>
        </div>
    </div>
</template>

<script>
    import Bus from '../Bus.js'
    import openBtn from '../icons/openBtn.vue'
    
    export default{
        name:'Playbar',
        props:['playlist','play'],
        components:{
            openBtn
        },
        data(){
          return{
              song:{
                  al:''
              },
              index:0
          }  
        },
        methods:{
            durationUpdate(){//音乐播放触发
                if(this.$route.path != "/play") return false;
                this.$emit('save')
            },
            playFun(id){//点击bar触发
                this.$router.push("/play")
            },
            audioPlay(id){
               let paused = this.$parent.audio.paused;
               if(paused){
                   localStorage.playsongID = id;
                   this.$parent.audio.play();
               }else{
                   this.$parent.audio.pause();
               }
               this.$parent.play = paused;
             },//播放完成触发
            playend(state){
                let playlist = this.$parent.playlist;
                let index = playlist[0].index;
                index++;
                if(index == playlist.length){
                    index == 0;
                }
                playlist[0].index = index;
                const main = this;
                this.user = JSON.parse(localStorage.user);
                this.axios.get(this.ApiURl+'/song/detail',{
                    params:{
                        ids:playlist[index].id,
                        cookie:this.user.cookie
                    }
                }).then(function(res){
                    main.song = res.data.songs[0];
                    Bus.$emit('song',main.song);
                    
                    main.axios.get(main.ApiURl+'/song/url',{
                        params:{
                            id:playlist[index].id, 
                            cookie:main.user.cookie
                        }
                    }).then(function(res){
                        window.paused = playlist[index].id;
                        main.$parent.play = true;
                        main.$parent.audio.src = res.data.data[0].url;
                        localStorage.setItem("played",JSON.stringify(main.song));
                    })
                })
            }
        },
        mounted() {
            Bus.$on('song',(song) => {
                this.song = song;
            })
            this.$parent.audio = document.querySelector("#audio");
			console.log(this.$parent.audio)
            let played = localStorage.played;
            let user = localStorage.user;
            if(!played || !user) return false;
            
            played = JSON.parse(played);
            user = JSON.parse(user);
            this.song = played;
            this.song.play = false;
            const main = this;
            this.axios.get(this.ApiURl+'/song/url',{
                params:{
                    id:played.id,
                    cookie:user.cookie
                }
            }).then(function(res) {
                main.$parent.audio.src = res.data.data[0].url;
                main.$parent.audio.pause();
            })
        },
        watch:{
            play:function (play){
                
            }
        }
    }
</script>

<style>
    .playbar{
		position: sticky;
		bottom: 0;
        display: flex;
        width: 100%;
        height: 50px;
        padding: 5px 10px;
        background-color: rgba(222,222,222,.4);
    }
    .playbar .cover{
        width: 40px;
        height: 40px;
        border-radius: 4px;
        overflow: hidden;
        margin-right: 10px;
    }
    .playbar .info p:last-child{
        font-size: 12px;
        color: #333;
    }
    .playbar .info p span::after{
        content: ' / ';
        color: #000;
    }
    .playbar .info p span:last-child::after{
        content: '';
    }
    .playbar .openw{
        margin-left: auto;
    }
</style>
