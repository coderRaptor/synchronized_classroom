<template>
    <div>
        <el-card class="box-card">
          <!-- 头部表单选择 -->
          <div slot="header">
              <el-form :inline="true" class="header-form">
                  <div class="l-form">
                      <el-form-item label="学校">
                          <el-select 
                          v-model="schoolSelectValue"
                          size="small" 
                          style="width: 200px;"
                          placeholder="请选择">
                              <el-option
                              v-for="item in schoolOptions"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                              </el-option>
                          </el-select>
                      </el-form-item>
                      <el-form-item label="教室">
                          <el-select 
                          v-model="classroomSelectValue" 
                          size="small"
                          style="width: 128px;"
                          placeholder="请选择">
                              <el-option
                              v-for="item in classroomOptions"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                              </el-option>
                          </el-select>
                      </el-form-item>
                      <el-form-item label="老师">
                          <el-select 
                          v-model="teacherSelectValue" 
                          size="small"
                          style="width: 128px;"
                          placeholder="请选择">
                              <el-option
                              v-for="item in teacherOptions"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                              </el-option>
                          </el-select>
                      </el-form-item>
                      <el-form-item>
                          <el-button type="primary" icon="el-icon-search" size="small">查询</el-button>
                      </el-form-item>
                  </div>
                  <div class="r-form">
                      <el-form-item>
                              <el-button type="primary" icon="el-icon-date" size="small" @click="holidayPlanDialogVisible = true">假期排课</el-button>
                      </el-form-item>
                      <el-form-item>
                              <el-button type="primary" icon="el-icon-document" size="small">导出</el-button>
                      </el-form-item>
                  </div>
              </el-form>
          </div>

          <!-- 课程表区域 -->
          <div class="class-table-header">
              <p>教学周: 2023年9月1日-2024年1月11日</p>
              <div class="header-center">
                  <el-button 
                      type="primary"
                      plain
                      size="mini"
                      icon="el-icon-arrow-left" 
                      circle>
                  </el-button>
                  <span>第2周</span>
                  <el-button
                      type="primary"
                      plain
                      size="mini" 
                      icon="el-icon-arrow-right" 
                      circle>
                  </el-button>
              </div>
              <el-button size="small" type="primary">回到当前周</el-button>
          </div>
          <el-table
              :data="schoolTimetable"
              border
              cell-class-name="table-cell-style-c"
              header-cell-class-name="table-header-c"
              @cell-mouse-enter="cellMouseEnter"
              @cell-mouse-leave="cellMouseLeave"
              style="width: 1081px; box-sizing: border-box;margin-left: 50%; transform: translateX(-50%);"
              >
              <el-table-column
              class-name="index-bold"
              type="index"
              :index="indexMethod"
              width="180">
              </el-table-column>
              <el-table-column
              v-for="(item, index) in Object.keys(schoolTimetable[0])" :key="index"
              width="180">
              <!-- 只要遍历的列数,列数由schoolTimetable其中一个元素对象的属性个数即可得到 -->
                  <template v-slot:header>
                      <div style="font-weight: bold;">星期{{ toWhichDay(item) }}</div>
                      <div style="font-size: 12px;">
                          2023年9月{{ index = ++index + 7 }}日
                          <el-tag
                          v-if="new Date().getDate() === index"
                          size="mini"
                          effect="dark"
                          >今天</el-tag>
                      </div>
                  </template>
                  <template slot-scope="scope" >
                      <el-popover v-if="scope.row[item].subject"
                          :visible-arrow="false"
                          popper-class="classcell-poper-box"
                          placement="right-end"
                          trigger="hover"
                          >
                          <!-- 课程弹出框 -->
                          <template>
                              <div class="class-popover flex-vertical-center">
                                  <!-- 关闭按钮 -->
                                  <i class="el-icon-close close-btn"></i>
                                  <!-- 标题 -->
                                  <div class="poper-title">英语 (李老师)</div>
                                  <!-- 内容 -->
                                  <div class="content-item">
                                      <label>主讲教室：</label>
                                      <p>珠海市第一中学 综合教室1</p>
                                  </div>
                                  <div class="content-item">
                                      <label>听课教室：</label>
                                      <div>
                                          <p>珠海市第一中学 综合教室1</p>
                                          <p>珠海市第一中学 综合教室2</p>
                                      </div>
                                  </div>
                                  <div class="content-item">
                                      <label>课程码：</label>
                                      <p>1301235486</p>
                                  </div>
                                  <div class="content-item">
                                      <label>课程码：</label>
                                      <img src="../../assets/class_code_img.png" alt="">
                                  </div>
                                  <div style="width:100%; border-bottom: 1px solid #fff;"></div>
                                  <!-- 删除按钮 -->
                                  <div class="delete-btn" @click="showDeleteMessageBox">
                                      <i class="el-icon-delete"></i>
                                  </div>
                              </div>
                          </template>
                          <template v-slot:reference>
                              <div>
                                  <span style="color: rgb(93, 108, 243); font-weight: bold;font-size: 16px;">{{ scope.row[item].subject }}</span>
                                  <span style="font-size: 12px; color: grey;"> | {{ scope.row[item].teacher }}</span>
                              </div>
                              <el-tag
                                  :type="lessonStatusCase(scope.row[item].lessonStatus)"
                                  effect="dark"
                                  size="mini"
                              >{{ scope.row[item].lessonStatus }}</el-tag>
                          </template>
                      </el-popover>
                      <div v-else v-show="false" class="add-lesson-btn">
                          <el-button
                              @click.native="addClassDialogVisible = true" 
                              size="mini"
                              icon="el-icon-plus" 
                              circle>
                          </el-button>
                      </div>
                  </template>
              </el-table-column>
          </el-table>
        </el-card>
        
        <!-- 假期排课对话框 -->
        <el-dialog 
        title="假期排课" 
        :visible.sync="holidayPlanDialogVisible" 
        width="40%"
        >
            <el-form 
            :model="holidayPlanForm"
            :rules="holidayPlanFormRules"
            ref="classFormRef"
            label-width="100px"
            >
                <el-form-item label="假期排课" required>
                    <el-date-picker
                        type="date"
                        placeholder="选择日期"
                        v-model="holidayPlanForm.startDate"
                    ></el-date-picker>
                    <span style="margin: 0 20px">-</span>
                    <el-date-picker
                        type="date"
                        placeholder="选择日期"
                        v-model="holidayPlanForm.endDate"
                    ></el-date-picker>
                </el-form-item>
                <el-alert title="假期排课不计入教学周开课统计" type="warning" show-icon>
                </el-alert>
            </el-form>
            <div slot="footer">
                <el-button @click="holidayPlanDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="holidayPlanDialogVisible = false">保 存</el-button>
            </div>
        </el-dialog>
        <!-- 新增课程信息 -->
        <el-dialog 
         title="新增课程"
         width="40%" 
         :visible.sync="addClassDialogVisible">
            <el-form
            ref="lessFormRef"
            label-width="100px" 
            :rules="lessonFormRules"
            :model="lessonForm">
                <div class="add-lesson-title">课程信息</div>
                <el-form-item label="课程名称" prop="lessonName" required>
                <el-input v-model="lessonForm.lessonName" style="width:470px"></el-input>
                </el-form-item>
                <div class="flex-center">
                    <el-form-item label="选择学校" required>
                        <el-select v-model="lessonForm.school" placeholder="请选择学校">
                            <el-option label="学校1" value="university1"></el-option>
                            <el-option label="学校2" value="university2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="主讲教室" required>
                        <el-select v-model="lessonForm.classroom" placeholder="请选择教室">
                            <el-option label="301" value="301"></el-option>
                            <el-option label="302" value="301"></el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <el-form-item label="上课时间" required>
                    <div>
                        <el-radio-group v-model="lessonForm.classPlan.type">
                            <el-radio :label="1">周期排课</el-radio>
                            <el-radio :label="2">临时排课</el-radio>
                        </el-radio-group>
                    </div>
                    <div style="margin-bottom: 20px;">
                        <el-date-picker 
                         type="date" 
                         placeholder="选择日期"
                         v-model="lessonForm.classPlan.startDate" 
                         ></el-date-picker>
    
                         <span
                          style="margin: 0 20px;"
                          v-if="lessonForm.classPlan.type === 1"
                         >-</span>
    
                         <el-date-picker
                         v-if="lessonForm.classPlan.type === 1" 
                         type="date" 
                         placeholder="选择日期" 
                         v-model="lessonForm.classPlan.endDate" 
                         ></el-date-picker>
                    </div>
                    <div style="margin-bottom: 20px;">
                        <el-time-picker 
                        placeholder="选择时间" 
                        v-model="lessonForm.classPlan.startTime" 
                        >
                        </el-time-picker>
                        <span style="margin: 0 20px;">-</span>
                        <el-time-picker 
                        placeholder="选择时间" 
                        v-model="lessonForm.classPlan.endTime" 
                        >
                        </el-time-picker>
                    </div>
                     <div
                     style="margin-bottom: 20px;"
                     v-for="(item, index) in lessonForm.classPlan.weekdays" 
                     :key="index"
                     >
                        <el-select 
                        v-model="lessonForm.classPlan.weekdays[index]"
                        placeholder="请选择周几">
                            <el-option
                            v-for="item in weekOptions" 
                            :key="item" 
                            :label="item" 
                            :value="item"></el-option>
                        </el-select>
                        <span style="margin: 0 20px;">-</span>
                        <el-select 
                        v-model="lessonForm.classPlan.nums[index]"
                        placeholder="请选择第几节课">
                            <el-option
                            v-for="item in lessonNumOptions" 
                            :key="item" 
                            :label="item" 
                            :value="item"></el-option>
                        </el-select>
                        <el-button
                        v-if="index === lessonForm.classPlan.nums.length - 1"
                        style="margin-left: 20px;"
                        type="primary"
                        icon="el-icon-plus"
                        circle
                        size="mini"
                        @click="addLessonWeek"
                        ></el-button>
                        <el-button
                        v-else
                        style="margin-left: 20px;"
                        type="danger"
                        icon="el-icon-minus"
                        circle
                        size="mini"
                        @click="deleteLessonWeek(index)"
                        ></el-button>
                     </div>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addClassDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addClassDialogVisible = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name:"ClassSchedule",
    data(){
        return {
            schoolTimetable:[
                {
                    Mon:{
                        subject:"",
                        teacher:"",
                        lessonStatus:""
                    },
                    Tue:{
                        subject:"英语",
                        teacher:"北老师",
                        lessonStatus:"开始上课"
                    },
                    Wed:{
                        subject:"",
                        teacher:"",
                        lessonStatus:""
                    },
                    Thu:{
                        subject:"",
                        teacher:"",
                        lessonStatus:""
                    },
                    Fri:{
                        subject:"",
                        teacher:"",
                        lessonStatus:""
                    },
                },
                {
                    Mon:{
                        subject:"数学",
                        teacher:"李老师",
                        lessonStatus:"未上课"
                    },
                    Tue:{
                        subject:"",
                        teacher:"",
                        lessonStatus:""
                    },
                    Wed:{
                        subject:"",
                        teacher:"",
                        lessonStatus:""
                    },
                    Thu:{
                        subject:"数学",
                        teacher:"李老师",
                        lessonStatus:"未上课"
                    },
                    Fri:{
                        subject:"",
                        teacher:"",
                        lessonStatus:""
                    },
                },
                {
                    Mon:{
                        subject:"数学",
                        teacher:"李老师",
                        lessonStatus:"已上课"
                    },
                    Tue:{
                        subject:"",
                        teacher:"",
                        lessonStatus:""
                    },
                    Wed:{
                        subject:"",
                        teacher:"",
                        lessonStatus:""
                    },
                    Thu:{
                        subject:"",
                        teacher:"",
                        lessonStatus:""
                    },
                    Fri:{
                        subject:"",
                        teacher:"",
                        lessonStatus:""
                    },
                },
                {
                    Mon:{
                        subject:"",
                        teacher:"",
                        lessonStatus:""
                    },
                    Tue:{
                        subject:"",
                        teacher:"",
                        lessonStatus:""
                    },
                    Wed:{
                        subject:"",
                        teacher:"",
                        lessonStatus:""
                    },
                    Thu:{
                        subject:"",
                        teacher:"",
                        lessonStatus:""
                    },
                    Fri:{
                        subject:"数学",
                        teacher:"李老师",
                        lessonStatus:"未上课"
                    },
                },
                {
                    Mon:{
                        subject:"",
                        teacher:"",
                        lessonStatus:""
                    },
                    Tue:{
                        subject:"",
                        teacher:"",
                        lessonStatus:""
                    },
                    Wed:{
                        subject:"",
                        teacher:"",
                        lessonStatus:""
                    },
                    Thu:{
                        subject:"",
                        teacher:"",
                        lessonStatus:""
                    },
                    Fri:{
                        subject:"",
                        teacher:"",
                        lessonStatus:""
                    },
                },
                {
                    Mon:{
                        subject:"",
                        teacher:"",
                        lessonStatus:""
                    },
                    Tue:{
                        subject:"",
                        teacher:"",
                        lessonStatus:""
                    },
                    Wed:{
                        subject:"",
                        teacher:"",
                        lessonStatus:""
                    },
                    Thu:{
                        subject:"",
                        teacher:"",
                        lessonStatus:""
                    },
                    Fri:{
                        subject:"",
                        teacher:"",
                        lessonStatus:""
                    },
                },
                {
                    Mon:{
                        subject:"",
                        teacher:"",
                        lessonStatus:""
                    },
                    Tue:{
                        subject:"",
                        teacher:"",
                        lessonStatus:""
                    },
                    Wed:{
                        subject:"",
                        teacher:"",
                        lessonStatus:""
                    },
                    Thu:{
                        subject:"",
                        teacher:"",
                        lessonStatus:""
                    },
                    Fri:{
                        subject:"",
                        teacher:"",
                        lessonStatus:""
                    },
                },
                {
                    Mon:{
                        subject:"",
                        teacher:"",
                        lessonStatus:""
                    },
                    Tue:{
                        subject:"",
                        teacher:"",
                        lessonStatus:""
                    },
                    Wed:{
                        subject:"",
                        teacher:"",
                        lessonStatus:""
                    },
                    Thu:{
                        subject:"",
                        teacher:"",
                        lessonStatus:""
                    },
                    Fri:{
                        subject:"",
                        teacher:"",
                        lessonStatus:""
                    },
                },
            ],
            schoolSelectValue:"",
            classroomSelectValue:"",
            teacherSelectValue:"",
            holidayPlanDialogVisible:false,
            holidayPlanForm:{
                startDate:'',
                endDate:''
            },
            holidayPlanFormRules:{},
            // 新增课程的课程信息相关
            addClassDialogVisible:false,
            lessonForm:{
                lessonName:"",
                school:"",
                classroom:"",
                classPlan:{
                    type:1,
                    startDate:"",
                    endDate:"",
                    startTime:"",
                    endTime:"",
                    weekdays:[''],
                    nums:[''],
                }
            },
            lessonFormRules:{},
            weekOptions:['周一','周二',"周三",'周四','周五','周六','周日'],
            lessonNumOptions:[1,2,3,4,5,6,7,8],
        }
    },
    methods:{
        indexMethod(index){
            return `第${index + 1}节`
        },
        lessonStatusCase(status){
            switch(status){
                case "未上课": 
                    return 'danger'
                case "已上课":
                    return 'info';
                case "开始上课":
                    return ''
            }
        },
        cellMouseEnter(row, column, cell, event){
            const btn = event.target.querySelector(".add-lesson-btn");
            btn && (btn.style.display = "block")
        },
        cellMouseLeave(row, column, cell, event){
            const btn = event.target.querySelector(".add-lesson-btn");
            btn && (btn.style.display = "none")
        },
        toWhichDay(itemName){
            switch(itemName){
                case "Mon":
                    return "一"
                case "Tue":
                    return "二"
                case "Wed":
                    return "三"
                case "Thu":
                    return "四"
                case "Fri":
                    return "五"
            }
        },
        // 显示删除课程消息框
        showDeleteMessageBox(){
            this.$confirm('删除本节课还是删除该学科的所有课程', '删除课程提示', {
                confirmButtonText: '删除本节课',
                cancelButtonText: '删除该学科所有课',
                type: 'warning'
            }).then(() => {
            this.$message({
                type: 'success',
                message: '删除成功!',
                duration: 1000
            });
            }).catch(() => {
                this.$confirm('删除该学科的所有课程', '删除课程提示', {
                confirmButtonText: '确认删除',
                cancelButtonText: '取消',
                confirmButtonClass:"danger-button",
                type: 'error'
            }).then(() => {
                this.$message({
                    type:'success',
                    message:'删除成功!',
                    duration: 1000
                })
            }).catch(()=>{
                this.$message({
                    type:'success',
                    message:'取消成功!',
                    duration: 1000
                })
            })    
            })  
        },
        addLessonWeek(){
            this.lessonForm.classPlan.weekdays.push('')
            this.lessonForm.classPlan.nums.push('')
        },
        deleteLessonWeek(index){
            this.lessonForm.classPlan.weekdays.splice(index,1)
            this.lessonForm.classPlan.nums.splice(index,1)
        },
        
    },
    computed: {
    ...mapState([
      "schoolOptions",
      "classroomOptions",
      "teacherOptions",
      "gradeOptions",
      "subjectOptions",
    ]),
  },
}
</script>

