//logs.js
const util = require('../../utils/util.js');

Page({
  data: {
    logs: [],
  },
  onLoad: function() {
    const a = 1;
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log));
      }),
    });
  },
});
