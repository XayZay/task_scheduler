let editingTaskId = null;

function showNotification(message, isError = false) {
    const $notif = $('#notification');
    $notif.text(message)
        .css({
            background: isError ? '#d32f2f' : '#388e3c',
            color: '#fff'
        })
        .fadeIn(200);

    setTimeout(() => $notif.fadeOut(400), 2500);
}

// Open task overlay for adding
$('#addtask').on('click', function () {
    $('#overlay').fadeIn();
    editingTaskId = null;
    $('form')[0].reset(); // Clear form

    $('#form-heading').text('Add Task');
    $('#addtaskBtn').text('Add Task');
});

// Close overlay
$('.cancel , .x_btn').on('click', function () {
    $('#overlay').fadeOut();
    editingTaskId = null;
    $('form')[0].reset();

    $('#form-heading').text('Add Task');
    $('#addtaskBtn').text('Add Task');
    
});

// Add or Update Task
$('#addForm').on('submit', function (e) {
    e.preventDefault();

    const taskName = $('.taskname').val().trim();
    const filePath = $('.filepath').val().trim();
    const isEnabled = $('.isenabled').val();
    const interval = $('.interval').val().trim();
    const description = $('.description').val().trim();

    // Validation
    if (!taskName || !filePath || !isEnabled || !interval || !description) {
        showNotification('Please fill in all fields.', true);
        return;
    }

    // const data = {
    //     task_name:$('.taskname').val(),
    //     file_path:$('.filepath').val(),
    //     is_enabled:$('.isenabled').val() === '1' ? 1 : 0,
    //     interval_minutes: $('.interval').val(),
    //     description: $('.description').val()
    // };

     const data = {
            task_name: taskName,
            file_path: filePath,
            is_enabled: isEnabled === '1' ? 1 : 0,
            interval_minutes: interval,
            description: description
        };

    const url = editingTaskId ? 'edit_data.php' : 'add_data.php';
    if (editingTaskId) data.id = editingTaskId;

    $.ajax({
        url: url,
        method: 'POST',
        data: data,
        success: function () {
            showNotification(editingTaskId ? 'Task Updated!' : 'Task Added!');
            $('#overlay').fadeOut();
            $('form')[0].reset();
            fetchTasks();
            editingTaskId = null;
        },
        error: function (xhr) {
            showNotification("Error: " + xhr.responseText);
        }
    });
});

