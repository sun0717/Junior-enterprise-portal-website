<template>
    <div>
        <!--
            subfield：true 双栏（编辑预览同屏）, false：单栏（编辑预览分屏） 
            boxShadow: 开启边框阴影 
            defaultOpen：在单栏（subfield=false）时默认展示区域.  edit： 默认展示编辑区域  preview： 默认展示预览区域 其他 = edit 
            toolbarsFlag 工具栏是否显示
        -->
        <mavon-editor ref="md" v-model="parentContent" :subfield='false' :boxShadow='false' defaultOpen="preview"
            :toolbarsFlag="false" />
    </div>
</template>

<script lang="ts" setup>
    import { ref } from 'vue';
    const props = defineProps(['content']);
    const parentContent = ref(props.content);
</script>