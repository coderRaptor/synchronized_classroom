<template>
    <div>
      <el-card class="box-card">
          <div slot="header">
              <el-form :inline="true">
                  <div class="g-tool-form">
                      <div class="g-tool-form-left">
                          <el-form-item label="学校">
                              <el-select v-model="schoolSelectValue" size="small" placeholder="请选择">
                                  <el-option
                                  v-for="item in schoolOptions"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value">
                                  </el-option>
                              </el-select>
                          </el-form-item>
                          <el-form-item label="年级">
                              <el-select v-model="gradeSelectValue" size="small" placeholder="请选择" style="width: 150px;">
                                  <el-option
                                  v-for="item in gradeOptions"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value">
                                  </el-option>
                              </el-select>
                          </el-form-item>
                          <el-form-item label="学科">
                              <el-select v-model="subjectSelectValue" size="small" placeholder="请选择" style="width:150px">
                                  <el-option
                                  v-for="item in subjectOptions"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value">
                                  </el-option>
                              </el-select>
                          </el-form-item>
                          <el-form-item>
                              <el-button 
                              type="primary" 
                              icon="el-icon-search" 
                              size="small">查询</el-button>
                          </el-form-item>
                      </div>
                      
                      <div class="g-tool-form-right">
                        <el-form-item>
                            <i 
                             :class="[
                              'el-icon-menu',
                              'grid-btn',
                              {'grid-btn-active': gridActiveFlag}
                             ]"
                             @click="gridActiveFlag = true"
                            ></i>
                        </el-form-item>
                        <el-form-item>
                            <i 
                             :class="[
                              'el-icon-s-grid',
                              'grid-btn',
                              {'grid-btn-active': !gridActiveFlag}
                             ]"
                             @click="gridActiveFlag = false"
                            ></i>
                        </el-form-item>
                      </div>
                  </div>
              </el-form>
          </div>
         <!-- 直播大列表 -->
         <el-row :gutter="10" v-for="i in 2" :key="i+100" v-show="gridActiveFlag">
            <el-col :span="8" v-for="j in 3" :key="j+1000">
                <div class="big-grid-content" @click="gotoDetail">
                    <img src="../../assets/class_img.png" alt="">
                    <div class="desc-box">
                        珠海市第一中学-综合管理教室1
                        <span><i class="el-icon-user">美术-陈力</i></span>
                    </div>
                </div>
            </el-col>
         </el-row>
      
         <!-- 直播小列表 -->
         <el-row :gutter="10" v-for="i in 2" :key="i+200" v-show="!gridActiveFlag">
            <el-col :span="4" v-for="j in 6" :key="j+2000">
                <div class="small-grid-content" @click="gotoDetail">
                    <img src="../../assets/class_img.png" alt="">
                    <div class="m-desc-box">
                        <p class="m-desc-title">综合管理教室1</p>
                        <div class="desc-content">
                            <span><i class="el-icon-user"> 美术-陈力</i></span>
                        </div>
                    </div>
                </div>
            </el-col>
         </el-row>

          <el-pagination
              :current-page="1"
              :page-size="10"
              layout="total, sizes, prev, pager, next, jumper"
              :total="400">
          </el-pagination>
      </el-card>
    </div>
  </template>
  
  <script>
  import { mapState } from 'vuex'
  export default {
      name:"LiveClassList",
      data(){
          return {
              gradeSelectValue:"",
              schoolSelectValue:"",
              subjectSelectValue:"",
              gridActiveFlag:true,// 用于切换视图模式
          }
      },
      computed:{
          ...mapState('lessonInfo',[
              "schoolOptions",
              "gradeOptions",
              "subjectOptions",
          ])
      },
      methods:{
        // 查看详情页
        gotoDetail(){
            this.$router.push({
                path:'/home/live-classes-detail'
            })
        }
      }

  }
  </script>
  
  <style lang="less" scoped>
  .el-card{
      // margin: 10px 20px 20px 20px;
      border-radius: 4px;
      box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  
      .el-pagination{
          margin-top: 55px;
          margin-left: 50%;
          transform: translateX(-50%);
      }
     .el-link:not(last-child){
      margin-right: 5px;
     }
  }
  
  .grid-btn{
    font-size: 24px;
    line-height: 40px;
    cursor: pointer;
  }

  .grid-btn-active{
    color: #0c84ff;
  }

  .el-row:not(last-child){
    margin-bottom: 12px;
  }

  .big-grid-content{
    position: relative;
    height: 320px;
    cursor: pointer;
    img{
        // object-fit: fill;
        width: 100%;
        height: 100%;
    }
    .desc-box{
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 10px;
        color: #fffefe;
        font-size: 13px;
        opacity: 0.6;
        border-radius: 15px;
        height: 30px;
        line-height: 30px;
        width: 325px;
        background-color: #012f4f;
        text-align: center;

        span{
            margin-left: 10px;
        }
    }
  }

  .small-grid-content{
    height: 270px;
    cursor: pointer;
    img{
        width: 100%;
        height: 185px;
        // object-fit: fill;//这是默认值,所以不用写
    }
    .m-desc-box{
        height: 85px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        background-color: #011c2f;
        color: #c1d9e9;
        padding: 0 10px;
        opacity: 0.9;
        margin-top: -4px;

        .m-desc-title{
            margin-bottom: 8px;
        }
    }
  }


  </style>