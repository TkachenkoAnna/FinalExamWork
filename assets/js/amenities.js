AMENITIES = {
    getList: function() {
        let d = $.Deferred();
        $.ajax({
            url: 'https://beetroot.quidow.pp.ua/api/amenities/',
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
            url: 'https://beetroot.quidow.pp.ua/api/amenities/'+ id +'/',
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
        AMENITIES.getList().done(function(json) {
            let amen = '<option value="0">-=Select amenities=-</option>',
                selected = '';
            for (let i = 0; i < json.results.length; i++) {
                selected = (json.results[i].id == id) ? ' selected' : '';
                amen += `<option value="${json.results[i].id}"${selected}>${json.results[i].name}</option>`;
            }
            $("#" + elem).html(amen);
        }).fail(function(err) {
            showMessage(errorText(err.status), 'error');
        });
    },
    add: function(data) {
        let d = $.Deferred();
        $.ajax({
            url: 'https://beetroot.quidow.pp.ua/api/amenities/',
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
                        d.resolve(AMENITIES.add(data));
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
            url: 'https://beetroot.quidow.pp.ua/api/amenities/'+ id +'/',
            method: 'put',
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
                        d.resolve(AMENITIES.update(id, data));
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
            url: 'https://beetroot.quidow.pp.ua/api/amenities/'+ id +'/',
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
                        d.resolve(AMENITIES.delete(id));
                    });
                } else {
                    d.reject(err);
                }
            }
        });
        return d.promise();
    }   
};