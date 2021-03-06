var tablaTratamiento;
var tratamientoId = 0;
var tratamientoIdElimiinado = 0;
var tratamientos = new Array();
//var productos = new Array();
var JSONTratamientoString = '';
var JSONTratamiento = new Object();
var precio = 0.0;

function inicializar() {
    if (localStorage.getItem('MYSPA_CREDENCIAL') === null)
        window.location = '../index.html';

    var empleado = JSON.parse(localStorage.getItem('MYSPA_CREDENCIAL'));

    $('#spnEmpleadoNombre').html(empleado.persona.nombre + ' ' + empleado.persona.apellidoPaterno);
}

function cargarModuloProducto() {
    $.ajax(
            {type: "GET",
                url: "producto/catalogo.html",
                async: true
            }
    ).done(
            function (data) {
                $('#divMainContainer').html(data);
                $(document).ready(function () {
                    $("#myInput").on("keyup", function () {
                        var value = $(this).val().toLowerCase();
                        $("#tbProductos tr").filter(function () {
                            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
                        });
                    });
                });
                actualizarTablaProductos();
            }
    );
}

function actualizarTablaProductos() {
    $.ajax({
        type: "GET",
        url: "../rsproducto/getAllProducto",
        async: true
    }).done(
            function (productos)
            {
                var str = '';

                for (var i = 0; i < productos.length; i++)
                    str += '<tr>' +
                            '<td>' + productos[i].id + '</td>' +
                            '<td>' + productos[i].nombre + '</td>' +
                            '<td>' + productos[i].marca + '</td>' +
                            '<td>' + productos[i].precioUso + '</td>' +
                            '</tr>';
                $('#tbProductos').html(str);

                $('#tbProductos').find('tr').click(function ()
                {
                    //this en esta funcion es el renglon
                    //seleccionado por el usuario                                                            

                    $('#txtIdProducto').val(productos[$(this).index()].id);
                    $('#txtNombreProducto').val(productos[$(this).index()].nombre);
                    $('#txtMarcaProducto').val(productos[$(this).index()].marca);
                    $('#txtPrecioUsoProducto').val(productos[$(this).index()].precioUso);
                    $('#chbEstatusProducto').prop('checked', true);
                    $('#divModalProductoDetalle').modal();
                });

            }
    );
}
function guardarProducto() {

    var rutaREST = null;
    var idProducto = 0;
    var nombre = "";
    if ($('#txtIdProducto').val().length > 0) {
        rutaREST = '../rsproducto/updateProducto';
        idProducto = $('#txtIdProducto').val();
    } else {
        rutaREST = '../rsproducto/insertProducto';
    }
    if ($('#txtNombreProducto').val().length > 0) {
        $.ajax({
            type: "POST",
            asyn: true,
            url: rutaREST,
            data: {
                idProducto: idProducto,
                nombre: $('#txtNombreProducto').val(),
                marca: $('#txtMarcaProducto').val(),
                precioUso: $('#txtPrecioUsoProducto').val(),
                //estatus : $('#chbEstatusProducto').prop('checked') ? 1 : 0
                estatus: 1
            }
        }).done(function (data)
        {
            if (data.error != null) {
                swal("Error", data.error, 'warning');
                return;
            }
            actualizarTablaProductos();
            $('#txtIdProducto').val(data.result);
            swal('Realizado', 'Hecho', 'success');
        }
        );
    } else {
        $.ajax({
            type: "POST",
            asyn: true,
            url: rutaREST,
            data: {
                idProducto: idProducto,
                nombre: $('#txtNombreProductoN').val(),
                marca: $('#txtMarcaProductoN').val(),
                precioUso: $('#txtPrecioUsoProducto').val(),
                //estatus : $('#chbEstatusProducto').prop('checked') ? 1 : 0
                estatus: 1
            }
        }).done(function (data)
        {
            if (data.error != null) {
                swal("Error", data.error, 'warning');
                return;
            }
            actualizarTablaProductos();
            $('#txtIdProducto').val(data.result);
            swal('Realizado', 'Hecho', 'success');
        }
        );
    }


}

function limpiarCamposProducto() {
    $('#txtIdProducto').val('');
    $('#txtNombreProducto').val('');
    $('#txtMarcaProducto').val('');
    $('#txtPrecioUsoProducto').val('');
    $('#chbEstatusProducto').prop('checked', true);
}
//MODULO SALA
function cargarModuloSala() {
    $.ajax(
            {type: "GET",
                url: "sala/catalogoSala.html",
                async: true
            }
    ).done(
            function (data) {
                $('#divMainContainer').html(data);
                $('#tbSalas').find('tr').click(function () {
                });

                $(document).ready(function () {
                    $("#myInput").on("keyup", function () {
                        var value = $(this).val().toLowerCase();
                        $("#tbSalas tr").filter(function () {
                            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
                        });
                    });
                });
                actualizarTablaSalas();
            }
    );
}
function cargarModal() {

    $.ajax({
        type: "GET",
        url: "../rssucursal/getAllSucursal",
        async: true
    }).done(
            function (sucursal) {
                var str = '';
                for (var i = 0; i < sucursal.length; i++) {
                    str += '<tr>' +
                            '<td>' + sucursal[i].id + '</td>' +
                            '<td>' + sucursal[i].nombre + '</td>' +
                            '<td>' + sucursal[i].domicilio + '</td>' +
                            '</tr>';
                    $('#tbSalasSucursal').html(str);
                    $('#tbSalasSucursal').find('tr').click(function () {
                        //this en esta funcion es el renglon
                        //seleccionado por el usuario                                                            
                        $('#idSucursal').val(sucursal[$(this).index()].id);
                        $('#SucursalNombre').val(sucursal[$(this).index()].nombre);
                        if ($('#SucursalNombre').val.length > 0) {
                            swal('Sucursal Selecionada', '', 'success');
                            $("#modalSucursalSala").modal('hide');
                        } else {
                            swal('No se selecciono la Sucursal', '', 'warning');
                        }
                    });
                }
            }
    );
}

function actualizarTablaSalas() {
    $.ajax({
        type: "GET",
        url: "../rssala/getAllSala",
        async: true
    }).done(
            function (salas) {
                var str = '';
                for (var i = 0; i < salas.length; i++)
                    str += '<tr>' +
                            '<td>' + salas[i].id + '</td>' +
                            '<td>' + salas[i].nombre + '</td>' +
                            '<td>' + salas[i].descripcion + '</td>' +
                            '<td>' + salas[i].sucursal.nombre + '</td>' +
                            '</tr>';
                $('#tbSalas').html(str);
                $('#tbSalas').find('tr').click(function () {
                    //this en esta funcion es el renglon //seleccionado por el usuario                                                            
                    $('#txtSalaId').val(salas[$(this).index()].id);
                    $('#txtSalaNombre').val(salas[$(this).index()].nombre);
                    $('#txtSalaDescripcion').val(salas[$(this).index()].descripcion);
                    $('#imgSalaFoto').prop('src', 'data:image/png;base64,' + salas[$(this).index()].foto);
                    $('#response').val(salas[$(this).index()].foto);
                    $('#idSucursal').val(salas[$(this).index()].sucursal.id);
                    $('#divModalSalaDetalle').modal();
                });
            }
    );
}

