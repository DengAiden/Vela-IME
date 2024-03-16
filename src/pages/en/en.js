import router from "@system.router"
import storage from '@system.storage'

var textbox = ''
var capsicon = "/common/ic_shift.png"
var capsState = 0
var path = ''
var Package = ''

function btnFun(i) {
    updateTextbox(capsState ? i.toUpperCase() : i);
}

function updateTextbox(newText) {
    textbox += newText;
    storage.set({
        key: 'String',
        value: textbox,
    });
}

function clickKey(key) {
    return function() {
        btnFun(key);
        this.textbox = textbox;
    }
}

var keys = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm'];
var clickHandlers = keys.reduce((handlers, key) => {
    handlers['click' + key] = clickKey(key);
    return handlers;
}, {});

export default {
    data: {
        textbox: textbox,
        capsicon: capsicon,
        frames: [
            {
                src: "/common/0.png",
            },
            {
                src: "/common/1.png",
            },
        ],
        ...keys.reduce((data, key) => (data[key] = key, data), {}),
    },
    onCreate(){
        storage.delete({ key: 'String' });
    },
    onInit() {
        storage.get({
            key: 'String',
            success: function (data) {
                textbox = data
            }
        })
        if(this.String == ""){
            textbox = this.inStr
            path = this.path
            Package = this.Package
        }
        this.textbox = this.String
    },
    onReady() {
        this.$element('animator').start();
    },
    ...clickHandlers,
    clickdel() {
        updateTextbox(textbox.substring(0, textbox.length - 1));
    },
    clickspace() {
        updateTextbox(' ');
    },
    clickenter() {
        updateTextbox('\n');
        this.textbox = textbox + "∀";
    },
    clicksend() {
        router.push({
            uri: `hap://app/${Package}/${path}?inStr=${textbox}`,
            params: {
                String: textbox
            }
        })
    },
    clickleft() {
        router.replace({
            uri: '/pages/symbol',
            params: {
                String: textbox
            }
        })
    },
    clickright() {
        router.replace({
            uri: '/pages/cn',
            params: {
                String: textbox
            }
        })
    },
    clickshift() {
        capsState = 1 - capsState;
        capsicon = capsState ? "/common/ic_caps_lock.png" : "/common/ic_shift.png";
        this.capsicon = capsicon;
        keys.forEach(key => {
            this[key] = capsState ? key.toUpperCase() : key;
        });
    }
};