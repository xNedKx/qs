/* <test.js>
 *   A learning test program.
 *
 * copyright 2016/12/08 by xNedKx@gmail.com
 *
 */
"use strict";

var elements = createElements();
var timeout = 3 * 60 * 1000;
var tick = 10;
var currentSet, defaultSet;
var sets;
var question, hintNumber, hintLevel = 0;
var displayAnswer = false;
var selectMode;

new Promise( (s,j) => {
  let loading = setInterval( () => {
    timeout -= tick;
    if( window.hasOwnProperty("QS")
     && window.hasOwnProperty("fileLoader")
     && window.hasOwnProperty("csvUtil")
     && window.hasOwnProperty("presets") ){
      clearInterval(loading);
      s(window);
    }else if( timeout <= 0 ){
      j("Loading failed! (timeout)");
    }
  }, tick);
}).then( w => setup(w) ).catch( er => console.log(er) );

function createElements(){
  var container = document.createElement("div");
  container.id = "container";
  
  var nav = document.createElement("nav");
  nav.id = "nav"
  container.appendChild(nav);
  var main = document.createElement("main");
  main.id = "main"
  container.appendChild(main);
  var sidebar = document.createElement("aside");
  sidebar.id = "sidebar"
  container.appendChild(sidebar);
  
  var nav_header = document.createElement("div");
  nav_header.id = "nav_header";
  nav_header.innerText = "選擇題庫";
  nav.appendChild(nav_header);
  var question_set = document.createElement("div");
  question_set.id = "question_set";
  nav.appendChild(question_set);
  var control = document.createElement("div");
  control.id = "control";
  nav.appendChild(control);
  
  var header = document.createElement("h1");
  header.id = "header";
  header.innerText = document.title;
  main.appendChild(header);
  var question = document.createElement("div");
  question.id = "question";
  main.appendChild(question);
  var options = document.createElement("div");
  options.id = "options";
  main.appendChild(options);
  var buttons = document.createElement("div");
  buttons.id = "buttons";
  main.appendChild(buttons);
  var hints = document.createElement("div");
  hints.id = "hints";
  main.appendChild(hints);
  var result = document.createElement("div");
  result.id = "result";
  main.appendChild(result);
  var misc = document.createElement("div");
  misc.id = "misc";
  main.appendChild(misc);
  
  var sidebar_header = document.createElement("div");
  sidebar_header.id = "sidebar_header";
  sidebar.appendChild(sidebar_header);
  var list = document.createElement("div");
  list.id = "list";
  sidebar.appendChild(list);
  
  var confirm = document.createElement("button");
  confirm.className = "btn";
  confirm.id = "btn_cofirm";
  confirm.innerText = "確認";
  buttons.appendChild(confirm);
  var answer = document.createElement("button");
  answer.className = "btn";
  answer.id = "btn_answer";
  answer.innerText = "顯示解答";
  buttons.appendChild(answer);
  var hint = document.createElement("button");
  hint.className = "btn";
  hint.id = "btn_hint";
  hint.innerText = "提示";
  buttons.appendChild(hint);
  var next = document.createElement("button");
  next.className = "btn";
  next.id = "btn_next";
  next.innerText = "下題";
  buttons.appendChild(next);
  
  var btnSave = document.createElement("button");
  btnSave.className = "btn";
  btnSave.id = "btn_save";
  btnSave.innerText = "儲存紀錄";
  misc.appendChild(btnSave);
  var btnLoad = document.createElement("button");
  btnLoad.className = "btn";
  btnLoad.id = "btn_load";
  btnLoad.innerText = "讀取紀錄";
  misc.appendChild(btnLoad);
  var btnClear = document.createElement("button");
  btnClear.className = "btn";
  btnClear.id = "btn_clear";
  btnClear.innerText = "清除紀錄";
  misc.appendChild(btnClear);
  
  document.body.appendChild(container);
  
  return {container, nav, main, sidebar, nav_header, question_set, control, header, question, options, buttons, hints, result, misc, sidebar_header, list, confirm, answer, hint, next, btnSave, btnLoad, btnClear};
}

