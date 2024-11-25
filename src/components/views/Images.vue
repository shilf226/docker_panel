<script setup>
import {ref} from 'vue'
import {containers_remove, images_list} from '../../utils/request';
import mirrorTextArea from '../widgets/mirrorTextArea.vue';
import {remove_images, load_images, pull_images} from "../../utils/request";

const visible = ref(false);
const columns = [
  {
    title: 'RepoTags',
    dataIndex: 'RepoTags',

  },
  {
    title: 'Created',
    dataIndex: 'Created',
  },
  {
    title: 'Size',
    dataIndex: 'Size',
  },
  {
    title: 'operation',
    dataIndex: 'operation',
    slotName: 'operation'
  }
]
const data = ref([]);
const code = ref('');
const upload_visible = ref(false);
const pull_visible = ref(false);
const form = ref({
  tag: '',
});


const init = async () => {
  data.value = await images_list()
  upload_visible.value = false
  pull_visible.value = false
}

const cat_image_info = async (record) => {
  visible.value = true;
  // console.log(record.data)
  code.value = JSON.stringify(record.data, null, 2);
}

const remove = async (image_id) => {
  await remove_images(image_id)
  await init()
}

const pull = async () => {
  await pull_images(form.value.tag)
}

const load = (option) => {
  const {onProgress, onError, onSuccess, fileItem, name} = option
  const xhr = new XMLHttpRequest();
  if (xhr.upload) {
    xhr.upload.onprogress = function (event) {
      let percent;
      if (event.total > 0) {
        // 0 ~ 1
        percent = event.loaded / event.total;
      }
      onProgress(percent, event);
    };
  }
  xhr.onerror = function error(e) {
    onError(e);
  };
  xhr.onload = function onload() {
    if (xhr.status < 200 || xhr.status >= 300) {
      return onError(xhr.responseText);
    }
    onSuccess(xhr.response);
  };

  const formData = new FormData();
  formData.append(name || 'file', fileItem.file);
  xhr.open('post', 'http://localhost:8080/api/docker/load/images/', true);
  xhr.send(formData);

  return {
    abort() {
      xhr.abort()
    }
  }
};
init()
console.log(images_list())
</script>

<template>
  <div class="container">
    <div class="image_container">
      <p class="logo">镜像</p>
      <a-button class="but" type="outline" @click="init()">刷新</a-button>
      <a-button class="but" type="outline" @click="upload_visible = true;">导入</a-button>
      <a-button class="but" type="outline" @click="pull_visible = true;">拉取</a-button>
      <a-input-search class="search" placeholder="搜索镜像"/>
    </div>
    <a-table @row-dblclick="cat_image_info" :columns="columns" :data="data" :bordered="false">
      <template #operation="{ rowIndex }">
        <a-popconfirm content="确认删除么?" okText="确认" cancelText="取消" @ok="remove(data[rowIndex].Id)">
          <a-button class="but" type="outline">删除</a-button>
        </a-popconfirm>

      </template>
    </a-table>
  </div>
  <a-modal width="1200px" v-model:visible="visible" @ok="handleOk" @cancel="handleCancel">
    <template #title>
      镜像信息
    </template>
    <mirrorTextArea height="500px" :code="code"></mirrorTextArea>
  </a-modal>
  <a-modal :visible="upload_visible" @ok="init()" @cancel="init()"
           okText="完成" cancelText="取消" unmountOnClose>
    <template #title>
      导入镜像
    </template>
    <div>
      <a-upload draggable :custom-request="load"/>
    </div>
  </a-modal>
  <a-modal :visible="pull_visible" @ok="init()" @cancel="init()"
           okText="拉取" cancelText="取消" unmountOnClose>
    <template #title>
      拉取镜像
    </template>
    <div>
      <a-form :model="form" :style="{ width: '450px' }">
        <a-form-item field="tag" label="tag">
          <a-input
              v-model="form.tag"
              placeholder="输入image tag"
          />
        </a-form-item>
      </a-form>
    </div>
  </a-modal>
</template>

<style lang="less" scoped>
.container {
  height: 100%;
  width: 1200px;
  margin: 0 auto;

  .image_container {
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

  .image_id {
    // --webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}
</style>