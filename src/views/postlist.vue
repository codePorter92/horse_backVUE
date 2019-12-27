<template>
  <div class="postlist">
    <!-- 添加面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: 'userindex' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>文章列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 添加列表 -->
    <el-table :data="postlist" style="width: 100%;margin-top:20px" border>
      <!--添加索引值  -->
      <el-table-column type="index"></el-table-column>
      <!-- 添加表格的每一列 -->
      <el-table-column prop="title" label="标题" width="320"></el-table-column>
      <el-table-column prop="create_date" label="日期" width="120">
        <template slot-scope="scope">{{scope.row.create_date|formatdate}}</template>
      </el-table-column>
      <el-table-column prop="type" label="类型" width="120">
        <template slot-scope="scope">{{scope.row.type===1?'文章':'视频'}}</template>
      </el-table-column>
      <el-table-column prop="user.nickname" label="作者" width="120"></el-table-column>
      <el-table-column label="操作">
        <!-- 自定义列模板，是element框架中获取表格数据的唯一手段 -->
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">
              <i class="el-icon-edit"></i>
            </el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="分享" placement="top">
            <el-button size="mini" type="success" @click="handleEdit(scope.$index, scope.row)">
              <i class="el-icon-share"></i>
            </el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <el-button size="mini" type="warning" @click="handleDelete(scope.$index, scope.row)">
              <i class="el-icon-delete"></i>
            </el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加分页系统 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pagesizelist"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
import { getpostlist } from '@/api/indexpage.js'
// 引入格式化日期过滤器
import { formatdate } from '@/utils/filters.js'
export default {
  mounted () {
    this.init()
  },
  data () {
    return {
      postlist: [],
      currentPage: 1,
      pagesize: 32,
      params: {},
      pagesizelist: [2, 4, 6, 8, 10, 12],
      total: 0
    }
  },
  methods: {
    //   封装函数
    async init () {
      this.params.pageIndex = this.currentPage
      this.params.pageSize = this.pagesize
      let res = await getpostlist(this.params)
      console.log(res)
      if (res.status === 200) {
        this.postlist = res.data.data
        this.total = res.data.total
      }
      // let res = await getpostlist({
      //   pagesize: this.pagesize,
      //   currentPage: this.pageIndex
      // })
      // if (res.status === 200) {
      //   this.postlist = res.data.data
      //   this.total = res.data.total
      // }
    },
    // 控制编译的函数
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    },
    // 控制分页器的方法
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pagesize = val
      this.init()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
      this.init()
    }
  },
  filters: {
    formatdate
  }
}
</script>

<style>
</style>