function addTriggers(){
  elements.confirm.addEventListener("click", confirmQuestion);
  elements.answer.addEventListener("click", showAnswer);
  elements.hint.addEventListener("click", showHint);
  elements.next.addEventListener("click", nextQuestion);
  
  elements.btnSave.addEventListener("click", save);
  elements.btnLoad.addEventListener("click", load);
  elements.btnClear.addEventListener("click", clearSave);
  
  elements.nav_header.addEventListener("click", toggleNav);
  elements.sidebar_header.addEventListener("click", toggleList);
  
  window.addEventListener("beforeunload", function(e){
    if(sets && Object.keys(sets).length){
      save();
    }
  });
}

function loadCsvData(srcs, callback){
  return Promise.all(
    srcs.map( s => fileLoader.load( s.url, s.mime ? {mime: s.mime} : {} ) )
  ).then( bs => Promise.all(
      bs.map( (b,i) => csvUtil.parse( b, true, srcs[i].separator ) )
    ).then( vs =>
      callback( srcs.reduce( (r,s,i) => Object.assign( r, {[s.name]: Object.assign(vs[i], s)} ), {} ) )
    ).catch( er => console.log("Parse time error", er) )
  ).catch( er => console.log("Loading failed", er) )
}

function createQuestions(dataObj){
  try{
    let options = [];
    let questions = [];
    Object.entries(dataObj).forEach(([name, data]) => {
      if(data.type == "option"){
        options.push(data);
      }else if(data.type == "question"){
        questions.push(data);
      }
    });
    options.forEach(ar => {
      ar.forEach( op => {
        let exclude = null;
        try{
          exclude = JSON.parse(op.exclude);
        }catch(er){
          if(op.exclude && /^\[.*?\]$/u.test(op.exclude)){
            exclude = op.exclude.slice(1,-1).split(",");
          }
        }
        new QS.Option( op.type, op.value, op.display, exclude ).save()
      } )
    });
    return new QS.QuestionSet(
      questions.reduce( (output,ar) => output.concat(
        ar.map( q => {
          let params = q.params ? JSON.parse(q.params) : null;
          if(ar.number){
            if(params){
              params = Object.assign(params, {optionNumber: number})
            }else{
              params = {optionNumber: number}
            }
          }
          let hints = q.hints ? /^\[.*?\]$/u.test(q.hints) ? q.hints.slice(1,-1).split(",") : q.hints : null;
          let description = params ? Object.entries(params).reduce( (r,[k,v]) => r.replace(`{${k}}`, `${v}`), q.description ) : q.description;
          let answer = params && params.doNotParseAnswer ? q.answer : q.answer ? /^\[.*?\]$/u.test(q.answer) ? q.answer.slice(1,-1).split(ar.separator == "," ? ";" : ",").map(a => new QS.Option(ar.optionType, a)) : new QS.Option(ar.optionType, q.answer) : null;
          return new QS.Question( q.group, q.type, answer, description, hints, params ).save();
        })
      ), []).reverse()
    );
  }catch(er){
    console.log(er);
  }
}

function setup(){
  createPresetsLink();
  addTriggers();
  if(localStorage){
    if(localStorage.getItem("nav") == "open"){
      toggleNav();
    }else{
      toggleNav();
      toggleNav();
    }
    if(localStorage.getItem("sidebar") == "open"){
      toggleList();
    }else{
      toggleList();
      toggleList();
    }
  }
  csvUtil.warning = false;
  QS.config({verbose: false});
  defaultSet = Object.keys(presets)[0];
  loadPreset(presets[defaultSet]);
}

function loadPreset(preset, s){
  if(typeof preset == "object" && preset.name && Array.isArray(preset.srcs)){
    disableButtons();
    [...elements.question_set.children].forEach(d => {
      if(d.dataset.preset == preset.name){
        d.classList.add("current");
      }else{
        d.classList.remove("current");
      }
    });
    if(s && sets && Object.keys(sets.history).length){
      save();
    }
    currentSet = preset.name;
    QS.config(preset.config);
    return loadCsvData(preset.srcs, run);
  }
}

function run(data){
  elements.header.innerText = `${document.title} - ${data.display || presets[currentSet].display}`;
  QS.loadAll({options: [], questions: []});
  if(!load()){
    sets = createQuestions(data);
    sets.shuffle();
  }
  createList();
  showQuestion();
}

