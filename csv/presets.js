var presets = {
  comb1: {
    name: "comb1",
    display: "方劑組成",
    srcs: [
      {name: "combinations", url: "./csv/comb1_q.csv", mime: "text/plain", separator: ";", type: "question", optionType: "herbs"},
      {name: "herbs", url: "./csv/comb1_o.csv", mime: "text/plain", separator: ";", type: "option"}
    ],
    config: {
      optionExpandNumber: 36
    }
  },
  hc: {
    name: "hc",
    display: "藥物 → 方劑",
    srcs: [
      {name: "herb", url: "./csv/hc_q.csv", mime: "text/plain", separator: ";", type: "question", optionType: "hc"},
      {name: "hc", url: "./csv/hc_o.csv", mime: "text/plain", separator: ";", type: "option"}
    ],
    config: {
      optionExpandNumber: 10
    }
  },
  herb1: {
    name: "herb1",
    display: "藥物 → 類型",
    srcs: [
      {name: "herb", url: "./csv/herb1_q.csv", mime: "text/plain", separator: ";", type: "question", optionType: "type"},
      {name: "type", url: "./csv/herb1_o.csv", mime: "text/plain", separator: ";", type: "option"}
    ],
    config: {
      optionExpandNumber: 8
    }
  },
  herb2: {
    name: "herb2",
    display: "類型 → 藥物",
    srcs: [
      {name: "type", url: "./csv/herb2_q.csv", mime: "text/plain", separator: ";", type: "question", optionType: "herb"},
      {name: "herb", url: "./csv/herb2_o.csv", mime: "text/plain", separator: ";", type: "option"}
    ],
    config: {
      optionExpandNumber: 12
    }
  },
  point1: {
    name: "point1",
    display: "類型 → 穴道",
    srcs: [
      {name: "feature", url: "./csv/point1_q.csv", mime: "text/plain", separator: ";", type: "question", optionType: "points"},
      {name: "points", url: "./csv/point1_o.csv", mime: "text/plain", separator: ";", type: "option"}
    ],
    config: {
      optionExpandNumber: 8
    }
  },
  point2: {
    name: "point2",
    display: "穴道 → 類型",
    srcs: [
      {name: "points", url: "./csv/point2_q.csv", mime: "text/plain", separator: ";", type: "question", optionType: "type"},
      {name: "type", url: "./csv/point2_o.csv", mime: "text/plain", separator: ";", type: "option"}
    ],
    config: {
      optionExpandNumber: 10
    }
  }
};
