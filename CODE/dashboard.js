$(document).ready(function(){
    // for the add button and addtaskform
    $("#addtask").click(function(){
         $("#overlay").fadeIn();
        });

    $("#addtaskBtn , #closeBtn").click( function(){
        $("#overlay").fadeOut();
    });
    
    // fetchTasks();

    // function fetchTasks() {
    //     $.ajax({
    //         Url: '',
    //         method: 'GET',
    //         success: function(tasks) {
    //             $('#tablebody').empty();
    //             if(tasks.length === 0) {
    //                 $('#tablebody').append('<tr><td colspan="12">No tasks found</td></tr>');

    //             }else{
    //                 tasks.forEach(tasks => {
    //                     $('#tablebody').append(
    //                     <tr>
    //                         <td>${task.id}</td>
    //                         <td>${task.task_name}</td>
    //                         <td>${task.file_path}</td>
    //                         <td>${task.last_run || '—'}</td>
    //                         <td>${task.last_output || '—'}</td>
    //                         <td>${task.is_enabled}</td>
    //                         <td>${task.interval_minutes}</td>
    //                         <td>${task.next_run || '—'}</td>
    //                         <td>${task.description ||''}</td>
    //                         <td>${task.type || ''}</td>
    //                         <td>${task.created_at}</td>
    //                         <td>${task.updated_at}</td>

    //                     </tr>
    //                     );
    //                 });
    //             }
    //         },
    //         error:function (xhr,status,error){
    //             $('#tablebody').html(<tr><td colspan="12">Error Loading Tasks:${error}</td></tr>);
    //         }
            
    //     });
    // }
    // $("#addtaskBtn").click(function(){
    //     const task = {
    //         task_name: $('.taskname').val().trim(),
    //         file_path: $('.filepath').val().trim(),
    //         is_enabled: $('.isenabled').val().trim(),
    //         interval_minutes: $('.interval').val().trim(),
    //         description: $('.description').val().trim(),
    //     };
    //     // session, post request,local storage, to be discussed 
    //      $.ajax({
    //         url:'',
    //         method: 'POST',
    //         data:{
    //             action: 'login',

    //         },
    //         datatype:'',
    //         sucesss:  function(){
    //             alert('Task Added!');
    //             $("#overlay").fadeOut();
    //             fetchTasks();
    //             $("#addForm")[0].reset();
    //         },
    //         error:function(xhr){
    //             alert("Failed to add task:" +xhr.responseText);
    //         }
    //     }); 
    // });   
});
