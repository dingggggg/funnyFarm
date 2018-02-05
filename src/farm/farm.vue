<template>
    <div class="farm">
        <div class="btn-group">
            <Button type="primary" @click="$store.state.setting = true">游戏设定</Button>
            <Button type="primary" @click="$store.state.unlock = true">解锁植物</Button>
            <Button type="primary" @click="$store.state.achievement = true">成就</Button>
            <Button type="primary" @click="addLand()">添加土地(需{{$store.state.farmData.userInfo.addLandNeedMoney}}元)</Button>
            <Button type="primary" @click="save(true)">保存游戏</Button>
        </div>
        <div class="plants">
            <div class="plantpot" v-for="(t, index) in $store.state.plants" v-on:mouseenter="planting($event,index)">
                <Progress :id="'progress-' + index" class="progress" :percent="$store.state.plants[index].percent" hide-info></Progress>
                <div class="plant-img" :class="{'active': $store.state.plants[index].plantAnimation}" :style="$store.state.plants[index].index"></div>
                <div class="animation-money" :id="'moneyAnimation-' + index" :class="{'active':$store.state.plants[index].moneyAnimation}">+{{$store.state.farmData.currentPlant.profit}}元</div>
            </div>
        </div>
        <span class="money">
            ￥{{$store.state.farmData.userInfo.money.toFixed(2)}}元
        </span>
        <div class="foot">
            <Tooltip v-show="!plant.isUnlock" class="tooltip" placement="top"
            v-for="(plant, index) in $store.state.farmData.unlockPlants" v-bind:data="plant" v-bind:key="plant.name">
                <div slot="content">
                    <p>植物：{{transformForPlant(plant.name)}}</p>
                    <p>成本：{{transformForMillion(plant.cost)}}元</p>
                    <p>收益：{{transformForMillion(plant.profit)}}元</p>
                    <p>速度: {{plant.speed}}秒</p>
                    <p>季节：{{$store.state.farmData.currentSeason.now}}</p>
                    <p>已种植次数：{{plant.plantTimes}}</p>
                </div>
                <div class="select-plant" :style="{background: $store.state.farmData.currentPlant.name===plant.name?$store.state.farmData.currentSeason.bgColor : ''}">
                    <span class="has-plants" :style="{'background': 'url(' + plant.image + ') no-repeat center center',
                        backgroundSize: 'cover'}" v-on:click="selectPlant(plant, index)"><span class="has-plants-name">{{plant.name}}</span></span>
                </div>
            </Tooltip>
        </div>
        <div class="bg-body" :style="{background: $store.state.farmData.currentSeason.bgColor}"></div>
        <UnlockPlant v-show="$store.state.unlock"></UnlockPlant>
        <Achievement v-show="$store.state.achievement"></Achievement>
    </div>
</template>

<script>
/* eslint-disable */
import Vue from 'vue'
import UnlockPlant from '../components/UnlockPlant'
import Achievement from '../components/achievement'

// var variable = {
//     plants:[{
//         index:0,
//         percent:0,
//         moneyAnimation:false,
//         plantAnimation:false
//     }],
//     setting:false,
//     unlock:false,
//     achievement:false,
//     $store.state.farmData:{
//         plants:[{
//             index:0,
//             percent:0,
//             moneyAnimation:false,
//             plantAnimation:false
//         }],
//         userInfo:{
//             money:100,
//             addLandNeedMoney:1
//         },
//         currentSeason: {
//             now:'spring',
//             bgColor:'#b3e8b3'
//         },
//         unlockPlants:{},
//         currentPlant:{
//             name:'wheat',
//             cost:0,
//             profit:1,
//             speed:1,
//             unlock:0,
//             isUnlock:false,
//             showProfit:false,
//             image:'../static/images/wheat.png',
//             plantTimes:0
//         }
//     }
// }
// if(window.localStorage){
//     var storage = window.localStorage;
//     if(storage.$store.state.farmData){
//         var $store.state.farmData = JSON.parse(storage.$store.state.farmData);
//         variable.$store.state.farmData = $store.state.farmData;
//         variable.plants = JSON.parse(JSON.stringify($store.state.farmData.plants));
//     }
// }

