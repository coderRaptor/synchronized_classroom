<template>
    <el-container class="body-container">
        <el-aside width="174px">
            <img src="../assets/logo.png" alt="" width="174px">
            <el-menu 
                :default-active="activePath" 
                background-color="transparent" 
                text-color="#dfdede"
                active-text-color="#01d4f9" 
                router
                >
                <div v-for="(item, index) of navMenuList" :key="index">
                    <el-submenu v-if="item.children" index="1">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span>{{item.title}}</span>
                        </template>
                        <el-menu-item 
                        v-for="(item1, index1) of item.children"
                        :key="index1"
                        :index="item1.path"
                        @click="saveNavStatus(item1.path, item1.title)"
                        >
                            <span slot="title">{{ item1.title }}</span>
                        </el-menu-item>
                    </el-submenu>
                    <el-menu-item 
                    v-else
                    :index="item.path"
                    @click="saveNavStatus(item.path, item.title)"
                    >
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </div>
            </el-menu>
        </el-aside>
        <el-main>
            <!-- 顶部标题 -->
            <div class="title-wrapper">
                <div class="title-main">
                    <p class="title-text">天弘同步课堂系统建设平台</p>
                    <img class="title-img" src="../assets/tbbg.png" alt="">
                </div>
                <div class="title-user">
                    超级管理员
                    <i class="el-icon-caret-bottom"></i>
                </div>
            </div>

            <!-- 数值展示 -->
            <div class="count-wrapper">
                <div class="count-box">
                    <span>用户总数</span>
                    <span>25693</span>
                </div>
                <div class="count-box">
                    <span>入驻学校数</span>
                    <span>624</span>
                </div>
            </div>

            <!-- 图表 -->
            <div class="main-box">
                <!-- 左侧图表 -->
                <div class="main-left">
                    <!-- 上方图表 -->
                    <div class="lt">
                        <div class="lt-title">
                            <img src="../assets/1.png" alt="">
                            <span style="
                                color:#fff;
                                font-size: 18px;
                                margin-left: 33px;
                                ">学校开课次数统计</span>
                            <span
                              class="date-label"
                              style="margin-left: 70px; margin-right: 12px;"
                            >学期</span>
                            <el-date-picker
                                class="date-picker"
                                type="daterange"
                                size="small"
                                range-separator="-"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                style="width: 200px;"
                                >
                            </el-date-picker>
                            <span
                                class="date-label"
                                style="margin-left: 30px; margin-right: 12px;"
                            >月份</span>
                            <el-date-picker
                                class="date-picker"
                                type="month"
                                size="small"
                                style="width: 128px;"
                                placeholder="选择月份">
                            </el-date-picker>
                        </div>
                        <div id="lt-chart" class="lt-main"></div>
                    </div>
                    <!-- 下方图表 -->
                    <div class="lt lb">
                        <div class="lt-title">
                            <img src="../assets/1.png" alt="">
                            <span style="
                                color:#fff;
                                font-size: 18px;
                                margin-left: 33px;
                                ">科目开课次数统计</span>
                            <span
                              class="date-label"
                              style="margin-left: 70px; margin-right: 12px;"
                            >学期</span>
                            <el-date-picker
                                class="date-picker"
                                v-model="dateRangeValue"
                                type="daterange"
                                size="small"
                                range-separator="-"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                style="width: 200px;"
                                >
                            </el-date-picker>
                            <span
                                class="date-label"
                                style="margin-left: 30px; margin-right: 12px;"
                            >月份</span>
                            <el-date-picker
                                class="date-picker"
                                v-model="dateValue"
                                type="month"
                                size="small"
                                style="width: 128px;"
                                placeholder="选择月份">
                            </el-date-picker>
                        </div>
                        <div id="lb-chart" class="lt-main"></div>
                    </div>
                </div>
                <!-- 右侧排名列表 -->
                <div class="main-right">
                    <div class="rl">
                        <div class="rl-title">
                            <img src="../assets/1.png" alt="">
                            <span style="margin-left: 33px;">学校开课次数排行（本学期）</span>
                        </div>
                        <div class="rl-main">
                            <vuescroll :ops="ops">
                                <div v-for="(item, index) of schoolList" :key="index">
                                    <div :class="[
                                        'list-item',
                                        index === 0 ? 'list-item1' : '',
                                        index === 1 ? 'list-item2' : '',
                                        index === 2 ? 'list-item3' : '',
                                    ]">
                                        <img src="../assets/no1.png" alt="" v-if="index === 0">
                                        <img src="../assets/no2.png" alt="" v-else-if="index === 1">
                                        <img src="../assets/no3.png" alt="" v-else-if="index === 2">
                                        <p v-else class="num">{{ index }}</p>
                                        <p
                                          style="
                                          width: fit-content;margin-right: 50px;"
                                          class="school"
                                        >{{ item.name }}</p>
                                        <p style="width: fit-content;">52</p>
                                    </div>
                                </div>
                            </vuescroll>
                        </div>
                    </div>
                    <div class="rr">
                        <div class="rr-title">
                            <img src="../assets/2.png" alt="">
                            <span style="margin-left: 33px;">学校开课次数排行（本学期）</span>
                        </div>
                        <div class="rl-main">
                            <vuescroll :ops="ops">
                                <div v-for="(item, index) of teacherList" :key="index">
                                    <div :class="[
                                        'list-item',
                                        index === 0 ? 'list-item1' : '',
                                        index === 1 ? 'list-item2' : '',
                                        index === 2 ? 'list-item3' : '',
                                    ]">
                                        <img src="../assets/no1.png" alt="" v-if="index === 0">
                                        <img src="../assets/no2.png" alt="" v-else-if="index === 1">
                                        <img src="../assets/no3.png" alt="" v-else-if="index === 2">
                                        <p v-else class="num">{{ index }}</p>
                                        <p
                                          style="width: 268px;"
                                          class="school"
                                        >{{ item.name }}</p>
                                        <p>52</p>
                                    </div>
                                </div>
                            </vuescroll>
                        </div>
                    </div>
                </div>
            </div>


        </el-main>
    </el-container>
