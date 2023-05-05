<template>
    <div class="job">
        <div class="box">
            <div class="banner">和优秀的人，做有挑战的事</div>
            <!-- 搜索 -->
            <div class="search-wrapper" :class="{ fixedTop: searchBarFixedTop }">
                <el-input :class="[{ medium: searchBarFixedTop }, 'small']" placeholder="搜索职位" @change="search"
                    v-model="searchKeyword">
                    <template #prefix>
                        <el-icon>
                            <Search />
                        </el-icon>
                    </template>
                </el-input>
                <el-button :class="[{ medium: searchBarFixedTop }, 'small']" type="primary" round
                    @click="search">搜索</el-button>
            </div>
            <div class="main">
                <div class="aside-filter">
                    <div class="aside-header">
                        <span>筛选</span>
                        <span :class="{ clearable }" class="clear" @click="clearFilter">清空</span>
                    </div>
                    <div class="job-category job-filter-block">
                        <div class="title">职位类别</div>
                        <el-tree ref="jobCategory" :data="jobCategories" :props="jobCategoryProps" node-key="id"
                            check-on-click-node @check="jobCategoryChange" show-checkbox></el-tree>
                    </div>
                    <div class="city-category job-filter-block">
                        <div class="title">城市</div>
                        <CheckBoxAndDropdown @changed="cityChange" :data="jobCities" :cityList="location_code_list">{{
                            location_code_list }}</CheckBoxAndDropdown>
                    </div>
                </div>
                <div class="content">
                    <h2 class="content-title" v-show="results.total">
                        开启新的工作 ({{ results.total }})
                    </h2>
                    <h2 class="content-title" v-show="!(results.total)">开启新的工作 (0)</h2>
                    <ul class="content-list">
                        <li class="content-item is-hover-shadow" v-for="item in results.job_post_list" :key="item.id">
                            <router-link :to="`/job/${item.id}`">
                                <h3 class="title">{{ item.title }}</h3>
                                <div class="subTitle">
                                    <span class="city">{{ item.aw_city_info.name }}</span>&nbsp;|
                                    <span class="job_category">{{ item.aw_job_category.name }}</span>
                                </div>
                                <p class="desc">{{ item.description }}</p>
                            </router-link>
                        </li>
                    </ul>
                    <div v-show="!loading" class="pagination-wrapper">
                        <el-pagination layout="prev, pager, next" v-model:current-page="currentPage" :total="results.total"
                            :hide-on-single-page="singlePage"></el-pagination>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { reqGetJobFilter, reqGetJobList } from '@/api/job';
import CheckBoxAndDropdown from '@/components/web/CheckBoxAndDropdown.vue';

import { useHeaderStore } from '@/stores/handleHead';
import { Search } from '@element-plus/icons-vue';
import { computed, onBeforeMount, onMounted, ref } from 'vue';

// interface Result {
//     total?: number;
//     job_post_list?: any[];
//     limit?: number;
// }

// interface JobCategories {
//     children?: string;
//     label?: string
// }
const jobCategory = ref();
const store = useHeaderStore();
const singlePage = ref(false);
const searchBarFixedTop = ref(false);
const loading = ref(false);
const searchKeyword = ref("");
const currentPage = ref(1);
const pageSize = ref(10);
const scrollTop = ref(0);
const oldScrollTop = ref(0);
const jobCategories = ref([]);
const jobCities = ref([]);
const job_category_id_list = ref([]);
const location_code_list = ref([]);
const results = ref<{
    total: number;
    job_post_list: any[];
    limit: number;
}>({
    total: 0,
    job_post_list: [],
    limit: 0,
});
const jobCategoryProps = ref({
    children: 'children',
    label: 'name'
})

// const results: Result = reactive({
//     total: 0,
//     job_post_list: [],
//     limit: 0
// });
// const jobCategoryProps: JobCategories = reactive({
//     children: 'children',
//     label: 'name'
// })

// onBeforeRouteLeave((to, from, next) => {
//     if (from.name === 'product') {
//         store.setNavDarkActive(false);
//         next();
//     }
// });

const clearable = computed(() => job_category_id_list.value.length !== 0 ||
    location_code_list.value.length !== 0);

onBeforeMount(() => {
    getJobConfigRequest();
    getJobList();
});

onMounted(() => {
    store.setShadowActive(false);
    store.setNavDarkActive(true);
    store.setHeaderShow(false);
    window.addEventListener('scroll', scrollHandle);
});

function search() {
    getJobList();
}

function jobCategoryChange() {
    job_category_id_list.value = jobCategory.value.getCheckedKeys({ leafOnly: true });
    getJobList();
}
// 清除
function clearFilter() {
    if (job_category_id_list.value.length) {
        job_category_id_list.value = [];
        jobCategory.value.setCheckedKeys(job_category_id_list.value, { leafOnly: true });
    }
    if (location_code_list.value.length) {
        location_code_list.value = [];
    }
    // console.log(this.queryFilter)
    getJobList();
}

function cityChange(value: any) {
    location_code_list.value = value;
    getJobList();
}

