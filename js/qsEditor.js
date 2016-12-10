/* <qs editor>
 *   An extension of test.js that give question sets managements
 * 
 * copyright 2016/12/09 by xNedKx@gmail.com
 *
 * This script should be loaded after test.js.
 *
 * requirement: test.js
 *
 */
function createEditorCss(){
  if(!document.querySelector("style#qs_editor_style")){
    let d = document.createElement("style")
    d.id = "qs_editor_style"
    d.innerText = 
`
#nav #control #toggle_manager { cursor: pointer; font-size: 0.8em; color: #777; background-color: #fff; padding: 0.2em 0; }
@media screen and (max-width: 599px){
  #nav.open #control #toggle_manager { position: absolute; top: 0; right: 0; height: 1.5em; padding: 0.2em 0.4em; line-height: 1.5em; box-shadow: 0 0 0.1em #ccc; }
}
#nav #control #toggle_manager:hover { background-color: #f0f0f0; color: #555; }
.manager_container { display: none; text-align: center; width: 100%; max-width: 1024px; margin: 0 auto; position: relative; margin-top: 1em; }
.manager_container.open { display: flex; }
.qs_manager { overflow: hidden; position: relative; width: 100%; display: flex; flex-wrap: wrap; }
.qs_manager > div { background-color: #eee; padding: 0.1em 0; }
.manager_header { width: 100%; text-align: center; }
.manager_control { width: 100%; display: flex; flex-wrap: wrap; justify-content: center; }
.manager_info { width: 100%; display: flex; font-size: 0.9em; flex-wrap: wrap; }
.manager_editors { width: 100%; }
.manager_control > label { display: flex; white-space: nowrap; }
.manager_control > label > span { white-space: nowrap; }
.manager_control > label > input { border: none; background-color: #fff; width: 100%; }
.manager_control > button { width: 20%; }
.manager_control > .manager_qs_list { width: 60%; }
.manager_control > .btn_load {}
.manager_control > .btn_save {}
.manager_control > .upload { display: none; }
.manager_control > .btn_upload {}
.manager_control > .btn_download {}
.manager_control > .btn_clear {}
.manager_control > .btn_add {}
.manager_info > label { display: flex; white-space: nowrap; padding: 0.2em 0; }
.manager_info > label > span { white-space: nowrap; margin: 0 0.2em; }
.manager_info > label > input { border: none; background-color: #fff; width: 100%; }
.manager_info > label > textarea {}
.editor_info_code { width: 30%; }
.editor_info_code_text {}
.editor_info_code_input {}
.editor_info_name { width: 30%; }
.editor_info_name_text {}
.editor_info_name_input {}
.editor_info_misc { width: 40%; }
.editor_info_misc_text {}
.editor_info_misc_input {}
@media screen and (max-width: 599px){
  .manager_info > label { padding: 0.1em 0; }
  .editor_info_code { width: 50%; }
  .editor_info_name { width: 50%; }
  .editor_info_misc { width: 100%; }
}

.manager_editors .qs_editor { overflow: hidden; position: relative; width: 100%; display: flex; flex-wrap: wrap; border-top: 1px solid #ccc; }
.qs_editor > div {}
.qs_editor > .editor_header { width: 85%; text-align: center; }
.qs_editor > .editor_control { width: 15%; display: flex; flex-wrap: wrap; justify-content: flex-end; }
.editor_control > input {}
.editor_control > button {}
.editor_control > select {}
.editor_control > label { display: flex; white-space: nowrap; }
.editor_control > label > span { white-space: nowrap; }
.editor_control > label > input { border: none; background-color: #fff; width: 100%; }
.editor_control > .editor_qs_list { width: 20%; margin-right: auto; }
.editor_control > .btn_load { width: 20%; }
.editor_control > .btn_save { width: 20%; }
.editor_control > .upload { display: none; }
.editor_control > .btn_upload { width: 20%; }
.editor_control > .btn_download { width: 20%; }
.editor_control > .editor_info_name { width: 40%; }
.qs_editor > .editor_info { width: 100%; display: flex; font-size: 0.9em; flex-wrap: wrap; }
.editor_info > label { display: flex; white-space: nowrap; }
.editor_info > label > span { white-space: nowrap; }
.editor_info > label > input { border: none; background-color: #fff; width: 100%; }
.editor_question_group { width: 30%; }
.editor_question_text {}
.editor_question_input {}
.editor_option_type { width: 30%; }
.editor_option_text {}
.editor_option_input {}
.editor_question_otype { width: 20%; }
.editor_question_text {}
.editor_question_input {}
.editor_info_number { width: 20%; }
.editor_info_number_text {}
.editor_info_number_input {}
@media screen and (max-width: 599px){
  .editor_info > label { padding: 0.1em 0; }
  .editor_question_group { width: 50%; }
  .editor_option_type { width: 50%; }
  .editor_question_otype { width: 50%; }
  .editor_info_number { width: 50%; }
}

.option_editor { text-align: center; position: relative; display: flex; flex-wrap: wrap; width: 100%; }
.option_editor > div {}
.option_editor > .oe_header { width: 100%; background-color: #eee; display: flex; flex-wrap: wrap; border-top: 1px solid #ccc; }
.option_editor.fixed-header > .oe_header { position: fixed; top: 0; z-index: 10; max-width: 1024px; }
.option_editor.fixed-header > .oe_body {}
.oe_header > .oe_header_text { width: 30%; }
.oe_header > .oe_control { width: 70%; background-color: #eee; text-align: right; }
.oe_control > input {}
.oe_control > button {}
.oe_control > .upload { display: none; }
.oe_control > .btn_upload {}
.oe_control > .btn_download {}
.oe_header > .oe_info { width: 100%; display: flex; background-color: #f6f6f6; font-size: 0.9em; padding: 0.3em 0; }
.oe_info > label { display: none; white-space: nowrap; padding: 0.2em 0; }
.oe_info > label > span { white-space: nowrap; margin: 0 0.2em; }
.oe_info > label > input { border: none; background-color: #fff; width: 100%; }
.oe_info > label > textarea {}
.oe_info_name { width: 40%; }
.oe_info_name_text {}
.oe_info_name_input {}
.oe_info_type { width: 40%;}
.oe_info_type_text {}
.oe_info_type_input {}
.oe_info > .oe_info_add { width: 100%; display: flex; }
.oe_info_add > .btn_add { border: none;  padding: 0; width: 100%; }
.oe_header > .oe_row_header { width: 100%; }
.oe_row_header > .option_row::before { content: ""; display: inline-block; width: 5%; text-align: center; font-size: 0.6em; color: #999; }
.oe_row_header > .option_row { display: flex; position: relative; width: 100%; text-align: left; }
.oe_row_header > .option_row > label { font-size: 0.9em; font-weight: bold; }
.oe_row_header > .option_row > .option_type { display: none; }
.oe_row_header > .option_row > .option_value {}
.oe_row_header > .option_row > .option_display {}
.oe_row_header > .option_row > .option_exclude {}
.oe_row_header > .option_row > .option_remove {}
.option_editor > .oe_body { width: 100%; }
.oe_body > .option_row { counter-increment: option; display: flex; position: relative; width: 100%; text-align: left; }
.oe_body > .option_row::before { content: counter(option); display: inline-block; width: 5%; text-align: center; font-size: 0.6em; color: #999; }
.oe_body > .option_row:nth-child(odd) { background-color: #f6f6f6; }
.oe_body > .option_row:nth-child(even) { background-color: #eee; }
.option_row > label { display: flex; white-space: nowrap; }
.option_row > label > span { white-space: nowrap; margin-right: 0.2em; color: #555; font-size: 0.85em; display: none; }
.option_row > label > input { border: none; vertical-align: text-top; width: 100%; padding: 0; height: 1.2em; background-color: #fff; margin: 0.1em; }
.option_row > label > button { vertical-align: text-top; width: 100%; height: 1.2em; padding: 0; border: 0; }
.option_row > label > textarea { border: none; vertical-align: text-top; width: 100%; padding: 0; min-height: 1.2em; height: 1.2em; background-color: #fff; margin: 0.1em; white-space: nowrap; max-height: 6em; resize: vertical; }
.option_row > .option_type { display: none; }
.option_type > .option_type_text {}
.option_type > .option_type_input {}
.option_row > .option_value { width: 30%; }
.option_value > .option_value_text {}
.option_value > .option_value_input {}
.option_row > .option_display { width: 30%; }
.option_display > .option_display_text {}
.option_display > .option_display_input {}
.option_row > .option_exclude { width: 25%; }
.option_exclude > .option_exclude_text {}
.option_exclude > .option_exclude_input {}
.option_row > .option_remove { width: 10%; }
.option_remove > .option_remove_button { width: 100%; }
.option_row > label.minimize {}
.option_row > label.minimize > span { color: #aaa; }
.option_row > label.minimize > input { color: #aaa; }
.option_row > label.minimize > textarea { color: #aaa; resize: none; }

.question_editor { text-align: center; position: relative; display: flex; flex-wrap: wrap; width: 100%; }
.question_editor > div {}
.question_editor > .qe_header { width: 100%; background-color: #eee; display: flex; flex-wrap: wrap; border-top: 1px solid #ccc; }
.question_editor.fixed-header > .qe_header { position: fixed; top: 0; z-index: 10; max-width: 1024px; }
.question_editor.fixed-header > .qe_body {}
.qe_header > .qe_header_text { width: 30%; }
.qe_header > .qe_control { width: 70%; background-color: #eee; text-align: right; }
.qe_control > input {}
.qe_control > button {}
.qe_control > .upload { display: none; }
.qe_control > .btn_upload {}
.qe_control > .btn_download {}
.qe_header > .qe_info { width: 100%; display: flex; flex-wrap: wrap; background-color: #f6f6f6; font-size: 0.9em; padding: 0.3em 0; }
.qe_info > label { display: none; white-space: nowrap; padding: 0.2em 0; }
.qe_info > label > span { white-space: nowrap; margin: 0 0.2em; }
.qe_info > label > input { border: none; background-color: #fff; width: 100%; }
.qe_info > label > textarea {}
.qe_info_name { width: 50%; }
.qe_info_name_text {}
.qe_info_name_input {}
.qe_info_group { width: 50%; }
.qe_info_group_text {}
.qe_info_group_input {}
.qe_info_number { width: 40%; }
.qe_info_number_text {}
.qe_info_number_input {}
.qe_info_source { display: none; }
.qe_info_source_text {}
.qe_info_source_input {}
.qe_info_type { width: 40%; }
.qe_info_type_text {}
.qe_info_type_input {}
.qe_info > .qe_info_add { width: 100%; display: flex; }
.qe_info_add > .btn_add { border: none;  padding: 0; width: 100%; }
.qe_header > .qe_row_header { width: 100%; }
.qe_row_header > .question_row::before { content: ""; display: inline-block; width: 5%; text-align: center; font-size: 0.6em; color: #999; }
.qe_row_header > .question_row { display: flex; position: relative; width: 100%; text-align: left; }
.qe_row_header > .question_row > label { font-size: 0.9em; font-weight: bold; }
.qe_row_header > .question_row > .question_name {}
.qe_row_header > .question_row > .question_group { display: none; }
.qe_row_header > .question_row > .question_type {}
.qe_row_header > .question_row > .question_answer {}
.qe_row_header > .question_row > .question_description {}
.qe_row_header > .question_row > .question_hints {}
.qe_row_header > .question_row > .question_params_parse {}
.qe_row_header > .question_row > .question_params {}
.qe_row_header > .question_row > .question_remove {}
.question_editor > .qe_body { width: 100%; }
.qe_body > .question_row { counter-increment: question; display: flex; position: relative; width: 100%; text-align: left; }
.qe_body > .question_row::before { content: counter(question); display: inline-block; width: 5%; text-align: center; font-size: 0.6em; color: #999; }
.qe_body > .question_row:nth-child(odd) { background-color: #f6f6f6; }
.qe_body > .question_row:nth-child(even) { background-color: #eee; }
.question_row > label { display: flex; white-space: nowrap; }
.question_row > label > span { white-space: nowrap; margin-right: 0.2em; color: #555; font-size: 0.85em; display: none; }
.question_row > label > input { border: none; vertical-align: text-top; width: 100%; padding: 0; height: 1.2em; background-color: #fff; margin: 0.1em; }
.question_row > label > button { vertical-align: text-top; width: 100%; height: 1.2em; padding: 0; border: 0; }
.question_row > label > textarea { border: none; vertical-align: text-top; width: 100%; padding: 0; min-height: 1.2em; height: 1.2em; background-color: #fff; margin: 0.1em; white-space: nowrap; max-height: 10em; resize: vertical; }
.question_row > .question_name { width: 15% }
.question_name > .question_name_text {}
.question_name > .question_name_input {}
.question_row > .question_group { display: none; }
.question_group > .question_group_text {}
.question_group > .question_group_input {}
.question_row > .question_type { display: none; }
.question_type > .question_type_text {}
.question_type > .question_type_input {}
.question_row > .question_answer { width: 20%; }
.question_answer > .question_answer_text {}
.question_answer > .question_answer_input {}
.question_row > .question_description { width: 40%; }
.question_description > .question_description_text {}
.question_description > .question_description_input {}
.question_row > .question_hints { display: none; }
.question_hints > .question_hints_text {}
.question_hints > .question_hints_input {}
.question_row > .question_params_parse { width: 10%; }
.question_params_parse > .question_params_parse_text {}
.question_params_parse > .question_params_parse_input {}
.question_row > .question_params { display: none; }
.question_params > .question_params_text {}
.question_params > .question_params_input {}
.question_row > .question_remove { width: 10%; }
.question_remove > .question_remove_button { width: 100%; }
.question_row > label.minimize {}
.question_row > label.minimize > span { color: #aaa; }
.question_row > label.minimize > input { color: #aaa; }
.question_row > label.minimize > textarea { color: #aaa; resize: none; }
`
    document.head.appendChild(d)
    return d
  }
}