<style lang="less" scoped>
.el-form.header-form{
    display: flex;
    justify-content: space-between;
    .el-form-item{
        margin: 0;
        padding: 0;
        margin-left: 20px;
    }
}
::v-deep .el-card__header{
    padding-left: 0;
}

.class-table-header{
    position: relative;
    display: flex;
    align-items: center;
    margin-bottom: 30px;
    p{
        position: absolute;
        left: 0;
        top: 0;
        font-weight: bold;
        font-size: 15px;
    }
    .header-center{
        width: 190px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-left: 50%;
        transform: translateX(-50%);
        margin-right: -70px;
        span{
            font-weight: bold;
            font-size: 15px;
        }
    }
}

::v-deep .table-cell-style-c{
    text-align: center !important;
    height: 60px;
}
::v-deep .table-header-c{
    text-align: center !important;
    height: 60px;
}
::v-deep .index-bold{
    font-weight: bold;
}
::v-deep .el-table tbody tr:hover>td { 
    background-color: transparent !important;;
}

// 课表弹出框 start
.class-popover{
    color: #fff;
    .close-btn{
        position: absolute;
        right: 14px;
        top: 14px;
        font-size: 18px;
        cursor: pointer;
    }
    .poper-title{
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: normal;
        margin-top: 5px;
        margin-bottom: 25px;
    }
    .content-item{
        display: flex;
        width: 260px;
        margin-bottom: 15px;
        label{
            display: inline-block;
            width: 70px;
            text-align: end;
        }
    }
    .delete-btn{
        width: 100%;
        cursor: pointer;
        margin-top: 10px;
        i{
            float:right;
            font-size: 16px;
            margin-right: 8px;
        }
    }
}
// 课表弹出框 end


.add-lesson-title{
    font-size: 14px;
    font-weight: bold;
    color: #333;
    margin-bottom: 20px;
}

</style>