<script setup>
import { HomeOutlined } from '@ant-design/icons-vue'
import { useRouter } from 'vue-router'
import { getStorage, formatCurrency } from '../common';
import { onMounted, ref, watch } from 'vue';
import { ReloadOutlined, ArrowDownOutlined } from '@ant-design/icons-vue';
import iconCoin10k from '@/assets/images/icons/games/coin/10k.png'
import iconCoin100k from '@/assets/images/icons/games/coin/100k.png'
import iconCoin1m from '@/assets/images/icons/games/coin/1m.png'
import iconCoin50k from '@/assets/images/icons/games/coin/50k.png'
import iconCoinAll from '@/assets/images/icons/games/coin/all.png'

const user = ref(getStorage('user'))
const formattedBalanceUser = ref(formatCurrency(user.value.balance))
const amount = ref('')
const formatNumber = () => {
    amount.value = amount.value.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}


const resultItem = [
    {
        id: 1,
        value: 1
    },
    {
        id: 2,
        value: 2
    },
    {
        id: 3,
        value: 3
    },
    {
        id: 4,
        value: 4
    },
    {
        id: 5,
        value: 5
    },

]
const resetBet = () => {
    betInUser.value = []
    amount.value = ''
}

// const changeBalance = (amount, calculation = '+') => {
//     if (calculation === '+') {
//         user.value.balance++
//         formattedBalanceUser.value = formatCurrency(user.value.balance)

//         setTimeout(() => {
//             if (user.value.balance < 1000) {

//             }
//             user.value.balance++
//             formattedBalanceUser.value = formatCurrency(user.value.balance)
//         }, 1000)

//     }

// }
const betInUser = ref([])
// watch amout change
watch(() => amount.value, (value) => {
    if (value === '') {
        amount.value = ''
    } else {
        amount.value = value.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    }
})


const onBetItem = (id, value) => {
    if (betInUser.value.findIndex(item => item.id === id && item.value === value) > -1) {
        const index = betInUser.value.findIndex(item => item.id === id && item.value === value)
        betInUser.value.splice(index, 1)
    } else {
        betInUser.value.push({ id, value })
    }
}
const onAmount = (value) => {
    if (value === 'all') {
        amount.value = user.value.balance.toString()

    } else {
        amount.value = value.toString()
    }
}
const router = useRouter()
</script>

