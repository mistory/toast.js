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
    var toasts = [];
    var Node = function(element){
        this.element = element;
        this.handleClick = function(){};
        this.value = ''
    }
    Node.prototype = {
        constructor:Node,
        show:function(){
            window.getComputedStyle(this.element).top;
            this.element.classList.add('in');
        },
        clean:function(){
            window.getComputedStyle(this.element).top;
            this.element.classList.remove('in');

            setTimeout(function(){
                this._remove()
            }.bind(this), 250)
        },
        bind:function(sure,cancel){
            var self = this;
            this.handleClick = function(event){
                var target = event.target;
                if(target.tagName.toLowerCase()==='button'){
                    if(target.dataset.btn==='cancel'){
                        cancel&&cancel()
                    }else {
                        self.value = self.element.getElementsByTagName('input')[0].value;
                        sure&&sure()
                    }
                    self.clean();
                }
            };
            this.element.addEventListener('click', this.handleClick,false)
            return this;
        },
        val:function(){
            return this.value;
        },
        _remove:function(){
            this.element.removeEventListener('click',this.handleClick)
            var parent = this.element.parentNode;
            if(parent!==null){
                parent.removeChild(this.element)
                if(parent.id === 'toast'){
                    remove(toasts,this.element);
                    if(toasts.length===0){
                       document.body.removeChild(document.getElementById('toast'))
                    }
                }
            }
        }
    }
    
    var toast = function() {
        function render(options){
            // dialog
            var div = document.createElement('div');
            div.className = 'toast';
            div.innerHTML = '<div class="toast-message toast-message-'+options.type+'"><h2>提示</h2><div class="toast-content">'+options.body+'<input type="text"></div><div class="toast-foot"><button data-btn="cancel">取消</button><button data-btn="sure">确定</button></div></div><div class="toast-mask"></div>';
            document.body.appendChild(div);
            return div;
        }

        function renderToast(message){
            // toast
            var div = document.createElement('div');
            div.className = 'toast-item';
            div.innerHTML = '<div><h2>'+message+'</h2></div>';

            toasts.push(div);
            parent().appendChild(div);
            return div;
        }
        function parent(){
            if(!document.getElementById('toast')){
                var div = document.createElement('div');
                div.id = 'toast';
                document.body.appendChild(div);
                return div;
            }
            return document.getElementById('toast');
        }

        

        return {
            alert:function(message,sure,cancel){
                var node = new Node(render({
                    body:message,
                    type:'alert'
                }))
                node.bind(sure,cancel).show()
                return node
            },
            confirm:function(message,sure,cancel){
                var node = new Node(render({
                    body:message,
                    type:'confirm'
                }))
                node.bind(sure,cancel).show()
                return node   
            },
            prompt:function(message,sure,cancel){
                var node = new Node(render({
                    body:'',
                    type:'prompt'
                }))
                node.bind(sure,cancel).show()
                return node 
            },
            loading:function(message){
                var node = new Node(render({
                    body:message || '加载中',
                    type:'loading'
                }))
                node.show()
                return node
            },
            makeText:function(message){
                var node = new Node(renderToast(message))
                node.show()
                setTimeout(function(){
                    node.clean();
                }, 2000)
                return node
            }
        }

    }();

    function remove(array,item){
        var len = array.length;
        while (len--) {
            if (array[len] === item) {
                array.splice(len, 1);
            }
        }
    }
    
    return toast;
});
