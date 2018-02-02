<template>
    <div style = 'width:100%;height:100%;position:absolute;'>
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
    </div>
</template>

<script>
/* eslint-disable */
export default{
    name:'bgBody',
    data: function(){
        return {
            isShow: false
        }
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
            this.isShow = true;
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

</style>
