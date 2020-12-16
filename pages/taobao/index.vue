<template>
  <view class="container">
    <uni-search-bar
      :radius="100"
      @confirm="search"
      @input="input"
      placeholder="输入名称搜索商品优惠券"
      bgColor="#fff"
    ></uni-search-bar>
    <scroll-view class="list" scroll-y @scrolltolower="loadMore">
      <view class="list-content">
        <view class="item" v-for="item in data" v-bind:key="item.x_id">
          <image class="img" :src="item.pict_url"></image>
          <view class="name">{{ item.title }}</view>
          <view class="shop">店铺: {{ item.shop_title }}</view>
          <view class="price"
            >券后价
            <view class="text">{{
              (item.zk_final_price - (item.coupon_amount || 0)).toFixed(2)
            }}</view>
          </view>
          <view class="vouchers" hover-class="hover" @click="copy(item)">{{
            item.coupon_amount && item.coupon_amount > 0
              ? `复制${item.coupon_amount}元券口令`
              : "复制商品口令"
          }}</view>
        </view>
      </view>
      <view v-if="noMore" class="no-more">没有更多了~~</view>
    </scroll-view>
  </view>
</template>

<script>
import request from "utils/request";
export default {
  data() {
    return {
      data: [],
      page: 1,
      name: "",
      noMore: false,
      menu: false,
    };
  },
  created(e) {
    this.getData();
    uni.showShareMenu({
      menus: ["shareAppMessage", "shareTimeline"],
    });
  },
  onShareAppMessage(res) {
    var messages = [
      {
        title: "领取淘宝优惠券",
        path: "/pages/taobao/index",
      },
    ];
    console.log(this.path);
    return messages[Math.floor(Math.random() * messages.length)];
  },
  methods: {
    loadMore() {
      if (this.noMore) return;
      this.page = this.page + 1;
      this.getData();
    },
    async getData() {
      const res = await request({
        url: "/api/taobao/lst",
        loading: "数据加载中...",
        data: { page: this.page, name: this.name },
      });
      if (this.page == 1) this.data = [...res.data];
      else this.data = [...this.data, ...res.data];
      if (res.data < 10) this.noMore = true;
      this.menu = res.menu;
    },
    input(e) {
      this.name = e.value || "";
    },
    search() {
      this.page = 1;
      this.data = [];
      this.getData();
    },
    async copy(item) {
      const res = await request({
        url: "/api/taobao/pwd",
        method: "POST",
        data: {
          name: item.category_name,
          url: "https:" + item.coupon_share_url,
        },
      });
      uni.setClipboardData({
        data: res?.data?.password_simple ?? "",
        complete() {
          uni.hideLoading();
          uni.showToast({
            title: "已复制，请打开淘宝领取！",
            icon: "none",
          });
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  background: #f3f3f3;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100vh;
}
.list {
  flex: 1;
  padding: 24rpx;
  height: calc(100vh - 104rpx);
  width: calc(100vw - 48rpx);
  overflow: hidden;
  padding-bottom: 90rpx;
  .list-content {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 22rpx;
    padding-bottom: 24rpx;
  }
  .item {
    padding: 20rpx;
    background: #ffffff;
    border-radius: 8px;
    .img {
      width: 278rpx;
      height: 224rpx;
      border-radius: 8rpx;
    }
    .name {
      font-size: 28rpx;
      color: #333;
      display: -webkit-box;
      overflow: hidden;
      text-overflow: ellipsis;
      word-wrap: break-word;
      white-space: normal;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .shop {
      font-size: 26rpx;
      margin-top: 10rpx;
      color: #999;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 290rpx;
    }
    .price {
      margin-top: 6rpx;
      color: #333;
      font-size: 26rpx;
      display: flex;
      align-items: center;
      color: #999;
      .text {
        margin-left: 20rpx;
        font-size: 32rpx;
        font-weight: 600;
        color: #fa8947;
      }
    }
    .vouchers {
      margin-top: 10rpx;
      background: #ff6600;
      color: #fff;
      padding: 10rpx 0;
      text-align: center;
      border-radius: 8rpx;
      font-size: 28rpx;
    }
  }
}
.no-more {
  text-align: center;
  margin: 10rpx 0;
}
.hover {
  opacity: 0.8;
}
</style>