// 请求职位列表
async function getJobList() {
    loading.value = true;
    const { data: res } = await reqGetJobList({
        currentPage: currentPage.value,
        job_category_id_list: job_category_id_list.value,
        pageSize: pageSize.value,
        keyword: searchKeyword.value,
        location_code_list: location_code_list.value
    });
    if (res.status === 200) {
        results.value = res.data;
        loading.value = false;
        if (results.value.total <= results.value.limit) {
            singlePage.value = true;
        }
    }
}

// 请求筛选条件
async function getJobConfigRequest() {
    const { data: res } = await reqGetJobFilter();
    if (res.status === 200) {
        jobCities.value = res.data.city_list;
        jobCategories.value = res.data.job_type_list;
    }
}

function scrollHandle() {
    scrollTop.value =
        document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
    oldScrollTop.value = scrollTop.value;
    if (scrollTop.value >= 350) {
        store.setHeaderShow(true);
    } else {
        store.setHeaderShow(false);
    }
    searchBarFixedTop.value = scrollTop.value >= 430;
}

</script>
<style lang="less" scoped>
.job_header {

}

.box {
    padding-top: 60px;
    min-height: 860px;
    width: 100%;

    * {
        box-sizing: border-box;
    }

    .banner {
        height: 400px;
        line-height: 400px;
        color: #fff;
        width: 100%;
        min-width: @main-width;
        background-image: url('//lf1-cdn-tos.bytescm.com/obj/static/ies/bytedance_official/_next/static/images/3-9ea22bd593086f432ab75ee6c95c37de.png');
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        text-align: center;
        font-size: @font-size-larger;

    }
}

.search-wrapper {
    position: absolute;
    transform: translateY(-50%);
    width: 100%;

    &.fixedTop {
        position: fixed;
        box-shadow: 0 2px 16px 0 rgba(31, 35, 41, 5%);
        top: 0;
        transform: translateY(0);
        padding: 15px 0;
        z-index: 1000;
        transition: all 0.3s;
    }

    :deep(.el-input) {
        width: 50%;
        left: 50%;
        transform: translateX(-50%);

        &.medium {
            width: 64%;
        }

        .el-input__wrapper {
            border-radius: 30px;
        }
    }

    :deep(.el-input__inner) {
        height: 50px;
        border-radius: 30px;
    }

    .el-button {
        position: absolute;
        line-height: 0;
        height: 50px;
        border-radius: 0 25px 25px 0;
        right: 25%;

        &.medium {
            right: 18%;
        }
    }
}

.main {
    width: 1026px;
    min-height: 400px;
    margin: 80px auto 60px;
    display: flex;

    .aside-filter {
        width: 275px;
        height: auto;
        padding-right: 35px;
        border-right: 1px solid @border-light-color;
    }

    .aside-header {
        font-size: 14px;
        font-weight: 700;
        color: #1f2329;
        border-bottom: 1px solid @border-lighter-color;
        padding-bottom: 12px;
        margin-top: 10px;
        margin-bottom: 23px;

        .clear {
            float: right;
            font-weight: normal;
            cursor: pointer;
        }

        .clearable {
            color: @main-color;
        }
    }

    .job-filter-block {
        margin-bottom: 39px;
        position: relative;
        height: auto;

        .title {
            font-size: 20px;
            font-weight: 700;
            color: @primary-text-color;
            margin-bottom: 9px;
        }
    }

    .content {
        width: 712px;
        height: auto;

        padding-left: 24px;
    }

    .content-title {
        font-size: 30px;
        line-height: 36px;
        height: 36px;
        font-weight: 700;
        margin-left: 16px;
        margin-bottom: 18px;
    }

    .content-list {
        margin-top: 22px;
    }

    .content-item {
        padding: 20px;
        transition: box-shadow .5s;

        &.is-hover-shadow:hover {
            box-shadow: 0 8px 24px 0 rgba(187, 191, 197, 0.2);
            border-radius: 5px;
        }

        .title {
            margin: 12px 0;
            font-size: 20px;
            font-weight: 600;
            line-height: 1.6;
        }

        .subTitle {
            flex-wrap: wrap;
            font-size: 16px;
            font-weight: 500;
            line-height: 1.5;
            color: #646a73;
            margin: 4px 0 12px;
        }

        .desc {
            width: 664px;
            max-height: 44px;
            font-size: 14px;
            font-weight: 500;
            font-style: normal;
            font-stretch: normal;
            line-height: 1.57;
            // 文本间距-每个字之间的距离
            letter-spacing: normal;
            color: #8f959e;
            overflow: hidden;
            // div容器内的文本无法完全显示，裁剪效果...
            text-overflow: ellipsis;
            display: -webkit-box;
            white-space: pre-line;
            -webkit-line-clamp: 2;
        }
    }

    a {
        color: rgba(0, 0, 0, 1);
        overflow: hidden;
        cursor: pointer;
    }
}
</style>

<style lang="less">
.el-tree {
    color: @primary-text-color;
    font-size: 14px;
    font-variant: tabular-nums;
    line-height: 1.5;
    list-style: none;
    -webkit-font-feature-settings: "tnum";
    font-feature-settings: "tnum";
    margin: 0;
    padding: 0;

    >.el-tree-node:first-child {
        margin-top: 8px;
    }

    .el-tree-node__content {
        height: 38px;
    }

    .el-tree-node__label {
        font-size: 16px;
    }

    .el-tree-node__expand-icon {
        color: #9ca2a9;
    }
}

.el-pagination {
    margin-top: 20px;
}
</style>