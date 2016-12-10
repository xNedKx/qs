/* <csvUtil>
 *   Parse csv data into js object and convert object into csv data.
 *
 * copyright 2016/11/24 by xNedKx@gmail.com
 *
 * settings:
 *  srtrict - true|false - default: false
 *   [true]  throw error when parsing a string without quotes.
 *   [false] parse string without quotes.
 *  verbose - true|false - default: false
 *   [true]  showing verbose informations in console.
 *   [false] not showing verbose informations.
 *  warning - true|false - default: true
 *   [true]  showing warnings when parsing string without quotes as strict mode off and etc.
 *   [false] not showing warnings.
 *
 * functions:
 *  parse ( 
 *    _csv_data_ , // String or Blob;
 *    _use_first_row_as_field_name_ , // Boolean; default: false
 *    _separator_ // String; default: "," while coma is found in _csv_data_ else ";"
 *  )
 *  returns [ array, array, ... ] or [ object, object, ... ]
 *
 *    _csv_data_ should be encoded in utf-8,
 *    each row will be cut by new line, blank lines are ignored.
 *    Data without quotes are parsed into numbers or booleans.
 *    If failed, when strict mode on it throws errors, else it is taken as quoted.
 *    blank fields are parsed into null, quoted data are parsed into strings.
 *    If _csv_data_ is a blob, then trigger parseBlob data conversion.
 *
 *    When _use_first_row_as_field_name_ is true, the first row will be taken as field names.
 *    If the number of columns in a row is more than number of headers,
 *    the exceeded fields will be ignored.
 *
 *    _separator_ is the separator used in csv data.
 *
 *
 *  parseBlob (
 *    _csv_blob_ , // Blob;
 *    _use_first_row_as_field_name_ , // Boolean; default: false
 *    _separator_ // String; default: "," while coma is found in _csv_string_ else ";"
 *  )
 *  returns a Promise with parsed object
 *
 *    A bridge to parse function, will asynchronously load the blob and parse it.
 *
 *
 *  makeCsv (
 *    _data_object_ , // [ array, array, ... ] or [ object, object, ... ]
 *    _create_header_ , // Boolean; default: true when _data_object_ is array of objects else false
 *    _separator_ // String; default: ","
 *  )
 *  returns a String of converted data.
 *
 *    _data_object_ should be an array with arrays or objects.
 *
 *    _create_header_ configures the first row to contain the field names,
 *    while there are objects in data array the default is true;
 *    else the default is false, and it can be forcely configured to true or false.
 *
 *    _separator_ is the separator used to separate the field.
 *
 *
 *  makeBlob (
 *    _data_object_ , // [ array, array, ... ] or [ object, object, ... ]
 *    _create_header_ , // Boolean; default: true when _data_object_ is array of objects else false
 *    _separator_ // String; default: ","
 *  )
 *  returns a plain text Blob of converted data.
 *
 *    A bridge to makeCsv to make the output into a Blob.
 *
 *
 */
