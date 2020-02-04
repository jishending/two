'use strict';

const Controller = require('egg').Controller;
const { jm } = require('../utiles/auther')
class HomeController extends Controller {
  //登录
  async login() {
    const { username,password } = this.ctx.request.body;
    const result = await this.app.mysql.query(
      `select * from htsj where username="${username}" and password="${password}"`
    )
    if(result.length){
      let token= jm({ username,password })
      this.ctx.session.token=token
      this.ctx.body={
        code:1,
        message:'登录成功',
        token
      }
    }else{
      this.ctx.body={
        code:0,
        message:'登陆失败'
      }
    }
  }
  //注册
  async registry() {
    const { username,password } = this.ctx.request.body;
    const result = await this.app.mysql.query(
      `select * from htsj where username="${username}" and password="${password}"`
    )
    if(result.affectedRows>0){
      this.ctx.body={
        code:1,
        message:'已被注册',
      }
    }else{
      const { username,password } = this.ctx.request.body;
      const result = await this.app.mysql.query(
        `insert into htsj (username,password) values("${username}","${password}")`
      )
      if(result.affectedRows>0){
        this.ctx.body={
          code:1,
          message:'注册成功',
        }
      }else{
        this.ctx.body={
          code:0,
          message:'注册失败'
        }
      }
    }
  }
  //渲染
  async getAll(){
    const result=await this.app.mysql.query("select * from htsj")
    this.ctx.body={
      code:1,
      data:result
    }
  }
  //增
  async addlist(){
    const { username,password,address,age } = this.ctx.request.body;
    const result = await this.app.mysql.query(
      `insert into htsj ( username,password,address,age ) values("${username}","${password}","${address}","${age}")`
    )
    if(result.affectedRows>0){
      this.ctx.body={
        code:1,
        message:"增加成功"
      }
    }else{
      this.ctx.body={
        code:0,
        message:"失败"
      }
    }
  }
  //删
  async deletlist(){
    const { id } = this.ctx.request.body;
    const result = await this.app.mysql.query(
      `delete from htsj where id="${id}"`
    )
    if(result.affectedRows>0){
      this.ctx.body={
        code:1,
        message:'删除'
      }
    }else{
      this.ctx.body={
        code:0,
        message:'失败'
      }
    }
  }
  //修改
  async updatalist(){
    const { username,password,address,age,id } = this.ctx.request.body;
    const result = await this.app.mysql.query(
      `update htsj set username="${username}" and password="${password}" and address="${address}" and age="${age}" where id ="${id}"`
    )
    if(result.affectedRows>0){
      this.ctx.body={
        code:1,
        message:'修改成功'
      }
    }else{
      this.ctx.body={
        code:0,
        message:'失败'
      }
    }
  }
}

module.exports = HomeController;
