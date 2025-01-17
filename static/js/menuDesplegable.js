document.addEventListener('DOMContentLoaded',function(){
	const toggleBoton = document.querySelector('#navbar-toggle');
	const navBarMenu = document.querySelector('#navbar-menu');
	toggleBoton.addEventListener('click',function(){
		console.log('click');
		navBarMenu.classList.toggle('show');
	})
});