;(window => {
  "use strict"

  var csvUtil = new (function csvUtil(){})
  var blobAvailable = !!window.Blob && !!window.FileReader

  csvUtil.strict = false
  csvUtil.verbose = false
  csvUtil.warning = true

  csvUtil.parse = (csv, header, separator) => {

    if(csvUtil.verbose)
      console.log("Parsing csv data.")

    if(csv instanceof Blob)
      return csvUtil.parseBlob(csv, header, separator)

    csv = String(csv)

    if( typeof separator != "string" || !separator || separator == "\"" || separator == "'" )
      separator = csv.replace( /("[^",\n\r]*,[^",\n\r]*"|'[^',\n\r]*,[^',\n\r]*'|[^,"'\n\r]+)/gu, "" ).indexOf(",") != -1 ? "," : ";"

    var regexSep = separator.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/gu, "\\$&"),
        stringBlock = new RegExp(`^(".*?"|'.*?')(?:$|${regexSep})`, "u"),
        numberBlock = new RegExp(`^([+\\-]?(?:\\.\\d+|\\d+\\.?\\d*)|-?Infinity|NaN)(?:$|${regexSep})`, "u"),
        booleanBlock = new RegExp(`^(true|false)(?:$|${regexSep})`, "u"),
        nullBlock = new RegExp(`^(?:$|${regexSep})`, "u"),
        anyBlock = new RegExp(`^([^${regexSep}]+)(?:$|${regexSep})`, "u")
    if( csvUtil.verbose ){
      console.log("String regex:", stringBlock)
      console.log("Number regex:", numberBlock)
      console.log("Boolean regex:", booleanBlock)
      console.log("Null regex:", nullBlock)
      console.log("Data regex:", anyBlock)
    }

    function parseLine( line, number, strict ){

      if( csvUtil.verbose )
        console.log(
          `%c[line${number}]%c: "%c${line}%c"`,
          "color:#33f;", "color:#333;", "color:#66f;", "color:#333;"
        )

      let tmp = line,
          output = [],
          match

      while(tmp.length){
        if(match = tmp.match(stringBlock)){
          output.push(match[1].slice(1,-1))
          if( csvUtil.verbose )
            console.log("String parsed:",output[output.length-1])
        }else if(match = tmp.match(numberBlock)){
          output.push(+match[1])
          if( csvUtil.verbose )
            console.log("Number parsed:",output[output.length-1])
        }else if(match = tmp.match(booleanBlock)){
          output.push(match[1] == "true")
          if( csvUtil.verbose )
            console.log("Boolean parsed:",output[output.length-1])
        }else if(match = tmp.match(nullBlock)){
          output.push(null)
          if( csvUtil.verbose )
            console.log("Null parsed:",output[output.length-1])
        }else if(!strict && (match = tmp.match(anyBlock))){
          if(csvUtil.warning)
            console.log(
`%c[Warning] %cString should be enclosed in quotes. (parsed because strict mode is off)
%cline ${number}: "%c ${line}%c"
data: %c${match[1]}`,
              "color:#f00;", "color:#f66;", "color:#777;", "color:#111;", "color:#777;", "color:#111;"
            )
          output.push(match[1])
          if( csvUtil.verbose && !csvUtil.warning )
            console.log("Data parsed:",output[output.length-1])
        }else{
          throw new Error(
`String should be enclosed in quotes.
Unable to parse line ${number}: ${line}
at: ${tmp}`
          )
        }
        tmp = tmp.slice( match[0].length )
      }

      if(line.slice(-separator.length) == separator )
        output.push(null)

      if(csvUtil.verbose)
        console.log(`%c${output.join("\n")}`, "color:#66f;")

      return output

    } // End of parseLine

    if(csvUtil.verbose)
      console.log(
        `%cUse "%c${separator}%c" as separator to parse csv data.`,
        "color:#666;", "color:#111;", "color:#666;"
      )

    let tmp = csv.split(/[\r\n]/).filter( r => r.length > 0 ).map( (r,i) => parseLine(r, i + 1, csvUtil.strict) )

    if(csvUtil.verbose)
      console.log("Parsing finished.")
    
    return !header ? tmp : tmp.slice(1).map( r => new (function(){ tmp[0].forEach( (k,j) => this[k] = r[j]) }) )
    
  }
  
  csvUtil.parseBlob = (blob, header, separator) => {

    if(!blobAvailable){
      if(csvUtil.warning)
        throw new Error("Blob unavailable.")
      else return
    }

    if(!(blob instanceof Blob))
      throw new Error("Function parseBlob requires first parameter being a Blob object.")

    return new Promise( (s, j) => {
      try{
        let fr = new FileReader()
        fr.addEventListener( "loadend", e => s(csvUtil.parse(fr.result, header, separator)) )
        fr.readAsText( blob )
      }catch(er){ j(er) }
    })

  }
  
  var addQuotes = txt => doNotAddQuote ? txt : `"${txt}"`
  var castType = v =>
          typeof v == "string" ? addQuotes(v)
       : (typeof v == "boolean" || typeof v == "number") ? v
       : (typeof v == "undefined" || v == null) ? null
       : v.hasOwnProperty("toString") ? addQuotes(v.toString())
       : addQuotes(String(v))
 var doNotAddQuote = false

  csvUtil.makeCsv = ( data, header = true, separator, no_quote ) => {

    doNotAddQuote = no_quote

    if(csvUtil.verbose)
      console.log("Converting data into csv.")

    if(!Array.isArray(data))
      throw new Error("Unable to convert data to csv string.")

    if(typeof separator != "string" || !separator || separator == "\"" || separator == "'")
      separator = ","

    let head = [...data.reduce( (h,v) => {
      if(typeof v != "object")
        throw new Error("Unable to convert data to csv string.")
      return Object.keys(v).reduce( (r,k) => r.add(k), h )
    }, new Set() )]

    if(csvUtil.verbose)
      console.log("Converting finished.")

    let hasHeader = false
    if( head.map( (k) => {
      if(!isFinite(k))
        hasHeader = true
      return k
    }).sort().filter( (k,i) => k == i ).length != head.length )
      hasHeader = true

    return !hasHeader ? data.map( r => r.map( d => castType(d) ).join(separator) ).join("\n") :
      ( header ? [head.map( h => castType(h) ).join(separator)] : [] ).concat( data.map(
        r => head.map( h => r.hasOwnProperty(h) ? castType(r[h]) : null ).join(separator) )
      ).join("\n")

  }

  csvUtil.makeBlob = (data, header, separator, no_quote) => {
    if(!blobAvailable){
      if(csvUtil.warning)
        throw new Error("Blob unavailable.")
      else return
    }
    return new Blob([csvUtil.makeCsv(data, header, separator, no_quote)], {type: "text/plain"})
  }

  return window.csvUtil = csvUtil

})(window);