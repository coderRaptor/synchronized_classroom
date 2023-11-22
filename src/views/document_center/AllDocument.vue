<template>
  <div>
    <el-card class="box-card">
        <div slot="header">
            <el-form :inline="true">
                <div class="g-tool-form">
                    <div class="g-tool-form-left">
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
                            <el-select v-model="teacherSelectValue" placeholder="请选择" style="width: 150px;">
                                <el-option
                                v-for="item in teacherOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="年级">
                            <el-select v-model="gradeSelectValue" placeholder="请选择" style="width: 150px;">
                                <el-option
                                v-for="item in gradeOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="学科">
                            <el-select v-model="subjectSelectValue" placeholder="请选择" style="width:150px">
                                <el-option
                                v-for="item in subjectOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-input 
                            placeholder="关键字搜索" 
                            type="text" 
                            v-model="searchInputValue" 
                            autocomplete="off" 
                            size="small"></el-input>
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
                            <el-button 
                            type="primary" 
                            icon="el-icon-upload2"
                            @click="uploadFileDialogVisible = true" 
                            size="small">上传文件</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button 
                            type="primary" 
                            size="small">批量删除</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button 
                            type="primary" 
                            size="small">删除下载</el-button>
                        </el-form-item>
                    </div>
                </div>
            </el-form>
        </div>
        <el-table
            :data="documentTableData"
            stripe
            header-cell-class-name="table-header"
            cell-class-name="table-cell-style"
            style="width: 100%">
                <el-table-column
                align="center"
                 type="selection"
                 width="55"
                ></el-table-column>
                <el-table-column
                align="center"
                type="index"
                label="序号"
                width="55">
                </el-table-column>
                <el-table-column
                align="center"
                prop="fileName"
                label="课件名"
                width="180">
                </el-table-column>
                <el-table-column
                align="center"
                prop="school"
                label="学校"
                width="180">
                </el-table-column>
                <el-table-column
                align="center"
                prop="teacher"
                label="老师">
                </el-table-column>
                <el-table-column
                align="center"
                prop="grade"
                label="年级">
                </el-table-column>
                <el-table-column
                align="center"
                prop="subject"
                label="学科">
                </el-table-column>
                <el-table-column
                align="center"
                prop="uploadDate"
                label="上传时间">
                </el-table-column>
                <el-table-column
                align="center"
                prop="downloadCount"
                label="下载次数">
                </el-table-column>
                <el-table-column
                align="center"
                width="230px"
                label="操作">
                    <template>
                        <el-link icon="el-icon-view" :underline="false">预览</el-link>
                        <el-link icon="el-icon-download" :underline="false">下载</el-link>
                        <el-link icon="el-icon-edit-outline" :underline="false">编辑</el-link>
                        <el-link icon="el-icon-delete" :underline="false" @click="showDeleteOneMessageBox">删除</el-link>
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
    
    <!-- 上传课件对话框 -->
    <el-dialog
     title="上传课件"
     :visible.sync="uploadFileDialogVisible"
     width="40%"
    >
        <el-form
         :model="uploadFileForm"
         label-width="80px"
        >
            <el-form-item label="课件名称" required>
                <el-input
                 v-model="uploadFileForm.fileName"
                 placeholder="请输入课件名"
                 style="width: 300px;"
                ></el-input>
            </el-form-item>
            <el-form-item label="所属学校" required>
                <el-select v-model="uploadFileForm.school" placeholder="请选择">
                    <el-option
                    v-for="item in schoolOptions" 
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="所属老师" required>
                <el-select v-model="uploadFileForm.teacher" placeholder="请选择">
                    <el-option
                    v-for="item in teacherOptions" 
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    ></el-option>
                </el-select>
            </el-form-item>
            <div style="display: flex;">
                <el-form-item label="应用年级" required>
                    <el-select v-model="uploadFileForm.grade" placeholder="请选择">
                        <el-option
                        v-for="item in gradeOptions" 
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="应用学科" required>
                    <el-select v-model="uploadFileForm.subject" placeholder="请选择">
                        <el-option
                        v-for="item in subjectOptions" 
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
            </div>
            <el-form-item label="上传课件" required>
                <div style="display: flex; margin-bottom: 10px;">
                    <el-load
                     action="https://jsonplaceholder.typicode.com/posts/"
                     multiple
                     :limit="3"
                    >
                        <el-button size="small" type="primary">点击上传</el-button>
                    </el-load>
                    <div class="tip-text">（仅支持上传PDF，Word，PPT格式文件）</div>
                </div>
                <el-progress :text-inside="true" :stroke-width="18" :percentage="70" text-color="#fff"></el-progress>
            </el-form-item>
            <el-form-item
             label="文件备注"
            >
                <el-input
                 type="textarea"
                 :rows="4"
                 placeholder="请输入内容"
                 v-model="uploadFileForm.remark"
                ></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="uploadFileDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="uploadFileDialogVisible = false">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name:"AllDocument",
    data(){
        return {
            gradeSelectValue:"",
            schoolSelectValue:"",
            teacherSelectValue:"",
            subjectSelectValue:"",
            searchInputValue:"",
            documentTableData:[
                {
                    fileName: "高三语文专递课堂教案",
                    school: "珠海市第一中学",
                    teacher: "李欣",
                    grade: "高三",
                    subject: "语文",
                    uploadDate: "2023-9-10",
                    downloadCount: "78",
                },
                {
                    fileName: "高三语文专递课堂教案",
                    school: "珠海市第一中学",
                    teacher: "李欣",
                    grade: "高三",
                    subject: "语文",
                    uploadDate: "2023-9-10",
                    downloadCount: "78",
                },
                {
                    fileName: "高三语文专递课堂教案",
                    school: "珠海市第一中学",
                    teacher: "李欣",
                    grade: "高三",
                    subject: "语文",
                    uploadDate: "2023-9-10",
                    downloadCount: "78",
                },
                {
                    fileName: "高三语文专递课堂教案",
                    school: "珠海市第一中学",
                    teacher: "李欣",
                    grade: "高三",
                    subject: "语文",
                    uploadDate: "2023-9-10",
                    downloadCount: "78",
                },
                {
                    fileName: "高三语文专递课堂教案",
                    school: "珠海市第一中学",
                    teacher: "李欣",
                    grade: "高三",
                    subject: "语文",
                    uploadDate: "2023-9-10",
                    downloadCount: "78",
                },
                {
                    fileName: "高三语文专递课堂教案",
                    school: "珠海市第一中学",
                    teacher: "李欣",
                    grade: "高三",
                    subject: "语文",
                    uploadDate: "2023-9-10",
                    downloadCount: "78",
                },
                {
                    fileName: "高三语文专递课堂教案",
                    school: "珠海市第一中学",
                    teacher: "李欣",
                    grade: "高三",
                    subject: "语文",
                    uploadDate: "2023-9-10",
                    downloadCount: "78",
                },
                {
                    fileName: "高三语文专递课堂教案",
                    school: "珠海市第一中学",
                    teacher: "李欣",
                    grade: "高三",
                    subject: "语文",
                    uploadDate: "2023-9-10",
                    downloadCount: "78",
                },
                {
                    fileName: "高三语文专递课堂教案",
                    school: "珠海市第一中学",
                    teacher: "李欣",
                    grade: "高三",
                    subject: "语文",
                    uploadDate: "2023-9-10",
                    downloadCount: "78",
                },
                {
                    fileName: "高三语文专递课堂教案",
                    school: "珠海市第一中学",
                    teacher: "李欣",
                    grade: "高三",
                    subject: "语文",
                    uploadDate: "2023-9-10",
                    downloadCount: "78",
                },
            ],
            uploadFileDialogVisible:false,
            uploadFileForm:{
                fileName:"",
                school:"",
                teacher:"",
                grade:"",
                subject:"",
                remark:"",
            }
        }
    },
    computed:{
        ...mapState('lessonInfo',[
            "schoolOptions",
            "teacherOptions",
            "gradeOptions",
            "subjectOptions",
        ])
    },
    methods:{
        // 删除单个记录
        showDeleteOneMessageBox(){
            this.$confirm("是否确定删除该课件","删除课件提示",{
                confirmButtonText:"确定删除",
                cancelButtonText:"取消",
                type:"warning"
            }).then(()=>{
                this.$message({
                    type:"success",
                    message:"删除成功"  
                })
            }).catch(()=>{
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                })
            })
        }
    },
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

.tip-text{
    color: #c0c4cc;
    font-size: small;
    font-weight: normal;
}
</style>