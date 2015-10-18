window.onload = function(){
    var $ = function(id){
        return document.getElementById(id);
    };
    var obtn = true,
        oheadHeight = $("head").offsetHeight,
        osearch = $("search"),
        osearchView = $("searchview"),
        screenHeight = document.documentElement.clientHeight || document.body.clientHeight,
        screenWidth = document.documentElement.clientWidth || document.body.clientWidth;
    
    var addEvent = function(obj,event,fn){
        if(obj.addEventListener){
            obj.addEventListener(event,fn,false);
        }else if(obj.attachEvent){
            obj.attachEvent('on'+event,fn);
        }
    };

    var searchEvent = function(){
        var osearchViewHeight = screenHeight - oheadHeight,
            osearchformInput = $("s");
        if(obtn){
            document.body.style.cssText = "overflow:hidden;width:" + (screenWidth + 17) + "px";
            osearchView.style.cssText = "height:" + osearchViewHeight + "px;display: block;";
            osearchformInput.focus();
            obtn = false;
        }else{
            document.body.style.cssText = "overflow:visible;";
            osearchView.style.display = "none";
            osearchformInput.blur();
            obtn = true;
        }
    };
    addEvent(osearch,'click',function(){
        searchEvent();
    });
    addEvent(window,'resize',function(){
        screenHeight = document.documentElement.clientHeight || document.body.clientHeight;
        screenWidth = document.documentElement.clientWidth || document.body.clientWidth;
    });
};