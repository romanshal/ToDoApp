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
                            calendar += '<div class="task-preview" style="background:' + value.color + ';">' + value.topic + '</div>';
                        }
                        calendar += '<div class="more">More...</div>';
                    } else {
                        for (value of dayTasks) {
                            calendar += '<div class="task-preview" style="background:' + value.color + ';">' + value.topic + '</div>';
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
                            calendar += '<div class="task-preview" style="background:' + value.color + ';">' + value.topic + '</div>';
                        }
                        calendar += '<div class="more">More...</div>';
                    } else {
                        for (value of dayTasks) {
                            calendar += '<div class="task-preview" style="background:' + value.color + ';">' + value.topic + '</div>';
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