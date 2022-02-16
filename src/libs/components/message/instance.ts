import { createApp } from 'vue';
import { PopupManager } from 'utils/popup';
import Message from './message.vue';

let instances = [];
let seed = 1;

const createInstance = pms => {
    const params = pms || {};
    let id = `my_message_${seed++}`;
    let verticalOffset = 20;
    instances.forEach(ele => {
        verticalOffset += ele.vm.$el.offsetHeight + 20;
    });
    let childNode = document.createElement('div');
    let parentNode = document.querySelector('#app') || document.body;

    params.verticalOffset = verticalOffset;

    const app = createApp(Message, {
        params,
        remove(){
            handleRemove();
        }
    });

    app.vm = app.mount(childNode);
    parentNode.appendChild(childNode);
    app.id = id;

    app.vm.$el.style.zIndex = PopupManager.nextZIndex();


    instances.push(app);

    const handleRemove = function() {
        app.unmount(childNode);
        parentNode.removeChild(childNode);
        createInstance.close(id);
        setTimeout(() => {
            params.close();
        })
    }

    app.close = () => {
        handleRemove();
    }
    return app;
};

createInstance.close = function(id) {
    let len = instances.length;
    let index = -1;
    let removeHeight;
    for(let i = 0; i < len; i++){
        if(id === instances[i].id){
            removeHeight = instances[i].vm.$el.offsetHeight;
            index = i;
            instances.splice(i, 1);
            break;
        }
    }
    if (len <= 1 || index === -1 || index > instances.length - 1) return;
    for(let i = index; i < len - 1; i++){
        // let temp = instances[i]._props.params.verticalOffset;
        // instances[i]._props.params.verticalOffset = temp - removeHeight - 16;
        let dom = instances[i].vm.$el;
        dom.style.top = parseInt(dom.style.top, 10) - removeHeight - 68 + 'px';
    }
}


export default createInstance;