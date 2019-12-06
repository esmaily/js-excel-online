
var App=function(){
  
  
}


App.prototype.ucfirst=function(str){
    return str.charAt(0).toUpperCase() + str.slice(1)
}
App.prototype.camelCase=function(str,seprator='_'){
    let name=''
    str.split(seprator).forEach(item=>{
        name+=this.ucfirst(item)
    })
    return name
}
App.prototype.ajax=async function(data={}){
    /*
    * ne browsers support
    */
    try {
        const rawResponse =  await fetch("./api.php",
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body:  JSON.stringify(data)
            })

        return await rawResponse.json();

    }catch (e) {
        console.log(new Error(e));
    }


    /*
    *  Full Support browsers
    */

    // var xmlhttp = new XMLHttpRequest()
    // var response=''
    // xmlhttp.onreadystatechange = function() {
    //     if (this.readyState == 4 && this.status == 200) {
    //        return    JSON.parse(this.responseText)
    //     }
    // };
    // xmlhttp.open('POST', './api.php',true)
    // xmlhttp.send(data)
    // console.log('sdf',response);
}

//module.exports= App
window.__app = new App()
 