<script setup>
import { ref, onMounted, reactive } from 'vue';
import Header from '../../components/admin/Header.vue';
import Footer from '../../components/admin/Footer.vue';
import axios from '@/common/axios.js';
import { cloneDeep } from 'lodash-es';
import { formatDateTime } from '@/common';
import { listGame } from '../../common/constants';
import { useRouter } from 'vue-router';
import { layer } from '@layui/layer-vue';

const router = useRouter();
const settingGame = ref(null)

onMounted(() => {
    axios.get('/setting').then((res) => {
        console.log(res);
        settingGame.value = res;
    });
});

const onFinish = async () => {
    const settingSave = await axios.put('/setting', settingGame.value)
    if (settingSave) {
        layer.msg('Lưu thành công', {
            icon: 1,
            time: 1000
        });
    } else {
        layer.msg('Lưu thất bại', {
            icon: 2,
            time: 1000
        });
    }
}

</script>
<template>
    <a-layout>
        <Header selectedKeys="2"></Header>
        <a-layout-content style="padding: 20px 50px">
            <div :style="{ background: '#fff', padding: '12px', minHeight: 'calc(100vh - 190px)' }">
                <h3>Cài đặt</h3>
                <a-select name="value" v-if="settingGame" v-model:value="settingGame.value" style="width: 100%">
                    <a-select-option value="1.98">1.98</a-select-option>
                    <a-select-option value="2.1">2.1</a-select-option>
                </a-select>
                <div style="margin-top: 20px;">
                    <a-button type="primary" style="width: 100%" html-type="button" @click="onFinish">Lưu</a-button>

                </div>
            </div>
        </a-layout-content>
        <Footer></Footer>
    </a-layout>
</template>

<style>
#app {
    margin: 0;
    max-width: 100% !important;
    overflow-x: hidden;
}

.list_game_item .ant-space-item {
    width: 25%;
    min-height: 100px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

}

.bg_game {
    min-height: 100px;
    background-image: url(@/assets/images/icons/games/bg.png);
    background-size: cover;
    background-position: center;
    width: 100%;
    text-align: center;
    padding: 10px;
    cursor: pointer;
}

.bg_game:hover {
    opacity: 0.5;
}
</style>