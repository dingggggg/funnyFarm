<template>
    <div id ='haha' style = 'background-color:#b3e8b3;width:100%;height:100%;position:absolute;z-index:-3;overflow:hidden;'>
        <div class = 'bg-summer' :class = "{showSun:isShow}">
            <div class = 'circle'></div>
            <div class = 'circle-1'></div>
            <div class = 'sun-ring'>
                <div class = 'ring1 active'></div>
                <div class = 'ring2 active'></div>
                <div class = 'ring3 active'></div>
            </div>
        </div>
        <button @click = 'changeIsShow()' >taiyang</button>
        <div class="rain" :class="{rain1:r.isRain}" :style="{left: r.left+'%'}" v-for = "r in rainLine"></div>
    </div>
</template>

<script>
/* eslint-disable */
import Vue from 'vue'

var data = {
    isShow: false,
    rainLine: [{
        left:  Math.random() * 100,
        isRain: false
    }]
}
export default{
    name:'bgBody',
    data: function(){
        return data
    },
    mounted(){
        var i = 0;
        var j = 0;
        var _this = this;
        var timer = setInterval(function(){
            _this.rainLine[i].isRain = true;
            i = i + 1;
            if(i === 19){
                _this.rainLine.splice(j,1);
                i = 18;
                console.log(i);
            };
            _this.rainLine.push({
                left: Math.random() * 100
            });
        },50);
    },
    mounted(){
        var _this = this;

        var timer = setInterval(function (){
            // if(_this.rains.length > 0){
                // _this.rains.forEach(function (r, i){
                    var ele = document.createElement('span');
                    document.body.appendChild(ele);
                    ele.classList.add("rain");
                    ele.style.position = 'absolute';
                    ele.style.left = Math.random()* 1300 + 'px';
                    ele.style.top = 0;
                    ele.style.border = '2px solid red';
                    ele.style.height = Math.random()*30 + 20 + 'px';
                    ele.style.transition = 'top 1.5s linear';
                    // ele.style.transitionDelay = '0.5s';

                    setTimeout(function (){
                        ele.style.top = 'calc(100% - 100px)';
                    },50)
                    setTimeout(function (){
                        document.body.removeChild(ele);
                    },1500)
                // })
            // }
        },50)
    },
    methods:{
        changeIsShow(){
            if(this.isShow === true){
                this.isShow = false;
            }else{
                this.isShow = true;
            }
            if(this.isRain === true){
                this.isRain = false;
            }else{
                this.isRain = true;
            }
        }
    }
}
/* eslint-disable */
</script>


<style scoped lang="scss">
.bg-summer{
    width:300px;
    height:300px;
    opacity: 1;
    position:absolute;
    top: -100px; right: -100px;
    transition: transform 5s;

    .circle{
        background-color: #fff transparent;
        z-index: 1;
        position: absolute;
        width:100%;
        height:300px;
        box-shadow: 0 0 80px 20px #fff;
        border-radius:50%;
    }
    .circle1{
        background-color: transparent;
        z-index: 1;
        position: absolute;
        width:100%;
        height:300px;
        box-shadow: 0 0 80px 20px #fff;
        border-radius:50%;
    }
    .sun-ring{
        width: 100%;
        height: 300px;
        z-index: -1;
        position: absolute;
        animation: sun 30s infinite linear;

    }
        .ring1,.ring2,.ring3{
            top: 0;
            left: 0;
            width: 100%;
            height: 300px;
            filter: blur(5px);
            background-color: gold;
            position: absolute;
            border-radius:10%;

            // &.active{
            //     background-color: gold;
            // }
        }

        .ring2{
            transform: rotate(30deg);
            // top: 0;
            // left: 0;
            // width: 100%;
            // height: 100%;
            // filter: blur(5px);
            // background-color: gold;
            // position: absolute;
        }
        .ring3{
            transform: rotate(60deg);
            // top: 0;
            // left: 0;
            // width: 100%;
            // height: 100%;
            // filter: blur(5px);
            // background-color: gold;
            // position: absolute;
        }
}
.showSun{
    transform: translate(100%,-100%);
}
@keyframes sun {
    100%{transform: rotate(360deg);}
}
.rain {
    width: 2px;
    height:40px;
    background-color: #fff;
    position: absolute;
    top: 0;
    left: 10px;
    transition: top 1s linear;
}
.rain1{
    top:100%;
}
.leaf{
    top: 100px;
    left: 200px;
    width: 100px;
    height: 50px;
    border-radius: 95% 5% 100% 0;
    background-color: orange;
    position: fixed;
    -webkit-animation: leaves1 10s infinite ease-in-out;
    animation: leaves1 10s infinite ease-in-out;
}

</style>
