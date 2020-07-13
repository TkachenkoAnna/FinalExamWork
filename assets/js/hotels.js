HOTELS = {
    getList: function() {
        let d = $.Deferred();
        $.ajax({
            url: 'https://beetroot.quidow.pp.ua/api/hotels/',
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
            url: 'https://beetroot.quidow.pp.ua/api/hotels/' + id + '/',
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
    add: function(data) {
        let d = $.Deferred();
        $.ajax({
            url: 'https://beetroot.quidow.pp.ua/api/hotels/',
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
                        d.resolve(HOTELS.add(data));
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
            url: 'https://beetroot.quidow.pp.ua/api/hotels/' + id + '/',
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
                        d.resolve(HOTELS.update(id, data));
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
            url: 'https://beetroot.quidow.pp.ua/api/hotels/' + id + '/',
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
                        d.resolve(HOTELS.delete(id));
                    });
                } else {
                    d.reject(err);
                }
            }
        });
        return d.promise();
    },   
    getTbody: function(elem) {
        HOTELS.getList().done(function(json) {
            let tbody = '';
            for (let i = 0; i < json.results.length; i++) {
                tbody += `
                    <tr data-id="${json.results[i].id}" data-name="${json.results[i].name}">
                        <td>${json.results[i].id}</td>
                        <td>${json.results[i].name}</td>
                        <td>
                            <a href="javascript:void(0)" onclick="editHotel($(this))">Редактировать</a>
                            <a href="javascript:void(0)" onclick="askDeleteHotel($(this))">Удалить</a>
                        </td>
                    </tr>
                `;
            }
            $("#" + elem).html(tbody);
        }).fail(function(err) {
            showMessage(errorText(err.status), 'error');
        });
    }
}

function checkAndSaveHotel($btn) {
    if (!$btn.hasClass("disabled")) {
        $btn.addClass("disabled");
        let valid = true,
            msg = '',
            name = $("#hotel_name").val(),
            services = $("#hotel_services").val();
        if (name == "") {
            valid = false;
            msg = 'Enter hotel name';
        }
        if (valid) {
            let data = {
                "name": name,
                "services": services
            };
            if ($("#hotel_id").val() == "new") {
                HOTELS.add(data).done(function(json) {
                    HOTELS.getTbody();
                });
            } else {
                HOTELS.update($("#hotel_id").val(), data).done(function(json) {
                    HOTELS.getTbody();
                });
            }

        }

    }
}

function editHotel($btn) {
    let id = $btn.parents("tr").data("id");
    HOTELS.getOne(id).done(function(json) {
        $("#hotel_id").val(json.id);
        $("#hotel_name").val(json.name);
    });
}