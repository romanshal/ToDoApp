function delete_list(list_id) {
    if (confirm("Do you really want to delete list?")) {
        $.ajax({
            url: '/deletelist?tasksListId=' + list_id,
            type: 'DELETE',
            success: function () {
                window.location.href = "";
            },
            error: function () {
                alert('Ops... Something went wrong :(');
            }
        });
    }
}

$(document).ready(function () {
    $(function () {
        $('#create-list-button').click(function (e) {
            e.preventDefault();

            var valid = check_list_form('create-list');

            if (valid) {
                var data = new FormData($('#creat-list-form')[0]);

                $.ajax({
                    url: '/createlist',
                    type: 'POST',
                    data: data,
                    cache: false,
                    processData: false,
                    contentType: false,
                    success: function () {
                        window.location.href = "";
                    },
                    error: function () {
                        alert('Ops... Something went wrong :(');
                    }
                });
            }
        });

        $('#create-task-button').click(function (e) {
            e.preventDefault();

            var valid = check_task_form('create-task');
            if (valid) {
                var data = $('#create-task-form').serialize();

                $.ajax({
                    url: '/createtask',
                    type: 'POST',
                    data: data,
                    success: function () {
                        window.location.href = "";
                    },
                    error: function () {
                        alert('Ops... Something went wrong :(');
                    }
                });
            }
        });
    });

    $(function () {
        $('#update-list-button').click(function (e) {
            e.preventDefault();

            var valid = check_list_form('update-list');

            if (valid) {
                var data = new FormData($('#update-list-form')[0]);

                $.ajax({
                    url: '/updatelist',
                    type: 'PUT',
                    data: data,
                    cache: false,
                    processData: false,
                    contentType: false,
                    success: function () {
                        window.location.href = "";
                    },
                    error: function () {
                        alert('Ops... Something went wrong :(');
                    }
                });
            }
        });
    });

    $(document).on('click', '#task-calendar-widget tbody tr td', function () {
        console.log(this);
        if (this.innerText === '' || this.innerText === undefined || this.innerText === null) {
            console.log('Not valid value');
            return;
        } else {
            $('#task-calendar-widget tbody td').removeClass('activ');
            $(this).addClass('activ');
        }
    });
});