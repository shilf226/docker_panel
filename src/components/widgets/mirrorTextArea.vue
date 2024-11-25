<template>
    <!-- :indent-with-tab="true" 是否自动获取焦点-->
    <codemirror v-model="props.code" placeholder="Code gose here..." :style="{ height:  height }" :autofocus="true"
        :tabSize="2" :extensions="extensions" />
</template>

<script lang="ts" setup>
import { Codemirror } from "vue-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";
import { ref } from "vue";
import { EditorView } from "@codemirror/view"

let myTheme = EditorView.theme()
interface IProps {
    height?: string,
    code?: string
}
// 接受的参数
const props = withDefaults(defineProps<IProps>(), {
    height: '',
    code: ''

})
const code = ref(``);
const extensions = [javascript(), myTheme];
const Change = () => {

}
</script>
<style>
.ͼe ,.ͼb ,.ͼc{
    font-family: 'consola';
}
</style>