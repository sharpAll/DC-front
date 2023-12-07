<template>
  <div class="header">
    <div class="title"><i class="logo"></i>业务组件库</div>
    <ul class="menu-box">
      <li class="menu-item" @click="go('/home')">首页</li>
      <li class="menu-item" @click="go('/kline')">K线图</li>
      <li class="menu-item" @click="go('/excel')">Excel</li>
      <li class="menu-item" @click="go('/cron')">Cron</li>
    </ul>
    <div class="tool-box">
      <n-dropdown
        trigger="hover"
        :options="avatarOptions"
        @select="avatarSelect"
      >
        <div class="user-box">
          <n-icon size="22" class="user-icon">
            <UserOutlined />
          </n-icon>
          <span class="name">{{ username }}</span>
        </div>
      </n-dropdown>
    </div>
  </div>
  <TabsView />
</template>
<script setup lang="ts">
import TabsView from "./TagsView.vue";
import { UserOutlined } from "@vicons/antd";
import { useRouter } from "vue-router";
import { useDialog } from "naive-ui";
import { useUserStore } from "/@/store/user";
import { useTabsViewStore } from "/@/store/tabsView";
import { storeToRefs } from "pinia";
import { PageEnum } from "/@/enums/pageEnum";

const dialog = useDialog();
const router = useRouter();
const go = (url: string) => {
  router.push(url);
};
const userStore = useUserStore();
const tabsViewStore = useTabsViewStore();
const { username } = storeToRefs(userStore);
/** 头像下拉菜单start **/
const avatarSelect = (key: number) => {
  switch (key) {
    case 1:
      break;
    case 2:
      loginOut();
      break;
    default:
      break;
  }
};
const avatarOptions = [
  {
    label: "个人设置",
    key: 1,
  },
  {
    label: "退出登录",
    key: 2,
  },
];
function loginOut() {
  dialog.success({
    title: "温馨提醒",
    content: "是否确认退出系统?",
    positiveText: "确定",
    negativeText: "取消",
    showIcon: false,
    onPositiveClick: () => {
      // 退出登录则清空页面使用痕迹
      userStore.clearUserInfo();
      tabsViewStore.clearCurrentTabs();
      router
        .replace({
          name: PageEnum.BASE_LOGIN_NAME,
          // query: {
          //   redirect: route.fullPath,
          // },
        })
        .finally(() => location.reload());
    },
  });
}
/** 头像下拉菜单 end **/
</script>
<style scoped lang="scss">
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 50px;
  font-size: 22px;
  color: #fff;
  background: linear-gradient(to top right, #0b365e, #091b2b);
  display: flex;
  .title {
    width: 350px;
    line-height: 50px;
    margin-left: 10px;
    flex: 0 1 auto;
    .logo {
      display: inline-block;
      margin-right: 10px;
      width: 30px;
      height: 30px;
      line-height: 30px;
      vertical-align: -7px;
      background: url("/@/assets/img/dc.png") center no-repeat;
      background-size: cover;
    }
  }
  .menu-box {
    flex: 1 0 auto;
    font-size: 20px;
    .menu-item {
      display: inline-block;
      list-style: none;
      width: 120px;
      height: 47px;
      line-height: 47px;
      text-align: center;
      position: relative;
      cursor: pointer;
      &::after {
        content: "";
        width: 0;
        display: block;
        height: 3px;
        margin: 0 auto;
        background-color: $primary-color;
        border-radius: 2px;
      }
      &:hover::after {
        transition: 0.12s width ease-in;
        width: 100%;
      }
    }
  }
  .tool-box {
    padding-right: 10px;
    .user-box {
      display: flex;
      align-items: center;
      height: 100%;
      cursor: pointer;
      .user-icon {
        margin-right: 6px;
      }
      .name {
        font-size: 16px;
      }
    }
  }
}
</style>