function guardarSala() {
    var rutaREST = null;
    var idSala = 0;
    if ($('#txtSalaId').val().length > 0) {
        rutaREST = '../rssala/updateSala';
        idSala = $('#txtSalaId').val();
    } else {
        rutaREST = '../rssala/insertSala';
    }
    $.ajax({
        type: "POST",
        async: true,
        url: rutaREST,
        data: {
            idSala: idSala,
            nombre: $('#txtSalaNombre').val(),
            descripcion: $('#txtSalaDescripcion').val(),
            foto: $('#response').val(),
            idSucursal: $('#idSucursal').val()
                    // estatus: $('#chbSalaEstatus').prop('checked') ? 1 : 0
        }
    }).done(function (data) {
        if (data.error != null)
        {
            swal('Error', data.error, 'warning');
            return;
        }
        actualizarTablaSalas();

        swal('Movimiento realizado', '', 'success');
    });
}
function eliminarSala() {
    $.ajax({
        type: "POST",
        async: true,
        url: "../rssala/deleteSala",
        data: {
            idSala: $('#txtSalaId').val()
        }
    }).done(function (data) {
        if (data.error != null)
        {
            swal('Error', data.error, 'warning');
            return;
        }
        actualizarTablaSalas();
        swal('Movimiento realizado', '', 'success');
    });
}

function limpiarCamposSala() {
    $('#txtSalaId').val('');
    $('#txtSalaNombre').val('');
    $('#txtSalaDescripcion').val('');
    $('#response').val('');
    $('#inputFileToLoad').val('');
    $('#idSucursal').val('');
    $('#imgSalaFoto').val('');
    $('#chbSalaEstatus').prop('checked', false);
}

//MODULO SUCURSAL

function colocarMapa() {
    //generar una variable con las coordenadas
    var latitud = Number($('#txtSucursalLatitud').val());
    var longitud = Number($('#txtSucursalLongitud').val());
    var posicion = {lat: latitud, lng: longitud};
    //generar la variable con la informacion del mapa
    var objetoMapa = new google.maps.Map(
            document.getElementById("mapa"), //donde se va a colocar
            {
                center: posicion, // la latitud y longitud del mapa
                scrollwheel: true, //para funcion del raton como zoom
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                zoom: 15
            }// como sera colocado el mapa y su funcionalidad
    );
    var objMarcador = new google.maps.Marker(
            {
                map: objetoMapa, //el mapa en donde quieres el marcador
                position: posicion, // latitud y longitud de la ubicacion
                title: $('#txtSucursalNombre').val()//informacion extra
                        //icon:"../images/i1.png"//cambio de iconos
            }
    );
}

function cargarModuloSucursal() {
    $.ajax({
        type: "GET",
        url: "sucursal/catalogo.html",
        async: true
    }).done(
            function (data) {
                $('#divMainContainer').html(data);

                $(document).ready(function () {
                    $("#myInput").on("keyup", function () {
                        var value = $(this).val().toLowerCase();
                        $("#tbSucursales tr").filter(function () {
                            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
                        });
                    });
                });
                actualizarTablaSucursal();

            }
    );
}
function actualizarTablaSucursal() {
    $.ajax({
        type: "GET",
        url: "../rssucursal/getAllSucursal",
        async: true
    }).done(
            function (sucursales) {
                alert(sucursales);
                alert(sucursales.length);
                var string = JSON.stringify(sucursales);
                alert(string);
                var str = '';
                for (var i = 0; i < sucursales.length; i++) {
                    str += '<tr>' +
                            '<td>' + sucursales[i].id + '</td>' +
                            '<td>' + sucursales[i].nombre + '</td>' +
                            '<td>' + sucursales[i].latitud + '</td>' +
                            '<td>' + sucursales[i].longitud + '</td>' +
                            '<td>' + sucursales[i].domicilio + '</td>' +
                            '</tr>';
                    $('#tbSucursales').html(str);

                    $('#tbSucursales').find('tr').click(function () {
                        $('#txtSucursalId').val(sucursales[$(this).index()].id);
                        $('#txtSucursalNombre').val(sucursales[$(this).index()].nombre)
                        $('#txtSucursalDomicilio').val(sucursales[$(this).index()].domicilio)
                        $('#txtSucursalLatitud').val(sucursales[$(this).index()].latitud)
                        $('#txtSucursalLongitud').val(sucursales[$(this).index()].longitud)
                        colocarMapa();
                    });
                }
            }
    );
}


function guardarSucursal() {
    var rutaREST = null;
    var idSucursal = 0;
    if ($('#txtSucursalId').val().length > 0) {
        rutaREST = '../rssucursal/updateSucursal';
        idSucursal = $('#txtSucursalId').val();
    } else {
        rutaREST = '../rssucursal/insertSucursal';
    }
    if ($('#txtSucursalNombre').val().length > 0) {
        $.ajax(
                {
                    type: "POST",
                    async: true,
                    url: rutaREST,
                    data: {
                        idSucursal: idSucursal,
                        nombre: $('#txtSucursalNombre').val(),
                        domicilio: $('#txtSucursalDomicilio').val(),
                        latitud: $('#txtSucursalLatitud').val(),
                        longitud: $('#txtSucursalLongitud').val()
                                //estatus: $('chbProductoEstatus').prop('checked') ? 1 : 0
                    }
                }).done(function (data)
        {
            if (data.error != null)
            {
                swal('Error', data.error, 'warning');
                return;
            }
            actualizarTablaSucursal();
            $('#txtSucursalId').val(data.result);
            swal('Movimiento realizado', '', 'success');
        });
    } else {
        $.ajax(
                {
                    type: "POST",
                    async: true,
                    url: rutaREST,
                    data: {
                        idSucursal: idSucursal,
                        nombre: $('#txtSucursalNombreN').val(),
                        domicilio: $('#txtSucursalDomicilioN').val(),
                        latitud: $('#txtSucursalLatitudN').val(),
                        longitud: $('#txtSucursalLongitudN').val()
                                //estatus: $('chbProductoEstatus').prop('checked') ? 1 : 0
                    }
                }).done(function (data)
        {
            if (data.error != null)
            {
                swal('Error', data.error, 'warning');
                return;
            }
            actualizarTablaSucursal();
            $('#txtSucursalId').val(data.result);
            swal('Movimiento realizado', '', 'success');
        });
    }
    mostrarMapa();
}

function eliminarSucursal() {
    $.ajax(
            {
                type: "POST",
                async: true,
                url: "../rssucursal/deleteSucursal",
                data: {
                    idSucursal: $('#txtSucursalId').val()
                            // estatus: $('chbProductoEstatus').prop('checked') ? 1 : 0
                }
            }).done(function (data)
    {
        if (data.error != null)
        {
            swal('Error', data.error, 'warning');
            return;
        }
        actualizarTablaSucursal();
        $('#txtSucursalId').val(data.result);
        swal('Movimiento realizado', '', 'success');
    });

}

function limpiarCamposSucursal() {
    $('#txtSucursalId').val('');
    $('#txtSucursalNombre').val('');
    $('#txtSucursalDomicilio').val('');
    $('#txtSucursalLatitud').val('');
    $('#txtSucursalLongitud').val('');
    $('#chbSucursalEstatus').prop('checked', true);
}

