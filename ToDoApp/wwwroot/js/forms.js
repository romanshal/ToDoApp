function clear_forms() {
    setTimeout(() => {
        $('.text-field__input').val('');
        document.getElementById('create-list-icon-img').style.visibility = "hidden";
        $('.text-field__textarea').val('');
        document.getElementById('update-list-icon-img').style.visibility = "hidden";
    },1000);
    
}

$(document).ready(function () {
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