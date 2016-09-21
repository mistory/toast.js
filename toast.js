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
    // 包装一个新的dom，拥有close方法
    var Node = function(element){
        this.element = element;
    }
    Node.prototype = {
        constructor:Node,
        close:function(){
            alert(1)
        },
        clear:function(){
            
        }
    }

    var Toast = function(){
        this.handleClick = function(){},
        this.value = '';
        this.toasts = [];
    };

    Toast.prototype = {
        version : '0.1.0',
        constructor: Toast,
        alert:function(message){
            return this._render({
                body:message,
                type:'alert'
            });
        },
        confirm:function(message,sureCallBack,cancelCallBack){
            return this._render({
                body:message,
                type:'confirm',
                sure:sureCallBack || function(){},
                cancel:cancelCallBack || function(){}
            });      
        },
        prompt:function(message,sureCallBack,cancelCallBack){
            return this._render({
                body:'',
                type:'prompt',
                sure:sureCallBack || function(){},
                cancel:cancelCallBack || function(){},
                val:function(){
                    return this.value;
                }.bind(this)
            });
        },
        loading:function(message){
            var node = this._render({
                body:message || '加载中',
                type:'loading',
                sure: function(){},
                cancel: function(){}
            });
            return new Node(node)
        },
        clear:function(element){
            // clear方法清除el
            this._hide(element)
        },
        makeText:function(message){
            var toast = this._renderToast(message)

            setTimeout(function(){
                this._hide(toast);
            }.bind(this), 2000)

        },
        _hide:function(element){
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
            // dialog
            var div = document.createElement('div');
            div.className = 'toast';
            div.innerHTML = '<div class="toast-message toast-message-'+options.type+'"><h2>提示</h2><div class="toast-content">'+options.body+'<input type="text"></div><div class="toast-foot"><button data-btn="cancel">取消</button><button data-btn="sure">确定</button></div></div><div class="toast-mask"></div>';
            
            this.handleClick = function(event){
                var target = event.target;
                if(target.tagName.toLowerCase()==='button'){
                    if(target.dataset.btn==='cancel'){
                        options.cancel&&options.cancel()
                    }else {
                        this.value = div.getElementsByTagName('input')[0].value;
                        options.sure&&options.sure()
                    }
                    this._hide(div);
                }
            }.bind(this);

            div.addEventListener('click', this.handleClick,false)
            document.body.appendChild(div);

            this._animateStart(div);

            // div.__proto__.close = function(){
            //     alert(1)
            // }
            
            return div;
        },
        _renderToast:function(message){
            // toast
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
                return div;
            }
            return document.getElementById('toast');
        },
        _removeEvent:function(element){
            this.value = '';
            element.removeEventListener('click',this.handleClick)
        },
        _removeDom:function(element){
            var parent = element.parentNode;
            if(parent!==null){
                parent.removeChild(element)
                if(parent.id === 'toast'){
                    remove(this.toasts,element);
                    if(this.toasts.length===0){
                        document.body.removeChild(document.getElementById('toast'))
                    }
                }
            }
        }
    }

    var Node = function(element){
        this.element = element;
    }
    Node.prototype = {
        constructor:Node,
        close:function(){
            alert(1)
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
