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
          :headers='gettoken()'
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
        </el-upload>
      </el-form-item>
      <el-form-item label="栏目：">
        <el-checkbox :indeterminate="isIndeterminate"
        v-model="checkAll"
        @change="handleCheckAllChange">全选</el-checkbox>
        <div style="margin: 15px 0;"></div>
        <el-checkbox-group v-model="checkedCities"
        @change="handleCheckedCitiesChange">
          <el-checkbox v-for="city in cities" :label="city.id" :key="city.id">{{city.name}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="封面：">
        <el-upload
          action="http://127.0.0.1:3000/upload"
          list-type="picture-card"
          :headers='gettoken()'
          :before-upload='ispicture'
          :on-success='handlePictureCardSuccesss'
          :on-remove="handleRemove"
          :limit='3'
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog  size="tiny">
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
// 引入接口文档
import { getlistitem, postlist } from '@/api/indexpage.js'
// import { getlistitem } from '@/api/indexpage.js'
// 引入富文本域
import VueEditor from 'vue-word-editor'
import 'quill/dist/quill.snow.css'
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
      checkedCities: [],
      cities: [],
      isIndeterminate: false,
      // 照片框变量
      dialogImageUrl: '',
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
            console.log(res)
            console.log(2222)
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
    ispicture (file) {
      console.log(file)
      if (file.type.indexOf('image') === -1) {
        this.$message.warning('文件格式不支持，请上传图片格式')
        return false
      }
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
      // 把文档中去除的页面在参数的数组中去除
      this.listissue.cover = this.listissue.cover.filter((item, index) => {
        return item.id !== file.response.data.id
      })
    },
    handlePictureCardSuccesss (response, file, fileList) {
      // 这两句是插件的默认语句
      this.dialogImageUrl = file.url
      // 遍历fileList数组，并取出相应的值，放入数组中
      //   this.listissue.cover
      if (response.message === '文件上传成功') {
        this.listissue.cover = fileList.map(item => {
          return {
            id: item.response.data.id
          }
        })
      }
    },
    // 上传视频的函数
    successupload (response, file, fileList) {
    //   console.log(response)
    //   console.log(file)
    //   console.log(fileList)
      if (response.message === '文件上传成功') {
        this.listissue.content = response.data.url
      }
    },
    beforeupload (file) {
      console.log(file)
      //   对视频做一个判断，不是视频的不能上传，每个视频文件的type属性都是以video开头
      if (file.type.indexOf('video') === -1) {
        this.$message.warning('请上传视频文件')
      }
      //   直接中断上传情况
      return false
    },
    async onsubmit () {
      // 富文本域的取值
      if (this.listissue.type === 1) {
        console.log(this.$refs.vueEditor.editor)
        let content = this.$refs.vueEditor.editor.root.innerHTML
        this.listissue.content = content
      }
      // 赋值给参数中的categeries中
      this.listissue.categeries = this.checkedCities.map(item => {
        return {
          id: item
        }
      })
      console.log(this.listissue)
      let res = await postlist(this.listissue)
      console.log(res)
      if (res.data.message === '文章发布成功') {
        this.$router.push({ path: '/index/postlist' })
      }
    },
    // 获取token值的封装
    gettoken () {
      let token = localStorage.getItem('horse_back_token')
      return {
        Authorization: token
      }
    },
    // 全选框
    handleCheckAllChange (val) {
    // val是bolean
      console.log(val)
      this.checkedCities = val ? this.cities.map(item => {
        return item.id
      }) : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange (value) {
    // value是数组
      console.log(value)
      let checkedCount = value.length
      //   console.log(checkedCount)
      this.checkAll = checkedCount === this.cities.length
      //   console.log(this.cities.length)
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length
    }
  },
  async  mounted () {
    // 组件加载完，请求数据，遍历数组
    let res = await getlistitem()
    // console.log(res)
    this.cities = res.data.data.splice(2)
    // console.log(this.cities)
  }
}
</script>

<style>
</style>
