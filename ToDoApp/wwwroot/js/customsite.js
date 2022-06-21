function open_list_modal(item_id) {
    if (item_id !== undefined) {
        open_update_list_model(item_id);
    } else {
        open_create_list_modal();
    }
};

function open_task_modal() {
    var date = $('#task-calendar-widget tbody tr .activ').attr('id');
    if (date !== undefined) {
        console.log(date);
        $('#create-task-date').val(date);
        console.log($('#create-task-date').val());
        $('#modCreateTaskDialog').modal('show');
    }
}

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

function open_create_list_modal() {
    $('#modCreateListDialog').modal('show');
};

function open_update_list_model(item_id) {
    $('#update-list-id').val($('#' + item_id + ' .list-id').text().trim());

    $('#update-list-name').val($('#' + item_id + ' .name').text().trim());

    $('#update-list-description').val($('#' + item_id + ' .list-description').text().trim());

    //TODO: добавление файла в input

    $('#update-list-icon-img').attr('src', $('#' + item_id + ' img').attr('src'));
    document.getElementById('update-list-icon-img').style.visibility = "visible";

    $('#update-list-color').val($('#' + item_id + ' .list-color').text().trim());

    $('#modUpdateListDialog').modal('show');
};

function clear_forms() {
    $('.text-field__input').val('');
    document.getElementById('create-list-icon-img').style.visibility = "hidden";
    $('.text-field__textarea').val('');
    document.getElementById('update-list-icon-img').style.visibility = "hidden";
}

$(document).ready(function () {
    $('#calendar-period li').click(function () {
        $('#calendar-period li').removeClass('activ');
        $('.calendar-widget').children().css('display', 'none');
        $(this).addClass('activ');
        var id = $(this).children('a').attr('href');
        $(id).css('display', '');
    })

    $('#nav-menu li').click(function () {
        $('#nav-menu li').removeClass('activ');
        $(this).addClass('activ');
    })

    $(document).on('click', '#task-calendar-widget tbody tr td', function () {
        console.log(this);
        if (this.innerText === '' || this.innerText === undefined || this.innerText === null) {
            console.log('Not valid value');
            return;
        } else {
            $('#task-calendar-widget tbody td').removeClass('activ');
            $(this).addClass('activ');
        }
    })

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

    function check_list_form(form_name) {
        var valid_form = true;
        if (form_name === 'update-list') {
            var id = document.getElementById(form_name + '-id');
            if (id.value == '' || id.value === 0) {
                valid_form = false;
                alert("Неккоректный id!");
            }
        }

        var name = document.getElementById(form_name + '-name');
        if (name.value == '') {
            name.style.border = '1px solid red';
            valid_form = false;
        }

        var description = document.getElementById(form_name + '-description');
        if (description.value == '') {
            description.style.border = '1px solid red';
            valid_form = false;
        }

        var icon = document.getElementById(form_name + '-icon');
        console.log(icon.files);
        if (icon.files.length === 0) {
            icon.style.border = '1px solid red';
            valid_form = false;
        }

        var color = document.getElementById(form_name + '-color');
        if (color.value == '') {
            color.style.border = '1px solid red';
            valid_form = false;
        }

        return valid_form;
    }

    function check_task_form(form_name) {
        var valid_form = true;
        if (form_name === 'update-task') {
            var id = document.getElementById(form_name + '-id');
            if (id.value == '' || id.value === 0) {
                valid_form = false;
                alert("Неккоректный id!");
            }
        }

        var name = document.getElementById(form_name + '-topic');
        if (name.value == '') {
            name.style.border = '1px solid red';
            valid_form = false;
        }

        var description = document.getElementById(form_name + '-description');
        if (description.value == '') {
            description.style.border = '1px solid red';
            valid_form = false;
        }

        var listId = document.getElementById(form_name + '-listid');
        if (listId.value == '') {
            listId.style.border = '1px solid red';
            valid_form = false;
        }

        var date = document.getElementById(form_name + '-date');
        if (date.value == '') {
            date.style.border = '1px solid red';
            valid_form = false;
        }

        return valid_form;
    }

    $('#create-list-icon').change(function () {
        loadImageFile(this, 'create-list-icon-img');
    });

    $('#update-list-icon').change(function () {
        loadImageFile(this, 'update-list-icon-img');
    });

    // функция выборки файла
    function loadImageFile(input, id) {
        if (input.files.length !== 0) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#' + id).attr('src', e.target.result);
                document.getElementById(id).style.visibility = "visible";
            }

            reader.readAsDataURL(input.files[0]);
        } else {
            document.getElementById(id).style.visibility = "hidden";
        }
    }
});

