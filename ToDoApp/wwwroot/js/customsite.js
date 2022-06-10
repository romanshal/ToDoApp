$(function () {
    $('#calendar-period li').click(function () {
        $('#calendar-period li').removeClass('activ');
        $(this).addClass('activ');
    })

    $('#nav-menu li').click(function () {
        $('#nav-menu li').removeClass('activ');
        $(this).addClass('activ');
    })

    $('#task-calendar-widget tbody td').click(function () {
        if (this.innerText === '' || this.innerText === undefined || this.innerText === null) {
            return;
        } else {
            $('#task-calendar-widget tbody td').removeClass('activ');
            $(this).addClass('activ');
        }
    })

    $('#create-list-button').click(function () {
        $('#modListDialog').modal('show');
    })

    $(function () {
        $('#save-button').click(function (e) {
            e.preventDefault();

            var valid = check_create_list_form();

            if (valid) {
                var data = new FormData($('#creat-list-form')[0]);

                $.ajax({
                    url: '/createlist',
                    type: 'POST',
                    data: data,
                    cache: false,
/*                    dataType: 'json',*/
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

    function check_create_list_form() {
        var valid_form = true;

        var name = document.getElementById('create-list-name');
        if (name.value == '') {
            name.style.border = '1px solid red';
            valid_form = false;
        }

        var description = document.getElementById('create-list-description');
        if (description.value == '') {
            description.style.border = '1px solid red';
            valid_form = false;
        }

        var icon = document.getElementById('create-list-icon');
        console.log(icon.files);
        if (icon.files.length === 0) {
            icon.style.border = '1px solid red';
            valid_form = false;
        }

        return valid_form;
    }

    FReader = new FileReader();

    // событие, когда файл загрузится
    FReader.onload = function (e) {
        document.querySelector("#create-list-icon-img").src = e.target.result;
        document.getElementById('create-list-icon-img').style.visibility = "visible";
    };

    // выполнение функции при выборки файла
    document.querySelector("#create-list-icon").addEventListener("change", loadImageFile);

    // функция выборки файла
    function loadImageFile() {
        var icon = document.getElementById('create-list-icon');
        if (icon.files.length !== 0) {
            var file = document.querySelector("#create-list-icon").files[0];
            FReader.readAsDataURL(file);
        } else {
            document.getElementById('create-list-icon-img').style.visibility = "hidden";
        }
    }
});

function calendar(id, year, month) {
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
        if (i == new Date().getDate() && D.getFullYear() == new Date().getFullYear() && D.getMonth() == new Date().getMonth()) {
            calendar += '<td class="today">' + i;
        } else {
            calendar += '<td>' + i;
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

calendar("calendar-widget", new Date().getFullYear(), new Date().getMonth());
calendar("task-calendar-widget", new Date().getFullYear(), new Date().getMonth());

// переключатель минус месяц
document.querySelector('#calendar-widget thead tr:nth-child(1) td:nth-child(1)').onclick = function () {
    calendar("calendar-widget", document.querySelector('#calendar-widget thead td:nth-child(2)').dataset.year, parseFloat(document.querySelector('#calendar-widget thead td:nth-child(2)').dataset.month) - 1);
}
document.querySelector('#task-calendar-widget thead tr:nth-child(1) td:nth-child(1)').onclick = function () {
    calendar("task-calendar-widget", document.querySelector('#task-calendar-widget thead td:nth-child(2)').dataset.year, parseFloat(document.querySelector('#task-calendar-widget thead td:nth-child(2)').dataset.month) - 1);
}

// переключатель плюс месяц
document.querySelector('#calendar-widget thead tr:nth-child(1) td:nth-child(3)').onclick = function () {
    calendar("calendar-widget", document.querySelector('#calendar-widget thead td:nth-child(2)').dataset.year, parseFloat(document.querySelector('#calendar-widget thead td:nth-child(2)').dataset.month) + 1);
}
document.querySelector('#task-calendar-widget thead tr:nth-child(1) td:nth-child(3)').onclick = function () {
    calendar("task-calendar-widget", document.querySelector('#task-calendar-widget thead td:nth-child(2)').dataset.year, parseFloat(document.querySelector('#task-calendar-widget thead td:nth-child(2)').dataset.month) + 1);
}