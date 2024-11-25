import serviceAxios from '../axios/index'

// export const auth_login = (data) => {
//     return serviceAxios({
//         url: "/api/auth/login",
//         method: "post",
//         data,
//     });
// };

export const basic_info = () => {
    return serviceAxios({
        url: "/api/docker/get/basicinfo", method: "get",
    });
};

export const dash_info = () => {
    return serviceAxios({
        url: "/api/docker/get/dashinfo", method: "get",
    });
};


export const images_list = () => {
    return serviceAxios({
        url: "/api/docker/get/images", method: "get",
    });
};

export const remove_images = (image_id) => {
    return serviceAxios({
        url: "/api/docker/remove/images/" + image_id, method: "get",
    });
};

export const load_images = (data) => {
    return serviceAxios({
        url: "/api/docker/load/images", method: "post", data
    });
};

export const pull_images = (tag) => {
    return serviceAxios({
        url: "/api/docker/pull/images/" + tag, method: "get"
    });
};

export const containers_list = () => {
    return serviceAxios({
        url: "/api/docker/get/containers", method: "get",
    });
};

export const containers_start = (container_id) => {
    return serviceAxios({
        url: "/api/docker/get/container/" + container_id + "/start", method: "get",
    });
};

export const containers_stop = (container_id) => {
    return serviceAxios({
        url: "/api/docker/get/container/" + container_id + "/stop", method: "get",
    });
};

export const containers_restart = (container_id) => {
    return serviceAxios({
        url: "/api/docker/get/container/" + container_id + "/restart", method: "get",
    });
};

export const containers_remove = (container_id, hostname) => {
    return serviceAxios({
        url: "/api/docker/remove/container/" + container_id + "/" + hostname, method: "get",
    });
};

export const volume_list = () => {
    return serviceAxios({
        url: "/api/docker/get/volume", method: "get",
    });
};

export const volume_remove = (volume_id) => {
    return serviceAxios({
        url: "/api/docker/remove/volume/" + volume_id, method: "get",
    });
};

export const volume_create = (volume_name) => {
    return serviceAxios({
        url: "/api/docker/create/volume/" + volume_name, method: "get",
    });
};

export const create_container = (data) => {
    return serviceAxios({
        url: "/api/docker/create/container", method: "post", data
    });
};

export const get_store = (data) => {
    return serviceAxios({
        url: "/api/store/get/storeall", method: "get"
    });
};


export const delete_store = (name) => {
    return serviceAxios({
        url: "/api/store/remove/" + name, method: "get"
    });
};
