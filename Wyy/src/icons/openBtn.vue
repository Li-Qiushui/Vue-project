<template>
    <div class="openBtn"
        @click="openBtn = !openBtn">
        <div
            class="open" 
            :class="{on:openBtn,off:!openBtn}" >
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
</template>

<script>
    import Bus from '../Bus.js'
    
    export default{
        name:'openBtn',
        props:['isBtn'],
        data(){
            return{
                openBtn:false
            }
        },
        mounted() {
            this.openBtn = this.isBtn;
        },
        watch:{
            isBtn:function(isBtn) {
                this.openBtn = isBtn;
            }
        }
    }
</script>

<style>
    .openBtn{
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
    }
    .open{
        transition: .3s;
        position: relative;
        display: flex;
        justify-content: space-between;
        width: 20px;
        height: 25px;
    }
    .open div{
        transition: .3s;
        width: 4px;
        height: 25px;
        border-radius: 2px;
        background-color: #333333;
    }
    .open div:nth-child(1){
        transition: .2s;
        transform: scaleY(.98);
    }
    
    .open.off div:nth-child(2){
        position: absolute;
        top: -3px;
        left: 8px;
        height: 20.4px;
        transform: rotate(-55deg);
    }
    .open.off div:nth-child(3){
        position: absolute;
        bottom: -3px;
        left: 8px;
        height: 20.4px;
        transform: rotate(55deg);
    }
    .open.on{
        transform: rotate(-90deg);
    }
    .open.on div:nth-child(1){
        opacity: 0;
    }
    .open.on div:nth-child(2){
        position: absolute;
        top: -3px;
        left: 8px;
        height: 20.4px;
        transform: rotate(-90deg);
    }
    .open.on div:nth-child(3){
        position: absolute;
        bottom: -3px;
        left: 8px;
        height: 20.4px;
        transform: rotate(90deg);
    }
</style>
