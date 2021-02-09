<template>
  <div class="params-contaienr">
<!--    面包屑导航-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类参数</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
<!--      提示信息-->
      <el-tag type="warning">
        <i class="el-icon-warning"></i>
        注意:只允许为第三级分类设置相关参数！
      </el-tag>
<!--      选择商品分类区域-->
      <el-row>
        <el-col>
          <span>选择商品分类:</span>
<!--          分类级联-->
          <el-cascader
            v-model="selectKeys"
            :options="categories"
            :props="categoriesProp"
            @change="categoriesChange"
          ></el-cascader>
        </el-col>
      </el-row>
<!--      tab页签-->
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="动态参数" name="many">
          <el-button type="primary" :disabled="isBtnDisabled" @click="isDialogVisible=true">添加参数</el-button>
          <el-table
            :data="manyData"
          >
            <el-table-column
              width="60%"
              type="expand"
            >
            </el-table-column>
            <el-table-column
              label="#"
              type="index"
            >
            </el-table-column>
            <el-table-column
              prop="attr_name"
              label="参数名称"
            >
            </el-table-column>
            <el-table-column
              label="操作"
            >
              <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="静态属性" name="only">
          <el-button type="primary" :disabled="isBtnDisabled" @click="isDialogVisible=true">添加参数</el-button>
          <el-table
            :data="onlyData"
          >
            <el-table-column
              width="60%"
              type="expand"
            >
            </el-table-column>
            <el-table-column
              label="#"
              type="index"
            >
            </el-table-column>
            <el-table-column
              prop="attr_name"
              label="参数名称"
            >
            </el-table-column>
            <el-table-column
              label="操作"
            >
              <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
<!--    添加参数对话框-->
    <el-dialog
      :title="getTitleText"
      :visible.sync="isDialogVisible"
      width="50%"
      @close="addParamsClose"
      >
      <el-form ref="addRef" :model="addForm" label-width="80px">
        <el-form-item :label="getTitleText">
          <el-input v-model="addForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" >
    <el-button @click="isDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addFormParams">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  import {
    getCategoriesList,
    getParamsList,
    addParams
  } from "../../api/categories";

  export default {
    name: "ParamsPage",
    data () {
      return {
        categories:[],
        selectKeys:[], //选中的id数组
        categoriesProp: {
          value:'cat_id',
          label:'cat_name',
          children:'children',
          expandTrigger:'hover'
        },
        activeName:'many',
        manyData:[],  //动态数据
        onlyData:[],   //静态数据
        isDialogVisible:false,
        addForm:{
          attr_name:''
        }//添加参数表单
      }
    },
    methods:{
      categoriesList () {
        getCategoriesList()
        .then((res) => {
          this.categories=res.data.data
          // console.log(res)
        })
      },
      //选中的商品分类改变
      categoriesChange () {
       this.getParams()
      },
      //tab选中触发
      handleClick () {
        this.getParams()
        // console.log(this.activeName);
      },
      //获取动态和静态参数
      getParams () {
        getParamsList(this.getId,this.activeName)
          .then((res) => {
            if(this.activeName==='many') {
              this.manyData=res.data.data
            }else {
              this.onlyData=res.data.data
            }

            // console.log(res)
          })
      },
      //关闭添加参数对话框
      addParamsClose () {
        this.addForm.attr_name=''
      },
      //确定添加参数
      addFormParams () {
        addParams(this.getId,this.addForm.attr_name,this.activeName )
        .then((res) => {
          //关闭对话框
          this.isDialogVisible=false
          //更新数据
          this.getParams()
          this.$message({
            type:'success',
            message:'添加成功'
          })
          // console.log(res)
        })
      }
    },
    computed :{
      isBtnDisabled () {
        if(this.selectKeys.length!=3) return true
        return false
      },
      //获取参数列表id
      getId () {
        if(this.selectKeys.length==3)
          return this.selectKeys[2]
        return null
      },
      //获取动态/静态参数的提示文字
      getTitleText () {
        if (this.activeName==='many') {
          return '动态参数'
        }
        return '静态参数'
      }
    },
    created() {
      this.categoriesList()
    }
  }
</script>

<style scoped>
.el-breadcrumb {
  margin-bottom: 30px;
}
.el-tag {
  width: 100%;
  display: flex;
  align-items: center;
}
.el-icon-warning {
  font-size: 20px;
  text-align: center;
  margin-right: 10px;
}
.el-row {
  margin: 20px;
}
</style>
