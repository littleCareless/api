<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <div class="editor" ref="editor" />
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import * as monaco from 'monaco-editor'
import { ref, reactive, onMounted, nextTick } from 'vue'
import '../../node_modules/monaco-editor/min/vs/editor/editor.main.css'
export default {
  name: 'Home',
  components: {},
  setup() {
    console.log(monaco)
    const editor = ref(null)
    onMounted(() => {
      nextTick(() => {
        console.log('editor', editor)
        const monacoEditor = monaco.editor.create(editor.value, {
          value: 'console.log("Hello, world")',
          language: 'javascript',
        })
      console.log(monacoEditor)
      window.onresize = function() {
        if (monacoEditor) {
          monacoEditor.layout()
          console.log(monacoEditor.getScrollHeight())
        }
      }
      })
    })
    return {
      editor,
    }
  },
}
</script>

<style lang="less" scoped>
.editor {
  height: 100vh;
  ::v-deep(.view-lines) {
    text-align: left;
  }
}
</style>
