# toast.js
A javascript modal for the web

### demo
* [demo](https://mistory.github.io/toast.js/demo/index.html)

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

toast.prompt('hello',function(){
	// console.log('ok')
	// Get the value what you have entered
	// this.val() 
},function(){
	// console.log('cancel')
})
```