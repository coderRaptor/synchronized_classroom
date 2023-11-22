<template>
    <div>
        <el-card class="box-card">
            <div slot="header">
                <el-form :inline="true">
                    <div class="g-tool-form">
                        <el-form-item label="学校">
                            <el-select v-model="schoolSelectValue" placeholder="请选择">
                                <el-option
                                v-for="item in schoolOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="老师">
                            <el-select v-model="teacherSelectValue" placeholder="请选择">
                                <el-option
                                v-for="item in teacherOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="学期">
                            <el-date-picker
                                v-model="dateRangeValue"
                                type="daterange"
                                range-separator="-"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                                </el-date-picker>
                        </el-form-item>
                        <el-form-item label="月份">
                            <el-date-picker
                                v-model="dateValue"
                                type="month"
                                placeholder="选择月份">
                                </el-date-picker>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" icon="el-icon-search" size="small">查询</el-button>
                        </el-form-item>
                        <el-form-item style="margin-left: 40px;">
                            <el-button type="primary" icon="el-icon-document" size="small">导出</el-button>
                        </el-form-item>
                    </div>
                </el-form>
            </div>

            <div class="summary-box">
                <div class="summary-item" v-for="(item, index) of summaryList" :key="index">
                    <img :src="item.imgPath" alt="">
                    <div class="right">
                        <div>
                            <span style="font-weight: 400; font-size: 30px;">{{ item.countNum }}</span>
                            <span style="margin-left: 10px;">/{{ item.unit }}</span>
                        </div>
                        <div class="bottom">{{ item.type }}</div>
                    </div>
                </div>
            </div>

            <el-table
                :data="tableData"
                stripe
                header-cell-class-name="table-header"
                cell-class-name="table-cell-style"
                style="width: 100%">
                    <el-table-column
                        type="index"
                        label="序号"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="teacherName"
                        label="老师"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="subject"
                        label="学科">
                    </el-table-column>
                    <el-table-column
                        prop="speakNum"
                        label="主讲/次">
                    </el-table-column>
                    <el-table-column
                        prop="video"
                        label="录课/次">
                    </el-table-column>
                    <el-table-column
                        label="操作">
                            <template>
                                <div @click="dialogVisible = true" style="cursor: pointer;">
                                    <i class="el-icon-document-add"></i>
                                    查看详情
                                </div>
                            </template>
                    </el-table-column>
            </el-table>
        
            <el-pagination
                :current-page="1"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="400">
            </el-pagination>
        </el-card>

        <el-dialog title="查看详情" :visible.sync="dialogVisible" width="50%">
            <el-form :inline="true" label-width="50px">
                    <div class="g-tool-form">
                        <el-form-item label="状态" style="margin-left: -10px;">
                            <el-select 
                            v-model="statusSelectValue" 
                            size="small"
                            placeholder="请选择">
                                <el-option
                                v-for="item in statusOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="操作时间" label-width="70px">
                            <el-date-picker
                                v-model="dateValue"
                                type="month"
                                placeholder="选择月份">
                                </el-date-picker>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" icon="el-icon-search" size="small">查询</el-button>
                        </el-form-item>
                        <el-form-item style="margin-left: 10px;">
                            <el-button type="primary" icon="el-icon-document" size="small">导出</el-button>
                        </el-form-item>
                    </div>
                </el-form>
                <el-table
                :data="dialogTableData"
                stripe
                header-cell-class-name="table-header"
                cell-class-name="table-cell-style"
                style="width: 100%;">
                    <el-table-column
                        type="index"
                        label="序号"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="teacherName"
                        label="老师"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="subject"
                        label="学科">
                    </el-table-column>
                    <el-table-column
                        prop="status"
                        label="状态">
                        <template slot-scope="scope">
                            <div class="tag-box">
                                <el-tag 
                                size="medium"
                                v-for="(item, index) in scope.row.status" 
                                :key="index"
                                :type="item === '录制' ? 'warning' : ''"
                                effect="light"
                                >{{ item }}</el-tag>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="date"
                        label="操作时间">
                    </el-table-column>
                    <el-table-column
                        prop="duration"
                        label="操作时长(主讲/录制)">
                    </el-table-column>
            </el-table>
            <div class="dialog_bottom_btn">
                <el-button size="medium" @click="dialogVisible = false">取 消</el-button>
                <el-button size="medium" @click="dialogVisible = false" type="primary">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'ClassStatistic',
    data(){
        return {
            summaryList:[
                {
                    imgPath: require("../../assets/class/t.png"),
                    countNum:25,
                    unit:"人",
                    type:"老师"
                },
                {
                    imgPath: require("../../assets/class/zhujiang.png"),
                    countNum:36,
                    unit:"次",
                    type:"主讲"
                },
                {
                    imgPath: require("../../assets/class/tingke.png"),
                    countNum:62,
                    unit:"次",
                    type:"听课"
                },
                {
                    imgPath: require("../../assets/class/luke.png"),
                    countNum:62,
                    unit:"次",
                    type:"录课"
                },
            ],
            tableData:[
                {
                    teacherName:"李丹",
                    subject:"语文",
                    speakNum:4,
                    video:3
                },
                {
                    teacherName:"李丹",
                    subject:"语文",
                    speakNum:4,
                    video:3
                },
                {
                    teacherName:"李丹",
                    subject:"语文",
                    speakNum:4,
                    video:3
                },
                {
                    teacherName:"李丹",
                    subject:"语文",
                    speakNum:4,
                    video:3
                },
                {
                    teacherName:"李丹",
                    subject:"语文",
                    speakNum:4,
                    video:3
                },
                {
                    teacherName:"李丹",
                    subject:"语文",
                    speakNum:4,
                    video:3
                },
                {
                    teacherName:"李丹",
                    subject:"语文",
                    speakNum:4,
                    video:3
                },
                {
                    teacherName:"李丹",
                    subject:"语文",
                    speakNum:4,
                    video:3
                },
                {
                    teacherName:"李丹",
                    subject:"语文",
                    speakNum:4,
                    video:3
                },
                {
                    teacherName:"李丹",
                    subject:"语文",
                    speakNum:4,
                    video:3
                },
                {
                    teacherName:"李丹",
                    subject:"语文",
                    speakNum:4,
                    video:3
                },
            ],
            dialogVisible:false,
            schoolSelectValue:"",
            statusOptions:[
                {value:'全部', label:'全部'}
            ],
            statusSelectValue:"",
            teacherSelectValue:"",
            dateRangeValue:[],
            dateValue:"",
            operationTime:"",
            dialogTableData:[
                {
                    teacherName: "李丹",
                    subject: "语文",
                    status: ["主讲"],
                    date: "2020-11-22",
                    duration: "42分钟",
                },
                {
                    teacherName: "李丹",
                    subject: "语文",
                    status: ["主讲", "录制"],
                    date: "2020-11-22",
                    duration: "42分钟",
                },
            ]
        }
    },
    computed:{
        ...mapState('lessonInfo',[
            "schoolOptions",
            "teacherOptions"
        ])
    }
}
</script>

<style lang="less" scoped>

.g-tool-form{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .el-form{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .el-form-item{
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 15px;
        ::v-deep .el-input__inner{
            width: 200px;
            height: 30px;
        }
        ::v-deep .el-form-item__content{
            display: flex;
            align-items: center;
        }
        ::v-deep .el-input__icon{
            display: flex;
            align-items: center;
        }
        ::v-deep .el-range-separator{
            display: flex;
            align-items: center;
        }
        
    }

}
::v-deep .el-card__header{
    padding-left: 0;
}
::v-deep .el-form-item__label{
    width: fit-content;
}
.summary-box{
    display: flex;
    justify-content: space-around;
    align-items: center;
    .summary-item{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .right{
            margin-left: 14px;
        }
    }
    margin-bottom: 30px;
}

.el-card{
    // margin: 10px 20px 20px 20px;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);

    .el-pagination{
        margin-top: 55px;
        margin-left: 50%;
        transform: translateX(-50%);
    }
   
}

// 会话窗 start
.el-dialog .tag-box{
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.dialog_bottom_btn{
    padding-right: 35px;
    height: 80px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

// 会话窗 end
</style>