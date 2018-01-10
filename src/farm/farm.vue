<template>
    <div style="padding:10px">
        <div class="btn-group">
            <Button type="primary" @click="setting = true">游戏设定</Button>
            <Button type="primary" @click="unlock = true">解锁植物</Button>
            <Button type="primary" @click="achievement = true">成就</Button>
            <Button type="primary" @click="addLand = true">添加土地</Button>
        </div>
        <img src="../assets/logo.png">
        <div class="plants">
            <div class="plantpot" v-for="t in message">
                <!-- {{t}} -->
            </div>
            <Componentone></Componentone>
        </div>

        <Modal v-model="setting" title="游戏设置" @on-ok="ok" @on-cancel="cancel">
            <p>我是弹窗</p>
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
 // import Componentone from './components/Componentone.vue'
import Vue from 'vue'
import Componentone from '../components/componentone'
var test = {
    message:[1,2,3,4,5,6,7],
    setting:false,
    unlock:false,
    achievement:false,
    addLand:false
}
export default {
    name: 'farm',
    data: function (){
        return test
    },
    methods: {
        ok () {
            this.$Message.info('Clicked ok');
        },
        cancel () {
            this.$Message.info('Clicked cancel');
        }
    },
    components:{Componentone}
}
/* eslint-disable */
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
.plants {
    width: 800px;
    height: 400px;
    margin: auto;
    position: absolute;
    top: 0; left: 0; bottom: 0; right: 0;
}
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
}
</style>
