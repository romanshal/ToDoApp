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