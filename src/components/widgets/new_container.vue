<script setup>
import {ref, watch} from "vue";
import {IconDelete} from "@arco-design/web-vue/es/icon/index.js";
import {create_container, images_list} from "../../utils/request/index.js";

const props = defineProps({
  form: Object,
  disabled: Boolean
});

const disabled = ref(null);
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

const image_list = ref(null);

const init = async () => {
  image_list.value = await images_list()
}
// 监听父组件传参变化
watch(() => props.form, (newVal, oldVal) => {
  form.value = newVal;
});
// 监听父组件传参变化
watch(() => props.disabled, (newVal, oldVal) => {
  console.log(newVal);
  disabled.value = newVal;
});
const emit = defineEmits(['on-response']);

watch(form.value, (newVal, oldVal) => {
  emit('on-response', newVal);
});

init()

</script>

<template>
  <div class="new_container">
    <a-space direction="vertical" size="large" :style="{width: '900px',height:'600px',margin:'auto'}">
      <a-form :model="form" layout="horizontal" auto-label-width>
        <a-row :gutter="16">
          <a-col :span="10">
            <div class="form-item">
              <p class="label">容器名称</p>
              <div class="form-item-value">
                <a-input v-model="form.hostname" placeholder="容器名称" :disabled="disabled"/>
              </div>
            </div>
          </a-col>
          <a-col :span="14">
            <div class="form-item">
              <p class="label">容器镜像</p>
              <div class="form-item-value">
                <a-select v-model="form.image" placeholder="容器镜像" allow-clear allow-create :disabled="disabled">
                  <a-option v-for="i in image_list" :value="i.RepoTags">{{ i.RepoTags }}</a-option>
                </a-select>
              </div>
            </div>
          </a-col>
        </a-row>
        <div class="form-item">
          <p class="label">启动命令</p>
          <div class="form-item-value">
            <a-input v-model="form.command" placeholder="启动命令" :disabled="disabled"/>
          </div>
        </div>
        <div class="form-item">
          <p class="label">重启策略</p>
          <div class="form-item-value">
            <a-radio-group v-model="form.restart" :disabled="disabled">
              <a-radio value="always">always</a-radio>
              <a-radio value="no">no</a-radio>
              <a-radio value="on-failure">on-failure</a-radio>
              <a-radio value="on-failure:3">on-failure:3</a-radio>
              <a-radio value="unless-stopped">unless-stopped</a-radio>
            </a-radio-group>
          </div>
        </div>
        <div class="form-item">
          <p class="label">特权模式</p>
          <div class="form-item-value">
            <a-switch v-model="form.privileged" :disabled="disabled"/>
          </div>
        </div>
        <div class="form-item">
          <p class="label">环境变量</p>
          <div class="form-item-value">
            <div class="environment">
              <div class="title">
                <p>名称</p>
                <p></p>
                <p>值</p>
                <a-button class="but" type="outline" @click="form.environment.push({key:'',value: ''})"
                          v-if="!disabled">新增
                </a-button>
              </div>
              <div class="view" v-for="(item,index) in form.environment" :key="index">
                <a-input v-model="item.key" placeholder="Key" :disabled="disabled"/>
                <p>=</p>
                <a-input v-model="item.value" placeholder="Value" :disabled="disabled"/>
                <a-tooltip content="删除">
                  <div class="butt" v-if="!disabled" @click="form.environment.splice(index,1)">
                    <icon-delete/>
                  </div>
                </a-tooltip>
              </div>
            </div>
          </div>
        </div>
        <a-divider/>
        <div class="form-item">
          <p class="label">挂载卷</p>
          <div class="form-item-value">
            <div class="environment">
              <div class="title">
                <p>主机路径</p>
                <p></p>
                <p>容器路径</p>
                <a-button class="but" type="outline" v-if="!disabled"
                          @click="form.volumes.push({host_path:'',container_path: ''})">新增
                </a-button>
              </div>
              <div class="view" v-for="(item,index) in form.volumes" :key="index">
                <a-input v-model="item.host_path" placeholder="主机路径" :disabled="disabled"/>
                <p>:</p>
                <a-input v-model="item.container_path" placeholder="容器路径" :disabled="disabled"/>
                <a-tooltip content="删除">
                  <div class="butt" v-if="!disabled" @click="form.volumes.splice(index,1)">
                    <icon-delete/>
                  </div>
                </a-tooltip>
              </div>
            </div>
          </div>
        </div>
        <a-divider/>
        <div class="form-item">
          <p class="label">端口</p>
          <div class="form-item-value">
            <div class="environment">
              <div class="title">
                <p>主机端口</p>
                <p></p>
                <p>容器端口</p>
                <a-button class="but" type="outline" v-if="!disabled"
                          @click="form.ports.push({host_ports:number,container_ports: number})">
                  新增
                </a-button>
              </div>
              <div class="view" v-for="(item,index) in form.ports" :key="index">
                <a-input v-model="item.host_ports" placeholder="主机端口" :disabled="disabled"/>
                <p>:</p>
                <a-input v-model="item.container_ports" placeholder="容器端口" :disabled="disabled"/>
                <a-tooltip content="删除">
                  <div class="butt" @click="form.ports.splice(index,1)" v-if="!disabled">
                    <icon-delete/>
                  </div>
                </a-tooltip>
              </div>
            </div>
          </div>
        </div>
        <a-divider/>
        <div class="form-item">
          <p class="label">主机映射</p>
          <div class="form-item-value">
            <div class="environment">
              <div class="title">
                <p>域名</p>
                <p></p>
                <p>ip</p>
                <a-button class="but" type="outline" v-if="!disabled"
                          @click="form.extra_hosts.push({host:'',ip: ''})">
                  新增
                </a-button>
              </div>
              <div class="view" v-for="(item,index) in form.extra_hosts" :key="index">
                <a-input v-model="item.host" placeholder="域名" :disabled="disabled"/>
                <p>:</p>
                <a-input v-model="item.ip" placeholder="ip" :disabled="disabled"/>
                <a-tooltip content="删除">
                  <div class="butt" @click="form.extra_hosts.splice(index,1)" v-if="!disabled">
                    <icon-delete/>
                  </div>
                </a-tooltip>
              </div>
            </div>
          </div>
        </div>
      </a-form>
      <!--      <a-divider style="margin: 0" v-if="!disabled"/>-->
      <!--      <a-button @click="create_app()" class="but" v-if="!disabled" type="primary"-->
      <!--                style="width: 100%;margin: 0 0 20px 0">-->
      <!--        创建-->
      <!--      </a-button>-->
    </a-space>

  </div>

</template>

<style scoped lang="less">
.arco-input-wrapper .arco-input[disabled] {
  -webkit-text-fill-color: rgb(0 0 0);
}

.new_container {
  display: flex;
  flex-direction: column;

  .form-item {
    //height: 30px;
    margin-bottom: 30px;
    display: grid;
    grid-template-columns: 70px auto;
    gap: 20px;

    .label {
      font-family: siyuan-normal;
      font-size: 14px;
      margin: 5px auto auto 0;
    }

    .form-item-value {
      display: flex;
      align-items: center; /* 垂直居中 */
    }

    .environment {
      width: 100%;
      display: flex;
      flex-direction: column;

      .title {
        height: 30px;
        display: grid;
        grid-template-columns: 1fr 10px 1fr 60px;
        grid-template-rows: 1fr;
        gap: 10px;
        margin-bottom: 10px;

        p {
          margin: auto 0;
          font-family: siyuan-normal;
          font-size: 14px;
        }

        .but {
          margin-left: auto;
        }
      }

      .view {
        display: grid;
        grid-template-columns: 1fr 10px 1fr 60px;
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
  }
}


</style>