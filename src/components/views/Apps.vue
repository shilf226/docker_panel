<script setup>
import {ref} from 'vue'
import {
  IconRightCircle,
  IconRecordStop,
  IconLoop,
  IconMoreVertical,
  IconCodeSquare,
  IconBook,
  IconSync,
  IconDelete
} from '@arco-design/web-vue/es/icon';
import {
  containers_list,
  containers_start,
  containers_stop,
  containers_restart,
  containers_remove,
  images_list, create_container
} from "../../utils/request/index.js";
import newcontainer from '../widgets/new_container.vue'
import {useRoute, useRouter} from 'vue-router'
import mirrorTextArea from '../widgets/mirrorTextArea.vue';

const route = useRoute()
const router = useRouter()
const create_container_visible = ref(false)
const containerinfo_visible = ref(false)
const data = ref(null);
const code = ref('');
const image_list = ref(null);
const search_value = ref('')
const form = ref({
  store: {
    name: '',
    describe: ''
  },
  // 容器名称
  hostname: '',
  restart: 'always',
  image: "",
  environment: [],
  volumes: [],
  ports: [],
  extra_hosts: [],
  privileged: false,
  command: ""
})

const search = async () => {
  if (search_value.value.length > 0) {
    const search_list = ref([])
    for (const argument of data.value) {
      if (argument.name.includes(search_value.value)) {
        search_list.value.push(argument)
      }
    }
    data.value = search_list.value
  } else {
    await init()
  }
}

const terminal_log_route = (container_id) => {
  let terminal_log = router.resolve({
    path: '/xterm_logs',
    query: {
      container_id: container_id
    }
  });
  window.open(terminal_log.href, '_blank');
}
const terminal_exec_route = (container_id) => {
  let terminal_log = router.resolve({
    path: '/xterm_exec',
    query: {
      container_id: container_id
    }
  });
  window.open(terminal_log.href, '_blank');
}

const init = async () => {
  data.value = await containers_list();
  image_list.value = await images_list()
}
const start = async (container_id) => {
  await containers_start(container_id)
  await init()
}
const stop = async (container_id) => {
  await containers_stop(container_id)
  await init()
}
const restart = async (container_id) => {
  await containers_restart(container_id)
  await init()
}
const remove = async (container_id, hostname) => {
  await containers_remove(container_id, hostname)
  await init()
}


const receiving_parameter = async (newVal) => {
  form.value = newVal
}

