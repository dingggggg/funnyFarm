<template>
    <div style="padding:10px">
        <div class="btn-group">
            <Button type="primary" @click="setting = true">游戏设定</Button>
            <Button type="primary" @click="unlock = true">解锁植物</Button>
            <Button type="primary" @click="achievement = true">成就</Button>
            <Button type="primary" @click="addLand = true">添加土地</Button>
        </div>
        <div class="plants">
            <div class="plantpot" v-for="(index, t) in message" v-on:mouseenter="planting($event,index)">
                <Progress v-show="" class="progress" :percent="percent" hide-info></Progress>
                <img src="" class="plant-img">
            </div>
        </div>

        <Modal v-model="setting" title="游戏设置" @on-ok="ok" @on-cancel="cancel">
            <Componentone></Componentone>
        </Modal>
        <Modal v-model="unlock" title="植物解锁" @on-ok="ok" @on-cancel="cancel">
            <p>我是弹窗</p>
        </Modal>
        <Modal v-model="achievement" title="成就" @on-ok="ok" @on-cancel="cancel">
            <p>我是弹窗</p>
        </Modal>
        <Modal v-model="addLand" title="添加土地" @on-ok="ok" @on-cancel="cancel">
            <p>我是弹窗</p>
        </Modal>
    </div>
</template>

<script>
/* eslint-disable */
import Vue from 'vue'
import Componentone from '../components/componentone'

var variable = {
    message:[1,2,3,4,5,6,7],
    setting:false,
    unlock:false,
    achievement:false,
    addLand:false,
    percent:0
}

export default {
    name: 'farm',
    data: function (){
        return variable
    },
    methods: {
        ok () {
            this.$Message.info('Clicked ok');
        },
        cancel () {
            this.$Message.info('Clicked cancel');
        },
        planting (event, index){
            var ele = event.target;
            var img = ele.children[1];

            img.src = require('../assets/images/xiaomai.png');
            variable.percent = 50;
            console.log(index)
            // var time = 1;
            // var timer = setInterval(function (){
            //     variable.percent += 1;
            // },10)
            // setTimeout(function (){
            //     clearInterval(timer);
            // },1000)

        }
    },
    components:{Componentone}
}
/* eslint-disable */
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.plants {
    width: 800px;
    height: 400px;
    margin: auto;
    position: absolute;
    top: 0; left: 0; bottom: 0; right: 0;

    .plantpot {
        width: 70px;
        height: 70px;
        margin: 7px;
        border: 1px solid #fff;
        border-radius: 5%;
        box-shadow: 0 14px 45px rgba(0,0,0,.247059), 0 10px 18px rgba(0,0,0,.219608);
        background-color: #fff;
        float: left;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        position: relative;
        cursor: pointer;
        transition: .3s;
        -webkit-animation: bounceIn 1s;
        animation: bounceIn 1s;
        // position: relative;

        .progress {
            position: absolute;
            top:-3px;
        }
        .plant-img {
            position: absolute;
            top: 15px;
            left: 10px;
            width: 50px;
            height: 50px;
            border: none;
        }
    }
}

</style>