//MODULO TRATAMIENTO
function cargarModuloTratamiento() {
    $.ajax(
            {type: "GET",
                url: "tratamiento/catalogo.html",
                async: true
            }
    ).done(
            function (data) {
                $('#divMainContainer').html(data);
                $(document).ready(function () {
                    $("#myInput").on("keyup", function () {
                        var value = $(this).val().toLowerCase();
                        $("#tbTratamiento tr").filter(function () {
                            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
                        });
                    });
                });

                actualizarTablaTratamiento();
            }
    );


}

function guardarTratamiento() {

    var rutaREST = null;
    var idTratamiento = 0;

    if ($('#txtIdTratamiento').val().length > 0) {
        rutaREST = '../rstratamiento/updateTratamiento';
        idTratamiento = $('#txtIdTratamiento').val();
    } else {
        rutaREST = '../rstratamiento/insertTratamiento';
    }
    if ($('#txtNombreTratamiento').val().length > 0) {
        $.ajax({
            type: "POST",
            asyn: true,
            url: rutaREST,
            data: {
                idTratamiento: idTratamiento,
                nombre: $('#txtNombreTratamiento').val(),
                descripcion: $('#txtDescripcionTratamiento').val(),
                //estatus : $('#chbEstatusTratamiento').prop('checked') ? 1 : 0
            }
        }).done(function (data)
        {
            if (data.error != null) {
                swal("Error", data.error, 'warning');
                return;
            }
            actualizarTablaTratamiento();
            $('#txtIdTratamiento').val(data.result);
            swal('Realizado', 'Hecho', 'success');
        }
        );
    } else {
        $.ajax({
            type: "POST",
            asyn: true,
            url: rutaREST,
            data: {
                idTratamiento: idTratamiento,
                nombre: $('#txtNombreTratamientoN').val(),
                descripcion: $('#txtDescripcionTratamientoN').val(),
                //estatus : $('#chbEstatusTratamiento').prop('checked') ? 1 : 0
            }
        }).done(function (data)
        {
            if (data.error != null) {
                swal("Error", data.error, 'warning');
                return;
            }
            actualizarTablaTratamiento();
            $('#txtIdTratamiento').val(data.result);
            swal('Realizado', 'Hecho', 'success');
        }
        );
    }
}

function actualizarTablaTratamiento() {
    $.ajax({
        type: "GET",
        url: "../rstratamiento/getAllTratamiento",
        async: true
    }).done(
            function (tratamientos)
            {
                var str = '';
                for (var i = 0; i < tratamientos.length; i++)
                    str += '<tr>' +
                            '<td>' + tratamientos[i].id + '</td>' +
                            '<td>' + tratamientos[i].nombre + '</td>' +
                            '<td>' + tratamientos[i].descripcion + '</td>' +
                            '<td>' + tratamientos[i].estatus + '</td>' +
                            '</tr>';
                $('#tbTratamiento').html(str);
                $('#tbTratamiento').find('tr').click(function ()
                {
                    //this en esta funcion es el renglon
                    //seleccionado por el usuario                                                            

                    $('#txtIdTratamiento').val(tratamientos[$(this).index()].id);
                    $('#txtNombreTratamiento').val(tratamientos[$(this).index()].nombre);
                    $('#txtDescripcionTratamiento').val(tratamientos[$(this).index()].descripcion);
                    $('#divModalTratamientoDetalle').modal();
                });
            }
    );
}


function eliminarTratamiento() {

    $.ajax({
        type: "POST",
        aync: true,
        url: '../rstratamiento/deleteTratamiento',
        data: {
            idTratamiento: $('#txtIdTratamiento').val()
        }
    }).done(function (data) {
        if (data.error != null)
        {
            swal('Error', data.error, 'warning');
            return;
        }
        actualizarTablaTratamiento();
        $('#txtIdTratamiento').val(data.result);
        swal('Movimiento realizado', '', 'success');
    });
}

function limpiarCamposTratamiento() {
    $('#txtIdTratamiento').val('');
    $('#txtNombreTratamiento').val('');
    $('#txtDescripcionTratamiento').val('');
    $('#chbEstatusTratamiento').prop('checked', true);
}


//Cliente
function cargarModuloCliente() {
    $.ajax(
            {type: "GET",
                url: "cliente/catalogo.html",
                async: true
            }
    ).done(
            function (data) {
                $('#divMainContainer').html(data);
                $('#tbProductos').find('tr').click(function ()
                {
                    alert('Renglon: ' + $(this).index());
                }
                );
                $(document).ready(function () {
                    $("#myInput").on("keyup", function () {
                        var value = $(this).val().toLowerCase();
                        $("#tbClientes tr").filter(function () {
                            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
                        });
                    });
                });
                actualizarTablaClientes();
            }
    );


}

function actualizarTablaClientes() {
    $.ajax({
        type: "GET",
        url: "../rscliente/getAllCliente",
        async: true
    }).done(
            function (clientes)
            {
                var str = '';
                for (var i = 0; i < clientes.length; i++)
                    str += '<tr>' +
                            '<td>' + clientes[i].id + '</td>' +
                            '<td>' + clientes[i].persona.nombre +
                            ' ' + clientes[i].persona.apellidoPaterno +
                            ' ' + clientes[i].persona.apellidoMaterno + '</td>' +
                            '<td>' + clientes[i].persona.genero + '</td>' +
                            '<td>' + clientes[i].persona.domicilio + '</td>' +
                            '<td>' + clientes[i].persona.telefono + '</td>' +
                            '<td>' + clientes[i].persona.rfc + '</td>' +
                            '<td>' + clientes[i].numeroUnico + '</td>' +
                            '<td>' + clientes[i].correo + '</td>' +
                            '</tr>';
                $('#tbClientes').html(str);
                $('#tbClientes').find('tr').click(function ()
                {
                    $('#txtIdCliente').val(clientes[$(this).index()].id);
                    $('#txtIdUsuarioCliente').val(clientes[$(this).index()].usuario.id);
                    $('#txtIdPersonaCliente').val(clientes[$(this).index()].persona.id);
                    $('#txtNumeroUnicoCliente').val(clientes[$(this).index()].numeroUnico);
                    $('#txtNombreCliente').val(clientes[$(this).index()].persona.nombre);
                    $('#txtApellidoPaternoCliente').val(clientes[$(this).index()].persona.apellidoPaterno);
                    $('#txtApellidoMaternoCliente').val(clientes[$(this).index()].persona.apellidoMaterno);
                    $('#txtGeneroCliente').val(clientes[$(this).index()].persona.genero);
                    $('#txtDomicilioCliente').val(clientes[$(this).index()].persona.domicilio);
                    $('#txtTelefonoCliente').val(clientes[$(this).index()].persona.telefono);
                    $('#txtRFCCliente').val(clientes[$(this).index()].persona.rfc);
                    $('#txtCorreoCliente').val(clientes[$(this).index()].correo);
                    $('#txtNombreUsuarioCliente').val(clientes[$(this).index()].usuario.nombreUsuario);
                    $('#txtContraseniaCliente').val(clientes[$(this).index()].usuario.contrasenia);

                    $('#chbEstatusCliente').prop('checked', true);
                    $('#divModalClienteDetalle').modal();
                }
                );
            }
    );
}
function guardarCliente() {

    var rutaREST = null;
    var idCliente = 0;
    var idPersona = 0;
    var idUsuario = 0;

    if ($('#txtIdCliente').val().length > 0) {
        rutaREST = '../rscliente/updateCliente';
        idCliente = $('#txtIdCliente').val();
        idUsuario = $('#txtIdUsuarioCliente').val();
        idPersona = $('#txtIdPersonaCliente').val();
    } else {
        rutaREST = '../rscliente/insertCliente';
    }

    $.ajax({
        type: "POST",
        asyn: true,
        url: rutaREST,
        data: {
            idCliente: idCliente,
            idUsuario: idUsuario,
            idPersona: idPersona,
            nombre: $('#txtNombreCliente').val(),
            apellidoPaterno: $('#txtApellidoPaternoCliente').val(),
            apellidoMaterno: $('#txtApellidoMaternoCliente').val(),
            genero: $('#txtGeneroCliente').val(),
            domicilio: $('#txtDomicilioCliente').val(),
            telefono: $('#txtTelefonoCliente').val(),
            rfc: $('#txtRFCCliente').val(),
            correo: $('#txtCorreoCliente').val(),
            nombreUsuario: $('#txtNombreUsuarioCliente').val(),
            contrasenia: $('#txtContraseniaCliente').val(),
        }
    }).done(function (data)
    {
        if (data.error != null) {
            swal("Error", data.error, 'warning');
            return;
        }
        actualizarTablaClientes();
        $('#txtIdCliente').val(data.id);
        $('#txtIdUsuarioCliente').val(data.usuario.id);
        $('#txtIdPersonaCliente').val(data.persona.id);
        $('#txtNumeroUnicoCliente').val(data.numeroUnico);
        swal('Realizado', 'Hecho', 'success');
    }
    );
}

