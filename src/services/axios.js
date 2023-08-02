import axios from 'axios';

// import { STAGING_URL } from '@env'

// export const SERVER_URL = "https://imagtotext112.onrender.com";
export const SERVER_URL = "http://192.168.1.5:8080";// network ip address
export const BASE_URL = 'api'

console.log(`API_URL : ${SERVER_URL}`);

/** All API call Interface */
let GetData = {

  /** REGISTER USER */
  registerUser(data) {
    return axios.post(`${SERVER_URL}/${BASE_URL}/user/register`, data).then(res => res).catch(err => err.response)
  },

  /** Login USER */
  loginUser(data) {
    return axios.post(`${SERVER_URL}/${BASE_URL}/user/login`, data).then(res => res).catch(err => err.response)
  },


  /** SaveClick */
  SaveClick(data) {
    console.log("ll",data)
    return axios.post(`${SERVER_URL}/${BASE_URL}/user/saveclick`, data).then(res => res).catch(err => err.response)
  },


  /** EditSaveclick */
  editSaveClick(data) {
    console.log("ae",data)
    return axios.patch(`${SERVER_URL}/${BASE_URL}/user/editsaveclick/${data._id}`, data).then(res => res).catch(err => err.response)
  },
  /** fetchSaveclick */
  fetchSaveClick(data) {
    return axios.get(`${SERVER_URL}/${BASE_URL}/user/fetchsaveclick/${data.id}`, data).then(res => res).catch(err => err.response)
  },


  /** Delete Saveclick */
  DelSaveClick({userid,recordid}) {
    // console.log("dle xti")
    return axios.delete(`${SERVER_URL}/${BASE_URL}/user/delete/${userid}/${recordid}`).then(res => res).catch(err => err.response)
  },



}

export {GetData};