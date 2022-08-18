(function () {
    "use strict";
    function __defineIt() {
        var _ = require("../extended"),
            merge = _.merge,
            interfaces = require("../interfaces"),
            Reporter = require("../formatters/reporter");

        require("./formatters/html");
        require("../formatters/tap");

        var reporter;
        var it = {
            assert: require("../extension"),

            reporter: function (r, args) {
                if (r) {
                    reporter = Reporter.getInstance(r, args);
                } else {
                    return reporter;
                }
            },


            /**@lends it*/
            printSummary: function printSummary() {
                interfaces.printSummary();
            },

            /**
             * Run all tests that are currently registered.
             * @return {comb.Promise} a promise that is resolved once all tests are done running.
             */
            run: function run(filter) {
                if (typeof window !== "undefined") {
                    try {
                        it.reporter("html", "it");
                    } catch (e) {
                        it.reporter("tap");
                    }
                    var paramStr = window.location.search.substring(1);
                    var params = {};
                    if (paramStr.length > 0) {
                        _(paramStr.split('&')).forEach(function (part) {
                            var p = part.split('=');
                            params[decodeURIComponent(p[0])] = decodeURIComponent(p[1]);
                        });
                    }
                    if (params.hasOwnProperty("filter")) {
                        filter = params.filter;
                    }
                } else {
                    it.reporter("tap");
                }
                return interfaces.run(filter);
            }

        };

        _(interfaces).forEach(function (val) {
            it = merge({}, val, it);
        });

        /**
         * Entry point for writing tests with it.
         * @namespace
         * @name it
         * @ignoreCode code
         */
        return it;
    }

    if ("function" === typeof this.define && this.define.amd) {
        define([], function () {
            return __defineIt();
        });
    } else {
        this.it = __defineIt();
    }
}).call(typeof window !== "undefined" ? window : global);