</template>

<script>
import vuescroll from 'vuescroll/dist/vuescroll-native'
import echarts from 'echarts'
import { navMenuList } from './common.js'
export default {
    name: 'Index',
    components:{ 
        vuescroll,
     },
    data(){
        return {
            navMenuList,
            activePath:'/index',
            dateRangeValue:"",
            dateValue:"",
            ops:{
                bar:{
                    background:"#0c4787",
                    size: "8px",
                }
            },
            schoolList:[
                {
                    name:'珠海市第一中学',
                    count: 54,
                },
                {
                    name:'珠海市第一中学',
                    count: 55,
                },
                {
                    name:'珠海市第一中学',
                    count: 44,
                },
                {
                    name:'珠海市第一中学',
                    count: 55,
                },
                {
                    name:'珠海市第一中学',
                    count: 66,
                },
                {
                    name:'珠海市第一中学',
                    count: 54,
                },
                {
                    name:'珠海市第一中学',
                    count: 54,
                },
                {
                    name:'珠海市第一中学',
                    count: 54,
                },
                {
                    name:'珠海市第一中学',
                    count: 54,
                },
                {
                    name:'珠海市第一中学',
                    count: 54,
                },
            ],
            teacherList:[
                {name: "陈远-珠海市第一二零中学", count: 54},
                {name: "陈远-珠海市第一二零中学", count: 53},
                {name: "陈远-珠海市第一二零中学", count: 51},
                {name: "陈远-珠海市第一二零中学", count: 51},
                {name: "陈远-珠海市第一二零中学", count: 51},
                {name: "陈远-珠海市第一二零中学", count: 51},
                {name: "陈远-珠海市第一二零中学", count: 51},
                {name: "陈远-珠海市第一二零中学", count: 51},
                {name: "陈远-珠海市第一二零中学", count: 51},
                {name: "陈远-珠海市第一二零中学", count: 51},
                {name: "陈远-珠海市第一二零中学", count: 51},
                {name: "陈远-珠海市第一二零中学", count: 51},
                {name: "陈远-珠海市第一二零中学", count: 51},
                {name: "陈远-珠海市第一二零中学", count: 51},
                {name: "陈远-珠海市第一二零中学", count: 51},
                {name: "陈远-珠海市第一二零中学", count: 51},
                {name: "陈远-珠海市第一二零中学", count: 51},
                {name: "陈远-珠海市第一二零中学", count: 51},
                {name: "陈远-珠海市第一二零中学", count: 51},
                {name: "陈远-珠海市第一二零中学", count: 51},
                {name: "陈远-珠海市第一二零中学", count: 51},
                {name: "陈远-珠海市第一二零中学", count: 51},
                {name: "陈远-珠海市第一二零中学", count: 51},
                {name: "陈远-珠海市第一二零中学", count: 51},
                {name: "陈远-珠海市第一二零中学", count: 51},
                {name: "陈远-珠海市第一二零中学", count: 51},
                {name: "陈远-珠海市第一二零中学", count: 51},
                {name: "陈远-珠海市第一二零中学", count: 51},
                {name: "陈远-珠海市第一二零中学", count: 51},
                {name: "陈远-珠海市第一二零中学", count: 51},
            ],
            echartsOps:{
                xAxis:{
                    type:'category',
                    data:["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                    axisLabel:{
                        textStyle: {
                            color: '#DFDEDE',
                        },
                    },
                },
                yAxis:{
                    type:"value",
                    axisLabel:{
                        textStyle:{
                            color:"#DFDEDE"
                        },
                    },
                },
                series: [
                    {
                        data: [120, 200, 150, 80, 70, 110, 130],
                        type: "bar",
                        showBackground: true,
                        // backgroundStyle: {
                        //   color: "rgba(220, 220, 220, 0.8)",
                        // },
                        itemStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: "#4CC875" },
                            { offset: 0.5, color: "#188df0" },
                            { offset: 1, color: "#188df0" },
                        ]),
                        },
                    },
                ],
            }
        }
    },
    methods:{
        //保存链接的激活状态
        saveNavStatus(activePath, activeMenuTitle){
            const activeMenu = {}
            activeMenu.path = activePath
            activeMenu.title = activeMenuTitle
            window.sessionStorage.setItem('activeMenu', JSON.stringify(activeMenu))
        }
    },
    mounted(){
        const myChart1 = echarts.init(document.getElementById('lt-chart'))
        const myChart2 = echarts.init(document.getElementById('lb-chart'))
        myChart1.setOption(this.echartsOps)
        myChart2.setOption(this.echartsOps)
    }
}
</script>

