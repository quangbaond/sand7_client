<script setup>
import { ref, onMounted, reactive } from 'vue';
import Header from '../../components/admin/Header.vue';
import Footer from '../../components/admin/Footer.vue';
import axios from '@/common/axios.js';
import { cloneDeep } from 'lodash-es';
import { formatDateTime } from '@/common';
import { layer } from '@layui/layer-vue';

const dataSource = ref([
    {
        _id: '1',
        username: 'admin',
        phone: '0123456789',
        email: 'admin@gmail.com',
    }
]);
const columns = [
    {
        title: 'Tên đăng nhập',
        dataIndex: 'username',
        key: 'username',
    },
    {
        title: 'Quyền',
        dataIndex: 'role',
        key: 'role',
    },
    {
        title: 'Phone',
        dataIndex: 'phone',
        key: 'phone',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Số dư',
        dataIndex: 'balance',
        key: 'balance',
    },
    {
        title: 'Trạng thái',
        dataIndex: 'status',
        key: 'status',
        customRender: (text) => {
            return text == 'active' ? 'Kích hoạt' : 'Khóa';
        }
    },
    {
        title: 'Tạo ngày',
        dataIndex: 'createAt',
        key: 'createAt',
        customRender: (text) => {
            // console.log(text);
            return formatDateTime(text)
        }
    },
    {
        title: 'Đăng nhập cuối',
        dataIndex: 'lastLogin',
        key: 'lastLogin',
        customRender: (text) => {
            return formatDateTime(text)
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
    axios.put(`/users/${key}`, editableData[key]).then((res) => {
        console.log(res);
    }).catch((err) => {
        console.log(err);
    });
    delete editableData[key];
};
const cancel = key => {
    delete editableData[key];
};
const dle = (id) => {
    axios.delete(`/users/${id}`).then((res) => {
        console.log(res);
        dataSource.value = dataSource.value.filter(item => item._id !== id);
        layer.msg('Xóa thành công', {
            icon: 1,
            time: 3000,
        });
    }).catch((err) => {
        console.log(err);
    });
}
onMounted(() => {
    axios.get('/users/list').then((res) => {
        console.log(res);
        // dataSource.value = res;
        const data = res;
        dataSource.value = data.docs.map((item, index) => {
            return {
                ...item,
                key: item._id,
            }
        });
    }).catch((err) => {
        console.log(err);
    });
});

</script>
<template>
    <a-layout>
        <Header selectedKeys="1"></Header>
        <a-layout-content style="padding: 20px 50px">
            <div :style="{ background: '#fff', padding: '12px', minHeight: 'calc(100vh - 190px)' }">
                <h3>Người dùng</h3>
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
                                    <a-select-option value="active">Kích hoạt</a-select-option>
                                    <a-select-option value="inactive">Khóa</a-select-option>
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