export default {
    name: 'farm',
    data: function (){
        return {}
    },
    created (){
        var _this = this;
    },
    mounted(){
        console.log(this.$store);
        var _this = this;
        _this.init();
    },
    methods: {
        init (){
            var _this = this;
            _this.$store.state.farmData.currentPlant = _this.$store.state.farmData.unlockPlants[0];
            setInterval(function (){
                _this.save(true);
            },60000)
            if(_this.$store.state.farmData.currentSeason.now === 'spring'){
                _this.$Notice.info({
                    title: '春天开始啦!*\( ^ v ^ )/*'
                });
            }
            setInterval(function (){
                var currentSeason = _this.$store.state.farmData.currentSeason.now;
                var plants = _this.$store.state.farmData.unlockPlants;
                _this.changeSeason(currentSeason);
                plants.forEach(function (p, i){
                    var profit = JSON.parse(JSON.stringify(p.profit));
                    if(currentSeason === 'automn'){
                        p.profit = p.profit * 1.3;
                        setTimeout(function (){
                            p.profit = profit;
                        }, 299900);
                    }else if(currentSeason === 'winter' || currentSeason === 'summer'){
                        p.profit = p.profit * 0.7;
                        setTimeout(function (){
                            p.profit = profit;
                        }, 299900);
                    }else{
                        p.profit = profit;
                    }
                })
                _this.save(true);
            },300000)
        },
        addLand (){
            var _this = this;
            var length = _this.$store.state.plants.length;
            if(_this.$store.state.farmData.userInfo.money > this.$store.state.farmData.userInfo.addLandNeedMoney){
                _this.$store.state.farmData.userInfo.money = _this.$store.state.farmData.userInfo.money - _this.$store.state.farmData.userInfo.addLandNeedMoney;
                _this.$store.state.farmData.userInfo.addLandNeedMoney = Math.pow(2,length);
                this.$store.state.farmData.plants.push({
                    index:length,
                    percent:0
                })
                this.$store.state.plants.push({
                    index:length,
                    percent:0
                })
                this.$Message.success('购买成功！');
            }else{
                this.$Message.warning('穷逼滚蛋！');
            }
        },
        save (showMessage){
            var _this = this;
            if(_this.$store.getters.save){
                if(showMessage){
                    _this.$Notice.success({
                        title: '保存成功!'
                    });
                }
            }
        },
        planting (event, index){
            var _this = this;
            var plants = _this.$store.state.farmData.plants;
            var progress = document.getElementById('progress-'+index);
            var moneyAnimation = document.getElementById('moneyAnimation-'+index);
            var unlockPlants = _this.$store.state.farmData.unlockPlants;
            plants.forEach(function (m, i){
                // _this.$store.state.plants[i].moneyAnimation = false;
                if(_this.$store.state.plants[index]){
                    var msg = _this.$store.state.plants[index].index;
                }
                if(msg == m.index){
                    unlockPlants.forEach(function (u, i){
                        if(u.name === _this.$store.state.farmData.currentPlant.name){
                            u.plantTimes += 1;
                            _this.$store.state.farmData.currentPlant.plantTimes += 1;
                            _this.save();
                        }
                    })
                    _this.$store.state.plants[index].index = {
                        background: 'url(static/images/' + _this.$store.state.farmData.currentPlant.name + '.png) no-repeat center center',
                        backgroundSize: 'cover'
                    }
                    progress.style.display = 'block';

                    var timer = setInterval(function(){
                        _this.$store.state.plants[index].percent += 5;
                        _this.$store.state.plants[index].plantAnimation = true;
                        // setTimeout(function (){
                        //     _this.$store.state.plants[index].plantAnimation = false;
                        // },500)
                        if(_this.$store.state.plants[index].percent == 100){
                            setTimeout(function (){
                                clearInterval(timer);
                                _this.$store.state.plants[i].index = m.index;
                                _this.$store.state.plants[i].percent = m.percent;
                                _this.$store.state.plants[i].moneyAnimation = true;
                                moneyAnimation.style.display = 'block';
                                _this.$store.state.farmData.userInfo.money += Number(_this.$store.state.farmData.currentPlant.profit.toFixed(2));
                                progress.style.display = 'none';
                                setTimeout(function (){
                                    moneyAnimation.style.display = 'none';
                                },1000)
                            },200)
                        }
                    }, _this.$store.state.farmData.currentPlant.speed * 50);
                }
            })
            this.$forceUpdate();
        },
        selectPlant (plant, index){
            var _this = this;
            if(plant && plant.name){
                _this.$store.state.farmData.currentPlant = plant;
            }
        },
        changeSeason (season){
            var _this = this;

            switch (season) {
                case 'spring':
                    _this.$store.state.farmData.currentSeason.now = 'summer';
                    _this.showSeason(season);
                    this.$Notice.info({
                        title: '夏天开始啦!( +_+ )'
                    });
                    break;
                case 'summer':
                    _this.$store.state.farmData.currentSeason.now = 'automn';
                    _this.showSeason(season);
                    this.$Notice.info({
                        title: '秋天开始啦!(~^O^~)'
                    });
                    break;
                case 'automn':
                    _this.$store.state.farmData.currentSeason.now = 'winter';
                    _this.showSeason(season);
                    this.$Notice.info({
                        title: '冬天开始啦!( ¯▽¯ )'
                    });
                    break;
                case 'winter':
                    _this.$store.state.farmData.currentSeason.now = 'spring';
                    _this.showSeason(season);
                    this.$Notice.info({
                        title: '春天开始啦!*\( ^ v ^ )/*'
                    });
                    break;
                default:
                    break;
            }
        },
        showSeason (season){
            var _this = this;
            switch (season) {
                case 'spring':
                    _this.$store.state.farmData.currentSeason.bgColor = '#e8b3b3';
                    break;
                case 'summer':
                    _this.$store.state.farmData.currentSeason.bgColor = '#e8dcb3';
                    break;
                case 'automn':
                    _this.$store.state.farmData.currentSeason.bgColor = '#b3d0e8';
                    break;
                case 'winter':
                    _this.$store.state.farmData.currentSeason.bgColor = '#b3e8b3';
                    break;
                default:
                    break;
            }
        },
        transformForPlant (name){
            switch(name){
                case 'tomato':
                    name = '西红柿';
                    break;
                case 'wheat':
                    name = '小麦';
                    break;
                case 'radish':
                    name = '萝卜';
                    break;
                case 'cabbage':
                    name = '白菜';
                    break;
                case 'potato':
                    name = '土豆';
                    break;
                case 'peas':
                    name = '豌豆';
                    break;
                case 'sugarCane':
                    name = '甘蔗';
                    break;
                case 'greenPepper':
                    name = '青椒';
                    break;
                default:
                    break;
            }
            return name;
        },
        transformForMillion(money){
            if(money >= 10000){
                var str = money.toString();
                var length = str.length;
                var newStr = '';
                for(var i=0;i<str.length;i++){
                    if(i < length - 4){
                        newStr += str[i];
                    }
                }
                money = newStr+"万";
            }
            return money
        }

    },components:{UnlockPlant,Achievement}
}
/* eslint-disable */
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.bg-body {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -1;
    left: 0;
    top: 0;
    transition: background-color 1s;

    &.bg-winter {
        background: #b3d0e8;
    }
    &.bg-spring {
        background: #b3e8b3;
    }
    &.bg-summer {
        background: #e8b3b3;
    }
    &.bg-automn {
        background: #e8dcb3;
    }
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

            @keyframes plant
            {
                0%   {width: 50px;height: 50px}
                25%  {width: 55px;height: 55px}
                50%  {width: 45px;height: 45px}
                75%  {width: 60px;height: 60px}
                100% {width: 50px;height: 50px}
            }
            // &.active {
            //     animation: plant 0.5s linear;
            // }
        }

        @keyframes addMoney
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
            display: none;

            &.active {
                animation: addMoney 1s linear;
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
    background: white;
    z-index: 10;
    text-align: center;

    .tooltip {
        // margin-left: calc(50% - 40px);
    }
    .has-plants {
        position: relative;
        text-align: center;
        display: inline-block;
        // background: url('../assets/images/xiaomai.png') no-repeat center center;
        // background-size: cover;
        width: 80px;
        height: 80px;
        margin-top: 10px;

        .has-plants-name {
            position: relative;
            top: 80px;
            text-align: center;
        }
    }
    .select-plant {
        width: 100px;
        height: 120px;
        padding: 10px;
        transition: background-color 1s;
        cursor: pointer;
    }
}

</style>
