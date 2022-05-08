<template>
    <h-row class="mb">
        <h-button>默认按钮</h-button>
        <h-button type="primary">主要按钮</h-button>
        <h-button type="danger">危险按钮</h-button>
        <h-button type="warn">警告按钮</h-button>
        <h-button color="#9b59b6">Custom</h-button>
    </h-row>
    <h-row class="mb">
        <h-button plain>默认按钮</h-button>
        <h-button type="primary" plain>主要按钮</h-button>
        <h-button type="danger" plain>危险按钮</h-button>
        <h-button type="warn" plain>警告按钮</h-button>
        <h-button color="#9b59b6" plain>Custom</h-button>
    </h-row>
    <h-row class="mb">
        <h-button round>默认按钮</h-button>
        <h-button type="primary" round>主要按钮</h-button>
        <h-button type="danger" round>危险按钮</h-button>
        <h-button type="warn" round>警告按钮</h-button>
        <h-button color="#9b59b6" round>Custom</h-button>
    </h-row>
    <h-row>
        <h-button icon="search" circle />
        <h-button icon="copy" type="primary" circle />
        <h-button icon="code" type="danger" circle />
        <h-button icon="info" type="warn" circle />
        <h-button icon="question" color="#9b59b6" circle />
    </h-row>
</template>
<style scoped>
.mb {
    margin-bottom: 1rem;
}
</style>