function calendar_month(id, year, month, isMainWidget) {
    var Dlast = new Date(year, month + 1, 0).getDate(),
        D = new Date(year, month, Dlast),
        DNlast = new Date(D.getFullYear(), D.getMonth(), Dlast).getDay(),
        DNfirst = new Date(D.getFullYear(), D.getMonth(), 1).getDay(),
        calendar = '<tr>',
        month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    if (DNfirst != 0) {
        for (var i = 1; i < DNfirst; i++) calendar += '<td>';
    } else {
        for (var i = 0; i < 6; i++) calendar += '<td>';
    }
    for (var i = 1; i <= Dlast; i++) {
        /*var dayId = i + '-' + (D.getMonth() + 1) + '-' + D.getFullYear();*/
        var dayId = D.getFullYear() + '-' + ('0' + (D.getMonth() + 1)).slice(-2) + '-' + ('0' + i).slice(-2);
        let dayTasks = tasks.filter(x => x.taskDate === dayId);
        if (i == new Date().getDate() && D.getFullYear() == new Date().getFullYear() && D.getMonth() == new Date().getMonth()) {
            calendar += '<td class="today" id="' + dayId + '">' + i;
            if (isMainWidget) {
                if (dayTasks !== undefined) {
                    if (dayTasks.length >= 3) {
                        dayTasks = dayTasks.slice(1);
                        for (value of dayTasks) {
                            calendar += '<div style="background:' + value.color + ';">' + value.topic + '</div>';
                        }
                        calendar += '<div class="more">More...</div>';
                    } else {
                        for (value of dayTasks) {
                            calendar += '<div style="background:' + value.color + ';">' + value.topic + '</div>';
                        }
                    }
                }
            }
        } else {
            calendar += '<td id="' + dayId + '">' + i;
            if (isMainWidget) {
                if (dayTasks !== undefined) {
                    if (dayTasks.length >= 3) {
                        dayTasks = dayTasks.slice(1);
                        for (value of dayTasks) {
                            calendar += '<div style="background:' + value.color + ';">' + value.topic + '</div>';
                        }
                        calendar += '<div class="more">More...</div>';
                    } else {
                        for (value of dayTasks) {
                            calendar += '<div style="background:' + value.color + ';">' + value.topic + '</div>';
                        }
                    }
                }
            }
        }
        if (new Date(D.getFullYear(), D.getMonth(), i).getDay() == 0) {
            calendar += '<tr>';
        }
    }
    for (var i = DNlast; i < 7; i++) calendar += '<td> ';
    document.querySelector('#' + id + ' tbody').innerHTML = calendar;
    document.querySelector('#' + id + ' thead td:nth-child(2)').innerHTML = month[D.getMonth()] + ' ' + D.getFullYear();
    document.querySelector('#' + id + ' thead td:nth-child(2)').dataset.month = D.getMonth();
    document.querySelector('#' + id + ' thead td:nth-child(2)').dataset.year = D.getFullYear();
    if (document.querySelectorAll('#' + id + ' tbody tr').length < 6) {
        // чтобы при перелистывании месяцев не "подпрыгивала" вся страница, добавляется ряд пустых клеток. Итог: всегда 6 строк для цифр
        document.querySelector('#' + id + ' tbody').innerHTML += '<tr><td> <td> <td> <td> <td> <td> <td> ';
    }
}

calendar_month("calendar-month-widget", new Date().getFullYear(), new Date().getMonth(), true);
calendar_month("task-calendar-widget", new Date().getFullYear(), new Date().getMonth(), false);

// переключатель минус месяц
document.querySelector('#calendar-month-widget thead tr:nth-child(1) td:nth-child(1)').onclick = function () {
    calendar_month("calendar-month-widget", document.querySelector('#calendar-month-widget thead td:nth-child(2)').dataset.year, parseFloat(document.querySelector('#calendar-month-widget thead td:nth-child(2)').dataset.month) - 1, true);
}
document.querySelector('#task-calendar-widget thead tr:nth-child(1) td:nth-child(1)').onclick = function () {
    calendar_month("task-calendar-widget", document.querySelector('#task-calendar-widget thead td:nth-child(2)').dataset.year, parseFloat(document.querySelector('#task-calendar-widget thead td:nth-child(2)').dataset.month) - 1, false);
}

// переключатель плюс месяц
document.querySelector('#calendar-month-widget thead tr:nth-child(1) td:nth-child(3)').onclick = function () {
    calendar_month("calendar-month-widget", document.querySelector('#calendar-month-widget thead td:nth-child(2)').dataset.year, parseFloat(document.querySelector('#calendar-month-widget thead td:nth-child(2)').dataset.month) + 1, true);
}
document.querySelector('#task-calendar-widget thead tr:nth-child(1) td:nth-child(3)').onclick = function () {
    calendar_month("task-calendar-widget", document.querySelector('#task-calendar-widget thead td:nth-child(2)').dataset.year, parseFloat(document.querySelector('#task-calendar-widget thead td:nth-child(2)').dataset.month) + 1, false);
}