function confirmQuestion(e){
  if(!elements.options.classList.contains("answered")){
    let r;
    if(/^select/.test(question.type)){
      r = sets.answer( [...elements.options.querySelectorAll(".selected")].map(d => d.dataset.value) );
    }else{
      r = sets.answer( elements.options.lastChild.value );
    }
    if(r){
      elements.result.innerText = "正確";
      elements.result.className = "right";
      changeResult(sets.index, true);
    }else{
      elements.result.innerText = "錯誤";
      elements.result.className = "wrong";
      changeResult(sets.index, false);
    }
    if(displayAnswer){
      displayAnswer = false;
      showAnswer();
    }
    elements.options.classList.add("answered");
  }
}

function toggleDisplayAnswer(bool){
  displayAnswer = Boolean(bool);
  document.getElementById("btn_answer").innerText = displayAnswer ? "隱藏解答" : "顯示解答";
}

function removeAnswer(){
  [...elements.options.children].forEach( d => {
    d.classList.remove("right");
    d.classList.remove("wrong");
  });
  clearResultDisplay();
  elements.options.classList.remove("answered");
}

function showAnswer(e){
  removeAnswer();
  elements.options.classList.remove("answered");
  if(displayAnswer){
    toggleDisplayAnswer(false);
  }else{
    if(/^select/.test(question.type)){
      if(Array.isArray(question.answer)){
        [...elements.options.children].forEach( d => {
          if(question.answer.filter(a => a instanceof QS.Option ? a.id == d.dataset.oid : a == d.dataset.value).length){
            d.classList.add("right");
            d.classList.remove("wrong");
          }else{
            d.classList.add("wrong");
            d.classList.remove("right");
          }
        })
      }else{
        [...elements.options.children].forEach( d => {
          if(question.answer instanceof QS.Option ? question.answer.id == d.dataset.oid : question.answer == d.dataset.value){
            d.classList.add("right");
            d.classList.remove("wrong");
          }else{
            d.classList.add("wrong");
            d.classList.remove("right");
          }
        })
      }
    }else{
      elements.result.innerText = question.answer;
    }
    toggleDisplayAnswer(true);
  }
}

function showHint(e){
  let n = Array.isArray(question.hints) ? question.hints.length : question.hints ? 1 : 0;
  if( hintNumber < n ){
    var d = document.createElement("div");
    d.innerText = question.hint(hintNumber);
    d.className = "hint";
    elements.hints.appendChild(d);
    hintNumber++;
  }
  if( hintNumber >= n ){
    toggleButton(elements.hint, false);
  }
}

function nextQuestion(e){
  let i = sets.index == sets.order.length - 1 ? 0 : sets.index + 1;
  while(sets.history[i] && sets.history[i][0].result){
    i++;
    if( i >= sets.order.length ){
      i = 0;
    }else if( i == sets.index ){
      break;
    }
  }
  sets.index = i;
  showQuestion();
}

function clearResultDisplay(){
  elements.result.innerText = "";
  elements.result.className = "";
}

function save(e){
  if(localStorage){
    if(sets && Object.keys(sets.history).length){
      localStorage.setItem("history_" + currentSet, sets.serialize());
      localStorage.setItem("qs_" + currentSet, QS.serializeAll());
      elements.result.className = "info";
      elements.result.innerText = "紀錄已儲存";
    }else{
      elements.result.className = "info";
      elements.result.innerText = "沒有紀錄可以儲存";
    }
  }
}

function load(e){
  if(localStorage){
    var qs = localStorage.getItem("qs_" + currentSet);
    var history = localStorage.getItem("history_" + currentSet);
    if(qs && history){
      var oldQS = QS.serializeAll();
      var oldSet = sets;
      try{
        QS.loadAll(QS.unserializeAll(qs));
        sets = QS.QuestionSet.unserialize(history);
      }catch(er){
        console.log(er);
        QS.loadAll(QS.unserializeAll(oldQS));
        sets = oldSet;
        elements.result.className = "info";
        elements.result.innerText = "讀取紀錄失敗";
        return false;
      }
      [...elements.list.children].forEach(d => d.remove());
      createList();
      showQuestion();
      elements.result.className = "info";
      elements.result.innerText = "讀取紀錄";
      return true;
    }else{
      elements.result.className = "info";
      elements.result.innerText = "沒有儲存的紀錄";
      return false;
    }
  }
}

