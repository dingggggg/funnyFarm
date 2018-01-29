<template>
    <div class="farm">
        <div class="btn-group">
            <Button type="primary" @click="setting = true">游戏设定</Button>
            <Button type="primary" @click="unlock = true">解锁植物</Button>
            <Button type="primary" @click="achievement = true">成就</Button>
            <Button type="primary" @click="addLand()">添加土地(需{{farmData.userInfo.addLandNeedMoney}}元)</Button>
            <Button type="primary" @click="save()">保存游戏</Button>
        </div>
        <div class="plants">
            <div class="plantpot" v-for="(t, index) in plants" v-on:mouseenter="planting($event,index)">
                <Progress :id="'progress-' + index" class="progress" :percent="plants[index].percent" hide-info></Progress>
                <div class="plant-img" :style="plants[index].index"></div>
                <div class="animation-money" v-show="plants[index].endPlant" :class="{'active':plants[index].endPlant}">+1元</div>
            </div>
        </div>
        <span class="money">
            ￥{{farmData.userInfo.money}}元
        </span>
        <div class="foot">
            <span class="has-plants" :style="{background: 'url(static/images/xiaomai.png) no-repeat center center',
                backgroundSize: 'cover'}"><span class="has-plants-name">小麦</span></span>
        </div>
        <div class="bg-body"></div>
        <Modal v-model="setting" title="游戏设置" @on-ok="ok" @on-cancel="cancel">
            <Componentone></Componentone>
        </Modal>
        <Modal v-model="unlock" title="植物解锁" @on-ok="ok" @on-cancel="cancel">
            <p>我是弹窗</p>
        </Modal>
        <Modal v-model="achievement" title="成就" @on-ok="ok" @on-cancel="cancel">
            <p>我是弹窗</p>
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
        percent:0,
        endPlant:false
    }],
    setting:false,
    unlock:false,
    achievement:false,
    percent:0,
    farmData:{
        plants:[{
            index:0,
            percent:0,
            endPlant:false
        }],
        userInfo:{
            money:100,
            addLandNeedMoney:1
        }
    }
}
if(window.localStorage){
    var storage = window.localStorage;
    if(storage.farmData){
        var farmData = JSON.parse(storage.farmData);
        variable.farmData = farmData;
        variable.plants = JSON.parse(JSON.stringify(farmData.plants));
    }
}

export default {
    name: 'farm',
    data: function (){
        return variable
    },
    mounted(){
        this.init();
    },
    methods: {
        init (){
            var _this = this;
            setInterval(function (){
                _this.save();
            },60000)
        },
        ok () {
            this.$Message.info('Clicked ok');
        },
        cancel () {
            this.$Message.info('Clicked cancel');
        },
        addLand (){
            var length = this.plants.length;
            if(this.farmData.userInfo.money > this.farmData.userInfo.addLandNeedMoney){
                this.farmData.userInfo.money = this.farmData.userInfo.money - this.farmData.userInfo.addLandNeedMoney;
                this.farmData.userInfo.addLandNeedMoney = Math.pow(2,length - 1);
                this.plants.push({
                    index:length,
                    percent:0
                })
                this.farmData.plants.push({
                    index:length,
                    percent:0
                })
                this.$Message.info('购买成功！');
            }else{
                this.$Message.info('穷逼滚蛋！');
            }
        },
        save (){
            if(window.localStorage){
                window.localStorage.setItem('farmData',JSON.stringify(this.farmData))
                this.$Message.info('保存成功!');
            }
        },
        planting (event, index){
            var _this = this;
            var plants = _this.farmData.plants;
            plants.forEach(function (m, i){
                // _this.plants[i].endPlant = false;
                if(_this.plants[index]){
                    var msg = _this.plants[index].index;
                }
                if(msg == m.index){
                    _this.plants[index].index = {
                        background: 'url(static/images/xiaomai.png) no-repeat center center',
                        backgroundSize: 'cover'
                    }
                    var process = document.getElementById('progress-'+index);
                    process.style.display = 'block';
                    var timer = setInterval(function(){
                        _this.plants[index].percent += 10;
                        if(_this.plants[index].percent == 100){
                            setTimeout(function (){
                                clearInterval(timer);
                                _this.plants[i].index = m.index;
                                _this.plants[i].percent = m.percent;
                                _this.plants[i].endPlant = true;
                                _this.farmData.userInfo.money += 1;
                                process.style.display = 'none';
                                setTimeout(function (){
                                    _this.plants[i].endPlant = false;
                                },1000)
                            },200)
                        }
                    }, 100);
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
.bg-body {
    width: 100%;
    height: 100%;
    position: absolute;
    background: #b3d0e8;
    z-index: -1;
    left: 0;
    top: 0;
}
.farm {
    width: 100%;
    height: 100%;
    padding: 10px;
    // background: #b3d0e8;
}
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
            display: none;
        }
        .plant-img {
            position: absolute;
            top: 15px;
            left: 10px;
            width: 50px;
            height: 50px;
            border: none;
        }
        @keyframes myfirst
        {
            0%   {top:0px;}
            100% {top:-50px;}
        }
        .animation-money {
            color:#FF0000;
            text-align: center;
            margin-top: 20px;
            position: absolute;
            left: 20px;

            &.active {
                animation: myfirst 1s linear;
            }
        }
    }
}
.money {
    font-size: 24px;
    position: absolute;
    bottom: 120px;
}
.foot {
    position: absolute;
    width: 100%;
    bottom: 0px;
    left: 0;
    height: 120px;
    margin: 0;
    background: white;
    z-index: 10;

    .has-plants {
        position: relative;
        text-align: center;
        display: inline-block;
        // background: url('../assets/images/xiaomai.png') no-repeat center center;
        // background-size: cover;
        width: 80px;
        height: 80px;
        margin-left: calc(50% - 40px);
        margin-top: 10px;

        .has-plants-name {
            position: relative;
            top: 80px;
            text-align: center;
        }
    }
}

</style>
