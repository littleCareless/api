/* eslint-disable no-undef */
<template>
  <a-layout id="components-layout-demo-top-side-2">
    <a-layout-header class="header">
      <div class="logo" />
      <a-menu
        theme="dark"
        mode="horizontal"
        v-model:selectedKeys="selectedKeys1"
        :style="{ lineHeight: '64px' }"
      >
        <a-menu-item key="1">
          nav 1
        </a-menu-item>
        <a-menu-item key="2">
          nav 2
        </a-menu-item>
        <a-menu-item key="3">
          nav 3
        </a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout>
      <a-layout-sider width="200" style="background: #fff">
        <a-menu
          mode="inline"
          v-model:selectedKeys="selectedKeys2"
          v-model:openKeys="openKeys"
          :style="{ height: '100%', borderRight: 0 }"
        >
          <a-sub-menu key="sub1">
            <template v-slot:title>
              <span><user-outlined />subnav 1</span>
            </template>
            <a-menu-item key="1">option1</a-menu-item>
            <a-menu-item key="2">option2</a-menu-item>
            <a-menu-item key="3">option3</a-menu-item>
            <a-menu-item key="4">option4</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub2">
            <template v-slot:title>
              <span><laptop-outlined />subnav 2</span>
            </template>
            <a-menu-item key="5">option5</a-menu-item>
            <a-menu-item key="6">option6</a-menu-item>
            <a-menu-item key="7">option7</a-menu-item>
            <a-menu-item key="8">option8</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub3">
            <template v-slot:title>
              <span><notification-outlined />subnav 3</span>
            </template>
            <a-menu-item key="9">option9</a-menu-item>
            <a-menu-item key="10">option10</a-menu-item>
            <a-menu-item key="11">option11</a-menu-item>
            <a-menu-item key="12">option12</a-menu-item>
          </a-sub-menu>
        </a-menu>
      </a-layout-sider>
      <a-layout style="padding: 0 24px 24px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>Home</a-breadcrumb-item>
          <a-breadcrumb-item>List</a-breadcrumb-item>
          <a-breadcrumb-item>App</a-breadcrumb-item>
        </a-breadcrumb>
        <a-layout-content
          :style="{
            background: '#fff',
            padding: '24px',
            margin: 0,
            minHeight: '280px'
          }"
        >
          <a-layout-header class="header">
            <a-button
              type="primary"
              @click="handleAddRequest"
              :style="{ marginRight: '20px' }"
            >
              添加接口
            </a-button>
            <!-- <a-button type="primary" @click="onCode">
              点我通过json生成代码
            </a-button> -->

            <a-button
              type="primary"
              @click="onCopyCode"
              :style="{ marginRight: '20px' }"
            >
              复制
            </a-button>
            <a-button type="primary" @click="downloadCode">
              下载
            </a-button>
          </a-layout-header>
          <a-layout-content>
            <!-- <a-table :data-source="data">
              <a-table-column key="age" title="Age" data-index="age" />
              <a-table-column
                key="address"
                title="Address"
                data-index="address"
              />
            </a-table> -->
            <div class="home">
              <div class="jsonEditor" ref="jsonEditor" />
              <div class="box">
                <!-- <a-divider type="vertical">With Text</a-divider> -->
              </div>
              <div class="jsEditor" ref="jsEditor" />
              <div class="box"></div>
              <div class="phpEditor" ref="phpEditor"></div>
            </div>
          </a-layout-content>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
  <a-modal
    v-model:visible="visible"
    title="添加接口"
    cancelText="取消"
    okText="添加"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-item label="URL" v-bind="validateInfos.url">
        <a-input v-model:value="modelRef.url" />
      </a-form-item>
      <a-form-item label="METHOD" v-bind="validateInfos.method">
        <a-select
          v-model:value="modelRef.method"
          style="width: 120px"
          @focus="focus"
          ref="select"
          @change="handleChange"
        >
          <a-select-option value="Post">
            Post
          </a-select-option>
          <a-select-option value="Get">
            Get
          </a-select-option>
          <a-select-option value="Delete">
            Delete
          </a-select-option>
          <a-select-option value="Head">
            Head
          </a-select-option>
          <a-select-option value="Options">
            Options
          </a-select-option>
          <a-select-option value="Put">
            Put
          </a-select-option>
          <a-select-option value="Patch">
            Patch
          </a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
    <template v-slot:footer>
      <a-button type="primary" @click="handleCancel">
        添加接口
      </a-button>
    </template>
  </a-modal>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
