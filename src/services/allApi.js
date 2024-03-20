import { commonApi } from "./commonApi"
import { BASE_URL } from "./baseurl"


// Regsiter API
export const registerAPI = async (users) => {
    return await commonApi('POST', `${BASE_URL}/user/register`, users, "")
}

// Login API
export const loginAPI = async (users) => {
    return await commonApi('POST', `${BASE_URL}/user/login`, users, "")
}

// Add project API
export const addProjectAPI = async (reqBody, reqHeader) => {
    return await commonApi('POST', `${BASE_URL}/project/add`, reqBody, reqHeader)
}

// Get homeProject
export const homeProjectAPI = async () => {
    return await commonApi('GET', `${BASE_URL}/project/home-project`)
}

// Get AllProject
export const allProjectAPI = async (searchKey, reqHeader) => {
    // Query parameter = path?key=value
    return await commonApi('GET', `${BASE_URL}/project/all-project?search=${searchKey}`, "", reqHeader)
}

// Get userProject
export const userProjectAPI = async (reqHeader) => {
    return await commonApi('GET', `${BASE_URL}/user/allproject`, "", reqHeader)
}

// Edit project
export const editProjectAPI = async (projectId, reqBody, reqHeader) => {
    // id is passed as path parameter
    return await commonApi('PUT', `${BASE_URL}/project/edit/${projectId}`, reqBody, reqHeader)
}

// Delete project
export const deleteProjectAPI = async (projectId, reqHeader) => {
    return await commonApi('DELETE', `${BASE_URL}/project/remove/${projectId}`, {}, reqHeader)
}

// Edit profile
export const editProfileAPI = async (reqBody, reqHeader) => {
    return await commonApi('PUT', `${BASE_URL}/user/edit`, reqBody, reqHeader)
}