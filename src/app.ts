/*
 * @Author: dyr
 * @Description: file content
 * @Date: 2019-07-26 12:23:20
 * @LastEditors: dyr
 * @LastEditTime: 2019-11-17 11:41:31
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