<style lang="less" scoped>
@import url('./common.less');
.body-container {
    height: 100%;
    background: url('../assets/bg.png');
    background-size: 100% 100%;
}

.el-main {
    // position: relative;
    padding: 0;
}

// 头部标题 start

.title-wrapper{
    position: relative;
}
.title-main {
    position: relative;
    width: 1362px;

    .title-img{
        position: absolute;
        top: 0;
        width: 100%;
    }

    .title-text{
        height: 29px;
        line-height: 29px;
        padding-top: 22px;
        text-align: center;
        color: #01d4f9;
        font-size: 30px;
        font-weight: 400;
        letter-spacing: 5px;
    }

}

.title-user {
        position: absolute;
        right: 10px;
        top: 15px;
        // 脱离文档流,宽度高度无法继承,默认自适应撑开,这里不用写宽高属性
        // width: fit-content;
        // height: 12px;
        line-height: 12px;
        color: #01d4f9;
        font-size: 14px;
    }

// 头部标题 end

// 数值展示 start
.count-wrapper {
    display: flex;
    justify-content: space-around;

    .count-box {  
        display: flex;
        align-content: center;
        justify-content: center;
        width: 316px;
        height: 72px;
        margin-top: 65px;
        background: url('../assets/main_middle.png');

        &:first-child{
            margin-left: 220px;
        }
        &:last-child{
            margin-right: 220px;
        }
        span {
            line-height: 72px;
            &:first-child{
                color: #01d4f9;
                font-weight: 400;
                margin-right: 20px;
            }
            &:last-child {
                font-size: 36px;
                font-weight: 400;
                color: #01d4f9;
            }
        }
    }
}