// Fetch and render tasks
function fetchTasks() {
    $.ajax({
        url: 'get_data.php',
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            let tablebody = '';
            data.forEach((task, index) => {
                tablebody += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${task.task_name}</td>
                    <td>${task.file_path}</td>
                    <td>${task.status}</td>
                    <td>${task.last_run}</td>
                    <td>${task.is_enabled == 1 ? "✅" : "❌"}</td>
                    <td>${task.interval_minutes}</td>
                    <td>${task.next_run}</td>
                    <td>${task.description}</td>
                    <td>${task.type}</td>
                    <td>${task.created_at}</td>
                    <td>${task.updated_at}</td>
                    <td>
                      <select class="action-btn" data-id="${task.id}">
                        <option value="">Action</option>
                        <option value="edit">📝 Edit</option>
                        <option value="delete">🗑️ Delete</option>
                      </select>
                    </td>
                </tr>
                `;
            });
            $('#tablebody').html(tablebody);
        },
        error: function () {
            alert('Failed to fetch tasks');
        }
    });
}


// // Handle menu actions
$(document).on('change', '.action-btn', function() {
    const action = $(this).val();
    const taskId = $(this).data('id');
    const row = $(this).closest('tr');

    if (action === 'edit') {
        $('.taskname').val(row.find('td:eq(1)').text());
        $('.filepath').val(row.find('td:eq(2)').text());
        $('.isenabled').val(row.find('td:eq(5)').text());
        $('.interval').val(row.find('td:eq(6)').text());
        $('.description').val(row.find('td:eq(8)').text());

        editingTaskId = taskId;

        $('#form-heading').text('Edit Task');
        $('#addtaskBtn').text('Update');
        $('#overlay').fadeIn();
        
    } 


    else if (action === 'delete') {
    // Show custom popup near the dropdown
    const $dropdown = $(this);
    const offset = $dropdown.offset();
    $('#deleteConfirmPopup').css({
        top: offset.top + $dropdown.outerHeight() + 5,
        left: offset.left + $dropdown.outerWidth() - 270 // Adjust left position to align with dropdown
    }).show();

    // Store the taskId for use in the confirm handler
    $('#deleteConfirmPopup').data('taskId', taskId);

    // Reset select to default
    $(this).val('');
}
    $(this).val('');
});
$.ajax({
    url: 'get_user.php',
    method: 'GET',
    dataType: 'json',
    success: function(resp) {
        if (resp.username) {
            $('#user11').text(resp.username); 
        }
    }
});


// overlay for account
$('.dropdown-item').on('click', function () {
    $('#overlay11').fadeIn();
});
// Close overlay
$('#closeUsernameModal,#closePasswordModal,#closeDeleteModal,#cancelDelete').on('click', function (e) {
        $('#overlay11').fadeOut();
});
// dropdown for account
$('#userBtn').on('click', function (e) {
    e.stopPropagation(); 
    e.preventDefault(); 
    $('#userDropdown').toggle();
});
// Close dropdown when clicking outside
$(document).on('click', function () {
    $('#userDropdown').hide();
});
// Prevent dropdown from closing when clicking inside
$('#userDropdown').on('click', function (e) {
    e.stopPropagation(); 
});

// for the username
$('#changeUsernameBtn').on('click', function() {
    $('#changeUsernameModal').fadeIn();
    $('#userDropdown').hide();
});
$('#closeUsernameModal').on('click', function() {
    $('#changeUsernameModal, #overlay11').fadeOut();
});
// to change username and connect to backend
$('#changeUsernameBtn1').on('click', function() {
    const newUsername = $('#newUsername').val().trim();
    if (!newUsername){
        showNotification('Please enter a new username.', true);
        return;
    }
  
    $.ajax({
        url: 'change_credentials[1].php',
        method: 'POST',
        data: { new_username: newUsername },
        dataType: 'json',
        success: function(resp) {
            if (resp.success) {
                showNotification('Username changed successfully!');
                $('#changeUsernameModal,#overlay11').fadeOut();
                $('#user11').text(newUsername);
            } else {
                showNotification(resp.error, true);
            }
        },
        error: function(xhr) {
            console.error(xhr.responseText);
            showNotification('Failed to change username.', true);
        }
    });
});


// for the password
$('#changePasswordBtn').on('click', function() {
    $('#changePasswordModal').fadeIn();
    $('#userDropdown').hide();
});
$('#closePasswordModal').on('click', function() {
    $('#changePasswordModal,#overlay11').fadeOut();
});

// to change password and connect to backend
$('#changePasswordBtn1').on('click', function() {
    const newPassword = $('#newPassword').val().trim();
    const confirmPassword = $('#confirmPassword').val().trim();

    if (!newPassword || !confirmPassword) {
        showNotification('Please fill in both password fields.', true);
        return;
    }
    if (newPassword !== confirmPassword) {
        showNotification('Passwords do not match.', true);
        return;
    }

    $.ajax({
        url: 'change_credentials[1].php',
        method: 'POST',
        data: { new_password: newPassword },
        dataType: 'json',
        success: function(resp) {
            showNotification('The password has been changed successfully!');
            $('#changePasswordModal, #overlay11').fadeOut();
            window.location.href = 'index.html'; // Redirect to login page
        },
        error: function(xhr) {
            console.error(xhr.responseText);
            showNotification("Failed to change password: " + xhr.responseText, true);
        }
    });
});
// for delete
$('#deleteAccountBtn').on('click', function() {
    $('#deleteAccountModal').fadeIn();
    $('#userDropdown').hide();
});
$('#closeDeleteModal').on('click', function() {
    $('#deleteAccountModal, #overlay11').fadeOut();
});

$('#confirmDeleteAccount').on('click', function() {
    $.ajax({
        url: 'account_options[1].php',
        method: 'POST',
        data: { action: 'delete' },
        dataType: 'json',
        success: function() {
            showNotification('Account Deleted Successfully!');
            $('#deleteAccountModal, #overlay11').fadeOut();
            // Redirect or perform other actions after deletion
            window.location.href = 'index.html'; // Redirect to login page
        },
        error: function(xhr) {
            console.error(xhr.responseText);
            showNotification("Failed to delete account: " + xhr.responseText, true);
        }
    });
});

$('.toggle-password').on('click', function() {
    const input = $($(this).attr('toggle'));
    const type = input.attr('type') === 'password' ? 'text' : 'password';
    input.attr('type', type);
});


$('#logoutBtn').on('click', function() {
    $.ajax({
        url: 'account_options[1].php', // Your backend logout script
        method: 'POST',
        data: { action: 'logout' },
        dataType: 'json',
        success: function() {
            window.location.href = 'index.html'; // Redirect to login page
        },
        error: function() {
            console.error('Logout failed');
            showNotification('Logout failed. Please try again.', true);
        }
    });
});

// Initial fetch
$(document).ready(function () {
    fetchTasks();
});

// Handle delete confirmation popup
$('#confirmDeleteYes').on('click', function() {
    const taskId = $('#deleteConfirmPopup').data('taskId');
    $.ajax({
        url: 'delete_task.php',
        method: 'POST',
        data: { id: taskId },
        success: function () {
            showNotification('Task Deleted!');
            fetchTasks();
        },
        error: function (xhr) {
            showNotification("Failed to delete task: " + xhr.responseText, true);
        }
    });
    $('#deleteConfirmPopup').hide();
});

$('#confirmDeleteNo').on('click', function() {
    $('#deleteConfirmPopup').hide();
});
// Close delete confirmation popup when clicking outside
$(document).on('mousedown', function(e) {
    const $popup = $('#deleteConfirmPopup');
    if ($popup.is(':visible') && !$popup.is(e.target) && $popup.has(e.target).length === 0) {
        $popup.hide();
    }
});