function createManager(){
  createEditorCss()
  let manager = document.createElement("div")
  manager.className = "qs_manager"
  let header = document.createElement("div")
  header.className = "manager_header"
  header.innerText = "管理題庫"
  manager.appendChild(header)
  let control = document.createElement("div")
  control.className = "manager_control"
  manager.appendChild(control)
  let info = document.createElement("div")
  info.className = "manager_info"
  manager.appendChild(info)
  let editors = document.createElement("div")
  editors.className = "manager_editors"
  manager.appendChild(editors)
  
  let load = document.createElement("button")
  load.className = "btn_load"
  load.innerText = "讀取題庫"
  load.manager = manager
  load.addEventListener("click", loadSet)
  control.appendChild(load)
  let save = document.createElement("button")
  save.className = "btn_save"
  save.innerText = "儲存題庫"
  save.manager = manager
  save.addEventListener("click", saveSet)
  control.appendChild(save)
  let upload = document.createElement("input")
  upload.type = "file"
  upload.className = "upload"
  upload.manager = manager
  upload.addEventListener("change", uploadSet)
  control.appendChild(upload)
  let upload_btn = document.createElement("button")
  upload_btn.className = "btn_upload"
  upload_btn.innerText = "匯入題庫"
  upload_btn.input = upload
  upload_btn.addEventListener("click", openUpload)
  control.appendChild(upload_btn)
  let download = document.createElement("button")
  download.className = "btn_download"
  download.innerText = "匯出題庫"
  download.manager = manager
  download.addEventListener("click", downloadSet)
  control.appendChild(download)
  let remove = document.createElement("button")
  remove.className = "btn_download"
  remove.innerText = "刪除題庫"
  remove.manager = manager
  remove.addEventListener("click", removeSet)
  control.appendChild(remove)
  let qs_list = document.createElement("select")
  qs_list.className = "manager_qs_list"
  control.appendChild(qs_list)
  let clear = document.createElement("button")
  clear.className = "btn_clear"
  clear.innerText = "清除全部"
  clear.manager = manager
  clear.addEventListener("click", clearSet)
  control.appendChild(clear)
  let add_btn = document.createElement("button")
  add_btn.className = "btn_add"
  add_btn.innerText = "增加題組"
  add_btn.editors = editors
  add_btn.addEventListener("click", addEditor)
  control.appendChild(add_btn)
  
  let info_code = document.createElement("label")
  info_code.className = "editor_info_code"
  info.appendChild(info_code)
  let info_code_text = document.createElement("span")
  info_code_text.className = "editor_info_code_text"
  info_code_text.innerText = "ID:"
  info_code.appendChild(info_code_text)
  let info_code_input = document.createElement("input")
  info_code_input.className = "editor_info_code_input"
  info_code.appendChild(info_code_input)
  let info_name = document.createElement("label")
  info_name.className = "editor_info_name"
  info.appendChild(info_name)
  let info_name_text = document.createElement("span")
  info_name_text.className = "editor_info_name_text"
  info_name_text.innerText = "名稱:"
  info_name.appendChild(info_name_text)
  let info_name_input = document.createElement("input")
  info_name_input.className = "editor_info_name_input"
  info_name.appendChild(info_name_input)
  let info_misc = document.createElement("label")
  info_misc.className = "editor_info_misc"
  info.appendChild(info_misc)
  let info_misc_text = document.createElement("span")
  info_misc_text.className = "editor_info_misc_text"
  info_misc_text.innerText = "參數:"
  info_misc.appendChild(info_misc_text)
  let info_misc_input = document.createElement("input")
  info_misc_input.className = "editor_info_misc_input"
  info_misc.appendChild(info_misc_input)
  
  manager.list = qs_list
  manager.editors = editors
  manager.inputs = {code: info_code_input, name: info_name_input, misc: info_misc_input}
  
  listPresets(manager)
  
  return manager
}

