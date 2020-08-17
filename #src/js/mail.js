$('#myfile').change(function () {
    var ext = this.value.match(/\.([^\.]+)$/)[1];
    switch (ext) {
        case 'doc':
        case 'docx':
        case 'xls':
        case 'xlsx':
        case 'pdf':
        case 'zip':
        case 'rar':
        case '7z':
        case 'jpg':
        case 'jpeg':
        case 'png':
            break;
        default:
            alert('Разрешенный формат файла: doc, docx, xls, xlsx, pdf, zip, rar, 7z, jpg, jpeg, png');
            this.value = '';
    }
    var $fileUpload = $("input[type='file']");
    if (parseInt($fileUpload.get(0).files.length) > 8) {
        alert("Можно отправить не больше 8 файлов, вы можете добавить архив");
        this.value = '';
    }
});

//Отправка данных на сервер
$('#form').trigger('reset');
$(function () {
    'use strict';
    $('#form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            url: 'send.php',
            type: 'POST',
            contentType: false,
            processData: false,
            data: new FormData(this),
            success: function (msg) {
                console.log(msg);
                if (msg == 'ok') {
                    $('#ModalThanks').modal('show');
                    $('#form').trigger('reset'); // очистка формы
                } else {
                    alert('Ваш файл слишком большой');
                }
            }
        });
    });
});