<template>
  <view class="container">
    <index v-if="path == '/pages/index/index'"></index>
    <taobao v-if="path == '/pages/taobao/index'"></taobao>
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
        <view
          class="name"
          v-bind:class="[x.path == path ? 'select-name' : '']"
          >{{ x.name }}</view
        >
      </view>
    </view>
  </view>
</template>

<script>
import request from "utils/request";
import index from "pages/index";
import taobao from "pages/taobao";

export default {
  components: {
    index,
    taobao,
  },
  data() {
    return {
      menu: true,
      path: "/pages/index/index",
      data: [],
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
        title: "淘宝饿了么大额红包，每日可领！",
        path: "/pages/index/index",
      },
      {
        title: "吃了这么多年外卖，你知道这个秘密吗？",
        path: "/pages/index/index",
      },
      {
        title: "这样点外卖，一年省下一个亿",
        path: "/pages/index/index",
      },
      {
        title: "点外卖前先领券，吃霸王餐",
        path: "/pages/index/index",
      },
      {
        title: "美团饿了么内部优惠券，手慢无",
        path: "/pages/index/index",
      },
      {
        title: "点外卖不用优惠券，你就out了",
        path: "/pages/index/index",
      },
      {
        title: "外卖不为人知的秘密，点这解密",
        path: "/pages/index/index",
      },
      {
        title: "震惊！小伙点外卖竟然花了1分钱",
        path: "/pages/index/index",
      },
      {
        title: "从这点外卖，你也可以吃霸王餐",
        path: "/pages/index/index",
      },
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  },
  methods: {
    async getData(_tabId, _tabeId) {
      const res = await request({ url: "/api/take/menu" });
      this.data = res.data;
    },
    onPush(path) {
      this.path = path;
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
