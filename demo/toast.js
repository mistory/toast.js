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
        this.toasts = [];
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
        makeText:function(message){
            var toast = this._renderToast(message)

            setTimeout(function(){
                this._hide(toast,function(){});
            }.bind(this), 2000)

            return this;
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
            document.body.appendChild(div);

            this._animateStart(div);

        },
        _renderToast:function(message){
            var div = document.createElement('div');
            div.className = 'toast-item';
            div.innerHTML = '<div><h2>'+message+'</h2></div>';

            this.toasts.push(div);
            this._parent().appendChild(div);
            this._animateStart(div);

            return div;
        },
        _parent:function(){
            if(!document.getElementById('toast')){
                var div = document.createElement('div');
                div.id = 'toast';
                document.body.appendChild(div);
            }
            return document.getElementById('toast');
        },
        _removeEvent:function(element){
            this.value = '';
            element.removeEventListener('click',this.handleClick)
        },
        _removeDom:function(element){
            var parent = element.parentNode;
            parent.removeChild(element)
            if(parent.id === 'toast'){
                remove(this.toasts,element);
                if(this.toasts.length===0){
                    document.body.removeChild(document.getElementById('toast'))
                }
            }
        }
    }

    function remove(array,item){
        var len = array.length;
        while (len--) {
            if (array[len] === item) {
                array.splice(len, 1);
            }
        }
    }

    return new Toast();
});