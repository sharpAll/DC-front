<template>
  <div class="tabs-view shadow-md rounded-sm">
    <div class="tabs-view-main">
      <div
        ref="navWrap"
        class="tabs-card"
        :class="{ 'tabs-card-scrollable': scrollable }"
      >
        <span
          class="tabs-card-prev"
          :class="{ 'tabs-card-prev-hide': !scrollable }"
          @click="scrollPrev"
        >
          <n-icon size="16" color="#515a6e">
            <LeftOutlined />
          </n-icon>
        </span>
        <span
          class="tabs-card-next"
          :class="{ 'tabs-card-next-hide': !scrollable }"
          @click="scrollNext"
        >
          <n-icon size="16" color="#515a6e">
            <RightOutlined />
          </n-icon>
        </span>
        <div ref="navScroll" class="tabs-card-scroll">
          <Draggable
            :list="tabsList"
            animation="300"
            item-key="fullPath"
            class="flex"
          >
            <template #item="{ element }">
              <div
                :id="`tag${element.fullPath.split('/').join('\/')}`"
                class="tabs-card-scroll-item"
                :class="{ 'active-item': activeKey === element.path }"
                @click.stop="goPage(element)"
                @contextmenu="handleContextMenu($event, element)"
              >
                <span>{{ element.meta.title }}</span>
                <n-icon
                  v-if="!element.meta.affix"
                  size="14"
                  @click.stop="closeTabItem(element)"
                >
                  <CloseOutlined />
                </n-icon>
              </div>
            </template>
          </Draggable>
        </div>
      </div>
      <div class="tabs-close">
        <n-dropdown
          trigger="hover"
          placement="bottom-end"
          :options="TabsMenuOptions"
          @select="closeHandleSelect"
        >
          <div class="tabs-close-btn">
            <n-icon size="16" color="#515a6e">
              <DownOutlined />
            </n-icon>
          </div>
        </n-dropdown>
      </div>
      <n-dropdown
        :show="showDropdown"
        :x="dropdownX"
        :y="dropdownY"
        placement="bottom-start"
        :options="TabsMenuOptions"
        @clickoutside="onClickOutside"
        @select="closeHandleSelect"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  computed,
  ref,
  toRefs,
  unref,
  provide,
  watch,
  onMounted,
  nextTick,
} from "vue";
import { useRoute, useRouter } from "vue-router";
import { useMessage } from "naive-ui";
import { Storage } from "/@/utils/storage";
import { useUserStore } from "/@/store/user";
import { useTabsViewStore } from "/@/store/tabsView";
import { useAsyncRouteStore } from "/@/store/asyncRoute";
import { RouteItem } from "/@/store/tabsView";
import { PageEnum } from "/@/enums/pageEnum";
import {
  DownOutlined,
  ReloadOutlined,
  CloseOutlined,
  ColumnWidthOutlined,
  MinusOutlined,
  LeftOutlined,
  RightOutlined,
} from "@vicons/antd";
import Draggable from "vuedraggable";
import elementResizeDetectorMaker from "element-resize-detector";
import { renderIcon, useGo, RouteLocationRawEx } from "/@/utils/common";
import { userEnum } from "/@/enums/userEnum";
export default defineComponent({
  name: "TabsView",
  components: {
    DownOutlined,
    CloseOutlined,
    LeftOutlined,
    RightOutlined,
    Draggable,
  },
  setup() {
    const message = useMessage();
    const route = useRoute();
    const router = useRouter();
    const userStore = useUserStore();
    const tabsViewStore = useTabsViewStore();
    const asyncRouteStore = useAsyncRouteStore();
    const navScroll: any = ref(null);
    const navWrap: any = ref(null);
    const isCurrent = ref(false);
    const go = useGo();
    const state = reactive({
      activeKey: route.fullPath,
      scrollable: false,
      dropdownX: 0,
      dropdownY: 0,
      showDropdown: false,
    });

    // ???????????????????????????
    const getSimpleRoute = (route: RouteItem): RouteItem => {
      const { fullPath, hash, meta, name, params, path, query } = route;
      return { fullPath, hash, meta, name, params, path, query };
    };
    const TabsMenuOptions = computed(() => {
      const isDisabled = unref(tabsList).length <= 1;
      return [
        {
          label: "????????????",
          key: "1",
          icon: renderIcon(ReloadOutlined),
        },
        {
          label: `????????????`,
          key: "2",
          disabled: unref(isCurrent) || isDisabled,
          icon: renderIcon(CloseOutlined),
        },
        {
          label: "????????????",
          key: "3",
          disabled: isDisabled,
          icon: renderIcon(ColumnWidthOutlined),
        },
        {
          label: "????????????",
          key: "4",
          disabled: isDisabled,
          icon: renderIcon(MinusOutlined),
        },
      ];
    });

    let cacheRoutes: RouteItem[] = [];
    const simpleRoute = getSimpleRoute(route as RouteItem);
    try {
      const routesStr = Storage.get(userEnum.TABS_ROUTES) as
        | string
        | null
        | undefined;
      cacheRoutes = routesStr ? JSON.parse(routesStr) : [simpleRoute];
    } catch (e) {
      cacheRoutes = [simpleRoute];
    }

    // ????????????????????????????????? localStorage ???
    const routes = router.getRoutes();
    cacheRoutes.forEach((cacheRoute) => {
      const route = routes.find((route) => route.path === cacheRoute.path);
      if (route) {
        cacheRoute.meta = route.meta || cacheRoute.meta;
        cacheRoute.name = (route.name || cacheRoute.name) as string;
      }
    });

    // ??????????????????
    tabsViewStore.initTabs(cacheRoutes);

    // ????????????????????????
    const delKeepAliveCompName = () => {
      if (route.meta.keepAlive) {
        const name = router.currentRoute.value.matched.find(
          (item) => item.name === route.name
        )?.components?.default.name;
        if (name) {
          asyncRouteStore.keepAliveComponents =
            asyncRouteStore.keepAliveComponents.filter((item) => item !== name);
        }
      }
    };

    // ???????????????
    const tabsList: any = computed(() => tabsViewStore.tabsList);
    const whiteList: string[] = [
      PageEnum.BASE_LOGIN_NAME,
      PageEnum.REDIRECT_NAME,
    ];

    watch(
      () => route.fullPath,
      (to) => {
        if (whiteList.includes(route.name as string)) {
          return;
        }
        state.activeKey = to;
        tabsViewStore.addTabs(getSimpleRoute(route as RouteItem));
        updateNavScroll(true);
      },
      { immediate: true }
    );

    // ??????????????????????????????????????????????????????????????????????????????
    window.addEventListener("beforeunload", () => {
      if (userStore.token !== null) {
        tabsViewStore.saveCurrentTabs();
      }
    });

    // ??????????????????
    const removeTab = (route: RouteItem) => {
      if (tabsList.value.length === 1) {
        return message.warning("????????????????????????????????????????????????");
      }
      delKeepAliveCompName();
      tabsViewStore.closeCurrentTab(route);
      // ???????????????????????????
      if (state.activeKey === route.fullPath) {
        const currentRoute =
          tabsList.value[Math.max(0, tabsList.value.length - 1)];
        state.activeKey = currentRoute.fullPath;
        router.push(currentRoute);
      }
      updateNavScroll();
    };

    // ????????????
    const reloadPage = () => {
      delKeepAliveCompName();
      router.push({
        path: PageEnum.REDIRECT + unref(route).fullPath,
      });
    };

    // ????????????????????????
    provide("reloadPage", reloadPage);

    // ????????????
    const closeLeft = (route: RouteItem) => {
      tabsViewStore.closeLeftTabs(route);
      state.activeKey = route.fullPath;
      router.replace(route.fullPath);
      updateNavScroll();
    };

    // ????????????
    const closeRight = (route: RouteItem) => {
      tabsViewStore.closeRightTabs(route);
      state.activeKey = route.fullPath;
      router.replace(route.fullPath);
      updateNavScroll();
    };

    // ????????????
    const closeOther = (route: RouteItem) => {
      tabsViewStore.closeOtherTabs(route);
      state.activeKey = route.fullPath;
      router.replace(route.fullPath);
      updateNavScroll();
    };

    // ????????????
    const closeAll = () => {
      tabsViewStore.closeAllTabs();
      router.replace(PageEnum.BASE_HOME);
      updateNavScroll();
    };

    // tab ??????
    const closeHandleSelect = (key: string) => {
      switch (key) {
        // ??????
        case "1":
          reloadPage();
          break;
        // ??????
        case "2":
          removeTab(route as RouteItem);
          break;
        // ????????????
        case "3":
          closeOther(route as RouteItem);
          break;
        // ????????????
        case "4":
          closeAll();
          break;
        default:
          break;
      }
      updateNavScroll();
      state.showDropdown = false;
    };

    /**
     * @param value ?????????????????????
     * @param amplitude ?????????????????????
     */
    function scrollTo(value: number, amplitude: number): number | void {
      const currentScroll = navScroll.value.scrollLeft;
      const scrollWidth =
        (amplitude > 0 && currentScroll + amplitude >= value) ||
        (amplitude < 0 && currentScroll + amplitude <= value)
          ? value
          : currentScroll + amplitude;
      navScroll.value && navScroll.value.scrollTo(scrollWidth, 0);
      if (scrollWidth === value) {
        return;
      }
      return window.requestAnimationFrame(() => scrollTo(value, amplitude));
    }

    function scrollPrev() {
      const containerWidth = navScroll.value.offsetWidth;
      const currentScroll = navScroll.value.scrollLeft;

      if (!currentScroll) {
        return;
      }
      const scrollLeft =
        currentScroll > containerWidth ? currentScroll - containerWidth : 0;
      scrollTo(scrollLeft, (scrollLeft - currentScroll) / 20);
    }

    function scrollNext() {
      const containerWidth = navScroll.value.offsetWidth;
      const navWidth = navScroll.value.scrollWidth;
      const currentScroll = navScroll.value.scrollLeft;

      if (navWidth - currentScroll <= containerWidth) {
        return;
      }
      const scrollLeft =
        navWidth - currentScroll > containerWidth * 2
          ? currentScroll + containerWidth
          : navWidth - containerWidth;
      scrollTo(scrollLeft, (scrollLeft - currentScroll) / 20);
    }

    /**
     * @param autoScroll ??????????????????????????????
     */
    async function updateNavScroll(autoScroll?: boolean) {
      await nextTick();
      if (!navScroll.value) {
        return;
      }
      const containerWidth = navScroll.value.offsetWidth;
      const navWidth = navScroll.value.scrollWidth;

      if (containerWidth < navWidth) {
        state.scrollable = true;
        if (autoScroll) {
          const tagList =
            navScroll.value.querySelectorAll(".tabs-card-scroll-item") || [];
          [...tagList].forEach((tag: HTMLElement) => {
            // fix SyntaxError
            if (tag.id === `tag${state.activeKey.split("/").join("/")}`) {
              tag.scrollIntoView && tag.scrollIntoView();
            }
          });
        }
      } else {
        state.scrollable = false;
      }
    }

    function handleResize() {
      updateNavScroll(true);
    }

    function handleContextMenu(e: MouseEvent, item: RouteItem) {
      e.preventDefault();
      isCurrent.value = PageEnum.BASE_HOME === item.path;
      state.showDropdown = false;
      nextTick().then(() => {
        state.showDropdown = true;
        state.dropdownX = e.clientX;
        state.dropdownY = e.clientY;
      });
    }

    function onClickOutside() {
      state.showDropdown = false;
    }

    // tags ????????????
    function goPage(e: RouteItem) {
      const { fullPath } = e;
      if (fullPath === route.fullPath) {
        return;
      }
      state.activeKey = fullPath;
      go(e as RouteLocationRawEx, true);
    }

    // ??????tab
    function closeTabItem(e: RouteItem) {
      const { fullPath } = e;
      const routeInfo = tabsList.value.find(
        (item: RouteItem) => item.fullPath === fullPath
      );
      removeTab(routeInfo);
    }

    onMounted(() => {
      onElementResize();
    });

    function onElementResize() {
      const observer = elementResizeDetectorMaker();
      observer.listenTo(navWrap.value, handleResize);
    }

    return {
      ...toRefs(state),
      navWrap,
      navScroll,
      route,
      tabsList,
      goPage,
      closeTabItem,
      closeLeft,
      closeRight,
      closeOther,
      closeAll,
      reloadPage,
      TabsMenuOptions,
      closeHandleSelect,
      scrollNext,
      scrollPrev,
      handleContextMenu,
      onClickOutside,
    };
  },
});
</script>

