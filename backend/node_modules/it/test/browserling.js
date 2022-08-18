var it = require("..");

it.reporter("tap");

require("./it-bdd.test");
require("./it-tdd.test");

it.run();