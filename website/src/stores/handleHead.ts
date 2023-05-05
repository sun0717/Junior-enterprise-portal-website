import { defineStore } from 'pinia';

export const useHeaderStore = defineStore('headerContent', {
    state: () => ({
        BannerHeight: 0,
        headerShadowActive: false,
        headerShow: false,
        navDarkActive: false,
        articlePath: ''
    }),

    getters: {
        getBannerHeight: (state) => state.BannerHeight,
    },

    actions: {
        setBannerHeight (value: number) {
            // state.BannerHeight = value.bannerHeight
            this.BannerHeight = value;
        },
        async setArticlePath(path: string) {
            await new Promise(resolve => this.articlePath = path);
        },
        setShadowActive (value: boolean) {
            this.headerShadowActive = value;
        },
        setNavDarkActive (value: boolean) {
            this.navDarkActive = value
        },
        setHeaderShow (value: boolean) {
            this.headerShow = value
        }
    },
})