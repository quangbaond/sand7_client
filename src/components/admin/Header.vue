<script setup>
import { ref } from 'vue';
const selectedKeys = ref(['2']);


</script>
<template>
    <a-layout-header>
        <div class="logo" />
        <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="horizontal" :style="{ lineHeight: '64px' }">
            <a-menu-item key="1">
                <router-link to="/admin">Người dùng</router-link>
            </a-menu-item>
            <a-menu-item key="2">
                <router-link to="/admin/game">Game</router-link>
            </a-menu-item>
            <a-menu-item key="3">
                <router-link to="/admin/profile">Profile</router-link>
            </a-menu-item>
        </a-menu>
    </a-layout-header>
</template>