<template>
    <div id="game">
        <div class="header">
            <a-space align="center" style="display: flex; justify-content: space-between;">
                <HomeOutlined style="color: #fff; font-size: 25px; display: block;" @click="router.push('/')" />

                <a-typography-text style="color: #fff; font-size: 14px; display: block;">
                    Số dư: {{ formattedBalanceUser }}
                </a-typography-text>
                <a-typography-text style="color: #fff; font-size: 14px; display: block;">
                    Nhiều màu
                </a-typography-text>
            </a-space>
        </div>
        <div class="result_wrap">
            <a-row>
                <a-col :span="11">
                    <a-typography-text
                        style="color: #fff; font-size: 16px; display: block; font-weight: 600; text-align: center;">
                        KQ mở thưởng
                    </a-typography-text>
                    <a-row span="10" style="justify-content: center;">
                        <a-col :span="6">
                            <a-typography-text class="result_item"
                                style="color: #fff; font-size: 16px; display: block; text-align: center;">
                                {{ resultItem[0].value }}
                            </a-typography-text>
                        </a-col>
                        <a-col :span="6">
                            <a-typography-text class="result_item"
                                style="color: #fff; font-size: 16px; display: block; text-align: center;">
                                {{ resultItem[1].value }}
                            </a-typography-text>
                        </a-col>
                        <a-col :span="6">
                            <a-typography-text class="result_item"
                                style="color: #fff; font-size: 16px; display: block; text-align: center;">
                                {{ resultItem[2].value }}
                            </a-typography-text>
                        </a-col>
                        <a-col :span="6">
                            <a-typography-text class="result_item"
                                style="color: #fff; font-size: 16px; display: block; text-align: center;">
                                {{ resultItem[3].value }}
                            </a-typography-text>
                        </a-col>
                        <a-col :span="6">
                            <a-typography-text class="result_item"
                                style="color: #fff; font-size: 16px; display: block; text-align: center;">
                                {{ resultItem[4].value }}
                            </a-typography-text>
                        </a-col>
                    </a-row>
                </a-col>
                <a-col :span="11">
                    <a-typography-text
                        style="color: #fff; font-size: 16px; display: block; font-weight: 600; text-align: center;">
                        Phiên id
                    </a-typography-text>
                    <a-typography-text
                        style="color: #ccc; font-size: 16px; display: block; font-weight: 600; text-align: center;">
                        1234561212
                    </a-typography-text>
                    <a-typography-text
                        style="color: #0d8ea7; font-size: 18px; display: block; font-weight: 600; text-align: center;">
                        <span id="hours">00:</span>
                        <span id="minutes">00:</span>
                        <span id="seconds">00</span>
                    </a-typography-text>
                </a-col>
                <a-col :span="2">
                    <ReloadOutlined style="color: #fff; font-size: 20px; font-weight: 900;" />
                </a-col>
            </a-row>
        </div>
        <div
            style="text-align: center; width: 25px; margin: auto; background-color: #0f1d30; height: 25px; display: flex; justify-content: center;">
            <ArrowDownOutlined style="color: #fff; font-size: 15px; font-weight: 900; align-self: center;" />
        </div>

        <div class="bet_wrap">
            <div class="bet">
                <a-typography-text
                    style="color: #fff; font-size: 16px; display: block; font-weight: 600; text-align: center; margin-bottom: 10px;">
                    Quả bóng đầu tiên
                </a-typography-text>
                <a-row :gutter="10">
                    <a-col :span="6">
                        <a-card
                            :class="{ 'onBet': betInUser.findIndex(item => item.id === 1 && item.value === 1) > -1 }"
                            @click="onBetItem(1, 1)">
                            <a-typography-text
                                style="color: #fff; font-size: 16px; display: block; text-align: center;">
                                Lớn
                            </a-typography-text>
                            <a-typography-text
                                style="color: #ccc; font-size: 14px; display: block; text-align: center;">
                                1.98
                            </a-typography-text>
                        </a-card>
                    </a-col>
                    <a-col :span="6">
                        <a-card
                            :class="{ 'onBet': betInUser.findIndex(item => item.id === 1 && item.value === 2) > -1 }"
                            @click="onBetItem(1, 2)">
                            <a-typography-text
                                style="color: #fff; font-size: 16px; display: block; text-align: center;">
                                Nhỏ
                            </a-typography-text>
                            <a-typography-text
                                style="color: #ccc; font-size: 14px; display: block; text-align: center;">
                                1.98
                            </a-typography-text>
                        </a-card>
                    </a-col>
                    <a-col :span="6">
                        <a-card
                            :class="{ 'onBet': betInUser.findIndex(item => item.id === 1 && item.value === 3) > -1 }"
                            @click="onBetItem(1, 3)">
                            <a-typography-text
                                style="color: #fff; font-size: 16px; display: block; text-align: center;">
                                Đơn
                            </a-typography-text>
                            <a-typography-text
                                style="color: #ccc; font-size: 14px; display: block; text-align: center;">
                                1.98
                            </a-typography-text>
                        </a-card>
                    </a-col>
                    <a-col :span="6">
                        <a-card
                            :class="{ 'onBet': betInUser.findIndex(item => item.id === 1 && item.value === 4) > -1 }"
                            @click="onBetItem(1, 4)">
                            <a-typography-text
                                style="color: #fff; font-size: 16px; display: block; text-align: center;">
                                Đôi
                            </a-typography-text>
                            <a-typography-text
                                style="color: #ccc; font-size: 14px; display: block; text-align: center;">
                                1.98
                            </a-typography-text>
                        </a-card>
                    </a-col>
                </a-row>
            </div>
            <div class="bet">
                <a-typography-text
                    style="color: #fff; font-size: 16px; display: block; font-weight: 600; text-align: center; margin-bottom: 10px;">
                    Quả bóng thứ 2
                </a-typography-text>
                <a-row :gutter="10">
                    <a-col :span="6">
                        <a-card
                            :class="{ 'onBet': betInUser.findIndex(item => item.id === 2 && item.value === 1) > -1 }"
                            @click="onBetItem(2, 1)">
                            <a-typography-text
                                style="color: #fff; font-size: 16px; display: block; text-align: center;">
                                Lớn
                            </a-typography-text>
                            <a-typography-text
                                style="color: #ccc; font-size: 14px; display: block; text-align: center;">
                                1.98
                            </a-typography-text>
                        </a-card>
                    </a-col>
                    <a-col :span="6">
                        <a-card
                            :class="{ 'onBet': betInUser.findIndex(item => item.id === 2 && item.value === 2) > -1 }"
                            @click="onBetItem(2, 2)">
                            <a-typography-text
                                style="color: #fff; font-size: 16px; display: block; text-align: center;">
                                Nhỏ
                            </a-typography-text>
                            <a-typography-text
                                style="color: #ccc; font-size: 14px; display: block; text-align: center;">
                                1.98
                            </a-typography-text>
                        </a-card>
                    </a-col>
                    <a-col :span="6">
                        <a-card
                            :class="{ 'onBet': betInUser.findIndex(item => item.id === 2 && item.value === 3) > -1 }"
                            @click="onBetItem(2, 3)">
                            <a-typography-text
                                style="color: #fff; font-size: 16px; display: block; text-align: center;">
                                Đơn
                            </a-typography-text>
                            <a-typography-text
                                style="color: #ccc; font-size: 14px; display: block; text-align: center;">
                                1.98
                            </a-typography-text>
                        </a-card>
                    </a-col>
                    <a-col :span="6">
                        <a-card
                            :class="{ 'onBet': betInUser.findIndex(item => item.id === 2 && item.value === 4) > -1 }"
                            @click="onBetItem(2, 4)">
                            <a-typography-text
                                style="color: #fff; font-size: 16px; display: block; text-align: center;">
                                Đôi
                            </a-typography-text>
                            <a-typography-text
                                style="color: #ccc; font-size: 14px; display: block; text-align: center;">
                                1.98
                            </a-typography-text>
                        </a-card>
                    </a-col>
                </a-row>
            </div>
            <div class="bet">
                <a-typography-text
                    style="color: #fff; font-size: 16px; display: block; font-weight: 600; text-align: center; margin-bottom: 10px;">
                    Quả bóng thứ 3
                </a-typography-text>
                <a-row :gutter="10">
                    <a-col :span="6">
                        <a-card
                            :class="{ 'onBet': betInUser.findIndex(item => item.id === 3 && item.value === 1) > -1 }"
                            @click="onBetItem(3, 1)">
                            <a-typography-text
                                style="color: #fff; font-size: 16px; display: block; text-align: center;">
                                Lớn
                            </a-typography-text>
                            <a-typography-text
                                style="color: #ccc; font-size: 14px; display: block; text-align: center;">
                                1.98
                            </a-typography-text>
                        </a-card>
                    </a-col>
                    <a-col :span="6">
                        <a-card
                            :class="{ 'onBet': betInUser.findIndex(item => item.id === 3 && item.value === 2) > -1 }"
                            @click="onBetItem(3, 2)">
                            <a-typography-text
                                style="color: #fff; font-size: 16px; display: block; text-align: center;">
                                Nhỏ
                            </a-typography-text>
                            <a-typography-text
                                style="color: #ccc; font-size: 14px; display: block; text-align: center;">
                                1.98
                            </a-typography-text>
                        </a-card>
                    </a-col>
                    <a-col :span="6">
                        <a-card
                            :class="{ 'onBet': betInUser.findIndex(item => item.id === 3 && item.value === 3) > -1 }"
                            @click="onBetItem(3, 3)">
                            <a-typography-text
                                style="color: #fff; font-size: 16px; display: block; text-align: center;">
                                Đơn
                            </a-typography-text>
                            <a-typography-text
                                style="color: #ccc; font-size: 14px; display: block; text-align: center;">
                                1.98
                            </a-typography-text>
                        </a-card>
                    </a-col>
                    <a-col :span="6">
                        <a-card
                            :class="{ 'onBet': betInUser.findIndex(item => item.id === 3 && item.value === 4) > -1 }"
                            @click="onBetItem(3, 4)">
                            <a-typography-text
                                style="color: #fff; font-size: 16px; display: block; text-align: center;">
                                Đôi
                            </a-typography-text>
                            <a-typography-text
                                style="color: #ccc; font-size: 14px; display: block; text-align: center;">
                                1.98
                            </a-typography-text>
                        </a-card>
                    </a-col>
                </a-row>
            </div>
            <div class="bet">
                <a-typography-text
                    style="color: #fff; font-size: 16px; display: block; font-weight: 600; text-align: center; margin-bottom: 10px;">
                    Quả bóng thứ 4
                </a-typography-text>
                <a-row :gutter="10">
                    <a-col :span="6">
                        <a-card
                            :class="{ 'onBet': betInUser.findIndex(item => item.id === 4 && item.value === 1) > -1 }"
                            @click="onBetItem(4, 1)">
                            <a-typography-text
                                style="color: #fff; font-size: 16px; display: block; text-align: center;">
                                Lớn
                            </a-typography-text>
                            <a-typography-text
                                style="color: #ccc; font-size: 14px; display: block; text-align: center;">
                                1.98
                            </a-typography-text>
                        </a-card>
                    </a-col>
                    <a-col :span="6">
                        <a-card
                            :class="{ 'onBet': betInUser.findIndex(item => item.id === 4 && item.value === 2) > -1 }"
                            @click="onBetItem(4, 2)">
                            <a-typography-text
                                style="color: #fff; font-size: 16px; display: block; text-align: center;">
                                Nhỏ
                            </a-typography-text>
                            <a-typography-text
                                style="color: #ccc; font-size: 14px; display: block; text-align: center;">
                                1.98
                            </a-typography-text>
                        </a-card>
                    </a-col>
                    <a-col :span="6">
                        <a-card
                            :class="{ 'onBet': betInUser.findIndex(item => item.id === 4 && item.value === 3) > -1 }"
                            @click="onBetItem(4, 3)">
                            <a-typography-text
                                style="color: #fff; font-size: 16px; display: block; text-align: center;">
                                Đơn
                            </a-typography-text>
                            <a-typography-text
                                style="color: #ccc; font-size: 14px; display: block; text-align: center;">
                                1.98
                            </a-typography-text>
                        </a-card>
                    </a-col>
                    <a-col :span="6">
                        <a-card
                            :class="{ 'onBet': betInUser.findIndex(item => item.id === 4 && item.value === 4) > -1 }"
                            @click="onBetItem(4, 4)">
                            <a-typography-text
                                style="color: #fff; font-size: 16px; display: block; text-align: center;">
                                Đôi
                            </a-typography-text>
                            <a-typography-text
                                style="color: #ccc; font-size: 14px; display: block; text-align: center;">
                                1.98
                            </a-typography-text>
                        </a-card>
                    </a-col>
                </a-row>
            </div>
            <div class="bet">
                <a-typography-text
                    style="color: #fff; font-size: 16px; display: block; font-weight: 600; text-align: center; margin-bottom: 10px;">
                    Quả bóng thứ 5
                </a-typography-text>
                <a-row :gutter="10">
                    <a-col :span="6">
                        <a-card
                            :class="{ 'onBet': betInUser.findIndex(item => item.id === 5 && item.value === 1) > -1 }"
                            @click="onBetItem(5, 1)">
                            <a-typography-text
                                style="color: #fff; font-size: 16px; display: block; text-align: center;">
                                Lớn
                            </a-typography-text>
                            <a-typography-text
                                style="color: #ccc; font-size: 14px; display: block; text-align: center;">
                                1.98
                            </a-typography-text>
                        </a-card>
                    </a-col>
                    <a-col :span="6">
                        <a-card
                            :class="{ 'onBet': betInUser.findIndex(item => item.id === 5 && item.value === 2) > -1 }"
                            @click="onBetItem(5, 2)">
                            <a-typography-text
                                style="color: #fff; font-size: 16px; display: block; text-align: center;">
                                Nhỏ
                            </a-typography-text>
                            <a-typography-text
                                style="color: #ccc; font-size: 14px; display: block; text-align: center;">
                                1.98
                            </a-typography-text>
                        </a-card>
                    </a-col>
                    <a-col :span="6">
                        <a-card
                            :class="{ 'onBet': betInUser.findIndex(item => item.id === 5 && item.value === 3) > -1 }"
                            @click="onBetItem(5, 3)">
                            <a-typography-text
                                style="color: #fff; font-size: 16px; display: block; text-align: center;">
                                Đơn
                            </a-typography-text>
                            <a-typography-text
                                style="color: #ccc; font-size: 14px; display: block; text-align: center;">
                                1.98
                            </a-typography-text>
                        </a-card>
                    </a-col>
                    <a-col :span="6">
                        <a-card
                            :class="{ 'onBet': betInUser.findIndex(item => item.id === 5 && item.value === 4) > -1 }"
                            @click="onBetItem(5, 4)">
                            <a-typography-text
                                style="color: #fff; font-size: 16px; display: block; text-align: center;">
                                Đôi
                            </a-typography-text>
                            <a-typography-text
                                style="color: #ccc; font-size: 14px; display: block; text-align: center;">
                                1.98
                            </a-typography-text>
                        </a-card>
                    </a-col>
                </a-row>
            </div>
            <div class="bet">
                <a-typography-text
                    style="color: #fff; font-size: 16px; display: block; font-weight: 600; text-align: center; margin-bottom: 10px;">
                    Tổng
                </a-typography-text>
                <a-row :gutter="10">
                    <a-col :span="6">
                        <a-card
                            :class="{ 'onBet': betInUser.findIndex(item => item.id === 6 && item.value === 1) > -1 }"
                            @click="onBetItem(6, 1)">
                            <a-typography-text
                                style="color: #fff; font-size: 16px; display: block; text-align: center;">
                                Lớn
                            </a-typography-text>
                            <a-typography-text
                                style="color: #ccc; font-size: 14px; display: block; text-align: center;">
                                1.98
                            </a-typography-text>
                        </a-card>
                    </a-col>
                    <a-col :span="6">
                        <a-card
                            :class="{ 'onBet': betInUser.findIndex(item => item.id === 6 && item.value === 2) > -1 }"
                            @click="onBetItem(6, 2)">
                            <a-typography-text
                                style="color: #fff; font-size: 16px; display: block; text-align: center;">
                                Nhỏ
                            </a-typography-text>
                            <a-typography-text
                                style="color: #ccc; font-size: 14px; display: block; text-align: center;">
                                1.98
                            </a-typography-text>
                        </a-card>
                    </a-col>
                    <a-col :span="6">
                        <a-card
                            :class="{ 'onBet': betInUser.findIndex(item => item.id === 6 && item.value === 3) > -1 }"
                            @click="onBetItem(6, 3)">
                            <a-typography-text
                                style="color: #fff; font-size: 16px; display: block; text-align: center;">
                                Đơn
                            </a-typography-text>
                            <a-typography-text
                                style="color: #ccc; font-size: 14px; display: block; text-align: center;">
                                1.98
                            </a-typography-text>
                        </a-card>
                    </a-col>
                    <a-col :span="6">
                        <a-card
                            :class="{ 'onBet': betInUser.findIndex(item => item.id === 6 && item.value === 4) > -1 }"
                            @click="onBetItem(6, 4)">
                            <a-typography-text
                                style="color: #fff; font-size: 16px; display: block; text-align: center;">
                                Đôi
                            </a-typography-text>
                            <a-typography-text
                                style="color: #ccc; font-size: 14px; display: block; text-align: center;">
                                1.98
                            </a-typography-text>
                        </a-card>
                    </a-col>
                </a-row>
            </div>
        </div>

        <div class="onbet">
            <a-row gutter="10" style="justify-content: space-around;">
                <a-col :span="12" style=" display: flex;">
                    <div style="align-self: center;">
                        <a-input v-model:value="amount" placeholder="Nhập số lượng" @change="formatNumber" />
                    </div>
                </a-col>
                <a-col :span="12" style=" display: flex;">
                    <div style="display: flex;">
                        <div class="coin_item" style="position: relative;">
                            <img :src="iconCoin10k" alt="" style="max-width: 30px">
                            <div @click="onAmount(10)" style="position: absolute; top: 23% ;left: 20%;">10</div>
                        </div>
                        <div class="coin_item" style="position: relative;">
                            <img :src="iconCoin50k" alt="" style="max-width: 30px">
                            <div @click="onAmount(50)" style="position: absolute; top: 23% ;left: 20%;">50</div>
                        </div>
                        <div class="coin_item" style="position: relative;">
                            <img :src="iconCoin100k" alt="" style="max-width: 30px">
                            <div @click="onAmount(100)" style="position: absolute; top: 23% ;left: 10%;">100</div>
                        </div>
                        <div class="coin_item" style="position: relative;">
                            <img :src="iconCoin1m" alt="" style="max-width: 30px">
                            <div @click="onAmount(1000)" style="position: absolute; top: 23% ;left: 20%;">1k</div>
                        </div>
                        <div class="coin_item" style="position: relative;">
                            <img :src="iconCoinAll" alt="" style="max-width: 30px">
                            <div @click="onAmount('all')" style="position: absolute; top: 23% ;left: 20%;">All</div>
                        </div>
                    </div>

                </a-col>
                <a-col :span="12" style="margin-top: 10px;">
                    <a-row gutter="10">
                        <a-col :span="12">
                            <a-button @click="resetBet">Xóa</a-button>
                        </a-col>
                        <a-col :span="12">
                            <a-button type="primary" @click="onBet">Đặt cược</a-button>
                        </a-col>
                    </a-row>
                </a-col>
            </a-row>
        </div>
    </div>
