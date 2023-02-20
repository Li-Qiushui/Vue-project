<template>
    <div class="play">
        <div class="cover">
			<img :src="song.al.picUrl" >
        </div>
		<div class="name">
			<p v-text="song.name"></p>
		</div>
        <div class="slider"
            @mousedown="ChangeFun(true)"
            @touchstart="ChangeFun(true)"
            >
            <el-slider
                v-model="slider"
                @change="sliderFun"
                @input="sliderTimer"
                :show-tooltip="false" ></el-slider>
        </div>
        <div class="timer">
            <span>{{timer.s}}</span> / <span>{{timer.e}}</span>
        </div>
        <div class="playBtn">
			<div class="songBtn" @click="songSwitch(false)">
				<img :src="UpperImgUrl">
			</div>
            <openBtn @click.native="audioPlay" :isBtn="$parent.play"></openBtn>
			<div class="songBtn" @click="songSwitch(true)">
				<img :src="NextImgUrl">
			</div>
        </div>
    </div>
    
</template>

<script>
    import Bus from "../Bus.js"
    import openBtn from '../icons/openBtn'
    import NextImgUrl from '@/assets/Next.svg'
    import UpperImgUrl from '@/assets/Upper.svg'
    
    export default{
        name:'Play',
        props:['play'],
        components:{
          openBtn,
        },
        data(){
            return{
                song:{al:''},
                slider:0,
                timer:{
                    s:"00:00",
                    e:"00:00"
                },
				NextImgUrl,
				UpperImgUrl
             }  
        },
        mounted() {
            const main = this;
            
            if(!this.$parent.audio){
                this.$router.go(-1)
                return false
            }
            Bus.$on("song",function(song){
                main.song = song;
            })
            let playlistID = localStorage.playlistID;
            let playlist = localStorage.getItem("playlist"+playlistID);
            if(playlist){
                playlist = JSON.parse(playlist);
                let time = playlist[0].time;
                this.playlist = playlist;
                this.$parent.playlist = playlist;
                let playsongID = localStorage.playsongID;
                for (let i in playlist) {
                    if(playlist[i].id == playsongID){
                        this.$parent.playlist[0].index = i;
                        break;
                    }
                }
            }
			
            let id = localStorage.playsongID;
            let index = this.$parent.playlist[0].index;
            if(id == undefined) return false;
            
            this.user = JSON.parse(localStorage.user)
            Bus.$emit('playing',id);
            
            this.$parent.play = !this.$parent.audio.paused;
            this.axios.get(this.ApiURl+'/song/detail',{
                params:{
                    ids:id,
                    cookie:this.user.cookie
                }
            }).then(function(res){
                main.song = res.data.songs[0];
                Bus.$emit('song',main.song);
                
                let time = new Date(main.song.dt);
                let M = time.getMinutes();
                let S = time.getSeconds();
                M = (M < 10) ? "0"+M : M;
                S = (S < 10) ? "0"+S : S;
                main.timer.e = M +':'+S;
				
                if(localStorage.playsongID == window.playsongID) {
					 return false;
				}
                main.axios.get(main.ApiURl+'/song/url',{
                    params:{
                        id:id,
                        cookie:main.user.cookie
                    }
                }).then(function(res){
                    localStorage.playsongID = id;
                    window.playsongID = id;
                    main.$parent.play = true;
                    main.$parent.audio.src = res.data.data[0].url;
                    localStorage.setItem("played",JSON.stringify(main.song));
                })
            })
        },
        methods:{
            sliderFun(){//滑动条触发时执行
                let slider = this.slider*this.song.dt/100000;
                this.$parent.audio.currentTime = slider;
                this.isChange = false;
            },
            durationUpdate(){//根据播放进度更改滑动条
                if (this.isChange === true){
                     return false;
                }
                let cTime = Math.floor(this.$parent.audio.currentTime);
                this.slider = cTime/(this.song.dt/1000)*100;
            },
            sliderTimer(){
                let cTime = this.song.dt*this.slider/100000;
                if(isNaN(cTime)) return;
                cTime = Math.round(cTime);
                let S = cTime%60;
                let M = Math.round(cTime/60);
                S = (S < 10) ? '0' + S : S;
                M = (M < 10) ? '0' + M : M;
                this.timer.s = M+":"+S
            },
            audioPlay(){
                let paused = this.$parent.audio.paused;
                if(paused){
                    this.$parent.audio.play();
                }else{
                    this.$parent.audio.pause();
                }
                this.$parent.play = paused;
                this.song.play = paused;
            },
            songSwitch(toggle){
                let playlist = this.$parent.playlist;
                let index = playlist[0].index;
                if(toggle){
                    index++;
                    if(index == playlist.length){
                        index = 0;
                    }
                    if(playlist[index].noCopyrightRcmd){
                        index++;
                    }
                }else{
                    index--;
                    if(index == -1){
                        index = playlist.length-1;
                    }
                    if(playlist[index].noCopyrightRcmd){
                        index--;
                    }
                }
                playlist[0].index = index;
                
                const main = this;
                this.axios.get(this.ApiURl+'/song/detail',{
                    params:{
                        ids:playlist[index].id,
                        cookie:this.user.cookie
                    }
                }).then(function(res){
                    main.song = res.data.songs[0];
                    Bus.$emit('song',main.song);
                    
                    let time = new Date(main.song.dt);
                    let M = time.getMinutes();
                    let S = time.getSeconds();
                    M = (M < 10) ? "0"+M : M;
                    S = (S < 10) ? "0"+S : S;
                    main.timer.e = M +':'+S
                    
                    main.axios.get(main.ApiURl+'/song/url',{
                        params:{
                            id:playlist[index].id, 
                            cookie:main.user.cookie
                        }
                    }).then(function(res){
                        window.playsongID = playlist[index].id;
                        localStorage.playsongID = playlist[index].id;
                        main.$parent.play = true;
                        main.$parent.audio.src = res.data.data[0].url;
                        localStorage.setItem("played",JSON.stringify(main.song));
                    })
                })
            },
            ChangeFun(b){
                this.isChange = b;
            }
        }
    }
