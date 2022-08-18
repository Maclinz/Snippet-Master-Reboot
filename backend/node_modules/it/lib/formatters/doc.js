var Reporter = require("./reporter"),
    _ = require("../extended"),
    multiply = _.multiply;

var HEADER = "", FOOTER = "";
if (process.title !== "browser") {
    var fs = require("fs"),
        path = require("path");
    HEADER = fs.readFileSync(path.join(__dirname, "assets", "header.html"), "utf8");
    FOOTER = fs.readFileSync(path.join(__dirname, "assets", "footer.html"), "utf8");
}

Reporter.extend({

    instance: {

        indent: 0,

        startTests: function () {
            console.log(HEADER);
        },

        printFinalSummary: function () {
            console.log(FOOTER);
        },

        escape: function (title) {
            return ("" + title).replace(/&/g, '&amp;')
                .replace(/"/g, '&quot;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;');
        },

        testRun: function (test) {
            if (test.description) {
                var indent = multiply("   ", this.indent++);
                console.log('%s<section class="suite">', indent);
                console.log('%s<h1>%s</h1>', indent, this.escape(test.description));
                console.log('%s<dl>', indent);
            }

        },

        testEnd: function (test) {
            if (test.description) {
                var indent = multiply("   ", this.indent--);
                console.log('%s</dl>', indent);
                console.log('%s</section>', indent);
            }

        },

        actionSuccess: function (action) {
            var indent = multiply('   ', this.indent);
            console.log('%s  <dt>%s</dt>', indent, this.escape(action.description));
            var code = this.escape(action.fn.toString());
            console.log('%s  <dd><pre><code>%s</code></pre></dd>', indent, code);
        }
    }


}).as(module).registerType("doc");