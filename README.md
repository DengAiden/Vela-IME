完全重构的船新版本！

利用自定义组件，方便大家在自己的APP中植入输入法


使用方法：

①首先在src的common文件夹下放入VelaIME



②在所引用项目的package.json中scripts内start和build后面添加

--enable-custom-component true


    "start": "aiot server --watch --open-nuttx --enable-custom-component true",

    "build": "aiot build --enable-custom-component true",

    "release": "aiot release",

    "watch": "aiot watch --open-nuttx",

    "lint": "eslint --format codeframe --fix --ext .ux,.js src/"




③在需要使用输入法的页面添加[CODE=html]<import name="ime" src="../../common/VelaIME/VelaIME.ux"></import>[/CODE]

④在页面中 可显示的全屏根div 下尾部位置添加



   <div class="ime" style="display: {{showStatus}};"> 
    <ime hide="{{hide}}" @press="press"></ime>
    </div>





⑤script下export default内的页面数据模型内添加以下变量

inputbox: "",    //此为输入法返回的文本，按需处理此变量

showStatus: "flex",

hide: false



⑥接着添加以下方法

changeState() {

    this.showStatus = "flex"

    this.hide = !this.hide

  },

  press(e) {

    if (e.detail.status == 1) {

      this.hide = !this.hide

      this.showStatus = "none"

      this.inputbox = e.detail.textbox

    }

  }



⑦为需要唤起输入法的文本框添加事件

@click="changeState"



至此便可正常使用船帆输入法

Vela开发技术交流群：748249608
