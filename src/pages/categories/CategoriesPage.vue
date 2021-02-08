<template>
  <div class="categories-container">
<!--    面包屑导航-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
<!--    商品内容区域-->
    <el-card class="box-card">
      <el-button type="primary" class="add" @click="addcategories">添加商品</el-button>
<!--      树形结构表格-->
      <tree-table
        :data="categoriesList"
        :columns="columns"
        border
        :selection-type="false"
        show-index
        index-text="#"
        :expand-type="false"
      >
        <template slot="cat_deleted" slot-scope="scope">
          <i
            class="el-icon-check"
            v-if="scope.row.cat_deleted==false"
            style="color: skyblue"
          ></i>
          <i class="el-icon-close" v-else></i>
        </template>
        <template slot="cat_level" slot-scope="scope">
          <el-tag v-if="scope.row.cat_level==0">一级</el-tag>
          <el-tag v-else-if="scope.row.cat_level==1" type="success">二级</el-tag>
          <el-tag v-else="scope.row.cat_level==2" type="warning">三级</el-tag>
        </template>
        <template slot="cat_operation" slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
          >编辑
          </el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
          >删除
          </el-button>
        </template>
      </tree-table>
<!--      分页-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="categoriesTotle">
      </el-pagination>

      <el-dialog
        title="添加分类"
        :visible.sync="addCategoriesDialog"
        width="30%"
        @close="resetCategories"
      >
        <el-form
          :model="categoriesForm"
          :rules="categoriesRules"
          ref="categoriesRef"
          label-width="100px"
        >
          <el-form-item label="分类名称" prop="cat_name">
            <el-input v-model="categoriesForm.cat_name"></el-input>
          </el-form-item>
          <el-form-item label="父级分类" >
            <el-cascader
              v-model="categoriesKeys"
              :options="parentCategories"
              :props="categoriesProps"
              @change="handleChange"
              expand-trigger="hover"
              clearable
            >

            </el-cascader>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
    <el-button @click="addCategoriesDialog = false">取 消</el-button>
    <el-button type="primary" @click="addCate">确 定</el-button>
  </span>
      </el-dialog>
    </el-card>

  </div>
</template>

<script>
  import {
    getCategoriesList,
    addCategoriesList,
  } from "../../api/categories";

  export default {
    name: "CategoriesPage",
    data () {
      return {
        categoriesList:[],
        queryInfo:{
          categoriesType:3, //商品级别
          pagenum:1,    //当前页码值
          pagesize:5    //每页显示多少条数据
        },
        categoriesTotle:null,
        addCategoriesDialog:false,
        columns:[
          {
            label: '分类名称',
            prop: 'cat_name',
            minWidth: '50px',
          },
          {
            label: '是否有效',
            prop: 'cat_deleted',
            minWidth: '50px',
            type: 'template',
            template: 'cat_deleted',
          },
          {
            label: '排序',
            prop: 'cat_level',
            minWidth: '50px',
            type: 'template',
            template: 'cat_level',
          },
          {
            label: '操作',
            minWidth: '50px',
            type: 'template',
            template: 'cat_operation',
          }
        ],
        categoriesForm:{
          cat_name:'',//分类名称
          cat_pid:0,  //分类父 ID
          cat_level:0 //分类层级
        },
        categoriesRules:{
          cat_name: [
            { required: true, message: '请输入分类名称', trigger: 'blur' },
            { min: 3, max: 7, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
        },
        //父级分类
        parentCategories:[],
        categoriesKeys:[],//父级分类选中的id
        categoriesProps:{
          value:'cat_id',
          label:'cat_name',
          children:'children'
        }
      }
    },
    methods:{
      // 商品分类数据列表
      categoriesListInfo () {
        getCategoriesList(this.queryInfo)
        .then((res) => {
          this.categoriesList=res.data.data.result
          this.categoriesTotle=res.data.data.total
          // console.log(res)
        })
      },
      // 每页条数
      handleSizeChange(val) {
        this.queryInfo.pagesize=val
        //更新商品列表
        this.categoriesListInfo()
      },
      //当前页
      handleCurrentChange(val) {
        this.queryInfo.pagenum=val
        //更新商品列表
        this.categoriesListInfo()
      },
      //添加分类
      addcategories () {
        getCategoriesList({type:2})
        .then((res) => {
          this.parentCategories=res.data.data
        })
        this.addCategoriesDialog=true
      },
      //选择的分类
      handleChange () {
        if(this.categoriesKeys.length>0){
          this.categoriesForm.cat_pid=this.categoriesKeys[this.categoriesKeys.length-1]
          this.categoriesForm.cat_level=this.categoriesKeys.length
          return
        }else {
          this.categoriesForm.cat_pid=0
          this.categoriesForm.cat_level=0
        }
      },
      //确定添加分类
      addCate () {
        this.$refs.categoriesRef.validate((valid) => {
          if (!valid) return
          //发送添加分类请求
          addCategoriesList(this.categoriesForm)
          .then((res) => {
            //关闭对话框
            this.addCategoriesDialog=false
            //更新分类
            this.categoriesListInfo()
            this.$message({
              type:'success',
              message:'添加分类成功'
            })
            console.log(res)
          })
        })
        console.log(this.categoriesForm)
      },
      //关闭对话框清空选项
      resetCategories () {
       this.$refs.categoriesRef.resetFields()
        this.categoriesKeys=[]
        this.categoriesForm.cat_pid=0
        this.categoriesForm.cat_level=0
      }
    },
    created() {
      this.categoriesListInfo()
    }
  }
</script>

<style scoped>
.el-breadcrumb {
  margin-bottom: 30px;
}
.add {
  margin-bottom: 30px;
}
.el-cascader {
  width: 100%;
}
</style>
