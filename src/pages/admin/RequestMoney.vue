<script setup>
import { ref, onMounted, reactive } from 'vue';
import Header from '../../components/admin/Header.vue';
import Footer from '../../components/admin/Footer.vue';
import axios from '@/common/axios.js';
import { cloneDeep } from 'lodash-es';
import { formatDateTime } from '@/common';
import { layer } from '@layui/layer-vue';
import { formatCurrency } from '@/common';
const dataSource = ref([]);
const columns = [
    {
        title: 'Tên đăng nhập',
        dataIndex: 'username',
        key: 'username',
        scopedSlots: { customRender: 'username' }
    },
    {
        title: 'Số tiền',
        dataIndex: 'amount',
        key: 'amount',
        customRender: (text, value) => {
            return formatCurrency(text.text);
        }
    },
    {
        title: 'Trạng thái',
        dataIndex: 'status',
        key: 'status',

    },
    {
        title: 'Tạo ngày',
        dataIndex: 'createAt',
        key: 'createAt',
        customRender: (text) => {
            return formatDateTime(text)
        }
    },
    {
        title: 'Ghi chú',
        dataIndex: 'note',
        key: 'note',
    },
    {
        title: 'Tiền thực',
        dataIndex: 'type',
        key: 'type',
        customRender: (text) => {
            return text == 'deposit' ? 'Rút' : 'Nạp';
        }
    },
    {
        title: 'Hành động',
        dataIndex: 'operation',
    },
]
const editableData = reactive({});
const edit = key => {
    editableData[key] = cloneDeep(dataSource.value.filter(item => key === item.key)[0]);
};
const save = key => {
    Object.assign(dataSource.value.filter(item => key === item.key)[0], editableData[key]);
    console.log(editableData[key]);
    axios.put(`/users/update-request-money/${key}`, editableData[key]).then((res) => {
        layer.msg('Lưu thành công', {
            icon: 1,
            time: 3000,
        });
        // update data
        const data = dataSource.value.find(item => item.key === key);
        dataSource.value = dataSource.value.map((item) => {
            if (item.key === key) {
                return {
                    ...item,
                    ...editableData[key],
                    username: data.username,
                    status: item.status == 'pending' ? 'Đang chờ' : item.status == 'accept' ? 'Đã chấp nhận' : 'Từ chối',
                }
            }
            return item;
        });
    }).catch((err) => {
        console.log(err);
    });
    delete editableData[key];
};
const cancel = key => {
    delete editableData[key];
};
// const dle = (id) => {
//     axios.delete(`/users/${id}`).then((res) => {
//         console.log(res);
//         dataSource.value = dataSource.value.filter(item => item._id !== id);
//         layer.msg('Xóa thành công', {
//             icon: 1,
//             time: 3000,
//         });
//     }).catch((err) => {
//         console.log(err);
//     });
// }
onMounted(() => {
    axios.get('/users/get-request-money').then((res) => {
        console.log(res);
        // dataSource.value = res;
        const data = res;
        dataSource.value = data.docs.map((item, index) => {
            return {
                ...item,
                key: item._id,
                username: item.user.username,
                status: item.status == 'pending' ? 'Đang chờ' : item.status == 'accept' ? 'Đã chấp nhận' : 'Từ chối',
            }
        });
    }).catch((err) => {
        console.log(err);
    });
});
// watch(dataSource, (newVal) => {
//     const data = newVal;
//     dataSource.value = newVal.map((item, index) => {
//         return {
//             ...item,
//             key: item._id,
//             username: item.user.username,
//             status: item.status == 'pending' ? 'Đang chờ' : item.status == 'accept' ? 'Đã chấp nhận' : 'Từ chối',
//         }
//     });
// })

</script>
<template>
    <a-layout>
        <Header selectedKeys="1"></Header>
        <a-layout-content style="padding: 20px 50px">
            <div :style="{ background: '#fff', padding: '12px', minHeight: 'calc(100vh - 190px)' }">
                <h3>Quản lý nạp rút</h3>
                <a-table :columns="columns" :data-source="dataSource" bordered>
                    <template #bodyCell="{ column, text, record }">
                        <template v-if="['balance', 'phone', 'email'].includes(column.dataIndex)">
                            <div>
                                <a-input v-if="editableData[record.key]"
                                    v-model:value="editableData[record.key][column.dataIndex]" style="margin: -5px 0" />
                                <template v-else>
                                    {{ text }}
                                </template>
                            </div>
                        </template>
                        <template v-if="['status'].includes(column.dataIndex)">
                            <div>
                                <a-select v-if="editableData[record.key]"
                                    v-model:value="editableData[record.key][column.dataIndex]" style="margin: -5px 0">
                                    <a-select-option value="pending">Đang chờ</a-select-option>
                                    <a-select-option value="accept">Chấp nhận</a-select-option>
                                    <a-select-option value="reject">Từ chối</a-select-option>
                                </a-select>
                                <template v-else>
                                    {{ text }}
                                </template>
                            </div>
                        </template>
                        <template v-if="['role'].includes(column.dataIndex)">
                            <div>
                                <a-select v-if="editableData[record.key]"
                                    v-model:value="editableData[record.key][column.dataIndex]" style="margin: -5px 0">
                                    <a-select-option value="admin">Admin</a-select-option>
                                    <a-select-option value="user">Người dùng</a-select-option>
                                </a-select>
                                <template v-else>
                                    {{ text }}
                                </template>
                            </div>
                        </template>
                        <template v-else-if="column.dataIndex === 'operation'">
                            <div class="editable-row-operations">
                                <span v-if="editableData[record.key]">
                                    <a-typography-link @click="save(record.key)">Lưu</a-typography-link>
                                    <a-popconfirm title="Sure to cancel?" @confirm="cancel(record.key)">
                                        <a>Hủy</a>
                                    </a-popconfirm>
                                </span>
                                <span v-else>
                                    <a @click="edit(record.key)">Chỉnh sửa</a>
                                    <a-popconfirm title="Bạn có muốn xóa người dùng này" ok-text="Xóa" cancel-text="Hủy"
                                        @confirm="dle(record._id)">
                                        <a href="#">Xóa</a>
                                    </a-popconfirm>

                                </span>
                            </div>
                        </template>
                    </template>
                </a-table>
            </div>
        </a-layout-content>
        <Footer></Footer>
    </a-layout>
</template>

<style>
.site-layout-content {
    min-height: 280px;
    padding: 24px;
    background: #fff;
}

#components-layout-demo-top .logo {
    float: left;
    width: 120px;
    height: 31px;
    margin: 16px 24px 16px 0;
    background: rgba(255, 255, 255, 0.3);
}

.ant-row-rtl #components-layout-demo-top .logo {
    float: right;
    margin: 16px 0 16px 24px;
}

[data-theme='dark'] .site-layout-content {
    background: #141414;
}

#app {
    margin: 0;
    max-width: 100% !important;
    overflow-x: hidden;
}
</style>

<style scoped>
.editable-row-operations a {
    margin-right: 8px;
}
</style>