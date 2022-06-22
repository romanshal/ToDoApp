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
    });
});