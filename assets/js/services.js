SERVICES = {
    getList: function() {
        let d = $.Deferred();
        $.ajax({
            url: 'https://beetroot.quidow.pp.ua/api/services/',
            method: 'get',
            dataType: 'json',
            success: function(json) {
                d.resolve(json);
            },
            error: function(err) {
                d.reject(err);
            }
        });
        return d.promise();
    },
    getOne: function(id) {
        let d = $.Deferred();
        $.ajax({
            url: 'https://beetroot.quidow.pp.ua/api/services/'+ id +'/',
            method: 'get',
            dataType: 'json',
            success: function(json) {
                d.resolve(json);
            },
            error: function(err) {
                d.reject(err);
            }
        });
        return d.promise();
    },
    getOptions: function(elem, id = 0) {
        SERVICES.getList().done(function(json) {
            let opts = '<option value="0">-=Select services=-</option>',
                selected = '';
            for (let i = 0; i < json.results.length; i++) {
                selected = (json.results[i].id == id) ? ' selected' : '';
                opts += `<option value="${json.results[i].id}"${selected}>${json.results[i].name}</option>`;
            }
            $("#" + elem).html(opts);
        }).fail(function(err) {
            showMessage(errorText(err.status), 'error');
        });
    },
    add: function(data) {
        let d = $.Deferred();
        $.ajax({
            url: 'https://beetroot.quidow.pp.ua/api/services/',
            method: 'post',
            data: data,
            processData: false,
            enctype: 'multipart/form-data',
            contentType: false,
            cache: false,
            dataType: 'json',
            beforeSend: function(xhr) {
                xhr.setRequestHeader('Authorization', "Bearer " + localStorage.getItem("access_token"));
            },
            success: function(json) {
                d.resolve(json);
            },
            error: function(err) {
                if (err.status == "403") {
                    USER.refreshToken().done(function() {
                        d.resolve(SERVICES.add(data));
                    });
                } else {
                    d.reject(err);
                }
            }
        });
        return d.promise();
    },
    update: function(id, data) {
        let d = $.Deferred();
        $.ajax({
            url: 'https://beetroot.quidow.pp.ua/api/services/' + id + '/',
            method: 'patch',
            data: data,
            processData: false,
            enctype: 'multipart/form-data',
            contentType: false,
            cache: false,
            dataType: 'json',
            beforeSend: function(xhr) {
                xhr.setRequestHeader('Authorization', "Bearer " + localStorage.getItem("access_token"));
            },
            success: function(json) {
                d.resolve(json);
            },
            error: function(err) {
                if (err.status == "403") {
                    USER.refreshToken().done(function() {
                        d.resolve(SERVICES.update(id, data));
                    });
                } else {
                    d.reject(err);
                }
            }
        });
        return d.promise();
    },
    delete: function(id) {
        let d = $.Deferred();
        $.ajax({
            url: 'https://beetroot.quidow.pp.ua/api/services/' + id + '/',
            method: 'delete',
            contentType: 'application/json',
            dataType: 'json',
            beforeSend: function(xhr) {
                xhr.setRequestHeader('Authorization', "Bearer " + localStorage.getItem("access_token"));
            },
            success: function(json) {
                d.resolve(json);
            },
            error: function(err) {
                if (err.status == "403") {
                    USER.refreshToken().done(function() {
                        d.resolve(SERVICES.delete(id));
                    });
                } else {
                    d.reject(err);
                }
            }
        });
        return d.promise();
    }   
};