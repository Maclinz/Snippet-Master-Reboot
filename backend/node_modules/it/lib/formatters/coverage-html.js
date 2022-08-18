var _ = require("../extended"),
    path = require("path"),
    fs = require("fs"),
    format = _.format;

var TEMPLATE = fs.readFileSync(path.resolve(__dirname, "./assets/coverage/template.html"), "utf8");
var SECTION_TEMPLATE = fs.readFileSync(path.resolve(__dirname, "./assets/coverage/section-template.html"), "utf8");
var OVERVIEW_TEMPLATE = fs.readFileSync(path.resolve(__dirname, "./assets/coverage/overview-template.html"), "utf8");

function writeFile(body, out) {
    fs.writeFileSync(path.resolve(process.cwd(), out || "./coverage.html"), format(TEMPLATE, {body: body}), "utf8");
}

function getLevel(coverage) {
    return coverage === 100 ? 'all' : coverage > 90 ? 'high' : coverage > 75 ? 'med' : 'low';
}


function getFileSource(file) {
    return format(SECTION_TEMPLATE, {name: file.name, level: getLevel(file.coverage), coverage: file.coverage, LOC: file.LOC, SLOC: file.SLOC, totalMisses: file.totalMisses, source: file.source});
}

function reportCoverageTable(cov, out) {
    var body = [];
    cov.files.sort(function (a, b) {
        var ret = a.coverage - b.coverage;
        if (!ret) {
            var aParts = a.name.split(path.sep), bParts = a.name.split(path.sep);
            if (aParts.length !== bParts.length) {
                ret = aParts.length - bParts.length;
            }
            ret = a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
        }
        return ret;
    });
    // Stats
    body.push(format(OVERVIEW_TEMPLATE, {coverage: cov.coverage, LOC: cov.LOC, SLOC: cov.SLOC, totalMisses: cov.totalMisses}));
    // Source
    body = body.concat(_.map(cov.files, getFileSource));
    writeFile(body.join("\n"), out);
}


function coverage(data, val) {
    var n = 0;
    for (var i = 0, len = data.length; i < len; ++i) {
        if (data[i] !== undefined && Boolean(data[i]) === val) {
            ++n;
        }
    }
    return n;
}

function getFileFormatter(file) {
    return function formatSource(line, i) {
        i += 1;
        var hits = _.pad(file[i] === 0 ? 0 : (file[i] || ' '), null, true), hasHits = file[i] === 0 ? false : true;
        return format("<li class='%s'><span class='%s'>%s</span><code>%s</code></li>", hasHits ? 'green' : 'red', file[i] === undefined ? "" : hasHits ? "hits" : "nohits", hits, line);
    };
}


function populateCoverage(cov) {
    cov.LOC = cov.SLOC = cov.totalHits = cov.totalMisses = cov.coverage = 0;
    var files = [];
    _(cov).forEach(function (file, name) {
        if (_.isArray(file)) {
            // Stats
            files.push(file);
            delete cov[name];
            cov.totalHits += file.totalHits = coverage(file, true);
            cov.totalMisses += file.totalMisses = coverage(file, false);
            cov.SLOC += file.SLOC = file.totalHits + file.totalMisses;
            if (!file.source) {
                file.source = [];
            }
            cov.LOC += file.LOC = file.source.length;
            file.coverage = ((file.totalHits / file.SLOC) * 100).toFixed(2);
            // Source
            file.name = name;

            file.source = format("<pre class='prettyprint linenums'><ol class='linenums'>%s</ol></pre>", _.map(file.source, getFileFormatter(file)).join('\n'));

        }
    });
    cov.coverage = ((cov.totalHits / cov.SLOC) * 100).toFixed(2);
    cov.files = files;
}

exports.showCoverage = function showCoverage(jscoverage, out) {
    if (typeof jscoverage === 'object') {
        populateCoverage(jscoverage);
        if (jscoverage.coverage) {
            reportCoverageTable(jscoverage, out);
        }
    }
};