function eliminarCliente() {

    var rutaREST = null;

    if ($('#txtIdCliente').val().length > 0) {
        rutaREST = '../rscliente/deleteCliente';
    } else {
        swal("Error", "no hay id", 'warning');
        return;
    }

    $.ajax({
        type: "POST",
        asyn: true,
        url: rutaREST,
        data: {
            idCliente: $('#txtIdCliente').val()
        }
    }).done(function (data)
    {
        if (data.error != null) {
            swal("Error", data.error, 'warning');
            return;
        }
        actualizarTablaClientes();
        swal('Realizado', 'Hecho', 'success');
    }
    );
}

function limpiarCamposCliente() {
    $('#txtIdCliente').val('');
    $('#txtNombreCliente').val('');
    $('#txtApellidoPaternoCliente').val('');
    $('#txtApellidoMaternoCliente').val('');
    $('#txtGeneroCliente').val('Genero');
    $('#txtDomicilioCliente').val('');
    $('#txtTelefonoCliente').val('');
    $('#txtRFCCliente').val('');
    $('#txtCorreoCliente').val('');
    $('#txtNombreUsuarioCliente').val('');
    $('#txtContraseniaCliente').val('');
    $('#txtIdUsuarioCliente').val('');
    $('#txtIdPersonaCliente').val('');
    $('#txtNumeroUnicoCliente').val('');
    $('#chbEstatusProducto').prop('checked', false);
}

//MODULO EMPLEADO

function cargarModuloEmpleado() {
    $.ajax(
            {type: "GET",
                url: "empleado/catalogo.html",
                async: true
            }
    ).done(
            function (data) {
                $('#divMainContainer').html(data);
                $('#tbEmpleados').find('tr').click(function ()
                {
                    alert('Renglon: ' + $(this).index());
                }
                );

                $(document).ready(function () {
                    $("#myInput").on("keyup", function () {
                        var value = $(this).val().toLowerCase();
                        $("#tbEmpleados tr").filter(function () {
                            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
                        });
                    });
                });
                actualizarTablaEmpleados();
            }
    );


}

function actualizarTablaEmpleados() {
    $.ajax({
        type: "GET",
        url: "../rsempleado/getAllEmpleado",
        async: true
    }).done(
            function (empleados)
            {
                var str = '';
                for (var i = 0; i < empleados.length; i++)
                    str += '<tr>' +
                            '<td>' + empleados[i].id + '</td>' +
                            '<td>' + empleados[i].persona.nombre + '</td>' +
                            '<td> ' + empleados[i].persona.apellidoPaterno + '</td>' +
                            '<td> ' + empleados[i].persona.apellidoMaterno + '</td>' +
                            '<td>' + empleados[i].persona.genero + '</td>' +
                            '<td>' + empleados[i].persona.domicilio + '</td>' +
                            '<td>' + empleados[i].persona.telefono + '</td>' +
                            '<td>' + empleados[i].persona.rfc + '</td>' +
                            '<td>' + empleados[i].numeroEmpleado + '</td>' +
                            '<td>' + empleados[i].puesto + '</td>' +
                            '</tr>';
                $('#tbEmpleados').html(str);
                $('#tbEmpleados').find('tr').click(function ()
                {
                    $('#txtIdEmpleado').val(empleados[$(this).index()].id);
                    $('#txtIdUsuarioEmpleado').val(empleados[$(this).index()].usuario.id);
                    $('#txtIdPersonaEmpleado').val(empleados[$(this).index()].persona.id);
                    $('#txtNumeroEmpleado').val(empleados[$(this).index()].numeroEmpleado);
                    $('#txtNombreEmpleado').val(empleados[$(this).index()].persona.nombre);
                    $('#txtApellidoPaternoEmpleado').val(empleados[$(this).index()].persona.apellidoPaterno);
                    $('#txtApellidoMaternoEmpleado').val(empleados[$(this).index()].persona.apellidoMaterno);
                    $('#txtGeneroEmpleado').val(empleados[$(this).index()].persona.genero);
                    $('#txtDomicilioEmpleado').val(empleados[$(this).index()].persona.domicilio);
                    $('#txtTelefonoEmpleado').val(empleados[$(this).index()].persona.telefono);
                    $('#txtRFCEmpleado').val(empleados[$(this).index()].persona.rfc);
                    $('#txtPuestoEmpleado').val(empleados[$(this).index()].puesto);
                    $('#txtNombreUsuarioEmpleado').val(empleados[$(this).index()].usuario.nombreUsuario);
                    $('#txtContraseniaEmpleado').val(empleados[$(this).index()].usuario.contrasenia);
                    $('#imgEmpleadoFoto').prop('src', 'data:image/png;base64,' + empleados[$(this).index()].foto);
                    $('#chbEstatusEmpleado').prop('checked', true);
                    $('#divModalEmpleadoDetalle').modal();
                }
                );
            }
    );
}
function guardarEmpleado() {

    var rutaREST = null;
    var idEmpleado = 0;
    var idPersona = 0;
    var idUsuario = 0;

    if ($('#txtIdEmpleado').val().length > 0) {
        rutaREST = '../rsem pleado/updateEmpleado';
        idEmpleado = $('#txtIdEmpleado').val();
        idUsuario = $('#txtIdUsuarioEmpleado').val();
        idPersona = $('#txtIdPersonaEmpleado').val();
    } else {
        rutaREST = '../rsempleado/insertEmpleado';
    }

    $.ajax({
        type: "POST",
        asyn: true,
        url: rutaREST,
        data: {
            idEmpleado: idEmpleado,
            idUsuario: idUsuario,
            idPersona: idPersona,
            nombre: $('#txtNombreEmpleado').val(),
            apellidoPaterno: $('#txtApellidoPaternoEmpleado').val(),
            apellidoMaterno: $('#txtApellidoMaternoEmpleado').val(),
            genero: $('#txtGeneroEmpleado').val(),
            domicilio: $('#txtDomicilioEmpleado').val(),
            telefono: $('#txtTelefonoEmpleado').val(),
            foto: $('#response').val(),
            rfc: $('#txtRFCEmpleado').val(),
            puesto: $('#txtPuestoEmpleado').val(),
            nombreUsuario: $('#txtNombreUsuarioEmpleado').val(),
            contrasenia: $('#txtContraseniaEmpleado').val()
        }
    }).done(function (data)
    {
        if (data.error != null) {
            swal("Error", data.error, 'warning');
            return;
        }
        actualizarTablaEmpleados();
        $('#txtIdEmpleado').val(data.id);
        $('#txtIdUsuarioEmpleado').val(data.usuario.id);
        $('#txtIdPersonaEmpleado').val(data.persona.id);
        $('#txtNumeroEmpleado').val(data.numeroEmpleado);
        swal('Realizado', 'Hecho', 'success');
    }
    );
}