function createEditor(){
  let editor = document.createElement("div")
  editor.className = "qs_editor"
  let header = document.createElement("div")
  header.className = "editor_header"
  header.innerText = "題組"
  editor.appendChild(header)
  let control = document.createElement("div")
  control.className = "editor_control"
  editor.appendChild(control)
  let info = document.createElement("div")
  info.className = "editor_info"
  editor.appendChild(info)
  
  let remove = document.createElement("label")
  remove.className = "editor_remove"
  control.appendChild(remove)
  let btn_remove = document.createElement("button")
  btn_remove.className = "editor_remove_button"
  btn_remove.innerText = "移除題組"
  btn_remove.editor = editor
  btn_remove.addEventListener("click", removeEditor)
  remove.appendChild(btn_remove)
  
  /*
  let info_name = document.createElement("label")
  info_name.className = "editor_info_name"
  control.appendChild(info_name)
  let info_name_text = document.createElement("span")
  info_name_text.className = "editor_info_name_text"
  info_name_text.innerText = "代碼:"
  info_name.appendChild(info_name_text)
  let info_name_input = document.createElement("input")
  info_name_input.className = "editor_info_name_input"
  info_name.appendChild(info_name_input)*/
  
  let question_group = document.createElement("label")
  question_group.className = "editor_question_group"
  info.appendChild(question_group)
  let question_group_text = document.createElement("span")
  question_group_text.className = "editor_question_group_text"
  question_group_text.innerText = "名稱:"
  question_group.appendChild(question_group_text)
  let question_group_input = document.createElement("input")
  question_group_input.className = "editor_question_group_input"
  question_group.appendChild(question_group_input)
  let option_type = document.createElement("label")
  option_type.className = "editor_option_type"
  info.appendChild(option_type)
  let option_type_text = document.createElement("span")
  option_type_text.className = "editor_option_type_text"
  option_type_text.innerText = "選項代碼:"
  option_type.appendChild(option_type_text)
  let option_type_input = document.createElement("input")
  option_type_input.className = "editor_option_type_input"
  option_type.appendChild(option_type_input)
  let question_otype = document.createElement("label")
  question_otype.className = "editor_question_otype"
  info.appendChild(question_otype)
  let question_otype_text = document.createElement("span")
  question_otype_text.className = "editor_question_otype_text"
  question_otype_text.innerText = "題型:"
  question_otype.appendChild(question_otype_text)
  let question_otype_input = document.createElement("select")
  question_otype_input.className = "editor_question_otype_input"
  question_otype.appendChild(question_otype_input)
  let question_otype_option1 = document.createElement("option")
  question_otype_option1.value = "select_all"
  question_otype_option1.innerText = "全選"
  question_otype_input.appendChild(question_otype_option1)
  let question_otype_option2 = document.createElement("option")
  question_otype_option2.value = "select_one"
  question_otype_option2.innerText = "擇一"
  question_otype_input.appendChild(question_otype_option2)
  let info_number = document.createElement("label")
  info_number.className = "editor_info_number"
  info.appendChild(info_number)
  let info_number_text = document.createElement("span")
  info_number_text.className = "editor_info_number_text"
  info_number_text.innerText = "選項數量:"
  info_number.appendChild(info_number_text)
  let info_number_input = document.createElement("input")
  info_number_input.className = "editor_info_number_input"
  info_number.appendChild(info_number_input)
  
  editor.qe = createQuestionEditor()
  editor.qe.root.editor = editor
  editor.oe = createOptionEditor()
  editor.oe.root.editor = editor
  editor.appendChild(editor.qe.root)
  editor.appendChild(editor.oe.root)
  
  editor.inputs = {group: question_group_input, type: option_type_input, option_type: question_otype_input, number: info_number_input}
  
  return editor
}

function addEditor(e){
  e.target.editors.appendChild(createEditor())
}

function removeEditor(e){
  e.target.editor.remove()
}

function createOptionEditor(){
  let root = document.createElement("div")
  root.className = "option_editor"
  
  let header = document.createElement("div")
  header.className = "oe_header"
  root.appendChild(header)
  let header_text = document.createElement("div")
  header_text.className = "oe_header_text"
  header_text.innerText = "選項管理"
  header_text.root = root
  header_text.addEventListener("click", jumpToHeader)
  header.appendChild(header_text)
  let control = document.createElement("div")
  control.className = "oe_control"
  header.appendChild(control)
  let info = document.createElement("div")
  info.className = "oe_info"
  header.appendChild(info)
  let row_header = document.createElement("div")
  row_header.className = "oe_row_header"
  header.appendChild(row_header)
  let body = document.createElement("div")
  body.className = "oe_body"
  body.appendChild(createOptionRow().row)
  root.appendChild(body)
  
  let clear = document.createElement("button")
  clear.className = "btn_download"
  clear.innerText = "清除選項"
  clear.body = body
  clear.addEventListener("click", clearOptions)
  control.appendChild(clear)
  let upload = document.createElement("input")
  upload.type = "file"
  upload.className = "upload"
  upload.body = body
  upload.addEventListener("change", loadOptions)
  control.appendChild(upload)
  let upload_btn = document.createElement("button")
  upload_btn.className = "btn_upload"
  upload_btn.innerText = "匯入選項"
  upload_btn.input = upload
  upload_btn.addEventListener("click", openUpload)
  control.appendChild(upload_btn)
  let download = document.createElement("button")
  download.className = "btn_download"
  download.innerText = "匯出選項"
  download.body = body
  download.addEventListener("click", downloadOptions)
  control.appendChild(download)
  
  let info_name = document.createElement("label")
  info_name.className = "oe_info_name"
  info.appendChild(info_name)
  let info_name_text = document.createElement("span")
  info_name_text.className = "oe_info_name_text"
  info_name_text.innerText = "名稱:"
  info_name.appendChild(info_name_text)
  let info_name_input = document.createElement("input")
  info_name_input.className = "oe_info_name_input"
  info_name.appendChild(info_name_input)
  let info_type = document.createElement("label")
  info_type.className = "oe_info_type"
  info.appendChild(info_type)
  let info_type_text = document.createElement("span")
  info_type_text.className = "oe_info_type_text"
  info_type_text.innerText = "類型:"
  info_type.appendChild(info_type_text)
  let info_type_input = document.createElement("input")
  info_type_input.className = "oe_info_type_input"
  info_type.appendChild(info_type_input)
  let info_add = document.createElement("label")
  info_add.className = "oe_info_add"
  info.appendChild(info_add)
  let add = document.createElement("button")
  add.className = "btn_add"
  add.innerText = "增加選項"
  add.body = body
  add.addEventListener("click", addOptionRow)
  info_add.appendChild(add)
  
  clear.info_name = info_name_input
  clear.info_type = info_type_input
  upload.info_name = info_name_input
  upload.info_type = info_type_input
  upload.root = root
  download.info_name = info_name_input
  download.info_type = info_type_input
  download.root = root
  
  let row = document.createElement("div")
  row.className = "option_row"
  row_header.appendChild(row)
  let type = document.createElement("label")
  type.className = "option_type"
  type.innerText = "選項代碼"
  row.appendChild(type)
  let value = document.createElement("label")
  value.className = "option_value"
  value.innerText = "選項數值"
  row.appendChild(value)
  let display = document.createElement("label")
  display.className = "option_display"
  display.innerText = "顯示為"
  row.appendChild(display)
  let exclude = document.createElement("label")
  exclude.className = "option_exclude"
  exclude.title = "不與選項同時出現的其他選項，請在每行輸入一個選項"
  exclude.innerText = "排除"
  row.appendChild(exclude)
  let remove = document.createElement("label")
  remove.className = "option_remove"
  row.appendChild(remove)
  
  root.upload = upload
  root.body = body
  root.info_type = info_type_input
  
  root.header = header
  editorScroll.editors.push(root)
  
  return {root, header, control, info, body, add, clear, upload, upload_btn, download, info_name_input, info_type_input}
}

