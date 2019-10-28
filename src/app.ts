/*
 * @Author: dyr
 * @Description: file content
 * @Date: 2019-07-26 12:23:20
 * @LastEditors: dyr
 * @LastEditTime: 2019-10-28 19:24:11
 */
import wxp from '@/utils/wxp';
//app.js
App({
  onLaunch: function() {
    wxp.getNetworkType().then(res => {
      const networkType = res.networkType;
      this.globalData.networkType = networkType;
    });
    wxp.onNetworkStatusChange(res => {
      const networkType = res.networkType;
      this.globalData.networkType = networkType;
    });
  },
  globalData: {
    networkType: '',
  },
});
