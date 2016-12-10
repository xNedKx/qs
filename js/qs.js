/* <QS>
 *   A question/option/set class module.
 *
 * copyright 2016/12/05 by xNedKx@gmail.com
 *
 * export: QS, QS.QuestionSet, QS.Question, QS.Option
 *
 */
;(function(window){
  /* configs */
  var config = {
    optionNumber: 5,
    optionExpandMutiple: 0,
    optionExpandPlus: 0,
    optionExpandNumber: 0,
    optionExpandMin: 0,
    optionExpandMax: 0,
    verbose: true
  }
  /* classes and functions */
  var questions = {};
  var options = {};

  function log(...args){
    if(config.verbose){
      console.log(...args);
    }
  }

  function shuffle(array){
    if(!Array.isArray(array)){
      throw "Can only shuffle an array.";
    }
    var a = array.slice(), output = [], l = a.length;
    while(output.length < l){
      output.push( a.splice( Math.floor( Math.random() * a.length ), 1 )[0] );
    }
    return output;
  }

  function Question(group, type, answer, description, hints, params){
    if(!(this instanceof Question)){
      throw "Question can not be called directly.";
    }
    if(!(typeof group == "string" && typeof type != "undefined" && typeof answer != "undefined" && typeof description == "string")){
      throw "Invalid input.\nnew Question(group, type, answer, description, hints, params);";
    }
    this.type = type;
    this.description = description;
    this.answer = answer;
    this.hints = hints;
    this.params = params;
    this.group = group;
    this.options = [];
  }
  Question.prototype.save = function(){
    if(typeof this.id == "undefined"){
      var ans = this.answer;
      if(ans instanceof Option){
        if(ans.saveIndex() == -1){
          ans = ans.save();
        }
      }else if(this.params.doNotParseAnswer){
        ans = this.answer;
      }else if(ans instanceof RegExp){
        ans = new Option("_regex", ans);
        ans = ans.save();
        this.type = "fill_match";
      }else if(typeof ans == "string"){
        if(isFinite(ans) && (+ans).toString() == ans){
          ans = new Option("_number", +ans);
          this.type = "fill_number";
        }else{
          ans = new Option("_string", ans);
          this.type = "fill_word";
        }
        ans = ans.save();
      }else if(typeof ans == "number"){
        ans = new Option("_number", ans);
        ans = ans.save();
        this.type = "fill_number";
      }else if(typeof ans == "boolean"){
        ans = new Option("_bool", ans);
        ans = ans.save();
        this.type = "true_or_false";
      }else if(typeof ans == "function"){
        this.type = "open";
      }else if(Array.isArray(ans)){
        for( var i = 0; i < ans.length; i++ ){
          if(typeof ans[i] == "string"){
            if(isFinite(ans[i])){
              ans[i] = new Option("_number", +ans[i]);
            }else{
              ans[i] = new Option("_string", +ans[i]);
            }
          }else if(typeof ans[i] == "number"){
            ans[i] = new Option("_number", +ans[i]);
          }else if(!(ans[i] instanceof Option)){
            throw "Invalid answer value in array.";
          }
        }
        for( var i = 0; i < ans.length; i++ ){
          if(ans[i].saveIndex() == -1){
            ans[i] = ans[i].save();
          }
        }
      }else{
        throw "Invalid type of answer value.";
      }
      this.answer = ans;
      var group = this.group;
      if(questions.hasOwnProperty(group)){
        this.id = questions[group][0].id + 1;
        questions[group].unshift(this);
      }else{
        this.id = 1;
        questions[group] = [this];
      }
    }
    return this;
  }
  Question.prototype.validate = function(answer){
    if(typeof this.answer == "function"){
      return this.answer(answer);
    }else if(this.answer instanceof Option){
      return this.answer.validate(answer);
    }else if(this.answer instanceof RegExp){
      return this.answer.test(answer);
    }else if(typeof this.answer != "object"){
      return answer == this.answer;
    }else if(Array.isArray(this.answer)){
      if(/^select_one$/.test(this.type)){
        if(this.answer.filter(a => a.validate(answer)).length){
          return true;
        }else{
          return false;
        }
      }else{
        if(answer.length == this.answer.length){
          var ans = this.answer.slice(), a2 = answer.slice();
          loop:
          while(ans.length){
            for( var i = 0; i < a2.length; i++ ){
              if(ans[0].validate(a2[i])){
                ans.shift();
                a2.splice(i,1);
                continue loop;
              }
            }
            return false;
          }
          return true;
        }else{
          return false;
        }
      }
    }else{
      throw "Error on validating question. ";
    }
  }
  Question.prototype.show = function(){
    if(typeof this.description == "function"){
      return this.description(this.params);
    }else if(typeof this.description == "string"){
      return this.description;
    }else{
      throw "Invalid description type";
    }
  }
  Question.prototype.hint = function(n){
    if(this.hints[n]){
      if(typeof this.hints[n] == "function"){
        return this.hints[n](this.params);
      }else if(typeof this.hints[n] == "string"){
        return this.hints[n];
      }
    }else if(typeof this.hints == "function"){
      return this.hints(this.params);
    }else if(typeof this.hints == "string"){
      return this.hints;
    }else if(typeof n == "undefined"){
      return this.hints.length;
    }
    return null;
  }
  Question.prototype.createOptions = function(n){
    if(this.savedIndex == -1){
      throw "Question does not saved."
    }
    if(this.params.doNotCreateOptions){
      return this.options;
    }
    if(!(isFinite(n) && n > 1)){
      if(isFinite(this.params.optionNumber) && this.params.optionNumber > 1){
        n = this.params.optionNumber
      }else if(isFinite(config.optionExpandNumber) && config.optionExpandNumber > 1){
        n = config.optionExpandNumber;
      }else{
        throw "Invalid option numbers. It should be lager than 1.";
      }
    }
    n = Math.ceil(n);
    if(Array.isArray(this.answer)){
      var output;
      if(/^select_one$/.test(this.type)){
        output = [this.answer[Math.floor(Math.random() * this.answer.length)]];
      }else{
        if(this.answer.length > n){
          throw "Option number should not less than answer options.";
        }
        output = this.answer.slice();
      }
      var t = {};
      var d = 0;
      this.answer.forEach(function(o){
        if(!t.hasOwnProperty(o.type)){
          if(!(t[o.type] = options[o.type])){
            throw "No available options.";
          }
          d++;
        }
        t[o.type] = t[o.type].filter(function(ops){return ops.value != o.value && (typeof o.exclude == "undefined" || o.exclude == null || (Array.isArray(o.exclude) && o.exclude.indexOf(ops.value) == -1)) && (typeof ops.exclude == "undefined" || ops.exclude == null || (Array.isArray(ops.exclude) && ops.exclude.indexOf(o.value) == -1))});
      });
      var r, r2, ans;
      while(output.length < n && d > 0){
        r = Math.floor(Math.random() * this.answer.length);
        ans = t[this.answer[r].type];
        r2 = Math.floor(Math.random() * ans.length);
        output.push(ans[r2]);
        t[this.answer[r].type] = ans.filter(function(ops){return ops.value != ans[r2].value && (typeof ans[r2].exclude == "undefined" || ans[r2].exclude == null || (Array.isArray(ans[r2].exclude) && ans[r2].exclude.indexOf(ops.value) == -1)) && (typeof ops.exclude == "undefined" || ops.exclude == null || (Array.isArray(ops.exclude) && ops.exclude.indexOf(ans[r2].value) == -1))});
        if(t[this.answer[r].type].length == 0){
          d--;
        }
      }
      return this.options = shuffle(output);
    }else{
      if(this.answer instanceof Option){
        if(options[this.answer.type]){
          var output = [this.answer];
          var v = this.answer.value;
          var ops = options[this.answer.type].filter(function(o){return o.value != v && (typeof o.exclude == "undefined" || o.exclude == null || (Array.isArray(o.exclude) && o.exclude.indexOf(v) == -1))});
          var r;
          while( output.length < n && ops.length > 0 ){
            r = Math.floor(Math.random() * ops.length);
            output.push(ops[r]);
            v = ops[r].value;
            ops = ops.filter(function(o){return o.value != v && (typeof o.exclude == "undefined" || o.exclude == null || (Array.isArray(o.exclude) && o.exclude.indexOf(v) == -1))});
          }
          return this.options = shuffle(output);
        }else{
          throw "No available options.";
        }
      }else{
        var ops = shuffle(Object.values(options).reduce(function(r,v){ return r.concat(v)}, []));
        var ans = this.answer;
        var output = [ops.find(function(v){ return v.value == ans} )];
        if(typeof output[0] != "undefined"){
          ops = ops.filter(function(o){return o.value != ans && (typeof o.exclude == "undefined" || o.exclude == null || (Array.isArray(o.exclude) && o.exclude.indexOf(ans) == -1))});
          var r;
          while( output.length < n && ops.length > 0 ){
            r = Math.floor(Math.random() * ops.length);
            output.push(ops[r]);
            v = ops[r].value;
            ops = ops.filter(function(o){return o.value != v && (typeof o.exclude == "undefined" || o.exclude == null || (Array.isArray(o.exclude) && o.exclude.indexOf(v) == -1))});
          }
          return this.options = shuffle(output);
        }else{
          throw "No available options.";
        }
      }
    }
  }
  Question.prototype.serialize = function(){
    var op = {};
    if( typeof this.answer == "function" ){
      ans = "function;" + this.answer.toString();
    }else if(Array.isArray(this.answer)){
      ans = this.answer.map(function(a){return a.serialize()});
    }else if(this.answer instanceof Option){
      ans = this.answer.serialize();
    }else{
      ans = JSON.stringify(this.answer);
    }
    if( typeof this.description == "function" ){
      des = "function;" + this.description.toString();
    }else{
      des = this.description;
    }
    if( typeof this.hints == "function" ){
      hint = "function;" + this.description.toString();
    }else if(Array.isArray(this.hints)){
      hint = this.hints.map(function(h){
        if(typeof h == "function"){
          return "function;" + h.toString();
        }else{
          return h;
        }
      });
    }else{
      hint = this.hints;
    }
    op.group = this.group;
    op.type = this.type;
    op.answer = ans;
    op.description = des;
    if(typeof hint != "undefined" && typeof hint != null){
      op.hints = hint;
    }
    if(typeof this.params != "undefined"){
      op.params = this.params;
    }
    if(this.options.length){
      op.options = this.options.map(function(o){return o.serialize();});
    }
    return JSON.stringify(op);
  }
  Question.unserialize = function(string){
    try{
      var input = JSON.parse(string);
      var ans, des, hint, ops;
      if(typeof input.answer == "string"){
        if(/^function;/.test(input.answer)){
          eval("ans = (" + input.answer.slice(9) + ")");
        }else if(/^option\|/.test(input.answer)){
          ans = Option.unserialize(input.answer);
        }else{
          try{
            ans = JSON.parse(ans);
          }catch(er){}
        }
      }else if(Array.isArray(input.answer)){
        ans = input.answer.map(function(a){return Option.unserialize(a);});
      }else{
        ans = input.answer;
      }
      if(typeof input.description == "string"){
        if(/^function;/.test(input.description)){
          eval("des = (" + input.description.slice(9) + ")");
        }else{
          des = input.description;
        }
      }else{
        des = input.description.toString();
      }
      if(typeof input.hints == "string"){
        if(/^function;/.test(input.hints)){
          eval("hint = (" + input.hints.slice(9) + ")");
        }else{
          hint = input.hints;
        }
      }else if(Array.isArray(input.hints)){
        hint = input.hints.map(function(h){
          if(/^function;/.test(h)){
            eval("var f = (" + h.slice(9) + ")");
            return f;
          }else{
            return h;
          }
        });
      }else{
        hint = undefined;
      }
      if(Array.isArray(input.options)){
        ops = input.options.map(function(o){return Option.unserialize(o);});
      }else{
        ops = [];
      }
      var o = new Question(input.group, input.type, ans, des, hint, input.params);
      o.options = ops;
      return o;
    }catch(er){
      return;
    }
  }

  function Option(type, value, display, exclude){
    if(!(this instanceof Option)){
      throw "Option can not be called directly.";
    }
    if(!(typeof type == "string" && typeof value != "undefined")){
      throw "Invalid input, param 1 should be string and param 2 should not be undefined.\nnew Option(type, value, display, exclude);";
    }
    this.type = type;
    this.value = value;
    this.display = typeof display == "string" ? display : value.toString();
    this.exclude = exclude;
  }
  Option.prototype.save = function(){
    var type = this.type;
    var v = this.value;
    var d = this.display;
    if(typeof this.id == "undefined" && this.saveIndex() == -1){
      if(options.hasOwnProperty(type)){
        var dup = options[type].filter(function(op){
          return op.value == v && op.display == d;
        });
        if(dup.length == 0){
          this.id = options[type][0].id + 1;
          options[type].unshift(this);
        }else{
          this.id = dup[0].id;
          return dup[0];
        }
      }else{
        this.id = 1;
        options[type] = [this];
      }
    }
    return this;
  }
  Option.prototype.validate = function(answer){
    if( answer instanceof Option ){
      answer = answer.value;
    }
    if(this.type == "_regex"){
      return this.value.test(answer);
    }else{ // _string, _number, _bool
      return this.value == answer;
    }
  }
  Option.prototype.saveIndex = function(){
    return options.hasOwnProperty(this.type) ? options[this.type].indexOf(this) : -1;
  }
  Option.prototype.serialize = function(){
    var v;
    if(this.value instanceof RegExp){
      v = "regex|||" + this.value.source + "|||" + this.value.flags;
    }else if( typeof this.value == "boolean" ){
      v = "boolean|||" + this.value.toString();
    }else{
      v = this.value;
    }
    return [ "option", encodeURIComponent(this.type), encodeURIComponent(v), encodeURIComponent(this.display), encodeURIComponent(Array.isArray(this.exclude) ? this.exclude.join(",") : (typeof this.exclude != "undefined" && this.exclude != null) ? this.exclude.toString() : "" ) ].join("|");
  }
  Option.unserialize = function(string){
    if(typeof string == "string"){
      var array = string.split("|").map(function(f){return decodeURIComponent(f)});
      var v, x;
      if(array.length == 5 && array[0] == "option"){
        if(/^regex\|\|\|/.test(array[2])){
          v = array[2].split("|||");
          v = new RegExp(v[1], v[2]);
        }else if(/^boolean\|\|\|/.test(array[2])){
          v = array[2].split("|||")[1] == "true" ? true : false;
        }else if(isFinite(array[2]) && (+array[2]).toString() == array[2]){
          v = +array[2];
        }else if(/^(?:Infinity|-Infinity|NaN|undefined|null)$/.test(array[2])){
          eval("v = " + array[2]);
        }else{
          v = array[2]
        }
        x = /,/.test(array[4]) ? array[4].split(",") : array[4];
        return new Option(array[1], v, array[3] != "" ? array[3] : undefined, x != "" ? x : undefined);      
      }
    }
    throw "Unable to convert input to Option.";
  }

  function QuestionSet(qs){
    if(!(this instanceof QuestionSet)){
      throw "QuestionSet can not be called directly.";
    }
    if(!(Array.isArray(qs) && qs.filter(function(q){return q instanceof Question}).length == qs.length)){
      throw "Invalid input, param should be an array contains only Questions.";
    }
    this.rawSet = qs;
    this.order = [];
    for( var i = 0; i < qs.length; i++ ){
      this.order.push(i);
    }
    this.index = 0;
    this.history = {};
    this.status = 0; // 11111 0: answered now, 1: result now, 2: answered before, 3: last result, 4: ever success
  }

  QuestionSet.prototype.list = function(){
    var output = [], q;
    for( var i = 0; i < this.order.length; i++ ){
      q = this.rawSet[this.order[i]];
      q.latestOrder = i;
      output.push(q);
    }
    return output;
  }

  QuestionSet.prototype.shuffle = function(reset_order){
    var output = [], origin = this.order.slice();
    if(reset_order){
      for( var i = 0; i < this.order.length; i++ ){
        output.push(i);
      }
    }else{
      output = shuffle(this.order);
    }
    var nh = {};
    Object.keys(this.history).forEach(function(i){
      nh[output.indexOf(this.order[i])] = this.history[i];
    }, this);
    this.order = output;
    this.history = nh;
    return this.list();
  }

  QuestionSet.prototype.question = function(index, loop){
    if( isFinite(index) ){
      if( index < 0 ){
        if(loop){
          this.index = index % this.order.length + this.order.length;
        }else{
          this.index = 0;
        }
      }else if( index >= this.order.length ){
        if(loop){
          this.index = index % this.order.length;
        }else{
          this.index = this.order.length - 1;
        }
      }else{
        this.index = index;
      }
    }else{
      if( !isFinite(this.index) || this.index < 0 || this.index >= this.order.length ){
        throw "Invalid index of QuestionSet.";
      }
    }
    this.status = 0;
    if(this.history.hasOwnProperty(this.index)){
      this.status |= 1 << 2;
      if(this.history[this.index][0].result){
        this.status |= 1 << 3;
        this.status |= 1 << 4;
      }else{
        for( var i = 1; i < this.history[this.index].length; i++  ){
          if(this.history[this.index][i].result){
            this.status |= 1 << 4;
            break;
          }
        }
      }
    }
    var q = this.rawSet[this.order[this.index]];
    q.latestOrder = this.index;
    if(q.options.length == 0 || this.status & 1 << 3 ){
      var qn = (q.params && isFinite(q.params.optionNumber)) ? +q.params.optionNumber : config.optionExpandNumber > 0 ? config.optionExpandNumber : Array.isArray(q.answer) ? Math.max(config.optionNumber, Math.floor(q.answer.length * (1 + (config.optionExpandMutiple || 0))) + (config.optionExpandPlus || 0)) : config.optionNumber;
      qn = Math.max(config.optionExpandMin > 0 ? config.optionExpandMin : -Infinity, Math.min(config.optionExpandMax > 0 ? config.optionExpandMax : Infinity, qn));
      q.createOptions( qn );
    }
    return q;
  }

  if(Symbol){
    QuestionSet.prototype.next = function(){
      try{
        let q = this.question();
        this.index++;
        return {value: q, done: false};
      }catch(er){
        this.index = 0;
        return {done: true}
      }
    }
    QuestionSet.prototype[Symbol.iterator] = function(){
      return this;
    }
  }

  QuestionSet.prototype.nextQuestion = function(loop){
    return this.question(++this.index, loop);
  }

  QuestionSet.prototype.previousQuestion = function(loop){
    return this.question(--this.index, loop);
  }

  QuestionSet.prototype.randomQuestion = function(){
    return this.question(Math.floor( Math.random() * this.order.length));
  }

  QuestionSet.prototype.answer = function(answer){
    var question = this.question();
    var record = {
      question: question,
      answer: answer,
      result: question.validate(answer),
      time: Date.now()
    }
    if(this.history.hasOwnProperty(this.index)){
      this.history[this.index].unshift(record);
    }else{
      this.history[this.index] = [record];
    }
    this.status |= 1;
    if(record.result){
      this.status |= 1 << 1;
    }
    return record.result;
  }

  QuestionSet.prototype.result = function(index){
    if( isFinite(index) && index >= 0 && index < this.order.length && this.history.hasOwnProperty(index)){
      return this.history[index][0].result;
    }else if(this.history.hasOwnProperty(this.index)){
      return this.history[this.index][0].result;
    }else{
      return null;
    }
  }

  QuestionSet.prototype.reset = function(index){
    var output = {};
    if( isFinite(index) && index >= 0 && index < this.order.length && this.history.hasOwnProperty(index)){
      output[index] = this.history[index];
      delete this.history[index];
    }else if(typeof index == "undefined"){
      output = this.history;
      this.history = {};
    }else{
      log("Target history do not exist.");
      return null;
    }
    return output;
  }
  QuestionSet.prototype.analyse = function(index){
    if(typeof index == "undefined"){
      var total = Object.keys(this.order);
      var answered = Object.keys(this.history);
      var wasRights = [];
      var rights = [];
      var wrong = [];
      for( var i = 0; i < this.order.length; i++ ){
        if(typeof this.history[i] != "undefined"){
          if(this.history[i][0].result){
            wasRights.push(i);
            rights.push(i);
          }else if(this.history[i].filter(function(h){return h.result}).length){
            wasRight.push(i);
          }else{
            wrong.push(i);
          }
        }
      }
      log("total questions:", total.length);
      log("answered questions:", answered.length);
      log("quesiotns that had been correctly answered:", wasRights.length);
      log("correct answer:", rights.length);
      return {total: total, answered: answered, corrects: rights, wasCorrect: wasRights };
    }else if(typeof this.order[index] != "undefined"){
      if(typeof this.history[index] != "undefined"){
        var times = this.history[index].length;
        var result = this.history[index][0].result;
        var corrects = this.history[index].filter(function(h){return h.result}).length;
        var wrongs = times - corrects;
        log("question:", index);
        log("answered times:", times);
        log("correct times:", corrects);
        log("wrong times:", wrongs);
        log("result:", result);
        return {times: times, result: result, correct: corrects, wrong: wrongs};
      }else{
        log("question:", index);
        log("question has not been answered.");
        return {times: 0, result: null, correct: 0, wrong: 0};
      }
    }else{
      log("Out of question range.");
    }
  }
  QuestionSet.prototype.serialize = function(){
    var output = {
      questions: this.rawSet.map(function(q){return [q.group, q.id]}),
      order: this.order,
      history: {},
      index: this.index,
      status: this.status
    };
    for( var i in this.history ){
      output.history[i] = this.history[i].map(function(h){
        return {
          a: h.answer instanceof Option ? h.answer.serialize() : h.answer,
          t: h.time
        };
      });
    }
    return JSON.stringify(output);
  }
  QuestionSet.unserialize = function(qs){
    try{
      var input = JSON.parse(qs);
      var output = new QuestionSet(input.questions.map(function(q){
        return questions[q[0]][questions[q[0]].length - q[1]];
      }));
      output.order = input.order;
      for( var i in input.history ){
        output.history[+i] = [];
        for( var j = 0; j < input.history[i].length; j++ ){
          var a;
          try{
            a = Option.unserialize(input.history[i][j].a);
          }catch(er){
            a = input.history[i][j].a;
          }
          output.history[+i].push({
            question: output.rawSet[output.order[i]],
            answer: a,
            result: output.rawSet[output.order[i]].validate(a),
            time: input.history[i][j].t
          });
        }
      }
      output.index = input.index;
      output.status = input.status;
      return output;
    }catch(er){
      throw "Unable to parse input to QuestionSet";
    }
  }

  function serializeAll(){
    var qs = {}, ops = {};
    for( var g in questions ){
      qs[g] = questions[g].slice().reverse().map(function(q){
        return q.serialize();
      })
    }
    for( var t in options ){
      ops[t] = options[t].slice().reverse().map(function(o){
        return o.serialize();
      })
    }
    return JSON.stringify({questions: qs, options: ops});
  }

  function unserializeAll(json){
    var data = {
      questions: {},
      options: {}
    };
    try{
      var output = JSON.parse(json);
      for( var t in output.options ){
        data.options[t] = output.options[t].map(function(o){
          return Option.unserialize(o);
        });
      }
      for( var g in output.questions ){
        data.questions[g] = output.questions[g].map(function(q){
          return Question.unserialize(q);
        });
      }
      return data;
    }catch(er){
      throw "Unable to load questions.";
    }
  }

  function loadQuestions(qs){
    var old = {};
    Object.assign(old, questions);
    Object.keys(questions).forEach(g => {delete questions[g]});
    try{
      for( var g in qs ){
        qs[g].forEach(function(q){
          if(q instanceof Question){
            q.save();
          }else if(!addQuestions([q])){
            throw "Failed to save question."
          }
        });
      }
      return true;
    }catch(er){
      questions = old;
      return false;
    }
  }

  function loadOptions(ops){
    var old = {};
    Object.assign(old, options);
    Object.keys(options).forEach(t => {delete options[t]});
    try{
      for( var t in ops ){
        ops[t].forEach(function(o){
          if(o instanceof Option){
            o.save();
          }else if(!addOptions([o])){
            throw "Failed to save option.";
          }
        });
      }
      return true;
    }catch(er){
      options = old;
      return false;
    }
  }

  function loadAll(data){
    return loadOptions(data.options) && loadQuestions(data.questions);
  }

  function loadAllJSON(json){
    loadAll(unserializeAll(json));
  }

  function addOptions(ops){
    var n = 0;
    if(Array.isArray(ops)){
      for( var i = 0; i < ops.length; i++ ){
        try{
          log(new Option( ops[i].type, ops[i].value, ops[i].display, ops[i].exclude ).save());
          n++;
        }catch(er){
          log(er);
        }
      }
    }
    return n;
  }

  function addQuestions(qs){
    var n = 0;
    if(Array.isArray(qs)){
      for( var i = 0; i < qs.length; i++ ){
        try{
          log(new Question(qs[i].group, qs[i].type, qs[i].answer, qs[i].description, qs[i].hints, qs[i].params).save());
          n++;
        }catch(er){
          log(er);
        }
      }
    }
    return n;
  }
  var QS = {};
  QS.config = function(nc){
    Object.keys(nc).forEach(function(c){
      if(typeof nc[c] === typeof config[c]){
        config[c] = nc[c];
      }
    });
  };
  QS.Question = Question;
  QS.Option = Option;
  QS.QuestionSet = QuestionSet;
  QS.serializeAll = serializeAll;
  QS.unserializeAll = unserializeAll;
  QS.loadQuestions = loadQuestions;
  QS.loadOptions = loadOptions;
  QS.loadAll = loadAll;
  QS.loadAllJSON = loadAllJSON;
  QS.addQuestions = addQuestions;
  QS.addOptions = addOptions;
  QS.createSet = function(qs){
    return new QuestionSet(qs);
  }
  QS.questions = function(group){
    if(group){
      return questions[group];
    }else{
      return questions;
    }
  }
  QS.options = function(type){
    if(type){
      return options[type];
    }else{
      return options;
    }
  }
  return window.QS = QS;
})(window);

/* custom data */
/*
var predefined_option = [
  { type: "_bool", value: true, display: "正確" },
  { type: "_bool", value: false, display: "錯誤" },
  { type: "_number", value: 0 },
  { type: "_number", value: 1 },
  { type: "_number", value: 10 },
  { type: "_number", value: 100 },
  { type: "_percent", value: 0 },
  { type: "_percent", value: 1 },
  { type: "_string", value: "無" }
];

QS.addOptions(predefined_option);

var Qs = [
  {group: "A", type: null, answer: "111", description: "a 3 digits number", hints: ["odd", "small"], params: null},
  {group: "A", type: null, answer: 100, description: "the right number of a test", hints: ["full"], params: null},
  {group: "A", type: null, answer: /[\w]+/, description: "any word", hints: null, params: null},
  {group: "A", type: null, answer: true, description: "not false", hints: {"bool": true}, params: null},
  {group: "A", type: null, answer: [1,2,3], description: "3 numbers", hints: ["1 digit"], params: null}
];
QS.addQuestions(Qs);

var set = QS.createSet(QS.questions("A"));
*/