function eliminarEmpleado() {

    var rutaREST = null;

    if ($('#txtIdEmpleado').val().length > 0) {
        rutaREST = '../rsempleado/deleteEmpleado';
    } else {
        swal("Error", "Not Exits Id", 'warning');
        return;
    }

    $.ajax({
        type: "POST",
        asyn: true,
        url: rutaREST,
        data: {
            idEmpleado: $('#txtIdEmpleado').val()
        }
    }).done(function (data)
    {
        if (data.error != null) {
            swal("Error", data.error, 'warning');
            return;
        }
        actualizarTablaEmpleados();
        swal('Realizado', 'Hecho', 'success');
    }
    );
}

function limpiarCamposEmpleado() {
    $('#txtIdEmpleado').val('');
    $('#txtIdUsuarioEmpleado').val('');
    $('#txtIdPersonaEmpleado').val('');
    $('#txtNombreEmpleado').val('');
    $('#txtApellidoPaternoEmpleado').val('');
    $('#txtApellidoMaternoEmpleado').val('');
    $('#txtGeneroEmpleado').val('Genero');
    $('#txtDomicilioEmpleado').val('');
    $('#txtTelefonoEmpleado').val('');
    $('#txtRFCEmpleado').val('');
    $('#txtPuestoEmpleado').val('Puesto');
    $('#txtNombreUsuarioEmpleado').val('');
    $('#txtContraseniaEmpleado').val('');
    $('txtRolEmpleado').val('Rol');
    $('#txtNumeroEmpleado').val('');
    $('#chbEstatusEmpleado').prop('checked', false);
}


function buscarClientePorNumeroUnicoReservacion(numeroUnico) {
    $.ajax({
        type: "GET",
        dataType: 'json',
        url: "../rsreservacion/findClienteByNumeroUnico",
        data: {numeroUnico: numeroUnico},
        asyn: true
    }).done(
            function (cliente) {
                if (cliente.id != null) {
                    $('#txtIdClienteReservacion').val(cliente.id);
                    $('#txtNombreCliente').val(cliente.persona.nombre + " " + cliente.persona.apellidoPaterno);
                } else {
                    swal('No se encontró el cliente', '', 'warning');
                }
            }
    );
}
function cargarModuloReservacion() {
    $.ajax(
            {type: "GET",
                url: "reservaciones/catalogo.html",
                async: true
            }
    ).done(
            function (data) {
                $('#divMainContainer').html(data);

                actualizarTablaReservacion();


                $("#txtNumeroUnicoCliente").on("keypress", function (evt) {
                    var code = evt.keyCode;
                    if (code == '13') {

                        buscarClientePorNumeroUnicoReservacion($('#txtNumeroUnicoCliente').val());
                    }
                });
                //filtroo para las reservaciones               
                $("#myInput").on("keyup", function () {
                    var value = $(this).val().toLowerCase();
                    $("#tbReservacion tr").filter(function () {
                        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
                    });
                });
            });
}

function actualizarTablaReservacion() {
    $.ajax({
        type: "GET",
        url: "../rsreservacion/getAllReservacion",
        async: true
    }).done(
            function (reservaciones)
            {
                var str = '';
                for (var i = 0; i < reservaciones.length; i++)
                    str += '<tr>' +
                            '<td>' + reservaciones[i].id + '</td>' +
                            '<td>' + reservaciones[i].cliente.id + '</td>' +
                            '<td>' + reservaciones[i].cliente.numeroUnico + '</td>' +
                            '<td>' + reservaciones[i].fechaHoraInicio + '</td>' +
                            '<td>' + reservaciones[i].fechaHoraFin + '</td>' +
                            '<td>' + reservaciones[i].sala.nombre + '</td>' +
                            '<td>' + reservaciones[i].estatus + '</td>' +
                            '</tr>';
                $('#tbReservacion').html(str);
                $('#tbReservacion').find('tr').click(function ()
                {
                    //this en esta funcion es el renglon
                    //seleccionado por el usuario                                                            

                    $('#txtIdReservacion').val(reservaciones[$(this).index()].id);
                    var fechaHoraInicio = reservaciones[$(this).index()].fechaHoraInicio;
                    var fechaHoraFin = reservaciones[$(this).index()].fechaHoraFin;
                    var fecha = fechaHoraInicio.split(' ');
                    var newfecha = fecha[0].split('/');
                    var horaFin = fechaHoraFin.split(' ');
                    $('#txtFecha').val(newfecha[2] + '-' + newfecha[1] + '-' + newfecha[0]);
                    $('#txtHorarioInicio').val(fecha[1]);
                    $('#txtHorarioFin').val(horaFin[1]);
                    $('#txtIdClienteReservacion').val(reservaciones[$(this).index()].cliente.id);
                    $('#txtIdSalaReservacion').val(reservaciones[$(this).index()].sala.id);
                    $('#chbEstatusReservacion').val(reservaciones[$(this).index()].estatus);
                    $('#txtNumeroUnicoCliente').val(reservaciones[$(this).index()].cliente.numeroUnico);
                });

            }
    );
}

