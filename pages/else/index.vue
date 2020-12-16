<template>
  <view class="container">
    <view class="coupon" ref="coupon">
      <view
        class="item"
        v-for="(v, i) in couponList"
        @click="toCoupon(i)"
        :key="i"
      >
        <view class="top">
          <view class="left">
            <view class="content">
              <image :src="v.icon" class="icon" mode="widthFix" />
              <view class="name">{{ v.name }}</view>
            </view>
            <view class="text" v-if="v.type == 1">天天可领</view>
            <view class="text" v-else-if="v.type == 2">限时秒杀</view>
          </view>
          <view class="right" v-if="v.name && v.url">免费领取</view>
        </view>
        <view class="bottom">
          <image :src="v.bannerPic" mode="widthFix" />
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import request from "utils/request";
export default {
  data() {
    return {
      current: 0,
      tabs: [],
      couponList: [],
      coupons: [],
    };
  },
  onLoad(e) {
    this.getData(0, e.tabId || 0);
    uni.showShareMenu({
      menus: ["shareAppMessage", "shareTimeline"],
    });
  },
  onShareAppMessage(res) {
    var messages = [
      {
        title: "美团饿了么大额红包，每日可领！",
        path: "/pages/lele/index",
      },
      {
        title: "吃了这么多年外卖，你知道这个秘密吗？",
        path: "/pages/lele/index",
      },
      {
        title: "这样点外卖，一年省下一个亿",
        path: "/pages/lele/index",
      },
      {
        title: "点外卖前先领券，吃霸王餐",
        path: "/pages/lele/index",
      },
      {
        title: "美团饿了么内部优惠券，手慢无",
        path: "/pages/lele/index",
      },
      {
        title: "点外卖不用优惠券，你就out了",
        path: "/pages/lele/index",
      },
      {
        title: "外卖不为人知的秘密，点这解密",
        path: "/pages/lele/index",
      },
      {
        title: "震惊！小伙点外卖竟然花了1分钱",
        path: "/pages/lele/index",
      },
      {
        title: "从这点外卖，你也可以吃霸王餐",
        path: "/pages/lele/index",
      },
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  },
  methods: {
    async getData(_tabId, _tabeId) {
      const res = await request({ url: "/api/take/elm", data: { id: 2 } });

      this.couponList = res.data;
    },
    toCoupon(i) {
      //h5
      //#ifdef H5
      window.location.href = this.couponList[i].url;
      //#endif
      //微信小程序
      //#ifdef MP-WEIXIN
      if (this.couponList[i].minapp) {
        wx.navigateToMiniProgram({
          appId: this.couponList[i].minapp.appid,
          path: this.couponList[i].minapp.path,
          success(res) {
            // 打开成功
          },
        });
      }
      //#endif
    },
  },
};
</script>

<style lang="scss">
page {
  background-color: #f8f8f8;
}

.container {
  font-size: 14px;
  line-height: 24px;
  position: relative;

  .coupon {
    .item {
      background-color: #ffffff;
      margin: 30rpx;
      border-radius: 10rpx;
      padding: 0 30rpx 30rpx 30rpx;

      .top {
        height: 116rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .left {
          height: 116rpx;
          width: 400rpx;
          display: flex;
          align-items: center;
          justify-content: space-between;

          .content {
            width: 100%;
          }

          .icon {
            display: inline-block;
            vertical-align: bottom;
            width: 52rpx;
            height: auto;
          }

          .name {
            text-align: left;
            display: inline-block;
            vertical-align: bottom;
            font-size: 34rpx;
            color: #000;
            line-height: 50rpx;
            font-weight: bold;
            margin-left: 15rpx;
          }

          .text {
            width: 150rpx;
            height: 38rpx;
            line-height: 38rpx;
            text-align: center;
            font-size: 24rpx;
            color: #61300e;
            background: linear-gradient(90deg, #f9db8d, #f8d98a);
            border-radius: 6rpx;
          }
        }

        .right {
          width: 170rpx;
          height: 60rpx;
          border-radius: 30rpx;
          background: linear-gradient(90deg, #ec6f43, #ea4a36);
          color: #fff;
          font-size: 28rpx;
          line-height: 60rpx;
          text-align: center;
        }
      }

      .bottom {
        height: auto;
        width: 100%;

        image {
          display: block;
          width: 100%;
          height: auto;
        }
      }
    }
  }
}
</style>
