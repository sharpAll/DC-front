<template>
  <div class="flex flex-col h-full">
    <div class="flex flex-col border-gray-200 border-b overflow-y-auto">
      <div class="text-center pt-1 text-base font-medium">贵州茅台</div>
      <div class="text-center text-base text-down border-gray-200 border-b">
        1903.20&nbsp;&nbsp;&nbsp;&nbsp;-1.77%
      </div>
      <div class="text-center text-xs flex border-gray-200 border-b">
        <div class="flex-1">涨停：<span class="text-up">2109.62</span></div>
        <div class="flex-1">跌停：<span class="text-down">1726.06</span></div>
      </div>
      <div class="p-2px text-xs border-gray-200 border-b">
        <div class="flex">
          <div class="flex-1 text-left">卖五</div>
          <div class="flex-1 text-center">
            <span class="text-down cursor-pointer" @click="selectPrice">1897.79</span>
          </div>
          <div class="flex-1 text-right">12</div>
        </div>
        <div class="flex">
          <div class="flex-1 text-left">卖四</div>
          <div class="flex-1 text-center">
            <span class="text-down cursor-pointer" @click="selectPrice">1897.78</span>
          </div>
          <div class="flex-1 text-right">12</div>
        </div>
        <div class="flex">
          <div class="flex-1 text-left">卖三</div>
          <div class="flex-1 text-center">
            <span class="text-down cursor-pointer" @click="selectPrice">1897.77</span>
          </div>
          <div class="flex-1 text-right">12</div>
        </div>
        <div class="flex">
          <div class="flex-1 text-left">卖二</div>
          <div class="flex-1 text-center">
            <span class="text-down cursor-pointer" @click="selectPrice">1897.76</span>
          </div>
          <div class="flex-1 text-right">12</div>
        </div>
        <div class="flex">
          <div class="flex-1 text-left">卖一</div>
          <div class="flex-1 text-center">
            <span class="text-down cursor-pointer" @click="selectPrice">1897.75</span>
          </div>
          <div class="flex-1 text-right">12</div>
        </div>
      </div>
      <div class="p-2px text-xs border-gray-200 border-b">
        <div class="flex">
          <div class="flex-1 text-left">买一</div>
          <div class="flex-1 text-center">
            <span class="text-down cursor-pointer" @click="selectPrice">1897.74</span>
          </div>
          <div class="flex-1 text-right">12</div>
        </div>
        <div class="flex">
          <div class="flex-1 text-left">买二</div>
          <div class="flex-1 text-center">
            <span class="text-down cursor-pointer" @click="selectPrice">1897.73</span>
          </div>
          <div class="flex-1 text-right">12</div>
        </div>
        <div class="flex">
          <div class="flex-1 text-left">买三</div>
          <div class="flex-1 text-center">
            <span class="text-down cursor-pointer" @click="selectPrice">1897.72</span>
          </div>
          <div class="flex-1 text-right">12</div>
        </div>
        <div class="flex">
          <div class="flex-1 text-left">买四</div>
          <div class="flex-1 text-center">
            <span class="text-down cursor-pointer" @click="selectPrice">1897.71</span>
          </div>
          <div class="flex-1 text-right">12</div>
        </div>
        <div class="flex">
          <div class="flex-1 text-left">买五</div>
          <div class="flex-1 text-center">
            <span class="text-down cursor-pointer" @click="selectPrice">1897.70</span>
          </div>
          <div class="flex-1 text-right">12</div>
        </div>
      </div>
      <div class="p-2px text-xs mr-17px">
        <div class="flex">
          <div class="flex-1 text-left">时间</div>
          <div class="flex-1 text-center">价格</div>
          <div class="flex-1 text-right">现量</div>
        </div>
      </div>
      <div class="flex-auto text-xs overflow-y-auto">
        <div v-for="n in 100" :key="n" class="flex">
          <div class="flex-1 text-left">14:19:10</div>
          <div class="flex-1 text-center">1892.20</div>
          <div class="flex-1 text-right">2</div>
        </div>
      </div>
    </div>
    <div class="h-299px flex-shrink-0 flex flex-col">
      <div class="flex-auto border-gray-200 border-b text-center pt-4">
        <n-radio-group v-model:value="dealType">
          <n-radio-button value="buy" label="买 入" />
          <n-radio-button value="sell" label="卖 出" />
        </n-radio-group>
        <div class="mt-4 mx-2">
          <div class="flex items-center mb-2">
            <div class="w-70px">委托价格</div>
            <div class="flex-1">
              <n-input-number v-model:value="dealForm.price" clearable placeholder="元" />
            </div>
          </div>
          <template v-if="dealType == 'buy'">
            <div class="flex mb-2">
              <div class="w-70px">可用资金</div>
              <div class="flex-1 text-left">1000000</div>
            </div>
            <div class="flex mb-2">
              <div class="w-70px">最多可买</div>
              <div class="flex-1 text-left">900 股</div>
            </div>
          </template>
          <template v-else>
            <div class="flex mb-2">
              <div class="w-70px">最多可卖</div>
              <div class="flex-1 text-left">900 股</div>
            </div>
          </template>
          <div class="flex items-center">
            <div class="w-70px">委托数量</div>
            <div class="flex-1">
              <n-input-number v-model:value="dealForm.count" :step="100" clearable placeholder="股" />
            </div>
          </div>
        </div>
        <div class="text-center pt-4 px-2">
          <template v-if="dealType == 'buy'">
            <n-button type="error" block>确认买入</n-button>
          </template>
          <template v-else>
            <n-button type="primary" block>确认卖出</n-button>
          </template>
        </div>
      </div>
      <!-- <div class="h-50px text-center pt-2">
        <n-button class="mr-6" @click="checkList">查 询</n-button>
        <template v-if="dealType == 'buy'"><n-button type="error">确认买入</n-button></template>
        <template v-else><n-button type="primary">确认卖出</n-button></template>
      </div> -->
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
const emit = defineEmits(["show-detail-list"]);
const dealType = ref("buy");
interface DealForm {
  price: null | number;
  count: null | number;
}
const dealForm = ref<DealForm>({
  price: null,
  count: null,
});
const checkList = () => {
  emit("show-detail-list");
};
const selectPrice = (e: any) => {
  dealForm.value.price = Number(e.currentTarget.innerText);
};
</script>
