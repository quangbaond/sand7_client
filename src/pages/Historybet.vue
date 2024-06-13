<script setup>
import { getStorage } from '@/common'
import { onMounted, watch } from 'vue'
import { formatCurrency, formatDateTime } from '../common';
import iconDeposit from '@/assets/images/icons/profile/deposit.svg'
import { CaretRightOutlined, HomeOutlined } from '@ant-design/icons-vue';
import { ref } from 'vue';
import axios from '@/common/axios.js';
import { useRouter } from 'vue-router';
import { cloneDeep } from 'lodash-es';

const user = ref(getStorage('user'))
const staticUrl = import.meta.env.VITE_APP_STATIC_URL ?? 'http://localhost:3000'
const formattedBalanceUser = ref(formatCurrency(user.balance))
const formattedBetTodayUser = ref(formatCurrency(user.betToday))
const router = useRouter();
const dataSource = ref([]);
const columns = [
    {
        title: 'Phiên',
        dataIndex: 'sessionId',
        key: 'sessionId',
    },
    {
        title: 'Số đặt cược',
        dataIndex: 'betInUserText',
        key: 'betInUserText',
    },
    {
        title: 'Số tiền cược',
        dataIndex: 'amount',
        key: 'betDataText',
    },
    //resultSession
    {
        title: 'Kết quả',
        dataIndex: 'resultSession',
        key: 'resultSession',
    },
    {
        title: 'Thời gian',
        dataIndex: 'createdAt',
        key: 'createdAt',
        customRender: (text) => {
            return formatDateTime(text)
        }
    },

]

const updateData = (data) => {
    const valueToMessage = {
        1: "Lớn",
        2: "Nhỏ",
        3: "Lẻ",
        4: "Chẵn"
    };

    return data.map((item) => {
        const idToMessage = ["số đầu tiên", "số thứ hai", "số thứ ba", "số thứ tư", "số thứ năm"];

        // Tạo message cho từng betInUser
        const messages = item.betInUser.map((bet, index) => {
            const idMessage = idToMessage[index] || `số thứ ${index + 1}`;
            const valueMessage = valueToMessage[bet.value] || `value ${bet.value}`;
            return `${idMessage}: ${valueMessage}`;
        });

        // Ghép các message lại với nhau
        const finalMessage = messages.join(" - ");

        // Trả về đối tượng mới với các trường đã cập nhật
        return {
            ...item,
            sessionId: item.betData?.id,
            resultSession: item.betData.betData.join(','),
            betInUserText: finalMessage,
            createAt: formatDateTime(item.createdAt),
            amount: formatCurrency(item.amount)

        };
    });
};

onMounted(() => {
    // console.log(user)
    axios.get('/me/profile').then((res) => {
        user.value = res.user;
    }).catch((err) => {
        console.log(err);
        router.push('/login');
    });
    axios.get(`/me/historybet/${user.value?._id}`).then((res) => {
        const data = updateData(res.docs);
        dataSource.value = cloneDeep(data);
    }).catch((err) => {
        console.log(err);
    });
})
watch(user, (newVal) => {
    formattedBalanceUser.value = formatCurrency(newVal.balance);
    formattedBetTodayUser.value = formatCurrency(newVal.betToday);
})
</script>

<template>
    <div id="profile">
        <div class="info">
            <a-space align="center" style="display: flex; justify-content: space-around;">
                <HomeOutlined style="color: #fff; font-size: 25px; display: block;" @click="router.push('/')" />
                <a-avatar :size="64" :src="staticUrl + user.avatar" :alt="user.username"></a-avatar>
                <a-typography.Title style="color: #fff; font-size: 18px;">{{ user.username
                    }}</a-typography.Title>
            </a-space>
        </div>

        <div class="info_description">
            <a-row gutter="10" style="text-align: center; justify-content: center;">
                <a-col :span="8">
                    <a-space direction="vertical">
                        <a-typography.Title level="5" style="color: #5d636e; display: block; height: 30px;">
                            Số dư tài khoản
                        </a-typography.Title>
                        <a-typography.Title level="5" style="color: #fff; font-size: 20px;">
                            {{ formattedBalanceUser }}
                        </a-typography.Title>
                    </a-space>
                </a-col>
            </a-row>
        </div>

        <div class="action_money">
            <a-space style="width: 100%; display: flex; justify-content: space-around;">
                <a-button type="primary">
                    <a-space>
                        <img :src="iconDeposit" alt=""></img>
                        <span>Nạp tiền</span>
                    </a-space>
                </a-button>
                <a-button class="width_draw">
                    <a-space>
                        <img :src="iconDeposit" alt=""></img>
                        <span>Rút tiền</span>
                    </a-space>
                </a-button>
            </a-space>
        </div>

        <a-divider style="height: 1px; background-color: #ccc; margin: 0 10px"></a-divider>

        <div class="navigation">
            <h3 style="color: #ccc;">Lịch sử đặt cược</h3>
            <a-table :columns="columns" :dataSource="dataSource" bordered :hover="false" resizeColumn></a-table>
        </div>

    </div>
</template>

<style>
.navigation {
    padding: 15px;
}

.action_money {
    padding: 10px;
    background-color: #0f1d30;
    margin: 10px;
    border-radius: 15px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    text-align: center;
}

#profile {
    background-color: #0C192C;
    min-height: 100vh;
}

.width_draw {
    width: 100%;
    background-image: linear-gradient(124deg, #efdaaf, #dbb579);
}

.info_description {
    padding: 10px;
    background-color: #0f1d30;
    min-height: 100px;
    margin: 10px;
    border-radius: 15px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    margin-bottom: 0;
}

.info {
    padding-top: 20px;
    padding-left: 20px;
}

.ant-table {
    background-color: #0f1d30 !important;
    color: #fff !important;
}

.ant-table-row:hover .ant-table-cell {
    background-color: #0f1d30 !important;
}
</style>