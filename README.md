# toast.js
A javascript modal for the web

### demo
* [demo](https://mistory.github.io/toast.js)

### Import
``` html
<link rel="stylesheet" href="toast.css">
<script src="toast.js"></script>
```

### Quick Demo
``` javascript
toast.alert('hello')

toast.confirm('hello',function(){
	// console.log('ok')
},function(){
	// console.log('cancel')
})

var hello = toast.prompt('hello',function(){
	// console.log('ok')
	// Get the value what you have entered
	// hello.val() 
},function(){
	// console.log('cancel')
})

toast.makeText('message')

var loading = toast.loading('加载中')
setTimeout(function(){
	loading.clean()
},2000)
```