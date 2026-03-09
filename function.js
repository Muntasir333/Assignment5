// login page
let userId = document.getElementById('user');
let pass = document.getElementById('pass');
const btn = document.getElementById('button').addEventListener('click', function(){
  if(userId.value=='admin' && pass.value =='admin123'){
    alert('login was successful');
    window.location.href="home.html";
 } else {
        alert('wrong input')
 }  
})
