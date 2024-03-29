import type { App } from "vue";
import {
  create,
  NMessageProvider,
  NDialogProvider,
  NGrid,
  NGridItem,
  NSpace,
  NButton,
  NIcon,
  NDropdown,
  NForm,
  NFormItem,
  NInput,
  NInputNumber,
  NSelect,
  NSwitch,
  NCheckboxGroup,
  NCheckbox,
  NRadio,
  NRadioGroup,
  NRadioButton,
  NDataTable,
  NDrawer,
  NDrawerContent,
  NTooltip,
  NModal,
  NDivider,
  NTabs,
  NTabPane,
  NUpload,
} from "naive-ui";
import "vfonts/Lato.css";

const naive = create({
  components: [
    NMessageProvider,
    NDialogProvider,
    NGrid,
    NGridItem,
    NSpace,
    NButton,
    NIcon,
    NDropdown,
    NForm,
    NFormItem,
    NInput,
    NInputNumber,
    NSelect,
    NSwitch,
    NCheckboxGroup,
    NCheckbox,
    NRadio,
    NRadioGroup,
    NRadioButton,
    NDataTable,
    NDrawer,
    NDrawerContent,
    NTooltip,
    NModal,
    NDivider,
    NTabs,
    NTabPane,
    NUpload,
  ],
});

export function installNaiveUI(app: App<Element>) {
  app.use(naive);
}
