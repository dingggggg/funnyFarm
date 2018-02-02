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
                        <span v-show="!item.showProfit">+收益</span><span v-show="item.showProfit">需要</span>
                    </button>
                    <button type = 'button' class = ' btn-prosee ivu-btn' @click = "addSpeed($event,index)">+速度</button>
                </div>
                <!-- control end -->

            </div>
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */

var data = {
    items: [{
        name:'wheat',
        cost:0,
        profit:1,
        speed:1,
        unlock:0,
        isUnlock:false,
        showProfit:false,
        image:'../static/images/wheat.png',
        plantTimes:0
    },{
        name:'tomato',
        cost:1,
        profit:1,
        speed:2,
        unlock:1,
        isUnlock:true,
        showProfit:false,
        image:'../static/images/tomato.png',
        plantTimes:0
    },{
        name:'radish',
        cost:1,
        profit:1,
        speed:3,
        unlock:1,
        isUnlock:true,
        showProfit:false,
        image:'../static/images/radish.png',
        plantTimes:0
    },{
        name:'cabbage',
        cost:1,
        profit:1,
        speed:1,
        unlock:1,
        isUnlock:true,
        showProfit:false,
        image:'../static/images/cabbage.png',
        plantTimes:0
    },{
        name:'potato',
        cost:1,
        profit:1,
        speed:1,
        unlock:1,
        isUnlock:true,
        showProfit:false,
        image:'../static/images/potato.png',
        plantTimes:0
    },{
        name:'peas',
        cost:1,
        profit:1,
        speed:1,
        unlock:1,
        isUnlock:true,
        showProfit:false,
        image:'../static/images/peas.png',
        plantTimes:0
    },{
        name:'sugarCane',
        cost:100000,
        profit:1000000,
        speed:11,
        unlock:100000000,
        isUnlock:true,
        showProfit:false,
        image:'../static/images/sugarCane.png',
        plantTimes:0
    },{
        name: 'greenPepper',
        cost: 1000000,
        profit: 5000000,
        speed: 12,
        unlock: 999999999,
        isUnlock:true,
        showProfit:false,
        image:'../static/images/greenPepper.png',
        plantTimes:0
    }]
}

if(window.localStorage){
    var storage = window.localStorage;
    if(storage.farmData){
        var farmData = JSON.parse(storage.farmData);
        data = {
            farmData: farmData,
            items: farmData.unlockPlants
        }
    }
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
            console.log(_this.farmData);
            var target = event.target;
            if(_this.farmData.userInfo.money > _this.items[index].unlock){
                _this.items[index].isUnlock = false;
                _this.$root.eventHub.$emit('SAVE',_this.items);
            }else{
                this.$Message.info('穷逼滚蛋！');
            }
        },
        addProfit(event,index){
            if(this._isUnlock(index)){
                this.items[index].profit = (this.items[index].profit*1.01).toFixed(2);
                _this.$root.eventHub.$emit('SAVE');
            }
        },
        addSpeed(event,index){
            if(this._isUnlock(index)){
                this.items[index].speed = (this.items[index].speed-0.2).toFixed(2);
                _this.$root.eventHub.$emit('SAVE');
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
        top:15%;
        left:calc(50% - 350px);
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
        margin-bottom: 0;
        font-weight: 400;
        text-align: center;
        cursor: pointer;
        line-height: 1.5;
        user-select: none;
        padding: 6px 50px;
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
