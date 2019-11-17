/*
 * @Author: dyr
 * @Description: file content
 * @Date: 2019-07-26 12:23:20
 * @LastEditors: dyr
 * @LastEditTime: 2019-11-17 15:28:37
 */
//logs.js
const util = require('../../utils/util.js');

Page({
  data: {
    logs: [],
  },
  onLoad: function() {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log));
      }),
    });
  },
});
