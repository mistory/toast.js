;(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.toast = factory();
    }
})(typeof window !== 'undefined' ? window : this, function() {
    'use strict';

    var Toast = function(){
        this.handleClick = function(){},
        this.value = '';
    };

    Toast.prototype = {
        version : '0.1.0',
        constructor: Toast,
        alert:function(message){
            this._render({
                body:message,
                type:'alert',
                sure:function(){},
                cancel:function(){}
            });
        },
        makeText:function(){
            
        },
        confirm:function(message,sureCallBack,cancelCallBack){
            this._render({
                body:message,
                type:'confirm',
                sure:sureCallBack,
                cancel:cancelCallBack
            });      
        },
        prompt:function(message,sureCallBack,cancelCallBack){
            this._render({
                body:'',
                type:'prompt',
                sure:sureCallBack,
                cancel:cancelCallBack,
                val:function(){
                    return this.value;
                }.bind(this)
            });
        },
        pop:function(){

        },
        _hide:function(element,callback){
            this._removeEvent(element);
            this._animateEnd(element);

            setTimeout(function(){
                this._removeDom(element)
            }.bind(this), 250)
        },
        _animateStart:function(element){
            window.getComputedStyle(element).top;
            element.classList.add('in');
        },
        _animateEnd:function(element){
            window.getComputedStyle(element).top;
            element.classList.remove('in');
        },
        _render:function(options){
            var div = document.createElement('div');
            div.className = 'toast';
            div.innerHTML = '<div class="toast-mask"></div><div class="toast-message toast-message-'+options.type+'"><h2>提示</h2><div class="toast-content">'+options.body+'<input type="text"></div><div class="toast-foot"><button data-btn="cancel">取消</button><button data-btn="sure">确定</button></div></div>';
            document.body.appendChild(div);

            this.handleClick = function(event){
                var target = event.target;
                if(target.tagName.toLowerCase()==='button'){
                    if(target.dataset.btn==='cancel'){
                        this._hide(div,options.cancel());
                    }else {
                        this.value = div.getElementsByTagName('input')[0].value;
                        this._hide(div,options.sure());
                    }
                }
            }.bind(this);

            div.addEventListener('click', this.handleClick,false)
            
            this._animateStart(div);

        },
        _removeEvent:function(element){
            this.value = '';
            element.removeEventListener('click',this.handleClick)
        },
        _removeDom:function(element){
            document.body.removeChild(element)
        }
    }

    return new Toast();
});
