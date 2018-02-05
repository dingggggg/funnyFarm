<template>
    <div >
        <div class = 'unlock-plant'>
            <canvas id = 'canvas' class = 'icon-close' v-on:click="showUnlock()"></canvas>
            <div class = 'content'>
            <div class = 'item' v-for = "(item, index) in $store.state.farmData.unlockPlants">
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

export default{
    name: 'UnlockPlant',
    data: function(){
        return  {};
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
            var target = event.target;
            if(_this.$store.state.farmData.userInfo.money > _this.$store.state.farmData.unlockPlants[index].unlock){
                _this.$store.state.farmData.unlockPlants[index].isUnlock = false;
                _this.$store.state.farmData.userInfo.money = _this.$store.state.farmData.userInfo.money-_this.$store.state.farmData.unlockPlants[index].unlock;

                if(_this.$store.getters.save){
                    _this.$Notice.success({
                        title: '保存成功!'
                    });
                }
            }else{
                this.$Message.info('穷逼滚蛋！');
            }
        },
        addProfit(event,index){
            if(this._isUnlock(index)){
                if(this.$store.state.farmData.unlockPlants[index].profit < this.$store.state.farmData.unlockPlants[index].cost * 4){
                    if(this.$store.state.farmData.userInfo.money >= this.$store.state.farmData.unlockPlants[index].addProfitMoney){
                        this.$store.state.farmData.unlockPlants[index].profit = Number((this.$store.state.farmData.unlockPlants[index].profit + (this.$store.state.farmData.unlockPlants[index].cost * 4) / 10).toFixed(2));
                        this.$store.state.farmData.userInfo.money = Number((this.$store.state.farmData.userInfo.money - this.$store.state.farmData.unlockPlants[index].addProfitMoney).toFixed(2));
                        this.$store.state.farmData.unlockPlants[index].addProfitMoney = Number((this.$store.state.farmData.unlockPlants[index].addProfitMoney * (index + 1)).toFixed(2));
                        var _this =this;
                        if(_this.$store.getters.save){
                            _this.$Notice.success({
                                title: '保存成功!'
                            });
                        }
                    }else{
                        this.$Message.error('穷逼滚蛋！');
                    }
                }else{
                    this.$Message.error('收益达到上限');
                }
            }
        },
        addSpeed(event,index){
            if(this._isUnlock(index)){
                if(this.$store.state.farmData.unlockPlants[index].speed > (index+1)/2){
                    if(this.$store.state.farmData.userInfo.money >= this.$store.state.farmData.unlockPlants[index].addSpeedMoney){
                        this.$store.state.farmData.unlockPlants[index].speed = Number((this.$store.state.farmData.unlockPlants[index].speed - (index + 1) / 20).toFixed(2));
                        this.$store.state.farmData.userInfo.money = Number((this.$store.state.farmData.userInfo.money - this.$store.state.farmData.unlockPlants[index].addSpeedMoney).toFixed(2));
                        this.$store.state.farmData.unlockPlants[index].addSpeedMoney = Number((this.$store.state.farmData.unlockPlants[index].addSpeedMoney * (index + 1)).toFixed(2));

                        var _this =this;
                        if(_this.$store.getters.save){
                            _this.$Notice.success({
                                title: '保存成功!'
                            });
                        }
                    }else{
                        this.$Message.error('穷逼滚蛋！');
                    }
                }else{
                    this.$Message.error('速度达到上限');
                }
            }
        },
        _isUnlock(index, item){
            var a = false;
            if(this.$store.state.farmData.unlockPlants[index].isUnlock){
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
                this.$store.state.farmData.unlockPlants[index].showProfit = !this.$store.state.farmData.unlockPlants[index].showProfit;
            }
        },
        leaveShowPRofit (index){
            if(this._isUnlock(index, 'profit')){
                this.$store.state.farmData.unlockPlants[index].showProfit = !this.$store.state.farmData.unlockPlants[index].showProfit;
            }
        },
        enterShowSpeed (index){
            if(this._isUnlock(index, 'profit')){
                this.$store.state.farmData.unlockPlants[index].showSpeed = !this.$store.state.farmData.unlockPlants[index].showSpeed;
            }
        },
        leaveShowSpeed (index){
            if(this._isUnlock(index, 'profit')){
                this.$store.state.farmData.unlockPlants[index].showSpeed = !this.$store.state.farmData.unlockPlants[index].showSpeed;
            }
        },
        showUnlock (){
            this.$store.state.unlock = false;
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
