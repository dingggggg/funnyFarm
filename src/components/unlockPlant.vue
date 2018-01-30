<template>
    <div >
        <div class = 'unlock-plant'>
            <canvas id = 'canvas' class = 'icon-close' v-on:click="showUnlock()"></canvas>
            <div class = 'content'>
            <div class = 'item' v-for = "(item, index) in items">
                <div class = 'image'>
                    <img v-bind:src="item.image"  draggable = 'false' class = 'plant'>
                    <div v-show="item.isUnlock" class='lock' :id="'lock'+index" @click = "unlock($event,index)"></div>
                </div>
                <!-- info start -->
                <div class = 'info'>
                    <p>植物：{{transform(item.name)}}</p>
                    <p>成本：{{transformForMillion(item.cost)}}元</p>
                    <p>收益：{{transformForMillion(item.profit)}}元</p>
                    <p>速度：{{transformForMillion(item.speed)}}秒</p>
                    <p>解锁：{{transformForMillion(item.unlock)}}元</p>
                </div>
                <!-- info end -->
                <!-- control start -->
                <div class = 'control'>
                    <button type = 'button' class = ' btn-profit ivu-btn' @click = "addProfit($event,index)" @mouseenter="enterShowProfit(index)" @mouseleave="leaveShowPRofit(index)">
                        <span v-show="!item.showProfit">+收益</span><span v-show="item.showProfit">需要{{item.addProfitMoney}}</span>
                    </button>
                    <button type = 'button' class = ' btn-prosee ivu-btn' @click = "addSpeed($event,index)" @mouseenter="enterShowSpeed(index)" @mouseleave="leaveShowSpeed(index)">
                        <span v-show="!item.showSpeed">+速度</span><span v-show="item.showSpeed">需要{{item.addSpeedMoney}}</span>
                    </button>
                </div>
                <!-- control end -->

            </div>
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
if(window.localStorage){
    var storage = window.localStorage;
    if(storage.farmData){
        var farmData = JSON.parse(storage.farmData);
    }
}
var data = {
    farmData:farmData,
    isClose:false,
    items: [{
        name:'tomato',
        cost:4,
        profit:16,
        addProfitMoney:100,
        speed:2,
        addSpeedMoney:100,
        unlock:500,
        isUnlock:true,
        showProfit:false,
        showSpeed:false,
        image:'../static/images/xihongshi.png'
    },{
        name:'wheat',
        cost:0,
        profit:1,
        addProfitMoney:100,
        speed:1,
        addSpeedMoney:10,
        unlock:0,
        isUnlock:false,
        showProfit:false,
        showSpeed:false,
        image:'../static/images/xiaomai.png'
    },{
        name:'radish',
        cost:20,
        profit:80,
        addProfitMoney:100,
        speed:4,
        addSpeedMoney:100,
        unlock:8000,
        isUnlock:true,
        showProfit:false,
        showSpeed:false,
        image:'../static/images/luobo.png'
    },{
        name:'cabbage',
        cost:200,
        profit:800,
        addProfitMoney:100,
        speed:6,
        addSpeedMoney:100,
        unlock:40000,
        isUnlock:true,
        showProfit:false,
        showSpeed:false,
        image:'../static/images/baicai.png'
    },{
        name:'potato',
        cost:2000,
        profit:10000,
        addProfitMoney:100,
        speed:8,
        addSpeedMoney:100,
        unlock:400000,
        isUnlock:true,
        showProfit:false,
        showSpeed:false,
        image:'../static/images/tudou.png'
    },{
        name:'peas',
        cost:10000,
        profit:60000,
        addProfitMoney:100,
        speed:10,
        addSpeedMoney:100,
        unlock:5000000,
        isUnlock:true,
        showProfit:false,
        showSpeed:false,
        image:'../static/images/wandou.png'
    },{
        name:'sugarCane',
        cost:100000,
        profit:1000000,
        addProfitMoney:100,
        speed:11,
        addSpeedMoney:100,
        unlock:100000000,
        isUnlock:true,
        showProfit:false,
        showSpeed:false,
        image:'../static/images/ganzhe.png'
    },{
        name: 'greenPepper',
        cost: 1000000,
        profit: 5000000,
        addProfitMoney:100,
        speed: 12,
        addSpeedMoney:100,
        unlock: 999999999,
        isUnlock:true,
        showProfit:false,
        showSpeed:false,
        image:'../static/images/qingjiao.png'
    }]
}

