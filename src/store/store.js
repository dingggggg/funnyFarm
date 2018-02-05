/* eslint-disable */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
var state = {
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
        unlockPlants:[{
            name:'wheat',
            cost:1,
            profit:2,
            addProfitMoney:1,
            speed:1,
            addSpeedMoney:1,
            unlock:0,
            isUnlock:false,
            showProfit:false,
            image:'../static/images/wheat.png',
            plantTimes:0
        },{
            name:'tomato',
            cost:10,
            profit:20,
            addProfitMoney:2,
            speed:2,
            addSpeedMoney:2,
            unlock:1000,
            isUnlock:true,
            showProfit:false,
            image:'../static/images/tomato.png',
            plantTimes:0
        },{
            name:'radish',
            cost:100,
            profit:200,
            speed:3,
            addProfitMoney:3,
            addSpeedMoney:3,
            unlock:10000,
            isUnlock:true,
            showProfit:false,
            image:'../static/images/radish.png',
            plantTimes:0
        },{
            name:'cabbage',
            cost:1000,
            profit:2000,
            speed:4,
            addProfitMoney:4,
            addSpeedMoney:4,
            unlock:100000,
            isUnlock:true,
            showProfit:false,
            image:'../static/images/cabbage.png',
            plantTimes:0
        },{
            name:'potato',
            cost:10000,
            profit:20000,
            speed:5,
            addProfitMoney:5,
            addSpeedMoney:5,
            unlock:1000000,
            isUnlock:true,
            showProfit:false,
            image:'../static/images/potato.png',
            plantTimes:0
        },{
            name:'peas',
            cost:100000,
            profit:200000,
            speed:6,
            addProfitMoney:6,
            addSpeedMoney:6,
            unlock:10000000,
            isUnlock:true,
            showProfit:false,
            image:'../static/images/peas.png',
            plantTimes:0
        },{
            name:'sugarCane',
            cost:1000000,
            profit:2000000,
            addProfitMoney:7,
            speed:7,
            addSpeedMoney:7,
            unlock:100000000,
            isUnlock:true,
            showProfit:false,
            image:'../static/images/sugarCane.png',
            plantTimes:0
        },{
            name: 'greenPepper',
            cost: 1000000,
            profit: 2000000,
            addProfitMoney:8,
            speed: 8,
            addSpeedMoney:8,
            unlock: 1000000000,
            isUnlock:true,
            showProfit:false,
            image:'../static/images/greenPepper.png',
            plantTimes:0
        }],
        currentPlant:{
            name:'wheat',
            cost:0,
            profit:1,
            addProfitMoney:1,
            speed:1,
            addSpeedMoney:1,
            unlock:0,
            isUnlock:false,
            showProfit:false,
            image:'../static/images/wheat.png',
            plantTimes:0
        }
    },
    isClose:false
}

var getters = {
    save (state){
        if(window.localStorage){
            window.localStorage.setItem('farmData',JSON.stringify(state.farmData));
            return true
        }
    }
}

if(window.localStorage){
    var storage = window.localStorage;
    if(storage.farmData){
        var farmData = JSON.parse(storage.farmData);
        if(farmData){
            state.farmData = farmData;
            state.plants = JSON.parse(JSON.stringify(farmData.plants))
        }
    }
}

export const store = new Vuex.Store({
    state,
    getters
})
/* eslint-disable */
