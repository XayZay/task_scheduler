$("document").ready(function(){
    $("#LoginBtn").click(function(){
        
            const username = $('#username').val().trim();
            const password = $('#password').val().trim();
           
            if (username === ''||
                password === ''
            ){
                alert('Please enter both username and password');
                return;
            }
            else if(username === 'admin'||
                    password === '1234'
                ){
                    alert('Login Successful!');

                    setTimeout( ()=>{
                        window.location.href = 'dashboard.html';
                }, 1000);
                } else {
                    alert('Invalid Username or Password.')
                }


    
    });  
});



