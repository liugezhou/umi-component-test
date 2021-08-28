import request from "./request";

export function getSiteInfo() {
    return request({
        url: '/api/v1/componentSite'
    })
}

export function getComponentList() {
    return request({
        url: '/api/v1/components'
    })
}

export function getComponentItem(id) {
    return request({
        url: `/api/v1/components/${id}`
    })
}

export default {}