</script>

<style>
    .play{
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
    
    .play .cover{
        position: relative;
        z-index: 1;
		width: 60%;
		height: 0;
		padding-bottom: 60%;
        margin: 10% auto;
    }
    .play .cover img{
		position: absolute;
		width: 100%;
		height: 100%;
		border-radius: 5%;
		margin: 0 auto;
        box-shadow: 0 0 20px #aaaaaa;
    }
	.name{
		text-align: center;
		margin-bottom: 10px;
	}
    .slider{
        position: relative;
        z-index: 1;
    }
    .el-slider .el-slider__runway{
        height: 3px;
        margin: 0;
		background-color: #f3f3f3;
    }
    .el-slider .el-slider__bar{
        height: 3px;
		background-color: #333333;
    }
    .el-slider .el-slider__button{
        width: 38px;
        height: 38px;
        border: none;
        background-color: transparent;
    }
    .el-slider__button-wrapper{
        top: -16px;
    }
    .timer{
        position: relative;
        z-index: 2;
        margin: 10px 0;
        text-align: center;
        color: #0f0f0f;
    }
    
    .playBtn{
        position: absolute;
        bottom: 10%;
        z-index: 2;
        width: 100%;
		height: 50px;
        display: flex;
        justify-content: space-around;
        padding: 0 10%;
        margin: 30px 0;
        color: #FFF;
    }
    .playBtn .openBtn{
        width: 50px;
        height: 50px;
    }
    .playBtn .songBtn{
		width: 40px;
		height: 100%;
		padding: 15px 0;
	}
    .playBtn .songBtn img{
		display: block;
		width: 20px;
		height: 20px;
		margin: 0 auto;
	}
    
    
    .bgImg{
        transform: scale(1.08);
        position: absolute;
        z-index: 0;
        top: 0;
        height: 100%;
        filter: blur(10px);
    }
    
</style>
