<template>
  <div id="container">
    <div id="examples">
      <my-button @click="info">默认按钮</my-button>
      <my-button @click="success" type="primary">主要按钮</my-button>
      <my-button @click="error" type="danger">危险按钮 </my-button>
      <my-button @click="warn" type="warn">警告按钮 </my-button>
      <my-button @click="visible = true" round>默认按钮</my-button>
      <my-button type="primary" size="medium" round @click="getVisible"
        >主要按钮</my-button
      >
      <my-button size="small" icon="search" round>默认按钮 </my-button>
      <my-button icon="search"> 搜索 </my-button>
      <my-button icon="search" type="primary" size="medium"> 搜索 </my-button>
      <my-button icon="search" size="medium" circle> </my-button>
      <!-- <my-button type="text">文字按钮</my-button> 全部组件的样式需用sass重写，先学一下--> 
      <my-dialog v-model="visible" :close-on-click-modal="false">
        <my-button @click="vis = true">打开嵌套的对话框</my-button>
        <my-dialog v-model="vis" title="略略略">
          这是嵌套的对话框
          <template #footer>
            <my-button type="primary" size="medium" @click="vis = false"
              >鬼！</my-button
            >
          </template>
        </my-dialog>
        <template #footer>
          <my-button type="primary" size="medium" @click="visible = false"
            >确定</my-button
          >
          <my-button size="medium" @click="visible = false">取消</my-button>
        </template>
      </my-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      visible: false,
      vis: false,
    };
  },
  mounted() {},
  methods: {
    info() {
      this.$message({
        content: "你点到我了啊啊啊啊啊啊啊啊啊",
        type: "info",
        onClose() {
          console.log("closed");
        },
      });
    },
    error() {
      this.$message({
        content: "你点到我了啊啊啊啊啊啊啊啊啊",
        type: "error",
        onClose() {
          console.log("closed");
        },
      });
    },
    success() {
      this.$message({
        content: "你点到我了啊啊啊啊啊啊啊啊啊",
        type: "success",
        onClose() {
          console.log("closed");
        },
      });
    },
    warn() {
      this.$message({
        content: "你点到我了啊啊啊啊啊啊啊啊啊",
        type: "warn",
        onClose() {
          console.log("closed");
        },
      });
    },
    close() {
      console.log("closed.");
      console.log(this.visible);
    },
    getVisible() {
      console.log(this.visible);
    },
  },
};
</script>

<style>
#examples {
  position: absolute;
  height: 38%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
}

@font-face {
  font-family: "my-icon"; /* Project id  */
  src: url("./libs/asset/icons/icon.ttf?t=1643610024925") format("truetype");
}

[class*="my-icon-"],
[class^="my-icon-"] {
  font-family: "my-icon" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.my-icon-close:before {
  content: "\e62c";
}

.my-icon-search:before {
  content: "\e608";
}

.my-icon-success:before {
  content: "\f0071";
}

.my-icon-error:before {
  content: "\f006f";
}

.my-icon-info:before {
  content: "\e650";
}

.my-icon-question:before {
  content: "\f006d";
}
.my-icon-warn:before {
  content: "\e66c";
}
</style>
