const sleep = async (time) =>{
    await new Promise(resolve => setTimeout(resolve, time));
}
export default{
    sleep
}