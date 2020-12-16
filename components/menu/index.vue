<template>
  <view class="container-menu">
    <view
      class="menu-item"
      v-for="x in data"
      v-bind:key="x.name"
      @click="onPush(x.path)"
      v-if="!menu && x.name == '淘宝' ? false : true"
    >
      <image
        class="menu-img"
        :src="x.path == path ? x.selectIcon : x.icon"
      ></image>
      <view class="name" v-bind:class="[x.path == path ? 'select-name' : '']">{{
        x.name
      }}</view>
    </view>
  </view>
</template>

<script>
import request from "utils/request";
export default {
  name: "menu",
  props: {
    path: String,
    menu: Boolean,
  },
  data() {
    return {
      data: [
        {
          icon: "/static/waimai.png",
          selectIcon: "/static/waimai1.png",
          name: "外卖",
          path: "/pages/index/index",
        },
        {
          icon: "/static/taobao1.png",
          selectIcon: "/static/taobao.png",
          name: "淘宝",
          path: "/pages/taobao/index",
        },
      ],
    };
  },
  methods: {
    onPush(url) {
      console.log(this.menu);
      if (url != this.path) uni.redirectTo({ url });
    },
  },
};
</script>

<style lang="scss">
.container-menu {
  z-index: 99;
  height: 90rpx;
  background: #ffffff;
  border: 2rpx solid #f3f3f3;
  display: flex;
  color: #666;
  font-size: 22rpx;
  width: 100%;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;

  .menu-item {
    flex: 1;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;

    .menu-img {
      width: 50rpx;
      height: 42rpx;
      margin-top: 10rpx;
    }
  }

  .menu-select,
  .select-name {
    color: #ff5500;
  }
}
</style>