export default{
    name: 'UnlockPlant',
    data: function(){
        return  data;
    },
    created(){
        var _this = this;
        _this.$root.eventHub.$on('END_OPEN', function (p){
            _this.$root.eventHub.$emit('GET_UNLOCK_PLANTS_PARAMS', _this.items);
        })
    },
    mounted(){
        var _this = this;
        _this.drawx();
    },
    methods:{
        drawx(){
            //画叉
            var canvas = document.getElementById( 'canvas' );
            canvas.width = 50;
            canvas.height = 50;
            // 获得 CanvasRenderingContext2D 对象
            var context = canvas.getContext( '2d' );
            // 设置 起点
            context.lineWidth = 6;
            context.strokeStyle = "rgba(0,0,0,0.5)";
            context.moveTo( 10, 10);
            // 绘制直线
            context.lineTo( 40, 40 );
            // 设置 起点
            context.moveTo( 10, 40 );
            // 绘制直线
            context.lineTo( 40, 10 );
            // 描边显示效果
            context.stroke();
        },
        transform (name){
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

        },
        unlock(event,index){
            var _this = this;
            //console.log(_this.items[index].unlock);
            var target = event.target;
            if(_this.farmData.userInfo.money > _this.items[index].unlock){
                _this.items[index].isUnlock = false;
                _this.farmData.userInfo.money = _this.farmData.userInfo.money-_this.items[index].unlock;
            }else{
                this.$Message.info('穷逼滚蛋！');
            }
        },
        addProfit(event,index){
            if(this._isUnlock(index)){
                if(this.farmData.userInfo.money >= this.items[index].addSpeedMoney){
                    this.items[index].profit = (this.items[index].profit*1.01).toFixed(2);
                    this.farmData.userInfo.money = this.farmData.userInfo.money - this.items[index].addProfitMoney;
                    this.items[index].addProfitMoney = (this.items[index].addProfitMoney*1.4).toFixed(2);
                }else{
                    this.$Message.info('穷逼滚蛋！');
                }
            }
        },
        addSpeed(event,index){
            if(this._isUnlock(index)){
                if(this.items[index].speed>0.5){
                    if(this.farmData.userInfo.money >= this.items[index].addSpeedMoney){
                        this.items[index].speed = (this.items[index].speed-0.1).toFixed(2);
                        this.farmData.userInfo.money = this.farmData.userInfo.money - this.items[index].addSpeedMoney;
                        this.items[index].addSpeedMoney = (this.items[index].addSpeedMoney*1.4).toFixed(2);
                    }else{
                        this.$Message.info('穷逼滚蛋！');
                    }
                }else{
                    this.$Message.info('速度0.5还不够？要不要这么贪！！');
                }
            }
        },
        _isUnlock(index, item){
            var a = false;
            if(this.items[index].isUnlock){
                if(item === 'profit'){
                    return
                }else{
                    this.$Message.info('请先解锁该植物！');
                }

            }else{
                a = true;
            }
            return a;
        },
        enterShowProfit (index){
            if(this._isUnlock(index, 'profit')){
                this.items[index].showProfit = !this.items[index].showProfit;
            }
        },
        leaveShowPRofit (index){
            if(this._isUnlock(index, 'profit')){
                this.items[index].showProfit = !this.items[index].showProfit;
            }
        },
        enterShowSpeed (index){
            if(this._isUnlock(index, 'profit')){
                this.items[index].showSpeed = !this.items[index].showSpeed;
            }
        },
        leaveShowSpeed (index){
            if(this._isUnlock(index, 'profit')){
                this.items[index].showSpeed = !this.items[index].showSpeed;
            }
        },
        showUnlock (){
            this.$root.eventHub.$emit('HIDE_UNLOCK');
        }

    }

}
/* eslint-disable */
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.unlock-plant{
    top: 0; left: 0;
    width: 100%; height: 100%;
    background-color:rgba(0,0,0,0.5);
    position: absolute;z-index: 10;
    overflow:auto;

    .icon-close{
        position:fixed;
        top:10%;right:20%;
        border-radius:25px;
        background-color:white;
        cursor:pointer;
    }
    .content{
        position:absolute;
        width:700px;
        top:15%;right:27%;
        padding:0;
    }
    .item{
        width:48%;padding:10px;margin:1%;float:left;
        color:#fff;position:relative;
        background-color:rgba(0,0,0,0.5);display:block;
    }
    .image{
        width:70px;height:70px;padding:10px;position:relative;display:inline-block;float:left;
    }
    .plant{
        width:50px;height:50px;vertical-align:middle;
    }
    .lock{
        font-family: Ionicons;font-size:70px;opacity: .7;position:absolute;
        font-style:normal;display:inline-block;top:0;left:5px;line-height:1;
        cursor:pointer;
    }
    .lock:before{
        content:'\F200';
    }
    .info{
        display:inline-block;line-height:1.2;float:left;padding-left:10px;
    }
    .control{
        float:right;justify-content: space-around;
    }

    .btn-profit{
        color: #fff;
        background-color: #19be6b;
        border-color: #19be6b;
        opacity:0.9;
    }
    .btn-prosee{
      color: #fff;
      background-color: #2db7f5;
      border-color: #2db7f5;
      opacity:0.9;
      margin-top:10px;
    }
    .ivu-btn{
        width: 132px;
        margin-bottom: 0;
        font-weight: 400;
        text-align: center;
        cursor: pointer;
        line-height: 1.5;
        user-select: none;
        padding: 6px;
        font-size: 12px;
        border-radius: 4px;
        transition: color .2s linear,background-color .2s linear,border .2s linear;
        display:block;
    }
    .ivu-btn:hover{
      opacity:1;
    }
 }

</style>
