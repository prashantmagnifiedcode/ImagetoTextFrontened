
export const InternetConnectivity=(data)=>{

    return {
        type:"Internet",payload:data
    }

}
export const LoginUser=(data)=>{
    return {
        type:"LOGIN",
        payload:data,
    }

}
export const UserLogout=()=>{
    return {
        type:"LOGOUT",
    }

}
export const insetdata=(data)=>{
    return {
        type:"INSET_NEW",
        payload:data
    }

}
export const Editdata=(data)=>{
    console.log("eidt",data)
    return {
        type:"EDIT",
        payload:data
    }

}
export const Deldata=(data)=>{
    console.log('del action')
    return {
        type:"DEL",
        payload:data
    }

}

// export const Updatedata=async(data)=>{

//         try {
//           const{id}=data 
//           const res = await GetData.fetchSaveClick({id});
//           if (res?.data.status == 200) {
//               console.log(id)
//             const UpdateRecordlist = res.data.saveclick[0].RecordClick?.map(e => {
//               return {...e, edit: false};
//             });
//             console.log(UpdateRecordlist)
//         }
//         return {
//             type:"UPDATE_R",
//             payload:UpdateRecordlist,
//         }
//         } catch (e) {
//           console.log(e);
//         }
    

// }
