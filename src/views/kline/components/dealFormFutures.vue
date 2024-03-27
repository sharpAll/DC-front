<template>
  <div class="flex flex-col h-full">
    <div class="flex flex-col border-gray-200 border-b overflow-y-auto">
      <div class="text-center pt-1 text-base font-medium">螺纹钢2303</div>
      <div class="text-center text-base text-up border-gray-200 border-b">
        3900.20&nbsp;&nbsp;&nbsp;&nbsp;3.75%
      </div>
      <div class="text-center text-xs flex border-gray-200 border-b">
        <div class="flex-1">涨停：<span class="text-up">4100.62</span></div>
        <div class="flex-1">跌停：<span class="text-down">3370.06</span></div>
      </div>
      <div class="p-2px text-xs border-gray-200 border-b">
        <div class="flex">
          <div class="flex-1 text-left">卖五</div>
          <div class="flex-1 text-center">
            <span class="text-up cursor-pointer" @click="selectPrice"
              >3909.79</span
            >
          </div>
          <div class="flex-1 text-right">12</div>
        </div>
        <div class="flex">
          <div class="flex-1 text-left">卖四</div>
          <div class="flex-1 text-center">
            <span class="text-up cursor-pointer" @click="selectPrice"
              >3908.78</span
            >
          </div>
          <div class="flex-1 text-right">12</div>
        </div>
        <div class="flex">
          <div class="flex-1 text-left">卖三</div>
          <div class="flex-1 text-center">
            <span class="text-up cursor-pointer" @click="selectPrice"
              >3907.77</span
            >
          </div>
          <div class="flex-1 text-right">12</div>
        </div>
        <div class="flex">
          <div class="flex-1 text-left">卖二</div>
          <div class="flex-1 text-center">
            <span class="text-up cursor-pointer" @click="selectPrice"
              >3906.76</span
            >
          </div>
          <div class="flex-1 text-right">12</div>
        </div>
        <div class="flex">
          <div class="flex-1 text-left">卖一</div>
          <div class="flex-1 text-center">
            <span class="text-up cursor-pointer" @click="selectPrice"
              >3905.75</span
            >
          </div>
          <div class="flex-1 text-right">12</div>
        </div>
      </div>
      <div class="p-2px text-xs border-gray-200 border-b">
        <div class="flex">
          <div class="flex-1 text-left">买一</div>
          <div class="flex-1 text-center">
            <span class="text-up cursor-pointer" @click="selectPrice"
              >3904.74</span
            >
          </div>
          <div class="flex-1 text-right">12</div>
        </div>
        <div class="flex">
          <div class="flex-1 text-left">买二</div>
          <div class="flex-1 text-center">
            <span class="text-up cursor-pointer" @click="selectPrice"
              >3903.73</span
            >
          </div>
          <div class="flex-1 text-right">12</div>
        </div>
        <div class="flex">
          <div class="flex-1 text-left">买三</div>
          <div class="flex-1 text-center">
            <span class="text-up cursor-pointer" @click="selectPrice"
              >3902.72</span
            >
          </div>
          <div class="flex-1 text-right">12</div>
        </div>
        <div class="flex">
          <div class="flex-1 text-left">买四</div>
          <div class="flex-1 text-center">
            <span class="text-up cursor-pointer" @click="selectPrice"
              >3901.71</span
            >
          </div>
          <div class="flex-1 text-right">12</div>
        </div>
        <div class="flex">
          <div class="flex-1 text-left">买五</div>
          <div class="flex-1 text-center">
            <span class="text-up cursor-pointer" @click="selectPrice"
              >3900.70</span
            >
          </div>
          <div class="flex-1 text-right">12</div>
        </div>
      </div>
      <div class="p-2px text-xs mr-17px">
        <div class="flex">
          <div class="flex-1 text-left">时间</div>
          <div class="flex-1 text-center">价格</div>
          <div class="flex-1 text-right">现量</div>
          <div class="flex-1 text-right">增仓</div>
          <div class="flex-1 text-right">性质</div>
        </div>
      </div>
      <div class="flex-auto text-xs overflow-y-auto">
        <div v-for="n in 100" :key="n" class="flex">
          <div class="flex-1 text-left">14:19:10</div>
          <div class="flex-1 text-center">3785</div>
          <div class="flex-1 text-right">2</div>
          <div class="flex-1 text-right">-2</div>
          <div class="flex-1 text-right">双平</div>
        </div>
      </div>
    </div>
    <div class="h-300px flex-shrink-0 flex flex-col">
      <div class="flex-auto border-gray-200 border-b text-center pt-4">
        <n-radio-group v-model:value="dealType" type="small" name="type">
          <n-radio-button value="bo" label="买/开" />
          <n-radio-button value="so" label="卖/开" />
        </n-radio-group>
        <n-radio-group
          v-model:value="dealType"
          type="small"
          name="type"
          class="mt-2"
        >
          <n-radio-button value="bc" label="买/平" />
          <n-radio-button value="sc" label="卖/平" />
        </n-radio-group>
        <div class="mt-4 mx-2">
          <div class="flex items-center mb-2">
            <div class="w-70px">委托价格</div>
            <div class="flex-1">
              <n-input-number
                v-model:value="dealForm.price"
                clearable
                placeholder="元"
              />
            </div>
          </div>
          <div class="flex items-center">
            <div class="w-70px">委托数量</div>
            <div class="flex-1">
              <n-input-number
                v-model:value="dealForm.count"
                clearable
                placeholder="手"
              />
            </div>
          </div>
        </div>
        <div class="text-center pt-4 px-2">
          <template v-if="dealType == 'bo'"
            ><n-button type="error" block>买入开仓</n-button>
          </template>
          <template v-else-if="dealType == 'bc'"
            ><n-button type="error" ghost block>买入平仓</n-button>
          </template>
          <template v-else-if="dealType == 'so'"
            ><n-button type="primary" block>卖出开仓</n-button>
          </template>
          <template v-else
            ><n-button type="primary" ghost block>卖出平仓</n-button></template
          >
        </div>
      </div>
      <!-- <div class="h-50px text-center pt-2">
        <n-button class="mr-6" @click="checkList">查 询</n-button>
        <template v-if="dealType == 'bo'"
          ><n-button type="error">买入开仓</n-button>
        </template>
        <template v-else-if="dealType == 'bc'"
          ><n-button type="error" ghost>买入平仓</n-button>
        </template>
        <template v-else-if="dealType == 'so'"
          ><n-button type="primary">卖出开仓</n-button>
        </template>
        <template v-else
          ><n-button type="primary" ghost>卖出平仓</n-button></template
        >
      </div> -->
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
const emit = defineEmits(["show-detail-list"]);
const dealType = ref("bo");
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
