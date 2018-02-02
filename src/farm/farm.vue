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
                <div class="plant-img" :class="{'active': plants[index].plantAnimation}" :style="plants[index].index"></div>
                <div class="animation-money" :id="'moneyAnimation-' + index" :class="{'active':plants[index].moneyAnimation}">+1元</div>
            </div>
        </div>
        <span class="money">
            ￥{{farmData.userInfo.money}}元
            <!-- ￥{{(farmData.userInfo.money).toFixed(2)}}元 -->
        </span>
        <div class="foot">
            <Tooltip v-show="!plant.isUnlock" class="tooltip" placement="top"
            v-for="(plant, index) in farmData.unlockPlants" v-bind:data="plant" v-bind:key="plant.name">
                <div slot="content">
                    <p>植物：{{transformForPlant(plant.name)}}</p>
                    <p>成本：{{transformForMillion(plant.cost)}}元</p>
                    <p>收益：{{transformForMillion(plant.profit)}}元</p>
                    <p>速度: {{plant.speed}}秒</p>
                    <p>季节：{{farmData.currentSeason.now}}</p>
                    <p>已种植次数：{{plant.plantTimes}}</p>
                </div>
                <div class="select-plant" :style="{background: farmData.currentPlant.name===plant.name?farmData.currentSeason.bgColor : ''}">
                    <span class="has-plants" :style="{'background': 'url(' + plant.image + ') no-repeat center center',
                        backgroundSize: 'cover'}" v-on:click="selectPlant(plant, index)"><span class="has-plants-name">{{plant.name}}</span></span>
                </div>
            </Tooltip>
        </div>
        <div class="bg-body" :style="{background: farmData.currentSeason.bgColor}"></div>
        <UnlockPlant v-show="unlock"></UnlockPlant>
        <Achievement v-show="achievement"></Achievement>
    </div>
</template>

<script>
/* eslint-disable */
import Vue from 'vue'
import UnlockPlant from '../components/UnlockPlant'
import Achievement from '../components/achievement'