function cargarSalaReservacion() {
    $.ajax({
        type: "GET",
        url: "../rssala/getAllSala",
        async: true
    }).done(
            function (salas)
            {
                var str = '';
                for (var i = 0; i < salas.length; i++)
                    str += '<tr>' +
                            '<td>' + salas[i].id + '</td>' +
                            '<td>' + salas[i].nombre + '</td>' +
                            '<td>' + salas[i].descripcion + '</td>' +
                            '<td>' + salas[i].sucursal.nombre + '</td>' +
                            '</tr>';
                $('#tbSalasReservacion').html(str);
                $('#tbSalasReservacion').find('tr').click(function ()
                {
                    $('#txtIdSalaReservacion').val(salas[$(this).index()].id);
                    if ($('#txtIdSalaReservacion').val.length > 0) {
                        swal('Sala Seleccionada', '', 'success');
                        $("#divModalSalaReservaciones").modal('hide');
                    } else {
                        swal('No se selecciono la sala', '', 'warning');
                    }
                });
            }
    );
}
function cargarHorariosReservacion() {
    alert($('#txtFecha').val());
    $.ajax({
        type: "POST",
        url: "../rshorario/getAllHorarioWithoutUsed",
        async: true,
        data: {
            idSala: $('#txtIdSalaReservacion').val(),
            fecha: $('#txtFecha').val()
        }
    }).done(
            function (horarios)
            {
                var str = '';
                for (var i = 0; i < horarios.length; i++)
                    str += '<tr>' +
                            '<td>' + horarios[i].id + '</td>' +
                            '<td>' + horarios[i].horaInicio + '</td>' +
                            '<td>' + horarios[i].horaFin + '</td>' +
                            '</tr>';
                $('#tbHorariosReservacion').html(str);
                $('#tbHorariosReservacion').find('tr').click(function ()
                {
                    $('#txtHorarioInicio').val(horarios[$(this).index()].horaInicio);
                    $('#txtHorarioFin').val(horarios[$(this).index()].horaFin);
                    $('#txtIdHorarioReservacion').val(horarios[$(this).index()].id);
                    if ($('#txtIdHorarioReservacion').val.length > 0) {
                        swal('Horario Selecionado', '', 'success');
                        $("#divModalHorarioReservaciones").modal('hide');
                    } else {
                        swal('No se selecciono el Horario', '', 'warning');
                    }
                });
            }
    );
}

function cargarClienteReservacion() {
    $.ajax({
        type: "GET",
        url: "../rscliente/getAllCliente",
        async: true
    }).done(
            function (clientes)
            {
                var str = '';
                for (var i = 0; i < clientes.length; i++)
                    str += '<tr>' +
                            '<td>' + clientes[i].id + '</td>' +
                            '<td>' + clientes[i].persona.nombre +
                            ' ' + clientes[i].persona.apellidoPaterno +
                            ' ' + clientes[i].persona.apellidoMaterno + '</td>' +
                            '<td>' + clientes[i].persona.genero + '</td>' +
                            '<td>' + clientes[i].persona.domicilio + '</td>' +
                            '<td>' + clientes[i].persona.telefono + '</td>' +
                            '<td>' + clientes[i].persona.rfc + '</td>' +
                            '<td>' + clientes[i].numeroUnico + '</td>' +
                            '<td>' + clientes[i].correo + '</td>' +
                            '</tr>';
                $('#tbClientesReservacion').html(str);
                $('#tbClientesReservacion').find('tr').click(function ()
                {
                    $('#txtIdClienteReservacion').val(clientes[$(this).index()].id);
                    $('#txtNumeroUnicoCliente').val(clientes[$(this).index()].numeroUnico);
                    $('#txtNombreCliente').val(clientes[$(this).index()].persona.nombre);
                    if ($('#txtIdClienteReservacion').val.length > 0) {
                        swal('Cliente Seleccionado', '', 'success');
                        $("#divModalClienteReservaciones").modal('hide');
                    } else {
                        swal('No se selecciono el Cliente', '', 'warning');
                    }
                }
                );
            }
    );
}

function guardarReservacion() {

    $.ajax({
        type: "POST",
        asyn: true,
        url: '../rsreservacion/insertReservacion',
        data: {
            fechaHoraInicio: $('#txtFecha').val() + ' ' + $('#txtHorarioInicio').val(),
            fechaHoraFin: $('#txtFecha').val() + ' ' + $('#txtHorarioFin').val(),
            idCliente: $('#txtIdClienteReservacion').val(),
            idSala: $('#txtIdSalaReservacion').val(),
            idHorario: $('#txtIdHorarioReservacion').val()
        }
    }).done(function (data)
    {
        if (data.error != null) {
            swal("Error", data.error, 'warning');
            return;
        }
        actualizarTablaReservacion();
        $('#txtIdReservacion').val(data.result);
        swal('Realizado', 'Hecho', 'success');
    }
    );
}
function eliminarReservacion() {

    $.ajax({
        type: "POST",
        asyn: true,
        url: '../rsreservacion/deleteReservacion',
        data: {
            idReservacion: $('#txtIdReservacion').val()
//            fechaHoraInicio: $('#txtFecha').val()+' '+$('#txtHorarioInicio').val(), 
//            fechaHoraFin: $('#txtFecha').val()+' '+$('#txtHorarioFin').val(),
//            idCliente: $('#txtIdClienteReservacion').val(),
//            idSala: $('#txtIdSalaReservacion').val()
        }
    }).done(function (data)
    {
        if (data.error != null) {
            swal("Error", data.error, 'warning');
            return;
        }
        actualizarTablaReservacion();
        $('#txtIdReservacion').val(data.result);
        swal('Realizado', 'Hecho', 'success');
    }
    );
}

function limpiarReservacion() {
    $('#txtIdReservacion').val('');
    $('#txtHorarioInicio').val('');
    $('#txtHorarioFin').val('');
    $('#txtIdClienteReservacion').val('');
    $('#txtIdSalaReservacion').val('');
    $('#txtFecha').val('');
}

function actualizarTablaReservacion() {
    $.ajax({
        type: "GET",
        url: "../rsreservacion/getAllReservacion",
        async: true
    }).done(
            function (reservaciones)
            {
                var str = '';
                for (var i = 0; i < reservaciones.length; i++)
                    str += '<tr>' +
                            '<td>' + reservaciones[i].id + '</td>' +
                            '<td>' + reservaciones[i].cliente.id + '</td>' +
                            '<td>' + reservaciones[i].cliente.numeroUnico + '</td>' +
                            '<td>' + reservaciones[i].fechaHoraInicio + '</td>' +
                            '<td>' + reservaciones[i].fechaHoraFin + '</td>' +
                            '<td>' + reservaciones[i].sala.nombre + '</td>' +
                            '<td>' + reservaciones[i].estatus + '</td>' +
                            '</tr>';
                $('#tbReservacion').html(str);
                $('#tbReservacion').find('tr').click(function ()
                {
                    //this en esta funcion es el renglon
                    //seleccionado por el usuario                                                            
                    $('#txtIdReservacion').val(reservaciones[$(this).index()].id);
                    var fechaHoraInicio = reservaciones[$(this).index()].fechaHoraInicio;
                    var fechaHoraFin = reservaciones[$(this).index()].fechaHoraFin;
                    var fecha = fechaHoraInicio.split(' ');
                    var newfecha = fecha[0].split('/');
                    var horaFin = fechaHoraFin.split(' ');
                    $('#txtFecha').val(newfecha[2] + '-' + newfecha[1] + '-' + newfecha[0]);
                    $('#txtHorarioInicio').val(fecha[1]);
                    $('#txtHorarioFin').val(horaFin[1]);
                    $('#txtIdClienteReservacion').val(reservaciones[$(this).index()].cliente.id);
                    $('#txtIdSalaReservacion').val(reservaciones[$(this).index()].sala.id);
                    $('#chbEstatusReservacion').val(reservaciones[$(this).index()].estatus);
                    $('#txtNumeroUnicoCliente').val(reservaciones[$(this).index()].cliente.numeroUnico);
                });

            }

    );
}

