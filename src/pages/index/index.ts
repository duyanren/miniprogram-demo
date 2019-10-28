/*
 * @Author: dyr
 * @Description: file content
 * @Date: 2019-07-26 12:23:20
 * @LastEditors: dyr
 * @LastEditTime: 2019-10-28 19:26:02
 */
//index.js
//获取应用实例

// const app = getApp();

Page({
  data: {
    networkType: '',
  },
  app: getApp(),
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs',
    });
  },
  onGetNetWork() {
    const networkType = this.app.globalData.networkType;
    this.setData!({
      networkType,
    });
  },
  onLoad: function() {},
});