<style lang="scss" scoped>
.tabs-view {
  margin: 5px;
  display: flex;
  transition: all 0.2s ease-in-out;
  background-color: #fff;
  &-main {
    height: 32px;
    display: flex;
    width: 100%;
    .tabs-card {
      -webkit-box-flex: 1;
      flex-grow: 1;
      flex-shrink: 1;
      overflow: hidden;
      position: relative;

      .tabs-card-prev,
      .tabs-card-next {
        width: 32px;
        text-align: center;
        position: absolute;
        line-height: 32px;
        cursor: pointer;

        .n-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 32px;
          width: 32px;
        }
      }

      .tabs-card-prev {
        left: 0;
      }

      .tabs-card-next {
        right: 0;
      }

      .tabs-card-next-hide,
      .tabs-card-prev-hide {
        display: none;
      }

      &-scroll {
        white-space: nowrap;
        overflow: hidden;

        &-item {
          background: #fff;
          color: #1f2225;
          margin: 2px;
          height: 28px;
          line-height: 28px;
          padding: 0 10px;
          cursor: pointer;
          display: inline-block;
          position: relative;
          flex: 0 0 auto;
          border: 1px solid #ddd;
          border-radius: 3px;
          span {
            float: left;
            vertical-align: middle;
          }

          &:hover {
            color: #515a6e;
          }

          .n-icon {
            height: 22px;
            width: 21px;
            margin-right: -6px;
            position: relative;
            vertical-align: middle;
            text-align: center;
            color: #808695;

            &:hover {
              color: #515a6e !important;
            }

            svg {
              height: 21px;
              display: inline-block;
            }
          }
        }

        .active-item {
          color: $primary-color;
        }
      }
    }

    .tabs-card-scrollable {
      padding: 0 32px;
      overflow: hidden;
    }
  }

  .tabs-close {
    min-width: 32px;
    width: 32px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    background: var(--color);
    border-radius: 2px;
    cursor: pointer;
    //margin-right: 10px;

    &-btn {
      color: var(--color);
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
