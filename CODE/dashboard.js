$(document).ready(function(){
    let editingTaskId = null;
    // for the add button and addtaskform
    $("#addtask").click(function(){
         editingTaskId = null;
         $("#overlay").fadeIn();
        });
     
    $("#addtaskBtn , #closeBtn, #edittaskBtn").click( function(){
        $("#overlay").fadeOut();
    });
    
    // setInterval(fetchTasks, 10000); 


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
                                
                                //     <td id="td">
                                //     <button id="active">
                                //         <p id="word"> Action </p> 
                                //                 <select  id="custom-select"> 
                                //                     <option selected></option>
                                //                     <option value="1">Edit Task</option>
                                //                     <option value="2">Delete Task</option>
                                //                 </select>
                                //     </button>

                                // </td>
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
                //    id: editingTaskId
    //         },
    //         datatype:'',
    //         sucesss:  function(){
    //             alert(editingTaskId ? 'Task Updated!' : 'Task Added!');
    //             $("#overlay").fadeOut();
    //             fetchTasks();
    //             $("#addForm")[0].reset();
                    // editingTaskId = null;
    //         },
    //         error:function(xhr){
    //             alert("Failed to add task:" +xhr.responseText);
    //         }
    //     }); 
    // });  
//     $('#tablebody').on('click', '#active', function(){
//         const row =  $(this).closest('tr');
//         const selectedAction = row.find('#custom-select').val();
//         const id = row.data('id');

//         if (!selectedAction) {
//             alert("Please select an action.");
//             return;
//         }
//         if (selectedAction === "edit"){
//                 $('.taskname').val(row.find('td:eq(1)').text());
//                 $('.filepath').val(row.find('td:eq(2)').text());
//                 $('.isenabled').val(row.find('td:eq(5)').text());
//                 $('.interval').val(row.find('td:eq(6)').text());
//                 $('.description').val(row.find('td:eq(8)').text());

//                 editingTaskId = id;
//                 $("#overlay").fadeIn();

//         }else if(selectedAction === "delete"){                  
//             if (confirm("Are you sure you want to delete this task?")){
//                  $.ajax({
//                         url:'',
//                         method: 'POST',
//                         data:{
//                             id
//                         },
//                         sucesss:  function(){
//                             alert('Task Deleted!')
//                             $("#overlay").fadeOut();
//                             fetchTasks();
//                             $("#addForm")[0].reset();
//                         },
//                         error:function(xhr){
//                             alert("Failed to delete task:" +xhr.responseText);
//                          }
//                     });
//                 }
//             }
//     }); 

});
