<script setup>
import { getStorage } from '@/common'
import { onMounted } from 'vue'
import { formatCurrency } from '../common';
import iconDeposit from '@/assets/images/icons/profile/deposit.svg'
const user = getStorage('user')
const staticUrl = import.meta.env.VITE_APP_STATIC_URL ?? 'http://localhost:3000'
const formattedBalanceUser = formatCurrency(user.balance)
const formattedBetTodayUser = formatCurrency(user.betToday)
onMounted(() => {
    console.log(user)
})
</script>

<template>
    <div id="profile">
        <div class="info">
            <a-space>
                <a-avatar :size="64" :src="staticUrl + user.avatar" :alt="user.username"></a-avatar>
                <a-typography.Title style="color: #fff; font-size: 20px;"> Chào mừng, {{ user.username
                    }}</a-typography.Title>
            </a-space>
        </div>

        <div class="info_description">
            <a-row gutter="10" style="text-align: center;">
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
                <a-col :span="8">
                    <a-space direction="vertical">
                        <a-typography.Title level="5" style="color: #5d636e; display: block; height: 30px;">
                            Đặt cược hôm nay
                        </a-typography.Title>
                        <a-typography.Title level="5" style="color: #fff; font-size: 20px;">
                            {{ formattedBalanceUser }}
                        </a-typography.Title>
                    </a-space>
                </a-col>
                <a-col :span="8">
                    <a-space direction="vertical">
                        <a-typography.Title level="5" style="color: #5d636e; display: block; height: 30px;">
                            Lãi và lỗ hôm nay
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

        <a-divider style="height: 1px; background-color: #e5eee5; margin: 0 10px"></a-divider>

    </div>
</template>

<style>
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
</style>