</template>

<style>
#game {
    background-color: #0C192C;
    min-height: 100vh;
}

.bet_wrap {
    margin: 20px 0;
}

.result_item {
    width: 30px;
    height: 30px;
    background-image: linear-gradient(179deg, #13a2ba, #087c95);
    margin: 5px;
    border-radius: 100%;
}

.onBet {
    background-image: linear-gradient(179deg, #13a2ba, #087c95);
    border: 1px solid #13a2ba;
}

.header {
    padding: 10px;
}

.counter {
    color: #fff;
    font-size: 14px;
    display: block;
}

.result_wrap,
.bet {
    padding: 10px;
    background-color: #0f1d30;
    min-height: 100px;
    margin: 10px;
    border-radius: 15px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    margin-bottom: 0;
}

.ant-card {
    background-color: #404b5e;
    border: 1px solid #404b5e;
}

.ant-card-body {
    padding: 10px !important;
}

.onbet {
    background-color: #0f1d30;
    margin: 10px;
    padding: 10px;
    border-radius: 15px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    margin-bottom: 0;
}

#coin10k {
    background-image: url(@/assets/images/icons/games/coin/10k.png);
    background-size: cover;
    background-position: center;
    width: 100%;
    height: 100%;
    text-align: center;
    padding: 10px;
    cursor: pointer;
}
</style>