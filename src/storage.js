export default {
    fetch: function(STORAGE_KEY){
        return JSON.parse(window.localStorage.getItem(STORAGE_KEY)) //取值
    },
    save: function(STORAGE_KEY,items){
    let item = JSON.stringify(items)
     window.localStorage.setItem(STORAGE_KEY,item) //存值
    }
}