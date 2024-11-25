<script setup>
import {ref} from 'vue'
import {containers_remove, images_list, remove_images} from '../../utils/request';
import mirrorTextArea from '../widgets/mirrorTextArea.vue';
import {volume_list, volume_remove, volume_create} from "../../utils/request";

const visible = ref(false);
const columns = [
  {
    title: 'id',
    dataIndex: 'id',

  },
  {
    title: 'Name',
    dataIndex: 'Name',
  },
  {
    title: 'Driver',
    dataIndex: 'Driver',
  },
  {
    title: 'CreatedAt',
    dataIndex: 'CreatedAt',
  },
  {
    title: 'operation',
    dataIndex: 'operation',
    slotName: 'operation'
  }
]
const data = ref([]);
const volumn_visible = ref(false);
const create_visible = ref(false);
const create_volume_name = ref('')
const nfs_form = ref({
  name: name,
});

const code = ref('')


const init = async () => {
  data.value = await volume_list()
}

const cat_volume_info = (record) => {
  volumn_visible.value = true;
  code.value = JSON.stringify(record.attrs, null, 2);
}

const remove = async (volume_id) => {
  await volume_remove(volume_id)
  await init()
}

const create = async () => {
  await volume_create(create_volume_name.value)
  create_visible.value = false
  await init()
  create_volume_name.value = ''
}

init()
</script>

<template>
  <div class="container">
    <div class="image_container">
      <p class="logo">存储卷</p>
      <a-button class="but" type="outline" @click="init()">刷新</a-button>
      <a-button class="but" type="outline" @click="create_visible = true">创建</a-button>
      <a-input-search class="search" placeholder="搜索卷"/>
    </div>
    <a-table @row-dblclick="cat_volume_info" :columns="columns" :data="data" :bordered="false">
      <template #operation="{ rowIndex }">
        <a-button class="but" type="outline" @click="remove(data[rowIndex].id)">删除</a-button>
      </template>
    </a-table>
  </div>
  <a-modal width="1200px" v-model:visible="volumn_visible" @ok="handleOk" @cancel="handleCancel">
    <template #title>
      镜像信息
    </template>
    <mirrorTextArea height="500px" :code="code"></mirrorTextArea>
  </a-modal>
  <a-modal :visible="create_visible" @ok="create()" @cancel="create_visible = false"
           okText="创建" cancelText="取消" unmountOnClose>
    <template #title>
      创建存储卷
    </template>
    <div>
      <a-tabs type="rounded" default-active-key="1">
        <a-tab-pane key="1" title="本地模式">
          <a-input
              v-model="create_volume_name"
              placeholder="输入卷名称"
          />
        </a-tab-pane>
        <a-tab-pane key="2" title="Nfs卷">
          Content of Tab Panel 2
        </a-tab-pane>
      </a-tabs>

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