<template>
    <div id="farm">
        <div class="plantpot" v-for="t in message">
            <!-- {{t}} -->
        </div>
    </div>
</template>

<script>
/* eslint-disable */
var test = {
    message:[1,2,3,4,5,6,7]
}
export default {
    name: 'farm',
    data: function (){
        return test
    }
}
/* eslint-disable */
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
    }
</style>
