<template>
  <div id="terminal"/>
</template>

<script>
import 'xterm/css/xterm.css'
import {Terminal} from 'xterm'
import {FitAddon} from 'xterm-addon-fit'
import {AttachAddon} from 'xterm-addon-attach'
import {useRoute} from 'vue-router'

export default {
  name: 'Terminal',
  data() {
    return {}
  },
  mounted() {
    const route = useRoute()
    var term = new Terminal({
      rendererType: "canvas", //渲染类型
      convertEol: true, //启用时，光标将设置为下一行的开头
      fontSize: 16, //字体大小
      disableStdin: false, //是否应禁用输入。
      cursorStyle: "block", //光标样式
      scrollback: 30,
      tabStopWidth: 4,
      theme: {
        foreground: "#ffffff", //字体
        background: "#000000", //背景色
        cursor: "help" //设置光标
      }
    });
    var fitAddon = new FitAddon()
    var socket = new WebSocket('ws://127.0.0.1:8080/api/docker/ws/container/' + route.query.container_id + '/logs')
    var attachAddon = new AttachAddon(socket)

    term.loadAddon(attachAddon)
    term.loadAddon(fitAddon)
    term.open(document.getElementById('terminal'))
    fitAddon.fit()
    term.focus()
    socket.onopen = () => {
    } // 当连接建立时向终端发送一个换行符，不这么做的话最初终端是没有内容的，输入换行符可让终端显示当前用户的工作路径

    window.onresize = function () { // 窗口尺寸变化时，终端尺寸自适应
      fitAddon.fit()
    }

    this.term = term
    this.socket = socket
  },
  beforeDestroy() {
    this.socket.close()
    this.term.dispose()
  }
}
</script>
<style scoped>
#terminal {
  height: 100%;
  width: 100fr;
}
</style>