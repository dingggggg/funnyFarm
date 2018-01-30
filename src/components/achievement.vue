<template>
    <div class="achievement-box">
        <div class="achievement">
            <div class="title">
                成就列表
            </div>
            <div class="content">
                <div class="achievement-item" v-for="(item, index) in achievements">
                    <span class="image"><i class="icon ivu-icon ivu-icon-trophy"></i></span>
                    <span class="item-content">
                        <span class="item-name">{{item.name}}</span>
                        <span class="item-result">{{item.result}}</span>

                        <span class="item-content-text">{{item.content}}</span>

                        <Progress :percent="25" hide-info>
                            <span class="item-progress">{{item.progress}}</span>
                        </Progress>
                    </span>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
/* eslint-disable */
var data = {
    achievements:[{
        name:'原来小麦是这样种的',
        content:'种植一颗小麦',
        result:'小麦收益+10%',
        progress:0
    }]
}

export default {
    name:'achievement',
    data: function (){
        return data
    },
    methods: {

    }
}



/* eslint-disable */
</script>

<style scoped lang="scss">
.achievement-box {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.3);

    .achievement {
        width: 600px;
        position: absolute;
        top: calc(50% - 250px);
        left: calc(50% - 300px);
        border-radius: 10px;
        overflow: hidden;
        background: white;

        .title {
            background: rgb(51,178,255);
            height: 50px;
            font-size: 24px;
            color: white;
            line-height: 50px;
            padding-left: 20px;
        }
        .content{
            height: 450px;
            overflow: auto;

            .achievement-item {
                margin: 10px;
                border: 1px solid #ddd;
                border-radius: 3px;
                box-shadow: 0 0 0 2px #fff, 0 0 0 3px #ccc;

                .image {
                    font-size: 30px;
                    color: gold;
                    padding: 10px;
                    box-shadow: inset 0 0 5px orange;
                }
            }

        }
    }
}



</style>