var variable = {
    plants:[{
        index:0,
        percent:0,
        moneyAnimation:false,
        plantAnimation:false
    }],
    setting:false,
    unlock:false,
    achievement:false,
    farmData:{
        plants:[{
            index:0,
            percent:0,
            moneyAnimation:false,
            plantAnimation:false
        }],
        userInfo:{
            money:100,
            addLandNeedMoney:1
        },
        currentSeason: {
            now:'spring',
            bgColor:'#b3e8b3'
        },
        unlockPlants:{},
        currentPlant:{
            name:'wheat',
            cost:0,
            profit:1,
            speed:1,
            unlock:0,
            isUnlock:false,
            showProfit:false,
            image:'../static/images/wheat.png',
            plantTimes:0
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
    created (){
        var _this = this;
        _this.$root.eventHub.$on('GET_UNLOCK_PLANTS_PARAMS', function (params){
            _this.farmData.unlockPlants = params;
        })
    },
    mounted(){
        console.log(this);
        var _this = this;

        _this.$root.eventHub.$emit('END_OPEN',1);
        _this.init();

        _this.$root.eventHub.$on('HIDE_UNLOCK', function (){
            _this.unlock = false;
        })

        _this.$root.eventHub.$on('SAVE', function (params){
            _this.farmData.unlockPlants = params;
            _this.save();
        });
    },
    methods: {
        init (){
            var _this = this;

            setInterval(function (){
                _this.save();
            },60000)
            if(_this.farmData.currentSeason.now === 'spring'){

                _this.$Notice.info({
                    title: '春天开始啦!*\( ^ v ^ )/*'
                });
            }
            setInterval(function (){
                _this.changeSeason(_this.farmData.currentSeason.now);
                _this.save();
            },300000)
        },
        ok () {
            this.$Message.info('Clicked ok');
        },
        cancel () {
            this.$Message.info('Clicked cancel');
        },
        addLand (){
            var _this = this;
            var length = this.plants.length;
            if(_this.farmData.userInfo.money > this.farmData.userInfo.addLandNeedMoney){
                _this.farmData.userInfo.money = _this.farmData.userInfo.money - _this.farmData.userInfo.addLandNeedMoney;
                _this.farmData.userInfo.addLandNeedMoney = Math.pow(2,length - 1);
                _this.plants.push({
                    index:length,
                    percent:0
                })
                this.farmData.plants.push({
                    index:length,
                    percent:0
                })
                this.$Message.success('购买成功！');
            }else{
                this.$Message.warning('穷逼滚蛋！');
            }
        },

        save (message){
            if(window.localStorage){
                window.localStorage.setItem('farmData',JSON.stringify(this.farmData));
                if(message){
                    this.$Notice.success({
                        title: '保存成功!'
                    });
                }
            }

        },
        planting (event, index){
            var _this = this;
            var plants = _this.farmData.plants;
            var progress = document.getElementById('progress-'+index);
            var moneyAnimation = document.getElementById('moneyAnimation-'+index);
            plants.forEach(function (m, i){
                // _this.plants[i].moneyAnimation = false;
                if(_this.plants[index]){
                    var msg = _this.plants[index].index;
                }
                if(msg == m.index){
                    _this.farmData.unlockPlants.forEach(function (u, i){
                        if(u.name === _this.farmData.currentPlant.name){
                            u.plantTimes += 1;
                            _this.farmData.currentPlant.plantTimes += 1;
                            _this.save();
                        }
                    })
                    _this.plants[index].index = {
                        background: 'url(static/images/' + _this.farmData.currentPlant.name + '.png) no-repeat center center',
                        backgroundSize: 'cover'
                    }
                    progress.style.display = 'block';

                    var timer = setInterval(function(){
                        _this.plants[index].percent += 5;
                        _this.plants[index].plantAnimation = true;
                        setTimeout(function (){
                            _this.plants[index].plantAnimation = false;
                        },500)
                        if(_this.plants[index].percent == 100){
                            setTimeout(function (){
                                clearInterval(timer);
                                _this.plants[i].index = m.index;
                                _this.plants[i].percent = m.percent;
                                _this.plants[i].moneyAnimation = true;
                                moneyAnimation.style.display = 'block';
                                _this.farmData.userInfo.money += 1;
                                progress.style.display = 'none';
                                setTimeout(function (){
                                    moneyAnimation.style.display = 'none';
                                },1000)
                            },200)
                        }
                    }, _this.farmData.currentPlant.speed * 50);
                }
            })
            this.$forceUpdate();
        },
        selectPlant (plant, index){
            var _this = this;
            if(plant && plant.name){
                _this.farmData.currentPlant = plant;
            }
        },
        changeSeason (season){
            var _this = this;

            switch (season) {
                case 'spring':
                    _this.farmData.currentSeason.now = 'summer';
                    _this.showSeason(season);
                    this.$Notice.info({
                        title: '夏天开始啦!( +_+ )'
                    });
                    break;
                case 'summer':
                    _this.farmData.currentSeason.now = 'automn';
                    _this.showSeason(season);
                    this.$Notice.info({
                        title: '秋天开始啦!(~^O^~)'
                    });
                    break;
                case 'automn':
                    _this.farmData.currentSeason.now = 'winter';
                    _this.showSeason(season);
                    this.$Notice.info({
                        title: '冬天开始啦!( ¯▽¯；)'
                    });
                    break;
                case 'winter':
                    _this.farmData.currentSeason.now = 'spring';
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
                    _this.farmData.currentSeason.bgColor = '#e8b3b3';
                    break;
                case 'summer':
                    _this.farmData.currentSeason.bgColor = '#e8dcb3';
                    break;
                case 'automn':
                    _this.farmData.currentSeason.bgColor = '#b3d0e8';
                    break;
                case 'winter':
                    _this.farmData.currentSeason.bgColor = '#b3e8b3';
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
