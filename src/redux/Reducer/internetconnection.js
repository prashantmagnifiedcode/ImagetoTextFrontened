const initial={
    isConnected:false
}

const NTW=(state=initial,action)=>{
    switch (action.type) {
        case "Internet":
            const data= action.payload;
            return {
                ...state,
                isConnected:data.isconnected,
                
            }
    
        default:
            return state;
    
    }

}
export default NTW