// 数值展示 end


// 图表 start
.main-box {
    margin: 31px 0 41px 10px;
    // padding-left: 300px;
    display: flex;
    justify-content: space-around;

    .lt {
        width: 700px;
        height: 450px;
        background: linear-gradient(
            135deg, 
            transparent, 
            rgba(1, 168, 255, 0.2)) 
            0;

        .lt-title {
            position: relative;
            height: 80px;
            // background-color: rgba(0, 168, 255, 0.2);
            background-size: 100% 100%;
            background-repeat: no-repeat;
            display: flex;
            align-items: center;
            img{
                position: absolute;
                left: -3px;
                top: -1px;
                
            }
            &::before{
                position: absolute;
                // left: -3px;
                top: 1px;
                content: "";
                // width: 0;
                // height: 0;
                // border-top: 50px solid red;
                // border-right: 50px solid transparent;
                
                width: 650px;
                border-bottom: 50px solid rgba(0, 168, 255, 0.2);
                border-left: 50px solid transparent;
            }
            &::after{
                content:"";
                position:absolute;
                top: 50.5px;
                width:700px;
                height:30px;
                background-color: rgba(0, 168, 255, 0.2);
            }

            .date-label {
                font-size: 14px;
                color: #dfdede;
            }
            .date-picker{
                &:hover{
                    border: 1px solid #bdcbd3;
                }
                background-color: rgba(12, 71, 135, 0.8);
                border: 1px solid #0084c8;
                border-radius: 0;
                outline: 0;
                ::v-deep .el-range-input{
                    background-color: rgba(12, 71, 135, 0.8);
                    color: #dfdede;
                }
                ::v-deep .el-range-separator{
                    color: #dfdede;
                }
                ::v-deep .el-input__inner{
                    background: transparent;
                    border: none;
                }
            }
        }

        .lt-main {
            width:734px;
            height: 361px;
            margin: 0 auto;
            // background: rgba(1,28,47,0.4);
        }
    }
    .lb {
        margin-top: 25px;
    }
}

// 右侧列表 start
.main-right {
    // width: 500px;
    display: flex;
    justify-content: space-around;
    // background-color: orange;
    .rl {
    //    float: left;
       width: 300px;
       height: 925px;
       background: linear-gradient(
           135deg,
           transparent 35px,
           rgba(0, 168, 255, 0.2) 0
       );
       margin-left: 14px;
    }
    .rl-main{
        width: 293px;
        height: 837px;
        margin: 0 auto;
        background: rgba(1, 28, 47, 0.4);
    }

    .rl-title{
        position:relative;
        height: 80px;
        display: flex;
        align-items: center;
        font-size: 18px;
        img{
            position: absolute;
            left: -2px;
            top: -1px;
        }
        span{
            font-size: 18px;
            color: #dfdede;
        }

    }

    .list-item{
        display: flex;
        align-items: center;
        height: 50px;
        color: #dfdede;
        font-size: 16px;

        img{
            margin-left: 18px;
            margin-right: 23px;
        }

        p.num{
            width: 36px;
            height: 36px;
            line-height: 30px;
            text-align: center;
            margin-left: 18px;
            margin-right: 23px;
        }
    }
    .list-item1{
        background-color: rgba(249, 79, 70, 0.1);
        color:#f94f46;
    }
    .list-item2{
        background-color: rgba(53, 171, 249, 0.1);
        color: #35abf9;
    }
    .list-item3{
        background-color: rgba(76, 200, 117, 0.1);
        color: #4cc875;
    }
    .rr{
        width: 300px;
        height: 925px;
        background: linear-gradient(
            225deg,
            transparent 0 35px,
            rgba(0, 168, 255, 0.2) 0 100%
        );
        margin-left: 14px;
    }
    .rr-title{
        position:relative;
        height: 80px;
        display: flex;
        align-items: center;
        font-size: 18px;
        img{
            position: absolute;
            right: -2px;
            top: -1px;
        }
        span{
            font-size: 18px;
            color: #dfdede;
        }

    }
}

// 图表 end
</style>