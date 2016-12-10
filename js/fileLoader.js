/* <fileLoader>
 *   Load target url file into blob asynchronously.
 *
 * copyright 2016/11/25 by xNedKx@gmail.com
 *
 * settings:
 *  verbose - true|false - default: false;
 *    Displaying verbose console informations.
 *
 * functions:
 *  load (
 *    url,
 *    params // {method: "POST", data: object, mime: mime_type}
 *  )
 *  return a Promise with target file blob.
 *
 *    Request method defaults to GET, and could be set to POST.
 *
 *    The data param will be sent as URI encoded key-value pairs.
 *
 *    The mime param will override the response mime type,
 *    leave blank to keep the original response mime type.
 *
 */
"use strict"
;(window => new (function fileLoader(){

    var encode = obj => 
      Object.entries( obj ).map( kv => `${encodeURIComponent(kv[0])}=${encodeURIComponent(kv[1])}` ).join( "&" )

    var log = ( info, callback ) => {
      if( this.verbose )
        console.log( info )
      if( typeof callback == "function" )
        callback()
      return info
    }

    this.verbose = false

    this.load = ( url, {method, data, mime} = {} ) => new Promise( ( s, j ) => {
      let isPost = method && /post/i.test( method ),
          base = String(url),
          query,
          queryString = "",
          hash = ""

      if( /#[^#]+$/.test( base ) ){
        hash = base.slice( base.search( /#[^#]+$/ ) )
        base = base.slice( 0, base.length - hash.length )
      }

      if( /\?[^?]+$/.test( base ) ){
        query = base.slice( base.search( /\?[^?]+$/ ) )
        base = base.slice( 0, base.length - query.length )
      }

      if( !isPost && data )
        queryString = ( query ? query + "&" : "?" ) + encode( data )

      var xhr = new XMLHttpRequest()
      xhr.responseType = "arraybuffer"      
      xhr.addEventListener( "error", e => log( `Loading [${base}${queryString}${hash}] failed.`, j ) )
      xhr.addEventListener( "abort", e => log( `Loading [${base}${queryString}${hash}] aborted.`, j ) )
      xhr.addEventListener( "load", e => s(new Blob(
        [xhr.response], {type: mime ? mime : xhr.getResponseHeader( "content-type" )} ))
      )
      xhr.open( isPost ? "POST" : "GET", `${base}${queryString}${hash}`, true )
      xhr.send( isPost ? encode( data ) : undefined )

      if( this.verbose )
        console.log(`Loading [${base}${queryString}${hash}].`)
    }).then( blob => {
      if( this.verbose )
        console.log(`Loading successed.`)
      return blob
    }).catch( er => log(`Error: ${er}`, er => {throw er}) )

    window.fileLoader = this

  })

)(window);