function createQuestionEditor(){
  let root = document.createElement("div")
  root.className = "question_editor"
  
  let header = document.createElement("div")
  header.className = "qe_header"
  root.appendChild(header)
  let header_text = document.createElement("div")
  header_text.className = "qe_header_text"
  header_text.innerText = "題目管理"
  header_text.root = root
  header_text.addEventListener("click", jumpToHeader)
  header.appendChild(header_text)
  let control = document.createElement("div")
  control.className = "qe_control"
  header.appendChild(control)
  let info = document.createElement("div")
  info.className = "qe_info"
  header.appendChild(info)
  let row_header = document.createElement("div")
  row_header.className = "qe_row_header"
  header.appendChild(row_header)
  let body = document.createElement("div")
  body.className = "qe_body"
  body.appendChild(createQuestionRow().row)
  root.appendChild(body)
  
  let clear = document.createElement("button")
  clear.className = "btn_download"
  clear.innerText = "清除題目"
  clear.body = body
  clear.addEventListener("click", clearQuestions)
  control.appendChild(clear)
  let upload = document.createElement("input")
  upload.type = "file"
  upload.className = "upload"
  upload.style.display = "none";
  upload.body = body
  upload.addEventListener("change", loadQuestions)
  control.appendChild(upload)
  let upload_btn = document.createElement("button")
  upload_btn.className = "btn_upload"
  upload_btn.innerText = "匯入題目"
  upload_btn.input = upload
  upload_btn.addEventListener("click", openUpload)
  control.appendChild(upload_btn)
  let download = document.createElement("button")
  download.className = "btn_download"
  download.innerText = "匯出題目"
  download.body = body
  download.addEventListener("click", downloadQuestions)
  control.appendChild(download)
  
  let info_name = document.createElement("label")
  info_name.className = "qe_info_name"
  info.appendChild(info_name)
  let info_name_text = document.createElement("span")
  info_name_text.className = "qe_info_name_text"
  info_name_text.innerText = "名稱:"
  info_name.appendChild(info_name_text)
  let info_name_input = document.createElement("input")
  info_name_input.className = "qe_info_name_input"
  info_name.appendChild(info_name_input)
  let info_group = document.createElement("label")
  info_group.className = "qe_info_group"
  info.appendChild(info_group)
  let info_group_text = document.createElement("span")
  info_group_text.className = "qe_info_group_text"
  info_group_text.innerText = "題組名稱:"
  info_group.appendChild(info_group_text)
  let info_group_input = document.createElement("input")
  info_group_input.className = "qe_info_group_input"
  info_group.appendChild(info_group_input)
  let info_number = document.createElement("label")
  info_number.className = "qe_info_number"
  info.appendChild(info_number)
  let info_number_text = document.createElement("span")
  info_number_text.className = "qe_info_number_text"
  info_number_text.innerText = "選項數量:"
  info_number.appendChild(info_number_text)
  let info_number_input = document.createElement("input")
  info_number_input.className = "qe_info_number_input"
  info_number.appendChild(info_number_input)
  /*let info_source = document.createElement("label")
  info_source.className = "qe_info_source"
  info.appendChild(info_source)
  let info_source_text = document.createElement("span")
  info_source_text.className = "qe_info_source_text"
  info_source_text.innerText = "選項類型:"
  info_source.appendChild(info_source_text)
  let info_source_input = document.createElement("input")
  info_source_input.className = "qe_info_source_input"
  info_source.appendChild(info_source_input)*/
  let info_type = document.createElement("label")
  info_type.className = "qe_info_type"
  info.appendChild(info_type)
  let info_type_text = document.createElement("span")
  info_type_text.className = "qe_info_type_text"
  info_type_text.innerText = "題型:"
  info_type.appendChild(info_type_text)
  let info_type_input = document.createElement("select")
  //let info_type_input = document.createElement("input")
  info_type_input.className = "qe_info_type_input"
  info_type.appendChild(info_type_input)
  let info_type_option1 = document.createElement("option")
  info_type_option1.value = "select_all"
  info_type_option1.innerText = "全選"
  info_type_input.appendChild(info_type_option1)
  let info_type_option2 = document.createElement("option")
  info_type_option2.value = "select_one"
  info_type_option2.innerText = "擇一"
  info_type_input.appendChild(info_type_option2)
  let info_add = document.createElement("label")
  info_add.className = "qe_info_add"
  info.appendChild(info_add)
  let add = document.createElement("button")
  add.className = "btn_add"
  add.innerText = "增加題目"
  add.body = body
  add.addEventListener("click", addQuestionRow)
  info_add.appendChild(add)
  
  clear.info_name = info_name_input
  clear.info_group = info_group_input
  clear.info_type = info_type_input
  clear.info_number = info_number_input
  upload.info_name = info_name_input
  upload.info_group = info_group_input
  upload.info_type = info_type_input
  upload.info_number = info_number_input
  upload.root = root
  download.info_name = info_name_input
  download.info_group = info_group_input
  download.info_type = info_type_input
  download.info_number = info_number_input
  download.root = root
  
  let row = document.createElement("div")
  row.className = "question_row"
  row_header.appendChild(row)
  let qname = document.createElement("label")
  qname.className = "question_name"
  qname.innerText = "名稱"
  row.appendChild(qname)
  let group = document.createElement("label")
  group.className = "question_group"
  group.innerText = "類型"
  row.appendChild(group)
  let type = document.createElement("label")
  type.className = "question_type"
  type.innerText = "選項類別"
  row.appendChild(type)
  let answer = document.createElement("label")
  answer.className = "question_answer"
  answer.innerText = "答案"
  row.appendChild(answer)
  let description = document.createElement("label")
  description.className = "question_description"
  description.innerText = "題目描述"
  row.appendChild(description)
  let hints = document.createElement("label")
  hints.className = "question_hints"
  hints.innerText = "提示"
  row.appendChild(hints)
  let params_parse = document.createElement("label")
  params_parse.className = "question_params_parse"
  params_parse.title = "不將答案建立為選項"
  params_parse.innerText = "不建立"
  row.appendChild(params_parse)
  let params = document.createElement("label")
  params.className = "question_params"
  params.innerText = "參數"
  row.appendChild(params)
  let remove = document.createElement("label")
  remove.className = "question_remove"
  row.appendChild(remove)
  
  root.upload = upload
  root.body = body
  root.info_group = info_group_input
  root.info_type = info_type_input
  
  root.header = header
  editorScroll.editors.push(root)
  
  return {root, header, control, info, body, add, clear, upload, upload_btn, download, info_name_input, info_group_input, info_type_input}
}

function createOptionRow(){
  let row = document.createElement("div")
  row.className = "option_row"
  let type = document.createElement("label")
  type.className = "option_type"
  row.appendChild(type)
  let type_text = document.createElement("span")
  type_text.className = "option_type_text"
  type_text.innerText = "類型"
  type.appendChild(type_text)
  let type_input = document.createElement("input")
  type_input.className = "option_type_input"
  type_input.row = row
  type.appendChild(type_input)
  let value = document.createElement("label")
  value.className = "option_value"
  row.appendChild(value)
  let value_text = document.createElement("span")
  value_text.className = "option_value_text"
  value_text.innerText = "數值"
  value.appendChild(value_text)
  let value_input = document.createElement("input")
  value_input.className = "option_value_input"
  value_input.row = row
  value_input.addEventListener("keydown", autoNextOptionRow)
  value.appendChild(value_input)
  let display = document.createElement("label")
  display.className = "option_display minimize"
  row.appendChild(display)
  let display_text = document.createElement("span")
  display_text.className = "option_display_text"
  display_text.innerText = "顯示"
  display.appendChild(display_text)
  let display_input = document.createElement("input")
  display_input.className = "option_display_input"
  display_input.row = row
  display_input.ref = value_input
  display_input.addEventListener("keydown", autoNextOptionRow)
  display_input.addEventListener("input", optionDisplayChange)
  display.appendChild(display_input)
  let exclude = document.createElement("label")
  exclude.className = "option_exclude minimize"
  exclude.title = "不與選項同時出現的其他選項，請在每行輸入一個選項"
  row.appendChild(exclude)
  let exclude_text = document.createElement("span")
  exclude_text.className = "option_exclude_text"
  exclude_text.innerText = "排除"
  exclude.appendChild(exclude_text)
  let exclude_input = document.createElement("textarea")
  exclude_input.className = "option_exclude_input"
  exclude_input.row = row
  exclude_input.addEventListener("input", optionExcludeChange)
  exclude_input.addEventListener("keydown", autoNextOptionRow)
  exclude.appendChild(exclude_input)
  let remove = document.createElement("label")
  remove.className = "option_remove"
  row.appendChild(remove)
  let btn_remove = document.createElement("button")
  btn_remove.className = "option_remove_button"
  btn_remove.innerText = "移除"
  btn_remove.row = row
  btn_remove.addEventListener("click", removeOptionRow)
  remove.appendChild(btn_remove)
  row.inputs = {type: type_input, value: value_input, display: display_input, exclude: exclude_input}
  return {row, type, type_input, value, value_input, display, display_input, exclude, exclude_input, remove, btn_remove}
}


