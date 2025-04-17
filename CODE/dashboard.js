$(document).ready(function(){
    // for the add button and addtaskform
    $("#addtask").click(function(){
         $("#overlay").fadeIn();
        });

    $("#addtaskBtn , #closeBtn").click( function(){
        $("#overlay").fadeOut();
    });    
});
