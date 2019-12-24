<template>
  <div class="listissue">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/index/userindex' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>文章发布</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 表单 -->
    <el-form ref="form" :model="form" label-width="80px" style="margin-top:20px">
      <!-- 表头 -->
      <el-form-item label="标题：">
        <el-input v-model="listissue.title"></el-input>
      </el-form-item>
      <el-form-item label="类型：">
        <el-radio-group v-model="listissue.type">
          <el-radio :label="1">文章</el-radio>
          <el-radio :label="2">视频</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="内容：">
        <!-- 富文本域 -->
        <VueEditor :config="config" ref="vueEditor" v-if="listissue.type===1" />
        <!-- 上传图片视频 -->
        <el-upload
          v-if="listissue.type===2"
          class="upload-demo"
          action="http://127.0.0.1:3000/upload"
          multiple
          :limit="3"
          :file-list="fileList"
          :on-success='successupload'
          :before-upload='beforeupload'
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
        </el-upload>
      </el-form-item>
      <el-form-item label="栏目：">
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll">全选</el-checkbox>
        <div style="margin: 15px 0;"></div>
        <el-checkbox-group v-model="checkedCities">
          <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="封面：">
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible" size="tiny">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
      </el-form-item>
      <!-- 发布按钮 -->
      <el-form-item>
        <el-button type="primary" @click="onsubmit">发布文章</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// 引入富文本域
import VueEditor from 'vue-word-editor'
import 'quill/dist/quill.snow.css'
// 全选项列表
const cityOptions = ['上海', '北京', '广州', '深圳']
export default {
  data () {
    return {
      listissue: {
        title: '',
        content: '',
        categeries: [],
        cover: [],
        type: 1
      },
      // 栏目选项
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      // 上传视频的变量
      fileList: [],
      //   全选的变量
      checkAll: false,
      checkedCities: ['上海', '北京'],
      cities: cityOptions,
      isIndeterminate: true,
      // 照片框变量
      dialogImageUrl: '',
      dialogVisible: false,
      config: {
        // 富文本域中    上传图片的配置
        uploadImage: {
          url: 'http://localhost:3000/upload',
          name: 'file',
          // 添加请求头
          headers: this.gettoken(),
          // res是结果，insert方法会把内容注入到编辑器中，res.data.url是资源地址
          uploadSuccess (res, insert) {
            // console.log(res)
            insert('http://localhost:3000' + res.data.data.url)
          }
        },

        // 上传视频的配置
        uploadVideo: {
          url: 'http://localhost:3000/upload',
          name: 'file',
          headers: this.gettoken(),
          uploadSuccess (res, insert) {
            insert('http://localhost:3000' + res.data.data.url)
          }
        }
      }
    }
  },
  components: {
    // 富文本域的写法
    VueEditor
  },
  methods: {
    // 照片墙方法
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 上传视频的函数
    successupload (response, file, fileList) {
      console.log(response)
      console.log(file)
      console.log(fileList)
    },
    beforeupload (file) {
      console.log(file)
    },
    onsubmit () {
      // 富文本域的取值
      if (this.listissue.type === 1) {
        let content = this.$refs.vueEditor.editor.root.innerHTML
        this.listissue.content = content
      }
      console.log(this.listissue)
    },
    // 获取token值的封装
    gettoken () {
      let token = localStorage.getItem('horse_back_token')
      return {
        Authorization: token
      }
    }
  }
}
</script>

<style>
</style>