function createQuestionRow(){
  let row = document.createElement("div")
  row.className = "question_row"
  let qname = document.createElement("label")
  qname.className = "question_name"
  row.appendChild(qname)
  let qname_text = document.createElement("span")
  qname_text.className = "question_name_text"
  qname_text.innerText = "名稱"
  qname.appendChild(qname_text)
  let qname_input = document.createElement("input")
  qname_input.className = "question_name_input"
  qname_input.row = row
  qname_input.addEventListener("keydown", autoNextQuestionRow)
  qname.appendChild(qname_input)
  let group = document.createElement("label")
  group.className = "question_group"
  row.appendChild(group)
  let group_text = document.createElement("span")
  group_text.className = "question_group_text"
  group_text.innerText = "類型"
  group.appendChild(group_text)
  let group_input = document.createElement("input")
  group_input.className = "question_group_input"
  group.appendChild(group_input)
  let type = document.createElement("label")
  type.className = "question_type"
  row.appendChild(type)
  let type_text = document.createElement("span")
  type_text.className = "question_type_text"
  type_text.innerText = "選項類別"
  type.appendChild(type_text)
  let type_input = document.createElement("input")
  type_input.className = "question_type_input"
  type.appendChild(type_input)
  let answer = document.createElement("label")
  answer.className = "question_answer minimize"
  row.appendChild(answer)
  let answer_text = document.createElement("span")
  answer_text.className = "question_answer_text"
  answer_text.innerText = "答案"
  answer.appendChild(answer_text)
  let answer_input = document.createElement("textarea")
  answer_input.className = "question_answer_input"
  answer_input.row = row
  answer_input.addEventListener("keydown", autoNextQuestionRow)
  answer_input.addEventListener("input", questionAnswerChange)
  answer.appendChild(answer_input)
  let description = document.createElement("label")
  description.className = "question_description"
  row.appendChild(description)
  let description_text = document.createElement("span")
  description_text.className = "question_description_text"
  description_text.innerText = "題目描述"
  description.appendChild(description_text)
  let description_input = document.createElement("input")
  description_input.className = "question_description_input"
  description_input.row = row
  description_input.addEventListener("keydown", autoNextQuestionRow)
  description_input.addEventListener("input", questionDescriptionChange)
  description.appendChild(description_input)
  let hints = document.createElement("label")
  hints.className = "question_hints minimize"
  row.appendChild(hints)
  let hints_text = document.createElement("span")
  hints_text.className = "question_hints_text"
  hints_text.innerText = "提示"
  hints.appendChild(hints_text)
  let hints_input = document.createElement("textarea")
  hints_input.className = "question_hints_input"
  hints_input.addEventListener("input", questionHintsChange)
  hints.appendChild(hints_input)
  let params_parse = document.createElement("label")
  params_parse.className = "question_params_parse"
  row.appendChild(params_parse)
  let params_parse_text = document.createElement("span")
  params_parse_text.className = "question_params_parse_text"
  params_parse_text.innerText = "參數"
  params_parse.appendChild(params_parse_text)
  let params_parse_input = document.createElement("input")
  params_parse_input.type = "checkbox"
  params_parse_input.className = "question_params_parse_input"
  params_parse_input.row = row
  params_parse_input.addEventListener("keydown", autoNextQuestionRow)
  params_parse.appendChild(params_parse_input)
  let params = document.createElement("label")
  params.className = "question_params minimize"
  row.appendChild(params)
  let params_text = document.createElement("span")
  params_text.className = "question_params_text"
  params_text.innerText = "參數"
  params.appendChild(params_text)
  let params_input = document.createElement("textarea")
  params_input.className = "question_params_input"
  params_input.addEventListener("input", questionParamsChange)
  params.appendChild(params_input)
  let remove = document.createElement("label")
  remove.className = "question_remove"
  row.appendChild(remove)
  let btn_remove = document.createElement("button")
  btn_remove.className = "question_remove_button"
  btn_remove.innerText = "移除"
  btn_remove.row = row
  btn_remove.addEventListener("click", removeQuestionRow)
  remove.appendChild(btn_remove)
  row.inputs = {qname: qname_input, group: group_input, type: type_input, answer: answer_input, description: description_input, hints: hints_input, params: params_input, params_parse: params_parse_input}
  return {row, qname, qname_input, group, group_input, type, type_input, answer, answer_input, description, description_input, hints, hints_input, params, params_input, params_parse, params_parse_input, remove, btn_remove}
}

function clearOptions(e){
  e.target.info_name.value = null
  e.target.info_type.value = null
  ;[...e.target.body.children].forEach(d => d.remove())
  e.target.body.appendChild(createOptionRow().row)
}

function clearQuestions(e){
  e.target.info_name.value = null
  e.target.info_group.value = null
  e.target.info_type.value = "select_all"
  e.target.info_number.value = null
  ;[...e.target.body.children].forEach(d => d.remove())
  e.target.body.appendChild(createQuestionRow().row)
}

function addOptionRow(e){
  let r = createOptionRow()
  e.target.body.appendChild(r.row)
  r.value_input.focus()
}

function addQuestionRow(e){
  let r = createQuestionRow()
  e.target.body.appendChild(r.row)
  r.qname_input.focus()
}

function autoNextOptionRow(e){
  if(e.keyCode == 13 && e.target.tagName == "INPUT" && (!e.target.type || e.target.type == "text")){
    addOptionRow({target: {body: e.target.row.parentNode}})
    if(e.target.classList.contains("option_value_input")){
      e.target.row.nextElementSibling.querySelector(".option_value_input").focus()
    }else if(e.target.classList.contains("option_display_input")){
      e.target.row.nextElementSibling.querySelector(".option_display_input").focus()
    }else if(e.target.classList.contains("option_exclude_input")){
      e.target.row.nextElementSibling.querySelector(".option_exclude_input").focus()
    }
  }else if(e.keyCode == 8 && e.target.value == "" && e.target.classList.contains("option_value_input")){
    removeOptionRow(e)
  }else if(e.keyCode == 38 && e.target.row.previousElementSibling && (e.ctrlKey || (e.target.tagName == "INPUT" && (!e.target.type || e.target.type == "text"))) ){
    if(e.target.classList.contains("option_value_input")){
      e.target.row.previousElementSibling.querySelector(".option_value_input").focus()
    }else if(e.target.classList.contains("option_display_input")){
      e.target.row.previousElementSibling.querySelector(".option_display_input").focus()
    }else if(e.target.classList.contains("option_exclude_input")){
      e.target.row.previousElementSibling.querySelector(".option_exclude_input").focus()
    }
  }else if(e.keyCode == 40 && e.target.row.nextElementSibling && (e.ctrlKey || (e.target.tagName == "INPUT" && (!e.target.type || e.target.type == "text"))) ){
    if(e.target.classList.contains("option_value_input")){
      e.target.row.nextElementSibling.querySelector(".option_value_input").focus()
    }else if(e.target.classList.contains("option_display_input")){
      e.target.row.nextElementSibling.querySelector(".option_display_input").focus()
    }else if(e.target.classList.contains("option_exclude_input")){
      e.target.row.nextElementSibling.querySelector(".option_exclude_input").focus()
    }
  }else if(e.keyCode == 37 && e.ctrlKey){
    if(e.target.classList.contains("option_display_input")){
      e.target.row.querySelector(".option_value_input").focus()
    }else if(e.target.classList.contains("option_exclude_input")){
      e.target.row.querySelector(".option_display_input").focus()
    }
  }else if(e.keyCode == 39 && e.ctrlKey){
    if(e.target.classList.contains("option_value_input")){
      e.target.row.querySelector(".option_display_input").focus()
    }else if(e.target.classList.contains("option_display_input")){
      e.target.row.querySelector(".option_exclude_input").focus()
    }
  }
}