function cargarModuloServicio() {
    $.ajax(
            {type: "GET",
                url: "servicio/catalogo.html",
                async: true
            }
    ).done(
            function (data) {
                $('#divMainContainer').html(data);
            }
    );

}

function cargarReservacionServicio() {
    $.ajax({
        type: "GET",
        url: "../rsreservacion/getAllReservacion",
        async: true
    }).done(
            function (reservaciones)
            {
                var str = '';
                for (var i = 0; i < reservaciones.length; i++)
                    str += '<tr>' +
                            '<td>' + reservaciones[i].id + '</td>' +
                            '<td>' + reservaciones[i].cliente.persona.nombre + '</td>' +
                            '<td>' + reservaciones[i].fechaHoraInicio + '</td>' +
                            '<td>' + reservaciones[i].fechaHoraFin + '</td>' +
                            '<td>' + reservaciones[i].sala.nombre + '</td>' +
                            '</tr>';
                $('#tbReservacionesServicio').html(str);
                $('#tbReservacionesServicio').find('tr').click(function ()
                {
                    $('#txtIdReservacionServicio').val(reservaciones[$(this).index()].id);
                    if ($('#txtIdReservacionServicio').val.length > 0) {
                        swal('Reservación Seleccionada', '', 'success');
                        $("#divModalReservacionServicio").modal('hide');
                    } else {
                        swal('No se selecciono la Reservación', '', 'warning');
                    }
                });
            }
    );
}

function cargarEmpleadoServicio() {
    $.ajax({
        type: "GET",
        url: "../rsempleado/getAllEmpleado",
        async: true
    }).done(
            function (empleados)
            {
                var str = '';
                for (var i = 0; i < empleados.length; i++)
                    str += '<tr>' +
                            '<td>' + empleados[i].id + '</td>' +
                            '<td>' + empleados[i].persona.nombre + " " + empleados[i].persona.apellidoPaterno + '</td>' +
                            '</tr>';
                $('#tbEmpleadosServicio').html(str);
                $('#tbEmpleadosServicio').find('tr').click(function ()
                {
                    $('#txtIdEmpleadoServicio').val(empleados[$(this).index()].id);
                    if ($('#txtIdEmpleadoServicio').val.length > 0) {
                        swal('Empleado Seleccionada', '', 'success');
                        $("#divModalEmpleadoServicio").modal('hide');
                    } else {
                        swal('No se selecciono la Reservación', '', 'warning');
                    }
                });
            }
    );
}

function productoSetVisible(idTratamiento, valor) {

    if (valor) {
        $('#divTratamiento').removeClass('col-sm-8');
        $('#divTratamiento').addClass('col-sm-4');
        $('#divProductosTratamientos').show();
        if (tratamientoId === 0) {
            mostrarProductosServicio();
            tratamientoId = idTratamiento;
        } else {
            tratamientoId = idTratamiento;
            mostrarProductosServicio();
        }
    } else {
        $('#divTratamiento').removeClass('col-sm-4');
        $('#divTratamiento').addClass('col-sm-8');
        $('#divProductosTratamientos').hide();

    }
}

//esta funcion realiza lo mismo que la de actualizarTablaProductosServicio
//pero además estoy tratando de implementar la elinación de tratamientos de la tabla
//lo cual ya viste que complica las cosas y que muestra que algo esta mal desde el principio
var str2 = '';
var str3 = '';
var strProductoServicio = '';
function actualizarTablaTratamientoServicio() {
    $.ajax({
        type: "GET",
        url: "../rstratamiento/getAllTratamiento",
        async: true
    }).done(
            function (tratamientos)
            {
                var str1 = '';
                for (var i = 0; i < tratamientos.length; i++)
                    str1 +=
                            '<tr id="'+ tratamientos.id +'">' +
                            '<td>' + tratamientos[i].id + '</td>' +
                            '<td>' + tratamientos[i].nombre + '</td>' +
                            '<td>' + tratamientos[i].descripcion + '</td>' +
                            '<td id="'+ tratamientos[i].id +'"></td>' +
                            '</tr>';
                $('#tblTratamientosServicio').html(str1);
                $('#tblTratamientosServicio').find('tr').click(function ()
                {
                    str2 += '<tr >' + tratamientos[$(this).index()].id + '">' +
                            '<td>' + tratamientos[$(this).index()].id + '</td>' +
                            '<td>' + tratamientos[$(this).index()].nombre + '</td>' + 
                            '<td id="'+ tratamientos[$(this).index()].id +'">'+ + '</td>' +
                            '<td> <button class="btn btn-circle btn-outline-primary btn-sm" onclick="productoSetVisible( ' + tratamientos[$(this).index()].id + ' , ' + true + ')">Detalles</button></td>' +
                            '<td> <button class="btn btn-circle btn-outline-primary btn-sm" id="borrar" onclick="eliminarTratamiento(' + tratamientos[$(this).index()].id + ')">Eliminar</button></td>' +
                            '</tr>';
                    $('#tbTratamientosServicio').html(str2);
                    $('#divModalTratamientosServicio').modal('hide');
                    });
            }
    );
    //funcion interesante que permite eliminar un tr de una tabla
    //              evento clic cuando el objeto clickeado tenga el id borrar

}
function eliminarTratamiento(idTratamientoEliminado) {
    alert(idTratamientoEliminado);
    str2 = '';
    $(document).on('click', '#borrar', function (event) {
        event.preventDefault();
        $(this).closest('tr').remove();
        str2 = $('#tbTratamientosServicio').html();
    });
    if (JSONTratamientoString.length > 0) {
        for (var i = 0; i < JSONTratamiento.length; i++) {
            if (JSONTratamiento[i].id === idTratamientoEliminado) {
                var tratamientoEliminado = JSONTratamiento.splice(i, 1);
                alert(tratamientoEliminado);
                alert(JSONTratamiento);
                var string = JSON.stringify(JSONTratamiento);
                alert(string);
            }
        }
    }
}

