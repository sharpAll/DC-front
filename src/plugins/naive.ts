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
  NDataTable,
  NDrawer,
  NDrawerContent,
  NTooltip,
  NModal,
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
    NDataTable,
    NDrawer,
    NDrawerContent,
    NTooltip,
    NModal,
  ],
});

export function installNaiveUI(app: App<Element>) {
  app.use(naive);
}