function autoNextQuestionRow(e){
  if(e.keyCode == 13 && e.target.tagName == "INPUT" && (!e.target.type || e.target.type == "text") ){
    addQuestionRow({target: {body: e.target.row.parentNode}})
    if(e.target.classList.contains("question_name_input")){
      e.target.row.nextElementSibling.querySelector(".question_name_input").focus()
    }else if(e.target.classList.contains("question_answer_input")){
      e.target.row.nextElementSibling.querySelector(".question_answer_input").focus()
    }else if(e.target.classList.contains("question_description_input")){
      e.target.row.nextElementSibling.querySelector(".question_description_input").focus()
    }else if(e.target.classList.contains("question_params_parse_input")){
      e.target.row.nextElementSibling.querySelector(".question_params_parse_input").focus()
    }
  }else if(e.keyCode == 8 && e.target.value == "" && e.target.classList.contains("question_name_input")){
    removeQuestionRow(e)
  }else if(e.keyCode == 38 && e.target.row.previousElementSibling && (e.ctrlKey || (e.target.tagName == "INPUT" && (!e.target.type || e.target.type == "text")))){
    if(e.target.classList.contains("question_name_input")){
      e.target.row.previousElementSibling.querySelector(".question_name_input").focus()
    }else if(e.target.classList.contains("question_answer_input")){
      e.target.row.previousElementSibling.querySelector(".question_answer_input").focus()
    }else if(e.target.classList.contains("question_description_input")){
      e.target.row.previousElementSibling.querySelector(".question_description_input").focus()
    }else if(e.target.classList.contains("question_params_parse_input")){
      e.target.row.previousElementSibling.querySelector(".question_params_parse_input").focus()
    }
  }else if(e.keyCode == 40 && e.target.row.nextElementSibling && (e.ctrlKey || (e.target.tagName == "INPUT" && (!e.target.type || e.target.type == "text")))){
    if(e.target.classList.contains("question_name_input")){
      e.target.row.nextElementSibling.querySelector(".question_name_input").focus()
    }else if(e.target.classList.contains("question_answer_input")){
      e.target.row.nextElementSibling.querySelector(".question_answer_input").focus()
    }else if(e.target.classList.contains("question_description_input")){
      e.target.row.nextElementSibling.querySelector(".question_description_input").focus()
    }else if(e.target.classList.contains("question_params_parse_input")){
      e.target.row.nextElementSibling.querySelector(".question_params_parse_input").focus()
    }
  }else if(e.keyCode == 37 && e.ctrlKey){
    if(e.target.classList.contains("question_answer_input")){
      e.target.row.querySelector(".question_name_input").focus()
    }else if(e.target.classList.contains("question_description_input")){
      e.target.row.querySelector(".question_answer_input").focus()
    }else if(e.target.classList.contains("question_params_parse_input")){
      e.target.row.querySelector(".question_description_input").focus()
    }
  }else if(e.keyCode == 39 && e.ctrlKey){
    if(e.target.classList.contains("question_name_input")){
      e.target.row.querySelector(".question_answer_input").focus()
    }else if(e.target.classList.contains("question_answer_input")){
      e.target.row.querySelector(".question_description_input").focus()
    }else if(e.target.classList.contains("question_description_input")){
      e.target.row.querySelector(".question_params_parse_input").focus()
    }
  }
}

function removeOptionRow(e){
  if(e.target.row.parentNode.children.length > 1){
    let p = e.target.row.previousElementSibling
    e.target.row.remove()
    if(p){
      p.inputs.value.focus()
    }
  }else{
    [...e.target.row.querySelectorAll("input,textarea")].forEach(d => d.value = null)
  }
}

function removeQuestionRow(e){
  if(e.target.row.parentNode.children.length > 1){
    let p = e.target.row.previousElementSibling
    e.target.row.remove()
    if(p){
      p.inputs.qname.focus()
    }
  }else{
    [...e.target.row.querySelectorAll("input,textarea")].forEach(d => d.value = null)
  }
}

function optionDisplayChange(e){
  if(e.target.value != e.target.ref.value){
    e.target.parentNode.classList.remove("minimize")
  }else{
    e.target.parentNode.classList.add("minimize")
  }
}

function optionExcludeChange(e){
  inputHeightAutoExpand(e.target)
  if(e.target.value){
    e.target.parentNode.classList.remove("minimize")
  }else{
    e.target.parentNode.classList.add("minimize")
  }
}

function questionAnswerChange(e){
  inputHeightAutoExpand(e.target)
  if(e.target.value){
    e.target.parentNode.classList.remove("minimize")
    e.target.parentNode.classList.remove("invalid")
  }else{
    e.target.parentNode.classList.add("minimize")
    e.target.parentNode.classList.add("invalid")
  }
}

function questionDescriptionChange(e){
  inputHeightAutoExpand(e.target)
  if(!e.target.row.previousElementSibling || e.target.value != e.target.row.previousElementSibling.inputs.description.value){
    e.target.parentNode.classList.remove("minimize")
  }else{
    e.target.parentNode.classList.add("minimize")
  }
  let n = e.target.row.nextElementSibling
  if(n){
    if(e.target.value != n.inputs.description.value){
      n.inputs.description.parentNode.classList.remove("minimize")
    }else{
      n.inputs.description.parentNode.classList.add("minimize")
    }
  }
}

function questionHintsChange(e){
  inputHeightAutoExpand(e.target)
  if(e.target.value){
    e.target.parentNode.classList.remove("minimize")
  }else{
    e.target.parentNode.classList.add("minimize")
  }
}

function questionParamsChange(e){
  inputHeightAutoExpand(e.target)
  e.target.parentNode.classList.remove("invalid")
  if(e.target.value){
    e.target.parentNode.classList.remove("minimize")
    try{
      let p = e.target.value.split(/[\n\r]/).filter(l=>l.length).reduce((r,l)=>{
        let m
        if(m = l.match(/^\s*([^:]+):\s*(.*?)\s*$/)){
          if(isFinite(m[2])){
            m[2] = +m[2]
          }else if(m[2] == "true"){
            m[2] = true
          }else if(m[2] == "false"){
            m[2] = false
          }
          return r[m[1]] = m[2]
        }else{
          throw true
        }
      }, {})
    }catch(er){
      this.parentNode.classList.add("invalid")
    }
  }else{
    this.parentNode.classList.add("minimize")
  }
}

function jumpToHeader(e){
  window.scrollTo(window.scrollX, window.scrollY + e.target.root.getBoundingClientRect().top)
}

function editorScroll(e){
  for(let i  = 0; i < editorScroll.editors.length; i++ ){
    let root = editorScroll.editors[i]
    let header = root.header
    let body = root.body
    let cr = header.getBoundingClientRect()
    let br = body.getBoundingClientRect()
    if(cr.width && cr.height && br.width && br.height){
      if(root.classList.contains("fixed-header")){
        if(br.top >= 0 || br.bottom < cr.height ){
          root.classList.remove("fixed-header")
          body.style.paddingTop = null
        }
      }else{
        if(br.top < cr.height && br.bottom > cr.height){
          root.classList.add("fixed-header")
          body.style.paddingTop = cr.height + "px"
        }
      }
    }else{
      editorScroll.editors.splice(i, 1)
      i--
    }
  }
}
editorScroll.editors = []
window.addEventListener("scroll", editorScroll)

function loadOptionData(data){
  let upload = this
  upload.root.parentNode.inputs.type.value = upload.info_type.value = (data.find(o => o.type)||{}).type || null
  upload.info_name.value = data.name || upload.info_type.value || null
  data.forEach( (option, ind) => {
    let r = createOptionRow()
    r.value_input.value = option.value || null
    r.display_input.value = option.display || null
    r.exclude_input.value = (/^\[.*?\]$/.test(option.exclude) ? option.exclude.slice(1,-1).replace(/,/g,`\n`) : option.exclude) || null
    if(option.display && option.display != option.value){
      r.display.classList.remove("minimize")
    }
    if(option.exclude){
      r.exclude.classList.remove("minimize")
    }
    upload.body.appendChild(r.row)
    if(option.exclude){
      inputHeightAutoExpand(r.exclude_input)
    }
  })
}

function loadOptions(e){
  let upload = e.target
  Promise.all([...upload.files].map(b => csvUtil.parseBlob(b, true, ";"))).then(vs => {
    [...upload.body.children].forEach(d => d.remove())
    vs.forEach(options => {
      loadOptionData.call(upload, options)
    })
  }).catch(er => console.log(er))
}

function loadQuestionData(data){
  let upload = this
  upload.root.parentNode.inputs.group.value = upload.info_group.value = (data.find(q => q.group)||{}).group || null
  upload.info_name.value = data.name || upload.info_group.value || null
  let type = (data.find(q => q.type)||{}).type || null
  if(![...upload.info_type.children].find(o => o.value == type)){
    let ot = document.createElement("option")
    ot.value = ot.innerText = type
    upload.info_type.appendChild(ot)
    if(![...upload.root.parentNode.inputs.option_type.children].find(o => o.value == type)){
      let ot2 = document.createElement("option")
      ot2.value = ot2.innerText = type
      upload.root.parentNode.inputs.option_type.appendChild(ot2)
    }
  }
  upload.root.parentNode.inputs.option_type.value = upload.info_type.value = type
  let optionNumber = data.optionNumber || null
  let expand = {}
  data.forEach( (question, ind) => {
    let r = createQuestionRow()
    //r.group_input.value = question.group || null
    //r.type_input.value = question.type || null
    r.answer_input.value = (/^\[.*?\]$/.test(question.answer) ? question.answer.slice(1,-1).replace(/,/g,`\n`) : question.answer) || null
    r.description_input.value = question.description || null
    if(ind > 0 && question.description == data[ind - 1].description){
      r.description.classList.add("minimize")
    }
    //r.hints_input.value = (/^\[.*?\]$/.test(question.hints) ? question.hints.slice(1,-1).replace(/,/g,`\n`) : question.hints) || null
    try{
      let params = JSON.parse(question.params)
      r.qname_input.value = params.name || null
      delete params.name
      r.params_parse_input.checked = params.doNotParseAnswer
      delete params.doNotParseAnswer
      if(!optionNumber && params.optionNumber){
        optionNumber = params.optionNumber
      }
      //r.params_input.value = Object.entries(params).map(([k,v]) => `${k}: ${v}` ).join("\n")
    }catch(er){
      r.params_input.value = question.params || null
    }
    if(question.answer){
      r.answer.classList.remove("minimize")
    }
    /*if(question.hints){
      r.hints.classList.remove("minimize")
    }*/
    if(r.params_input.value){
      r.params.classList.remove("minimize")
    }
    upload.body.appendChild(r.row)
    if(question.answer){
      if(expand[ind]){
        expand[ind].answer = inputHeightAutoExpand.readPosition(r.answer_input)
      }else{
        expand[ind] = {answer: inputHeightAutoExpand.readPosition(r.answer_input)}
      }
    }
    /*if(question.hints){
      if(expand[ind]){
        expand[ind].hints = inputHeightAutoExpand.readPosition(r.hints_input)
      }else{
        expand[ind] = {hints: inputHeightAutoExpand.readPosition(r.hints_input)}
      }
    }*/
    if(r.params_input.value){
      if(expand[ind]){
        expand[ind].params = inputHeightAutoExpand.readPosition(r.params_input)
      }else{
        expand[ind] = {params: inputHeightAutoExpand.readPosition(r.params_input)}
      }
    }
  })
  Object.entries(expand).forEach(([i,p])=>{
    Object.entries(p).forEach(([d,h])=>{
      inputHeightAutoExpand.setHeight(upload.body.children[i].inputs[d], h.height)
    })
  })
  upload.root.parentNode.inputs.number.value = upload.info_number.value = optionNumber
}