// 导出配置
const exportjson = async () => {
  const blob = new Blob([JSON.stringify(form.value)], {type: 'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'config.json';
  a.click();
  URL.revokeObjectURL(url);
}

const create_app = async (newVal) => {

  await create_container(form.value)
  await init()
}

const on_container_info = async (attrs) => {
  code.value = attrs
  // code.value = JSON.stringify(attrs, null, 2);
  containerinfo_visible.value = true
}


init()
</script>

<template>
  <div class="container">
    <div class="apps_container">
      <p class="logo">服务</p>
      <a-button class="but" type="outline" @click="init()">刷新</a-button>
      <a-button class="but" type="outline" @click="create_container_visible = true">创建</a-button>
      <a-input-search class="search" placeholder="搜索服务" v-model="search_value" @press-enter="search"
                      @search="search"/>
    </div>
    <div class="apps">
      <div v-for="item in data" class="app">
        <div :class="item.status == 'running' ? 'true' : 'false'">
          <p class="status">{{ item.status == 'running' ? '运行中' : '已停止' }}</p>
        </div>
        <!--        <img src="../../assets/images/docker.png" alt="">-->
        <div class="app_info">
          <p class="title" @click="on_container_info(item.attrs)">{{ item.name }}</p>
          <div class="operation">
            <a-button-group type="dashed">
              <a-button status="success" v-if="item.status != 'running'" @click="start(item.id)">
                <template #icon>
                  <icon-right-circle/>
                </template>
              </a-button>
              <a-button status="warning" v-if="item.status == 'running'" @click="stop(item.id)">
                <template #icon>
                  <icon-record-stop/>
                </template>
              </a-button>
              <a-button status="success" @click="restart(item.id)">
                <template #icon>
                  <icon-loop/>
                </template>
              </a-button>
              <a-button status="normal" @click="terminal_log_route(item.id)">
                <template #icon>
                  <icon-book/>
                </template>
              </a-button>
              <a-popconfirm content="确认删除么?" okText="确认" cancelText="取消" @ok="remove(item.id,item.name)">
                <a-button status="danger">
                  <template #icon>
                    <icon-delete/>
                  </template>
                </a-button>
              </a-popconfirm>
            </a-button-group>
          </div>
        </div>
      </div>

    </div>
    <a-pagination class="paging" :total="200"/>
  </div>
  <a-modal width="1000px" v-model:visible="create_container_visible" @ok="create_app()"
           @cancel="create_container_visible = false">
    <template #title>
      创建容器
    </template>
    <newcontainer disabled="!create_container_visible" @on-response="receiving_parameter"></newcontainer>
  </a-modal>
  <a-modal width="1000px" v-model:visible="containerinfo_visible" @ok="handleOk" :footer="false">
    <template #title>
      容器信息
    </template>
    <!--    <mirrorTextArea height="500px" :code="code"></mirrorTextArea>-->
    <newcontainer :form="code" :disabled="containerinfo_visible"></newcontainer>
  </a-modal>
</template>

<style lang="less" scoped>
.container {
  height: 100%;
  width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  .apps_container {
    height: 40px;
    display: flex;
    flex-direction: row;
    margin: 5px 0;
    gap: 10px;

    .logo {
      margin: auto auto auto 0;
      color: black;
      font-size: 18px;
      font-weight: 900;
      font-family: siyuan-light;
    }

    .but {
      margin: auto 0;
    }

    .search {
      width: 250px;
      height: 33px;
      margin: auto 0;
    }
  }

  .apps {
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 10px;
    flex-wrap: wrap;
    margin-top: 20px;
    margin-bottom: 20px;

    .app {
      height: 100px;
      min-width: 290px;
      //max-width: auto;
      border-radius: 8px;
      display: grid;
      grid-template-columns:40px  auto;
      gap: 25px;
      border: 1px solid #d9d9d9;

      .true {
        background-color: #59b300;
        border-top-left-radius: 8px;
        border-bottom-left-radius: 8px;
        display: flex;
        flex-direction: column;
      }

      .false {
        background-color: #bf3f32;
        border-top-left-radius: 8px;
        border-bottom-left-radius: 8px;
        display: flex;
        flex-direction: column;
      }

      .status {
        font-size: 20px;
        font-family: siyuan-bold;
        writing-mode: vertical-rl;
        margin: auto;
        letter-spacing: 5px;
        color: white;
      }

      img {
        height: 80px;
        margin: auto 10px auto 10px;
      }

      .app_info {
        display: flex;
        flex-direction: column;

        .title {
          font-size: 18px;
          font-weight: 900;
          font-family: siyuan-bold;
          margin: 10px 0 auto 0;
        }

        .operation {
          width: 100%;
          display: flex;
          flex-direction: row;
          gap: 5px;
          margin-bottom: 10px;

          .butt {
            height: 25px;
            width: 25px;
            font-size: 25px;
            color: #c5c5c5;
            font-family: siyuan-normal;
          }

          .butt:hover {
            cursor: pointer;
            color: #7087ff;
          }
        }
      }
    }
  }

  .paging {
    margin: auto 0 20px auto;
  }
}

.environment {
  width: 100%;
  display: flex;
  flex-direction: column;

  .menu {
    width: 100%;
    height: 30px;
    display: flex;
    flex-direction: row;

    .but {
      margin-left: auto;
    }
  }

  .title {
    display: grid;
    grid-template-columns: 1fr 5px 1fr 30px;
    grid-template-rows: 1fr;
    gap: 10px;

    p {
      font-family: siyuan-normal;
    }
  }

  .view {
    display: grid;
    grid-template-columns: 1fr 5px 1fr 30px;
    grid-template-rows: 1fr;
    gap: 10px;
    margin-bottom: 10px;

    .butt {
      margin: auto;
      color: #ea8f8f;
    }

    p {
      font-family: siyuan-normal;
      margin: auto;
    }
  }
}
</style>