function clearSave(e){
  if(localStorage){
    clearResultDisplay();
    if(localStorage.hasOwnProperty("history_" + currentSet) && localStorage.hasOwnProperty("qs_" + currentSet)){
      localStorage.removeItem("history_" + currentSet);
      localStorage.removeItem("qs_" + currentSet);
      if(sets && Object.keys(sets.history).length){
        if(presets.hasOwnProperty(currentSet)){
          let i = question.id;
          loadPreset(presets[currentSet]).then(r => {
            let qd = [...elements.list.children].find(d => d.dataset.oid == i);
            if(qd){
              qd.dispatchEvent(new Event("click"));
            }
            elements.result.className = "info";
            elements.result.innerText = "紀錄已清除";
          });
        }else{
          [...elements.question_set.children].find(d => d.dataset.preset == currentSet).click()
        }
      }else{
        elements.result.className = "info";
        elements.result.innerText = "紀錄已清除";
      }
    }else{
      if(presets.hasOwnProperty(currentSet)){
        let i = question.id;
        loadPreset(presets[currentSet]).then(r => {
          let qd = [...elements.list.children].find(d => d.dataset.oid == i);
          if(qd){
            qd.dispatchEvent(new Event("click"));
          }
          elements.result.className = "info";
          elements.result.innerText = "紀錄已清除";
        });
      }else{
        [...elements.question_set.children].find(d => d.dataset.preset == currentSet).click()
      }
    }
  }
}

function showQuestion(n = sets.index){
  if(elements.list.querySelector(".current")){
    elements.list.querySelector(".current").classList.remove("current");
  }
  question = sets.question(n);
  elements.question.innerText = question.show();
  elements.question.dataset.qid = question.id;
  elements.question.dataset.index = sets.index;
  if(/^select/.test(question.type)){
    if(Array.isArray(question.answer) && !/^select_one$/.test(question.type)){
      selectMode = "multiple";
    }else{
      selectMode = "single";
    }
    if(!question.options || !question.options.length || question.options.filter(o => !o.id).length){
      question.createOptions();
    }
  }else{
    selectMode = "text";
  }
  changeOptionClass();
  createOptions(question.type, question.options);
  removeAnswer();
  clearResult();
  hintNumber = 0;
  for( let i = 0; i < hintLevel; i++ ){
    showHint();
  }
  if(displayAnswer){
    displayAnswer = false;
    showAnswer();
  }
  enableButtons();
  if(hintLevel == 0 && (!question.hints || !question.hints.length)){
    toggleButton(elements.hint, false);
  }
  let d = [...elements.list.children].find(q => q.dataset.index == sets.index);
  d.classList.add("current");
  list.scrollTop = d.offsetTop - list.offsetTop;
}

function toggleOption(e){
  if(e){
    e.preventDefault();
  }
  switch(selectMode){
  case "multiple":
    if(this.classList.contains("selected")){
      this.classList.remove("selected");
    }else{
      this.classList.add("selected");
    }
  break;
  case "single":
    [...elements.options.children].forEach(d => d.classList.remove("selected"));
    this.classList.add("selected");
  break;
  case "text":
  break;
  }
  elements.options.classList.remove("answered");
}

function createOptions(type, ops){
  while(elements.options.children.length){
    elements.options.removeChild(elements.options.children[0]);
  }
  if(/^select/.test(type)){
    ops.forEach( (o,i) => {
      let op = document.createElement("div");
      op.className = "option";
      op.innerText = o.display;
      op.dataset.value = o.value;
      op.dataset.oid = o.id;
      op.id = `option_${i}`;
      op.addEventListener("click", toggleOption);
      elements.options.appendChild(op);
    });
  }else{
    elements.options.appendChild(document.createElement("input"));
    elements.options.lastchild.className = "option_input";
    elements.options.lastchild.id = "option_0";
  }
}