function loadQuestions(e){
  let upload = e.target
  Promise.all([...upload.files].map(b => csvUtil.parseBlob(b, true, ";"))).then(vs => {
    [...upload.body.children].forEach(d => d.remove())
    vs.forEach(questions => {
      loadQuestionData.call(upload, questions)
    })
  }).catch(er => console.log(er))
}

function openUpload(e){
  e.target.input.value = null
  e.target.input.click()
}

function download(blob, name){
  let link = document.createElement("a")
  link.style.position = "absolute"
  link.style.height = 0
  link.style.width = 0
  link.style.overflow = "hidden"
  document.body.appendChild(link)
  link.download = `${name}`
  link.href = URL.createObjectURL(blob)
  link.click()
  URL.revokeObjectURL(link.href)
  link.remove()
  delete link
}

function getOptions(oe){
  return [...oe.body.children].map(r => {
    let exclude = r.inputs.exclude.value || null
    if(/[\n\r]/.test(exclude) && !/^[\s,]+$/.test(exclude)){
      exclude = `[${exclude.split(/[\n\r]/).filter(l=>l.length).join(",")}]`
    }
    return {
      type: r.inputs.type.value || oe.info_type.value || oe.editor.inputs.type.value || null,
      value: r.inputs.value.value || null,
      display: r.inputs.display.value || null,
      exclude: exclude
    }
  })
}

function downloadOptions(e){
  let file = csvUtil.makeBlob(getOptions(e.target.root), true, ";")
  download(file, `${e.target.root.editor.inputs.group.value || e.target.info_name.value || "csv_" + Date.now()}_options.csv`)
}

function getQuestions(qe){
  return [...qe.body.children].map((r,i) => {
    let answer = r.inputs.answer.value || null
    if(/[\n\r]/.test(answer) && !/^[\s,]+$/.test(answer)){
      answer = `[${answer.split(/[\n\r]/).filter(l=>l.length).join(",")}]`
    }
    let hints = r.inputs.hints.value || null
    if(/[\n\r]/.test(hints) && !/^[\s,]+$/.test(hints)){
      hints = `[${hints.split(/[\n\r]/).filter(l=>l.length).join(",")}]`
    }
    let params = null
    let p = {name: r.inputs.qname.value || `Question ${i + 1}`}
    if(r.inputs.params_parse.checked){
      p.doNotParseAnswer = true
    }
    try{
      /*r.inputs.params.value.split(/[\n\r]/).filter(l=>l.length).forEach(l=>{
        let m
        if(m = l.match(/^\s*([^:]+):\s*(.*?)\s*$/)){
          if(isFinite(m[2])){
            p[m[1]] = +m[2]
          }else if(m[2] == "true"){
            p[m[1]] = true
          }else if(m[2] == "false"){
            p[m[1]] = false
          }else{
            p[m[1]] = m[2]
          }
        }else{
          throw true
        }
      }, {})*/
      params = JSON.stringify(p)
    }catch(er){}
    return {
      group: r.inputs.group.value || qe.info_group.value || qe.editor.inputs.group.value || null,
      type: r.inputs.type.value || qe.info_type.value || qe.editor.inputs.option_type.value || null,
      answer: answer,
      description: r.inputs.description.value || null,
      hints: hints,
      params: params
    }
  })
}

function downloadQuestions(e){
  let file = csvUtil.makeBlob(getQuestions(e.target.root), true, ";")
  download(file, `${e.target.root.editor.inputs.group.value || e.target.info_name.value || "csv_" + Date.now()}_quesitons.csv`)
}

function clearSet(e){
  [...e.target.manager.editors.children].forEach(d => d.remove())
  e.target.manager.inputs.name.value = null
  e.target.manager.inputs.code.value = null
  e.target.manager.inputs.misc.value = null
}

function listPresets(manager){
  ;[...manager.list.children].forEach(d => d.remove())
  if(presets){
    Object.entries(presets).forEach(([name,preset]) => {
      let d = document.createElement("option")
      d.value = name
      d.innerText = `${preset.display} [${name}] (預設)`
      manager.list.appendChild(d)
    })
  }
  if(localStorage){
    let custom_presets = (localStorage.getItem("cp") || "").split(";").filter(cp => cp)
    custom_presets.forEach(cp => {
      let data = localStorage.getItem(`cp_${cp}`)
      let display = (data.match(/display=([^\n\r]*)/)|| [])[1]
      let d = document.createElement("option")
      d.value = cp
      d.innerText = `${display} [${cp}]`
      manager.list.appendChild(d)
    })
  }
}

function getSetText(manager){
  return Promise.all([...manager.editors.children].map(editor => 
    Promise.all([csvUtil.makeCsv(getQuestions(editor.qe.root), true, ";"), csvUtil.makeCsv(getOptions(editor.oe.root), true, ";")])
  )).then(vs => {
    let qs = []
    let ops = []
    let output = ""
    vs.forEach( ([q, op], i) => {
      let qh = ""
      qh += `group=${manager.editors.children[i].inputs.group.value}` + "\n"
      qh += `type=${manager.editors.children[i].inputs.option_type.value}` + "\n"
      qh += `option_type=${manager.editors.children[i].inputs.type.value}` + "\n"
      qh += `number=${manager.editors.children[i].inputs.number.value}` + "\n"
      qh += "!QHEAD!\n"
      let oh = ""
      oh += `type=${manager.editors.children[i].inputs.type.value}` + "\n"
      oh += "!OHEAD!\n"
      qs.push(qh+q)
      ops.push(oh+op)
    })
    output += "!!PRESET!!\n"
    output += `code=${manager.inputs.code.value}` + "\n"
    output += `display=${manager.inputs.name.value}` + "\n"
    output += `misc=${manager.inputs.misc.value}` + "\n"
    output += "!PEND!\n"
    output += "!!QUESTIONS!!\n" + qs.join("\n!QEND!\n") + "\n!QEND!\n"
    output += "!!OPTIONS!!\n" + ops.join("\n!OEND!\n") + "\n!OEND!\n"
    return output
  })
}

function getCustomSet(code){
  let data = localStorage.getItem(`cp_${decodeURIComponent(code)}`)
  let code_ori = (data.match(/code=([^\n\r]*)/)|| [])[1]
  let display = (data.match(/display=([^\n\r]*)/)|| [])[1]
  let misc = (data.match(/misc=([^\n\r]*)/)|| [])[1]
  let qb = data.slice(data.indexOf("!!QUESTIONS!!") + 13, data.lastIndexOf("!QEND!")).split("!QEND!").map(q=>q.split("!QHEAD!"))
  let ob = data.slice(data.indexOf("!!OPTIONS!!") + 13, data.lastIndexOf("!OEND!")).split("!OEND!").map(q=>q.split("!OHEAD!"))
  return Promise.all([
    Promise.all(qb.map(([qh, q]) => csvUtil.parse(q, true, ";"))).then(qs => qs.map((q,i) => {
      let p = {}
      let type = (qb[i][0].match(/option_type=([^\n\r]*)/) || [])[1]
      if(type){
        p.optionType = type
      }
      let number = (qb[i][0].match(/number=([^\n\r]*)/) || [])[1]
      if(number){
        p.optionNumber = number
      }
      let group = (qb[i][0].match(/group=([^\n\r]*)/) || [])[1]
      if(group){
        p.group = group
      }
      return Object.assign(q, p)
    })),
    Promise.all(ob.map(([oh, o]) => csvUtil.parse(o, true, ";"))).then(ops => ops.map((o,i) => {
      let p = {}
      let type = (ob[i][0].match(/type=([^\n\r]*)/) || [])[1]
      if(type){
        p.type = type
      }
      return Object.assign(o, p)
    }))
  ]).then(qo => Object.assign(qo, {code: code_ori, display: display, misc: misc}))
}

