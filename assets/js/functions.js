function errorText(code) {
    switch (code) {
        case 0:
            return 'Сервер не отвечает';
        case 404:
            return 'API point not found';
        case 500:
            return 'Internal Server Error';
        default:
            return 'Unknown error [' + code + ']';
    }
}

function showMessage(text, type = 'info') {
    switch (type) {
        case 'error':
            toastr.error(text);
            break;
        case 'warning':
            toastr.warning(text);
            break;
        case 'success':
            toastr.success(text);
            break;
        default:
            toastr.info(text);
            break;
    }
}