<template>
    <h-row class="mb">
        <h-button disabled>默认按钮</h-button>
        <h-button type="primary" disabled>主要按钮</h-button>
        <h-button type="danger" disabled>危险按钮</h-button>
        <h-button type="warn" disabled>警告按钮</h-button>
    </h-row>
    <h-row>
        <h-button plain disabled>默认按钮</h-button>
        <h-button type="primary" plain disabled>主要按钮</h-button>
        <h-button type="danger" plain disabled>危险按钮</h-button>
        <h-button type="warn" plain disabled>警告按钮</h-button>
    </h-row>
</template>
<style scoped>
.mb {
    margin-bottom: 1rem;
}
</style>