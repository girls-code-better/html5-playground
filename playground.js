console.oldLog = console.log;
console.log = function(value){
    console.oldLog(value);
    return value;
}
var app = new Vue({
    el: "#app",
    data: {
        error: null,
        output:null
    },
    methods: {
        run: function () {
            try {
                var previewFrame = document.getElementById('preview');
                var preview =  previewFrame.contentDocument ||  previewFrame.contentWindow.document;
                preview.open();
                preview.write(myCodeMirror.getValue());
                preview.close();
                confetti.start();
            } catch (e) {
                console.error(e);
                this.error = e;
            }
        },
        removeError: function () {
            confetti.stop();
            this.error = null;
            this.output = null;
        }
    }
})

var myCodeMirror = CodeMirror.fromTextArea(document.getElementById("code-editor"), {
    lineNumbers: true,
 tags: {
    style: [["type", /^text\/(x-)?scss$/, "text/x-scss"],
            [null, null, "css"]],
    custom: [[null, null, "customMode"]]
  },
    mode: "htmlmixed",
    theme: "dracula",
    styleActiveLines: true,
    matchBrackets:true
});