function loadCustomSet(code){
  let manager = this
  ;[...manager.editors.children].forEach(d => d.remove())
  getCustomSet(code).then(qo => {
    if(![...manager.list.children].find(d => d.value == code)){
      let d = document.createElement("option")
      d.value = code
      d.innerText = `${display}[${code}]`
      manager.list.appendChild(d)
    }
    manager.inputs.code.value = code
    manager.inputs.name.value = qo.display
    manager.inputs.misc.value = qo.misc
    qo[0].forEach((q,i) => {
      let editor = createEditor()
      manager.editors.appendChild(editor)
      ;[...editor.qe.upload.body.children].forEach(d => d.remove())
      loadQuestionData.call(editor.qe.upload, q)
      ;[...editor.oe.upload.body.children].forEach(d => d.remove())
      loadOptionData.call(editor.oe.upload, qo[1][i])
    })
  })
}

function loadSet(e){
  let manager = e.target.manager
  let custom_preset = (localStorage.getItem("cp") || "").split(";").filter(cp => cp)
  if(!presets.hasOwnProperty(manager.list.value)){
    if(custom_preset.indexOf(manager.list.value) == -1){
      throw "Invalid preset!"
    }else{
      return loadCustomSet.call(manager, manager.list.value)
    }
  }
  ;[...manager.editors.children].forEach(d => d.remove())
  let optionNumber = presets[manager.list.value].config ? presets[manager.list.value].config.optionExpandNumber : null
  let qs = {}
  let ops = {}
  manager.list.disabled = true
  Promise.all(
    presets[manager.list.value].srcs.map(src=>{
      if(src.type == "question"){
        return fileLoader.load(src.url).then(v => csvUtil.parseBlob(v, true, ";")).then(c => qs[src.optionType] = Object.assign(c, src))
      }else if(src.type == "option"){
        return fileLoader.load(src.url).then(v => csvUtil.parseBlob(v, true, ";")).then(c => ops[src.name] = Object.assign(c, src))
      }else{
        throw "Invalid type."
      }
    })
  ).then(vs=>{
    manager.inputs.code.value = manager.list.value
    manager.inputs.name.value = presets[manager.list.value].display
    manager.inputs.misc.value = JSON.stringify(presets[manager.list.value].config)
    Object.entries(qs).forEach(([ot,src])=>{
      let editor = createEditor()
      manager.editors.appendChild(editor)
      ;[...editor.qe.upload.body.children].forEach(d => d.remove())
      loadQuestionData.call(editor.qe.upload, Object.assign(src, {optionNumber: optionNumber}))
      if(ops.hasOwnProperty(ot)){
        [...editor.oe.upload.body.children].forEach(d => d.remove())
        loadOptionData.call(editor.oe.upload, ops[ot])
      }
    })
    manager.list.disabled = false
  }).catch(er=>console.log(er))
}

function saveSet(e){
  if(localStorage){
    let manager = e.target.manager
    getSetText(manager).then(output => {
      let custom_presets = (localStorage.getItem("cp") || "").split(";").filter(cp => cp)
      let code = manager.inputs.code.value.replace(/;/g,"")
      if(code){
        while(custom_presets.indexOf(`${encodeURIComponent(code)}`) != -1 || presets.hasOwnProperty(`${encodeURIComponent(code)}`)){
          code = `${code}_dup`
        }
        custom_presets.push(code)
        localStorage.setItem("cp", custom_presets.join(";"))
        localStorage.setItem(`cp_${encodeURIComponent(code)}`, output)
        listPresets(manager)
        manager.list.value = code
      }
    })
  }
}

function uploadSet(e){
  let manager = e.target.manager
  new Promise((s,j) =>{
    try{
      let fr = new FileReader()
      fr.addEventListener("loadend", e => s(fr.result))
      fr.readAsText(e.target.files[0])
    }catch(er){j(er)}
  }).then(data => {
    let code = (data.match(/code=([^\n\r]*)/) ||[])[1]
    let custom_presets = (localStorage.getItem("cp") || "").split(";").filter(cp => cp)
    while(custom_presets.indexOf(`${encodeURIComponent(code)}`) != -1){
      code = `${code}_dup`
    }
    custom_presets.push(code)
    localStorage.setItem("cp", custom_presets.join(";"))
    localStorage.setItem(`cp_${encodeURIComponent(code)}`, data)
    loadCustomSet.call(manager, code)
  })
}

function downloadSet(e){
  let manager = e.target.manager
  getSetText(manager).then(output => {
    download(new Blob([output], {type: "text/plain"}), `${manager.inputs.code.value || "QPS_" + Date.now()}.qps`)
  })
}

function removeSet(e){
  let manager = e.target.manager
  let code = manager.list.value
  let custom_presets = (localStorage.getItem("cp") || "").split(";").filter(cp => cp)
  let i = custom_presets.indexOf(`${encodeURIComponent(code)}`)
  if(i != -1){
    custom_presets.splice(i,1)
    localStorage.setItem("cp", custom_presets.join(";"))
    localStorage.removeItem(`cp_${encodeURIComponent(code)}`)
    ;[...manager.list.children].forEach(d => {
      if(d.value == code){
        d.remove()
      }
    })
    ;[...elements.question_set.children].forEach(d => {
      if(d.dataset.preset == code){
        d.remove()
      }
    })
  }
  manager.inputs.code.value = null
  manager.inputs.name.value = null
  manager.inputs.misc.value = null
  ;[...manager.editors.children].forEach(d => d.remove())
}

function updateList(){
  [...elements.question_set.children].forEach(d => d.remove())
  if(presets){
    Object.entries(presets).forEach( ([name, preset]) => {
      let d = document.createElement("div")
      d.className = "preset_link"
      d.innerText = preset.display
      d.dataset.preset = name
      d.addEventListener("click", openPreset)
      elements.question_set.appendChild(d)
    });
  }
  if(localStorage){
    let custom_preset = (localStorage.getItem("cp") || "").split(";").filter(cp => cp)
    custom_preset.forEach(cp => {
      let data = localStorage.getItem(`cp_${decodeURIComponent(cp)}`)
      let display = (data.match(/display=([^\n\r]*)/)|| [])[1]
      let d = document.createElement("div")
      d.className = "preset_link"
      d.innerText = display
      d.dataset.preset = cp
      d.addEventListener("click", openCustomPreset)
      elements.question_set.appendChild(d)
    })
  }
  [...elements.question_set.children].forEach(d => {
    if(d.dataset.preset == currentSet){
      d.classList.add("current");
    }else{
      d.classList.remove("current");
    }
  });
}

function openCustomPreset(e){
  currentSet = this.dataset.preset
  let data = {display: null}
  let i = 0
  getCustomSet(currentSet).then(qo => {
    try{
      let config = JSON.parse(qo.misc)
      QS.config(config)
    }catch(er){}
    qo[0].forEach(q => {
      data[`${q.group || ""}${i++}`] = q
      Object.assign(q, {type: "question"})
    })
    qo[1].forEach(o => {
      data[`${o.type || ""}${i++}`] = o
      Object.assign(o, {type: "option"})
    })
    data.display = qo.display
    run(data)
  })
}

new Promise((s,j)=>{
  let loading = setInterval( () => {
    timeout -= tick;
    if( window.hasOwnProperty("QS")
     && window.hasOwnProperty("fileLoader")
     && window.hasOwnProperty("csvUtil")
     && window.hasOwnProperty("presets")
     && window.hasOwnProperty("elements")
     && window.hasOwnProperty("sets")
     && window.hasOwnProperty("question") ){
      clearInterval(loading);
      s(window);
    }else if( timeout <= 0 ){
      j("Loading QS Manager failed! (timeout)");
    }
  }, tick);
}).then( w => setupManager(w) ).catch( er => console.log(er) );

function setupManager(window){
  elements.manager = document.createElement("div")
  elements.manager.className = "manager_container open"
  elements.container.insertAdjacentElement("afterend", elements.manager)
  elements.manager.appendChild(createManager())
  let m = document.createElement("div")
  m.id = "toggle_manager"
  m.addEventListener("click", toggleManager)
  toggleManager.call(m)
  elements.control.appendChild(m)
  updateList()
}

function toggleManager(e){
  if(elements.manager.classList.contains("open")){
    elements.manager.classList.remove("open")
    this.innerText = "開啟編輯器"
  }else{
    elements.manager.classList.add("open")
    this.innerText = "關閉編輯器"
  }
}