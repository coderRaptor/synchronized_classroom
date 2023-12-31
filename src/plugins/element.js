import Vue from 'vue'
import {
    Button, Link,
    Form, FormItem, Select, Option, Upload,
    CheckboxGroup, Checkbox,
    Input, Message,
    Header, Container, Main, Aside,
    Card,
    DatePicker, TimePicker, Radio, RadioGroup,
    Menu, Submenu, MenuItem,
    Table, TableColumn,
    Pagination,
    Dialog, Tag,
    Popover, Divider,
    MessageBox, Alert,
    Row, Col,
    Switch, Progress,
} from 'element-ui'

// 表单
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(DatePicker)
Vue.use(Select)
Vue.use(Option)
Vue.use(CheckboxGroup)
Vue.use(Checkbox)
Vue.use(TimePicker)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Upload)
// 按钮
Vue.use(Button)
Vue.use(Switch)
// 进度条
Vue.use(Progress)
// 连接
Vue.use(Link)
// 弹出框
Vue.use(Popover)
// 分割线
Vue.use(Divider)
// 导航菜单
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
// 表格
Vue.use(Table)
Vue.use(TableColumn)
// 分页
Vue.use(Pagination)
// 标签
Vue.use(Tag)
// 对话框
Vue.use(Dialog)
// 布局容器
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Card)
Vue.use(Col)
Vue.use(Row)
// 通知
Vue.use(Alert)
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$alert = MessageBox.alert