function changeOptionClass(){
  switch(selectMode){
  case "multiple":
    elements.options.classList.add("multiple");
    elements.options.classList.remove("single");
    elements.options.classList.remove("text");
  break;
  case "single":
    elements.options.classList.remove("multiple");
    elements.options.classList.add("single");
    elements.options.classList.remove("text");
  break;
  case "text":
    elements.options.classList.remove("multiple");
    elements.options.classList.remove("single");
    elements.options.classList.add("text");
  break;
  }
}

function clearResult(){
  [...elements.hints.children].forEach( d => d.remove() );
  [...elements.result.children].forEach( d => d.remove() );
  [...elements.options.children].forEach( o => o.classList.remove("selected") );
}

function toggleButton(btn, status){
  if(typeof status != "boolean" ? !btn.disabled : !status){
    btn.disabled = true;
    btn.classList.add("disabled");
  }else{
    btn.disabled = false;
    btn.classList.remove("disabled");
  }
}

function enableButtons(btns = [...document.querySelectorAll("button")]){
  btns.forEach( b => toggleButton(b, true) );
}
function disableButtons(btns = [...document.querySelectorAll("button")]){
  btns.forEach( b => toggleButton(b, false) );
}


function changeResult(index, correct){
  let result = sets.analyse(index);
  let d = [...elements.list.children].find(q => q.dataset.index == index);
  d.querySelector(".list_item-history").innerText = `${result.correct}/${result.times}`;
  if(correct){
    d.classList.add("right");
    d.classList.remove("wrong");
  }else{
    d.classList.add("wrong");
    d.classList.remove("right");
  }
}

function createListItem(q, i){
  let d = document.createElement("div");
  d.className = "list_item";
  d.dataset.oid = q.id;
  d.dataset.index = sets.order.indexOf(sets.rawSet.indexOf(q));
  let t = document.createElement("span");
  t.className = "list_item-name";
  t.innerText = q.params.name;
  d.appendChild(t);
  t = document.createElement("span");
  t.className = "list_item-history";
  let result = sets.analyse(+d.dataset.index);
  if(result.times){
    if(result.result){
      d.classList.add("right");
      d.classList.remove("wrong");
    }else{
      d.classList.add("wrong");
      d.classList.remove("right");
    }
    t.innerText = `${result.correct}/${result.times}`;
  }
  d.appendChild(t);
  d.addEventListener("click", jumpToQuestion);
  return d;
}

function createList(){
  [...elements.list.children].forEach(d => d.remove());
  sets.rawSet.slice().reverse().forEach( q => elements.list.appendChild(createListItem(q)) );
}

function toggleList(e){
  if(elements.sidebar.classList.contains("list_open")){
    elements.sidebar.classList.remove("list_open");
    elements.sidebar_header.innerText = "開啟題目清單";
    if(localStorage){
      localStorage.setItem("sidebar", "close");
    }
  }else{
    elements.sidebar.classList.add("list_open");
    elements.sidebar_header.innerText = "關閉題目清單";
    if(localStorage){
      localStorage.setItem("sidebar", "open");
    }
  }
}

function jumpToQuestion(e){
  sets.index = +this.dataset.index;
  showQuestion();
}

function toggleNav(e){
  if(elements.nav.classList.contains("open")){
    elements.nav.classList.remove("open");
    elements.nav_header.innerText = "開啟題庫清單";
    if(localStorage){
      localStorage.setItem("nav", "close");
    }
  }else{
    elements.nav.classList.add("open");
    elements.nav_header.innerText = "關閉題庫清單";
    if(localStorage){
      localStorage.setItem("nav", "open");
    }
  }
}

function createPresetsLink(){
  [...elements.question_set.children].forEach(d => d.remove())
  if(presets){
    Object.entries(presets).forEach( ([name, preset]) => {
      let d = document.createElement("div");
      d.className = "preset_link";
      d.innerText = preset.display;
      d.dataset.preset = name;
      d.addEventListener("click", openPreset);
      elements.question_set.appendChild(d);
    });
  }else{
    throw new Error("Presets not defined");
  }
}

function openPreset(e){
  if(e){
    loadPreset(presets[this.dataset.preset], true);
  }
}
