<script setup>
import {ref} from 'vue'
import {create_container, delete_store, get_store} from "../../utils/request/index.js";
import router from "../../utils/router/index.js";
import newcontainer from '../widgets/new_container.vue'

const data = ref(null)
const upload_visible = ref(false)
const create_container_visible = ref(false)
const install_info = ref(null)


const receiving_parameter = async (newVal) => {
  install_info.value = newVal
}


const on_install = async (item) => {
  create_container_visible.value = true
  install_info.value = item
}

const init = async () => {
  data.value = await get_store()
  upload_visible.value = false
}


const create = async () => {
  await create_container(install_info.value)
  // router.push("/Apps")
}

const remove = async (name) => {
  await delete_store(name)
  await init()
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
  xhr.open('post', 'http://127.0.0.1:8080/api/store/upload/container', true);
  xhr.send(formData);

  return {
    abort() {
      xhr.abort()
    }
  }
};
init()
</script>

<template>
  <div class="container">
    <div class="header">
      <p class="logo">商店</p>
      <a-button class="but" type="outline" @click="upload_visible = true">导入</a-button>
      <a-input-search class="search" placeholder="搜索商店"/>
    </div>
    <!--    <div class="classification">-->
    <!--      <div-->
    <!--          v-for="i in [' 科技新闻 ', ' 财经资讯 ', ' 体育动态 ', ' 娱乐八卦 ', ' 文化艺术 ', ' 教育信息 ', ' 健康养生 ', ' 旅游攻略 ', ' 美食推荐 '] "-->
    <!--          class="classification_container">-->
    <!--        <img src="../../assets/images/docker.png" alt="">-->
    <!--        <p class="title">{{ i }}</p>-->
    <!--      </div>-->
    <!--    </div>-->
    <div class="content">
      <div v-for="item in data" class="content_container">
        <img src="../../assets/images/image.png" alt="">
        <div class="info">
          <p class="title">{{ item.store.name }}</p>
          <a-tooltip
              :content="item.store.describe">
            <p class="introduction">
              {{ item.store.describe }}
            </p>
          </a-tooltip>
          <div class="operation">
            <a-popconfirm content="确认删除么?" okText="确认" cancelText="取消" @ok="remove(item.hostname)">
              <a-button type="text" size="small" style="color: red">
                <template #default>删除</template>
              </a-button>
            </a-popconfirm>
            <a-button type="text" size="small" @click="on_install(item)">
              <template #default>安装</template>
            </a-button>
          </div>
        </div>

      </div>
    </div>
    <a-pagination class="paging" :total="200"/>
  </div>
  <a-modal :visible="upload_visible" @ok="init()" @cancel="init()"
           okText="完成" cancelText="取消" unmountOnClose>
    <template #title>
      导入商店
    </template>
    <div>
      <a-upload draggable :custom-request="load"/>
    </div>
  </a-modal>
  <a-modal width="1000px" v-model:visible="create_container_visible" @ok="create()"
           @cancel="create_container_visible = false">
    <template #title>
      创建容器
    </template>
    <newcontainer :form="install_info" :disabled="!create_container_visible" @on-response="receiving_parameter"></newcontainer>
  </a-modal>
</template>

<style lang="less" scoped>
.container {
  height: 100%;
  width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  .header {
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

  .classification {

    height: 124px;
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 10px;
    // background-color: aqua;

    .classification_container {
      height: 124px;
      width: 124px;
      min-width: 124px;
      display: grid;
      grid-template-rows: 48px 24px;
      align-content: center;
      border-radius: 10px;

      img {
        width: 48px;
        height: 48px;
        margin: auto auto 0 auto;
      }

      .title {
        font-size: 16px;
        font-family: siyuan-bold;
        font-weight: 600;
        margin: 0 auto;

      }

    }

    .classification_container:hover {
      cursor: pointer;
      background-color: rgba(0, 128, 255, .05);
    }

  }

  .content {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 20px;
    margin-top: 20px;
    margin-bottom: 20px;

    .content_container {
      height: 170px;
      width: 582px;
      // background-color: #f2f2f2;
      display: grid;
      grid-template-columns: 250px auto;
      gap: 10px;
      border: 1px solid #d9d9d9;

      img {
        width: 226px;
        height: 141px;
        margin: auto;
      }

      .info {
        display: flex;
        flex-direction: column;
        margin-right: 15px;

        .title {
          color: #3a76bf;
          font-size: 16px;
          font-weight: bold;
          margin: 20px auto 0 0;
        }

        .title:hover {
          cursor: pointer;
          color: #7087ff;
        }

        .introduction {
          height: 60px;
          font-weight: normal;
          margin-bottom: 8px;
          font-size: 13px;
          display: -webkit-box;
          --webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      }

      .operation {
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-direction: row-reverse;
      }
    }
  }

  .paging {
    margin: auto 0 20px auto;
  }
}
</style>