//carga la informacion para la tabla de productos del modal
//y agrega el listener a la tabla del modal para agregar el producto seleccionado 
//a la tabla de productos tratamiento,
//aqui strProductoServicio es global
function actualizarTablaProductosServicio() {
    $.ajax({
        type: "GET",
        url: "../rsproducto/getAllProducto",
        async: true
    }).done(
            function (productos)
            {
                $("#tbProductosServicio").empty();
                var str1 = '';
                for (var i = 0; i < productos.length; i++)
                    str1 += '<tr>' +
                            '<td>' + productos[i].nombre + '</td>' +
                            '<td>' + productos[i].marca + '</td>' +
                            '<td>' + productos[i].precioUso + '</td>' +
                            '</tr>';
                $('#tblProductosServicio').html(str1);
                $('#tblProductosServicio').find('tr').click(function ()
                {
                    strProductoServicio += '<tr>' +
                            '<td>' + productos[$(this).index()].id + '</td>' +
                            '<td>' + productos[$(this).index()].nombre + '</td>' +
                            '<td>' + productos[$(this).index()].precioUso + '</td>' +
                            '<td> <button class="btn btn-circle btn-outline-primary btn-sm" id="borrar" onclick="eliminarProducto(' + productos[$(this).index()].id + ' , ' + tratamientoId + ' )">Eliminar</button></td>' +
                            '</tr>';
                    $('#tbProductosServicio').html(strProductoServicio);
                    $('#divModalProductosServicio').modal('hide');
                    //Funciones para treeTable
                    //$("#treeTableTratamientosServicio").treetable({});
//                    if(num === 2){
//                    $("#treeTableTratamientosServicio").treetable({force : true, expandable: true, clickableNodeNames :true});                     
//                }else{
//                    $("#treeTableTratamientosServicio").treetable({force : true});
//                }                
                });
            });

}
function eliminarProducto(idProducto, idTratamientoProductoEliminado) {
    alert(idProducto);
    $(document).on('click', '#borrar', function (event) {
        event.preventDefault();
        $(this).closest('tr').remove();

        strProductoServicio = '';
        strProductoServicio = $('#tbProductosServicio').html();

    });
    if (JSONTratamientoString.length > 0) {
        
        for (var i = 0; i < JSONTratamiento.length; i++) {
           
            for (var j = 0; j < JSONTratamiento[i].productos.length; j++) {
               
                if (JSONTratamiento[i].id === idTratamientoProductoEliminado && JSONTratamiento[i].productos[j].id === idProducto) {
                    
                    var productoEliminado = JSONTratamiento[i].productos.splice(j, 1);
                    alert(productoEliminado);
                    alert(JSONTratamiento);
                    var string = JSON.stringify(JSONTratamiento);
                    alert(string);
                }
            }
        }
    }
}
//Esta función mostrará solo los productos que se han elegido para el tratamiento seleccionado
function mostrarProductosServicio() {
    $("#tbProductosServicio").empty();
    //vaciamos la variable global que guarda los datos de la tabla de productos
    strProductoServicio = '';
    for (var i = 0; i < JSONTratamiento.length; i++)
        if (JSONTratamiento[i].id === tratamientoId) {
            for (var j = 0; j < JSONTratamiento[i].productos.length; j++)
                strProductoServicio += '<tr>' +
                        '<td>' + JSONTratamiento[i].productos[j].id + '</td>' +
                        '<td>' + JSONTratamiento[i].productos[j].nombre + '</td>' +
                        '<td>' + JSONTratamiento[i].productos[j].precio + '</td>' +
                        '<td> <button class="btn btn-circle btn-outline-primary btn-sm" id="borrar" onclick="eliminarProducto(' + JSONTratamiento[i].productos[j].id + ' , ' + tratamientoId + ' )">Eliminar</button></td>' +
                        '</tr>';
            $('#tbProductosServicio').html(strProductoServicio);
           
        }
//    $('btnGuardarProductos').remove();
//        $('#divTablaProductos').
//            append($('<button>').
//                    attr("class", "text-center btn btn-success btn-sm").
//                    attr("type", "button").
//                    attr("id", "btnGuardarProductos").
//                    attr("onclick", "eliminarTratamientoGuardar()").
//                    attr("style", "float : right").
//                    text("Guardar")
//                    );
}

function guardarProductosTratamiento() {
    var productos = new Array();
    var idProducto;
    var nombreProducto;
    var precioProducto;    
    precio = 0.0;
    if (JSONTratamientoString.length > 0) {
        for (var i = 0; i < JSONTratamiento.length; i++) {
            if (JSONTratamiento[i].id === tratamientoId) {
                var tratamientoEliminado = JSONTratamiento.splice(i, 1);
                alert(tratamientoEliminado);
                alert(JSONTratamiento);
                var string = JSON.stringify(JSONTratamiento);
                alert(string);
            }
        }
    }
    
    $(function () {
        $("#tbProductosServicio tr").each(function (index) {
            $(this).children("td").each(function (index2) {
                switch (index2) {
                    case 0:
                        idProducto = parseInt($(this).text());
                        break;
                    case 1:
                        nombreProducto = $(this).text();
                        break;
                    case 2:                                    
                        precioProducto = parseFloat($(this).text());
                        break;
                }
            });
            //se crea un objeto de productos y luego se agrega a un array de productos
            var producto = new Object();
            producto.id = idProducto;
            producto.nombre = nombreProducto;
            producto.precio = precioProducto;
            productos.push(producto);
            precio += precioProducto;
        });
        //Se crea un objeto y se le agregan las propiedades
        var tratamientoArray = new Object();
        tratamientoArray.id = tratamientoId;
        tratamientoArray.productos = productos;
        //agrego el objeto creado a un array
        tratamientos.push(tratamientoArray);
        //agrego el array a otro objeto, el cual termina siendo por asi decirce el JSONFINAL    
        JSONTratamiento = tratamientos;
        //el objeto JSONTratamiento (o "JSON FINAL") lo paso a string para ver que este bien
        alert("para ver" + JSONTratamientoString.length);
        JSONTratamientoString = JSON.stringify(JSONTratamiento);
        alert(JSONTratamientoString);
        //verifico que el objeto JSON este bien formado (debe de salir en el alert que contiene un object)
        alert(JSONTratamiento);
        //alert("el precio"  + precio);
        str2 = '';
        $('#'+tratamientoId+'').text(''+precio);                        
        
        
        str2 += $('#tbTratamientosServicio').html();
       // $('#tbTratamientosServicio tr').eq(1).find('td').eq(3).text(precio);
    });
}

function guardarServicio() {
    var s = JSON.stringify(JSONTratamiento);
    alert("je " + s);
    var tratamientos = new Array();
    var objetoFinal = new Object();
    var arrayFinal = new Array();
    var JSONServicioFinal = new Object();
    for (var i = 0; i < JSONTratamiento.length; i++) {
        tratamientos.push(JSONTratamiento[i]);
    }

    objetoFinal.reservacion = parseInt($('#txtIdReservacionServicio').val());
    objetoFinal.empleado = parseInt($('#txtIdEmpleadoServicio').val());
    objetoFinal.fecha = $('#txtFechaServicio').val();
    objetoFinal.tratamientos = tratamientos;
    arrayFinal.push(objetoFinal);

    JSONServicioFinal = arrayFinal;
    var JSONServicioFinalString = JSON.stringify(JSONServicioFinal);
    alert(JSONServicioFinalString);
    
    $.ajax({
        type: "POST",
        asyn: true,
        url: '../rsservicio/insertServicio',
        data: {
            JSONServicio: JSONServicioFinal
        }
    }).done(function (data)
    {
        if (data.error !== null) {
            swal("Error", data.error, 'warning');
            return;
        }
        actualizarTablaReservacion();
        $('#txtIdServicio').val(data.result);
        swal('Realizado', 'Hecho', 'success');
    }
    );
    
}

function realizarAccionesGuardar() {

    guardarProductosTratamiento();
    productoSetVisible(false, 0);
}