// import * as monaco from "monaco-editor";
import * as monaco from "monaco-editor/esm/vs/editor/editor.main.js";
import {
  ref,
  reactive,
  toRefs,
  toRaw,
  onMounted,
  nextTick
  // watchEffect
} from "vue";
import { useForm } from "@ant-design-vue/use";
import { message } from "ant-design-vue";
import Beautify from "js-beautify";
import jsonBeautify from "json-beautify";
import JSZip from "jszip";
import saveAs from "jszip/vendor/FileSaver";
// import "monaco-editor/min/vs/editor/editor.main.css";
// import "monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution";
// import "monaco-editor/esm/vs/editor/contrib/find/findController.js";
// import "../../node_modules/monaco-editor/min/vs/editor/editor.main.js";
const data = [
  {
    key: "1",
    firstName: "John",
    lastName: "Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"]
  },
  {
    key: "2",
    firstName: "Jim",
    lastName: "Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"]
  },
  {
    key: "3",
    firstName: "Joe",
    lastName: "Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"]
  }
];
export default {
  name: "Home",
  components: {},
  setup() {
    console.log(monaco);
    const state = reactive({
      visible: false,
      select: "",
      jsonCode: [
        {
          url: "extractTranslate",
          method: "post"
        },
        {
          url: "filterTranslate",
          method: "post"
        },
        {
          url: "pushTranslate",
          method: "post"
        }
      ]
    });
    const jsonEditor = ref(null);
    const jsEditor = ref(null);
    const phpEditor = ref(null);
    const beautify = (code, type) => {
      return Beautify[type](code);
    };
    let monacoJsonEditor = null;
    let monacoJsEditor = null;
    let monacoPhpEditor = null;
    const onCode = (monacoJsonEditor, monacoJsEditor, monacoPhpEditor) => {
      // todo 抽取 转成两个方法来处理
      if (monacoJsonEditor !== null && monacoJsEditor !== null) {
        console.log("生成代码");
        console.log("monacoJsonEditor", monacoJsonEditor);
        const a = monacoJsonEditor.getValue();
        console.log(a);
        // 将获取到的json转为js对象
        var bToObj = JSON.parse(a);
        console.log(bToObj);
        // 遍历生成
        let str = "";
        for (let i = 0; i < bToObj.length; i++) {
          // bToObj[i]
          let url = "`${apiPrefix}/" + bToObj[i].url + "`";
          str += `export const ${bToObj[i].url} = (data) => {
              return axios.request({
                url: ${url},
                data,
                method: '${bToObj[i].method}',
              })
            };\n`;
        }
        console.log(str);
        str = beautify(str, "js");
        monacoJsEditor.setValue(str);
        //
        let phpStr = "";
        for (let i = 0; i < bToObj.length; i++) {
          // bToObj[i]
          phpStr += `public function ${bToObj[i].url} ()
            {
                $res = $this->skin->${bToObj[i].url}($this->${bToObj[
            i
          ].method.toLowerCase()}());
                $this->view($res);
            }\n`;
        }
        console.log(phpStr);
        // phpStr = beautify(phpStr, "php");
        monacoPhpEditor.setValue(phpStr);
      }
      // {
      //   const a = monacoJsonEditor.getValue();
      //   console.log(a);
      //   // 将获取到的json转为js对象
      //   var bToObj = JSON.parse(a);
      // }
      // 遍历生成php代码
    };

    // /**
    //  * skin生成
    //  */
    // public function createSkin ()
    // {
    //     $res = $this->skin->createSkin($this->post());
    //     $this->view($res);
    // }

    onMounted(() => {
      //   document.addEventListener("cut", function(e) {
      //     console.log(e);
      //     var textString = "This is plain text";
      //     var htmlString = `<p>${textString}
      // new line here</p><p>new paragraph</p>`;
      //     var clipboardDataEvt = e.clipboardData;
      //     clipboardDataEvt.setData("text/plain", textString);
      //     clipboardDataEvt.setData("text/html", htmlString);
      //     // navigator.clipboard.write([item]);
      //   });
      nextTick(() => {
        monacoJsonEditor = monaco.editor.create(jsonEditor.value, {
          value: jsonBeautify(state.jsonCode, null, 2, 30),
          language: "json",
          theme: "vs-dark"
        });
        monacoJsEditor = monaco.editor.create(jsEditor.value, {
          value: "待生成的js代码",
          language: "javascript",
          theme: "vs-dark"
        });
        monacoPhpEditor = monaco.editor.create(phpEditor.value, {
          value: "待生成的php代码",
          language: "php",
          theme: "vs-dark"
        });

        window.addEventListener("resize", () => {
          monacoJsonEditor.layout();
          monacoJsEditor.layout();
          monacoPhpEditor.layout();
        });
        onCode(monacoJsonEditor, monacoJsEditor, monacoPhpEditor);
      });
      nextTick(() => {
        monacoJsonEditor.layout();
        monacoJsEditor.layout();
      });
    });

    // function report(state) {
    //   console.log("Permission: " + state);
    // }
    // var positionDenied = function() {
    //   console.log("permission denied");
    // };

    // var revealPosition = function(position) {
    //   console.log(position);
    // };
    // var geoSettings = {
    //   enableHighAccuracy: false,
    //   maximumAge: 30000,
    //   timeout: 20000
    // };
    // var positionDenied = function() {
    //   console.log("permission denied");
    // };

    // var revealPosition = function(position) {
    //   console.log(position);
    // };

    const onCopyCode = () => {
      // let data = new DataTransfer()
      // data.items.add('text/plain', monacoJsEditor.getValue())
      // console.log(navigator);
      // const text = navigator.clipboard.readText();
      // console.log(text);
      // var revokePromise = navigator.permissions.revoke(descriptor);
      // ermissions.revoke(descriptor);
      // var geoSettings = {
      //   enableHighAccuracy: false,
      //   maximumAge: 30000,
      //   timeout: 20000
      // };
      //   var textString = "This is plain text";
      //   var htmlString = `<p>${textString}
      // new line here</p><p>new paragraph</p>`;
      //   var clipboardDataEvt = event.clipboardData;
      //   clipboardDataEvt.setData("text/plain", textString);
      //   clipboardDataEvt.setData("text/html", htmlString);
      //   navigator.geolocation.getCurrentPosition(
      //     revealPosition,
      //     positionDenied,
      //     geoSettings
      //   );
      // navigator.clipboard.getCurrentPosition(
      //   revealPosition,
      //   positionDenied,
      //   geoSettings
      // );
      // var permission = navigator.mozPermissionSettings;
      // permission.set("clipboard-read");
      // 1.先获取剪切板权限是否有
      // 2.没有让用户手动开启权限
      // 3.如果有将代码复制
      navigator.permissions
        .query({ name: "clipboard-read" })
        .then(function(result) {
          console.log(result);
          if (result.state == "granted") {
            console.log("有权限");
            var data = [
              // eslint-disable-next-line no-undef
              new ClipboardItem({
                "text/plain": new Blob([monacoJsEditor.getValue()], {
                  type: "text/plain"
                })
              })
            ];
            navigator.clipboard.write(data).then(
              function() {
                console.log("写入成功");
                message.success("复制成功,随处粘贴可用！");
              },
              function() {
                console.error("写入失败");
              }
            );
          } else if (result.state == "prompt") {
            console.log("权限需询问");
            // 询问权限
          } else if (result.state == "denied") {
            console.log("2");
            console.log("权限禁用");
          } else {
            console.log("1");
          }
          // Don't do anything if the permission was denied.
        });

      // console.log(navigator);
      // navigator.permissions
      //   .query({ name: "clipboard-write" })
      //   .then(function(result) {
      //     console.log(result);
      //   });
      // navigator.permissions
      //   .query({ name: "clipboard-read" })
      //   .then(function(result) {
      //     console.log(result);
      //   });
      // console.log(data);
      // navigator.clipboard.write(data).then(
      //   function(res) {
      //     /* success */
      //     console.log(res);
      //   },
      //   function(err) {
      //     /* failure */
      //     console.log(err);
      //   }
      // );
    };

    const modelRef = reactive({
      url: "",
      method: ""
    });
    const rulesRef = reactive({
      url: [
        {
          required: true,
          message: "Please input name"
        }
      ],
      method: [
        {
          required: true,
          message: "Please select region"
        }
      ]
    });
    const { resetFields, validate, validateInfos } = useForm(
      modelRef,
      rulesRef
    );
    const onSubmit = e => {
      e.preventDefault();
      validate()
        .then(() => {
          console.log(toRaw(modelRef));
        })
        .catch(err => {
          console.log("error", err);
        });
    };
    const handleAddRequest = () => {
      console.log("添加接口");
      state.visible = true;
    };
    const handleCancel = () => {
      state.visible = false;
      const { url, method } = toRefs(modelRef);
      if (url.value && method.value) {
        state.jsonCode.push({
          url,
          method
        });
        monacoJsonEditor.setValue(jsonBeautify(state.jsonCode, null, 2, 30));
        console.log(state.jsonCode);
        onCode(monacoJsonEditor, monacoJsEditor, monacoPhpEditor);
      }
    };
    const downloadCode = () => {
      var zip = new JSZip();
      zip.file("api.txt", monacoJsEditor.getValue());
      // var img = zip.folder("images");
      // img.file("smile.gif", imgData, { base64: true });
      zip.generateAsync({ type: "blob" }).then(function(content) {
        // see FileSaver.js
        saveAs(content, "example.zip");
      });
    };
    // watchEffect(() => {
    //   console.log("执行watch");
    //   onCode(monacoJsonEditor, monacoJsEditor, state.jsonCode);
    // });
    return {
      jsonEditor,
      jsEditor,
      phpEditor,
      onCode,
      onCopyCode,
      data,
      //
      ...toRefs(state),
      validateInfos,
      resetFields,
      modelRef,
      onSubmit,
      //
      handleAddRequest,
      handleCancel,
      downloadCode
    };
  }
};
</script>

<style lang="less" scoped>
.home {
  display: flex;
}
.box {
  width: 20px;
  height: 700px;
  flex: 1;
}
.jsonEditor {
  height: 700px;
  max-width: 700px;
  flex: 2;
  ::v-deep(.view-lines) {
    text-align: left;
  }
}
.jsEditor {
  height: 700px;
  // width: 700px;
  max-width: 700px;
  flex: 2;
  ::v-deep(.view-lines) {
    text-align: left;
  }
}
.phpEditor {
  height: 700px;
  // width: 700px;
  max-width: 700px;
  flex: 2;
  ::v-deep(.view-lines) {
    text-align: left;
  }
}
</style>
