import router from "@system.router"
import storage from '@system.storage'

var textbox = ''
storage.get({
    key: 'String',
    success: function (data) {
        textbox = data
        this.textbox = textbox
    }
})
var capsicon = "/common/ic_shift.png"

function btnFun(i) {
    textbox = textbox + i
    storage.set({
        key: 'String',
        value: textbox,
    })
}

export default {
    data: {
        textbox: textbox,
        capsicon: capsicon,
        caps: '1/2',
        frames: [
            {
                src: "/common/0.png",
            },
            {
                src: "/common/1.png",
            },
        ],
    },
    onInit() {
        storage.get({
            key: 'String',
            success: function (data) {
                textbox = data
            }
        })
        this.textbox = this.String
    },
    onReady() {
        this.$element('animator').start();
    },
    clickButton(value) {
        btnFun(value);
        this.textbox = textbox;
    },
    clickdel() {
        textbox = textbox.substring(0, textbox.length - 1)
        this.textbox = textbox
        storage.set({
            key: 'String',
            value: textbox,
        })
    },
    clickspace() {
        textbox = textbox + ' '
        this.textbox = textbox
        storage.set({
            key: 'String',
            value: textbox,
        })
    },
    clickenter() {
        this.textbox = textbox + "∀"
        textbox = textbox + '\n'
        storage.set({
            key: 'String',
            value: textbox,
        })
    },
    clicksend() {

    },
    clickleft() {
        router.replace({
            uri: '/pages/cn',
            params: {
                String: textbox
            }
        })
    },
    clickright() {
        router.replace({
            uri: '/pages/en',
            params: {
                String: textbox
            }
        })
    },
};