window.onload = function(){
    var $ = function(id){
        return document.getElementById(id);
    };
    var oheadHeight = $("head").offsetHeight,
        osearchHead = $("search-head"),
        osearchPAT = $("search-results").querySelectorAll(".articles"),
        osearchNavItems = $("search-nav").getElementsByTagName("a");
    
    var addEvent = function(obj,event,fn){
        if(obj.addEventListener){
            obj.addEventListener(event,fn,false);
        }else if(obj.attachEvent){
            obj.attachEvent('on'+event,fn);
        }
    };

    var scrollEvent = function(){
        var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop;
        if(scrollHeight >= oheadHeight){
            osearchHead.style.cssText = "border-bottom:1px solid #D7D7D7;position:fixed;top:0px;";
        }else{
            osearchHead.style.cssText = "border-bottom:0px;position:static";
        }
    };
    
    for(var i = 0,len = osearchNavItems.length; i < len; i++){
        osearchNavItems[i].index = i;
        osearchNavItems[i].onclick = function(){
            for(var i = 0,len = osearchNavItems.length; i < len; i++){
                osearchNavItems[i].className = "inactive";
                osearchPAT[i].style.display = "none";
            }
            osearchNavItems[this.index].className = "active";
            osearchPAT[this.index].style.display = "block";
        }
    }

    addEvent(window,'scroll',function(){
        scrollEvent();
    });
    addEvent(window,'resize',function(){
        scrollEvent();
    });
};