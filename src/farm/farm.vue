<template>
    <div style="padding:10px">
        <div class="btn-group">
            <Button type="primary" @click="setting = true">游戏设定</Button>
            <Button type="primary" @click="unlock = true">解锁植物</Button>
            <Button type="primary" @click="achievement = true">成就</Button>
            <Button type="primary" @click="addLand = true">添加土地</Button>
        </div>
        <div class="plants">
            <div class="plantpot" v-for="(t, index) in plants" v-on:mouseenter="planting($event,index)">
                <Progress v-show="t.percent > 0" class="progress" :percent="plants[index].percent" hide-info></Progress>
                <div class="plant-img" :style="plants[index].index"></div>
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
            <p>我是弹窗aaaa</p>
        </Modal>
    </div>
</template>

<script>
/* eslint-disable */
import Vue from 'vue'
import Componentone from '../components/componentone'

var variable = {
    plants:[{
        index:0,
        percent:0
    },
    {
        index:1,
        percent:0
    },
    {
        index:2,
        percent:0
    }],
    setting:false,
    unlock:false,
    achievement:false,
    addLand:false,
    percent:0,
    farmData:{
        plants:[{
            index:0,
            percent:0
        },
        {
            index:1,
            percent:0
        },
        {
            index:2,
            percent:0
        }]
    }
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
            var _this = this;
            var plants = _this.farmData.plants;
            plants.forEach(function (m, i){
                if(_this.plants[index]){
                    var msg = _this.plants[index].index;
                }
                if(msg == m.index){
                    _this.plants[index].index = {
                        background: 'url(static/images/tudou.png) no-repeat center center',
                        backgroundSize: 'cover'
                    }
                    var timer = setInterval(function(){
                        console.log(_this.plants[index].percent)
                        _this.plants[index].percent += 1;
                        // if(_this.plants[index].percent == 100){
                        //     clearInterval(timer);
                        //     _this.plants[i].index = m.index;
                        //     _this.plants[i].percent = m.percent;
                        // }
                    }, 50);
                    setTimeout(function (){
                        clearInterval(timer);
                        _this.plants[i].index = m.index;
                        _this.plants[i].percent = m.percent;
                    }, 5200)
                }
                // else{
                //     _this.plants[i].index = m.index;
                //     _this.plants[i].percent = m.percent;
                // }
            })

            this.$forceUpdate()
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
