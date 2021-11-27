var UrlGetPedidos='http://34.68.196.220:90/G1_19/Pedidos/controller/pedidos.php?op=GetPedidos';
var UrlPostPedido='http://34.68.196.220:90/G1_19/Pedidos/controller/pedidos.php?op=InsertPedidos';
var UrlGetPedido='http://34.68.196.220:90/G1_19/Pedidos/controller/pedidos.php?op=GetUno';
var UrlPutPedido='http://34.68.196.220:90/G1_19/Pedidos/controller/pedidos.php?op=UpdatePedidos';
var UrlDeletePedido='http://34.68.196.220:90/G1_19/Pedidos/controller/pedidos.php?op=DeletePedidos';


$(document).ready(function(){
    CargarPedidos();
});

function CargarPedidos() {
    $.ajax({
        url: UrlGetPedidos,
        type: 'GET',
        datatype: 'JSON',
        success: function(response){
            var MiItems = response;
            var valores ='';

            for(i=0; i< MiItems.length; i++){
                valores += '<tr>'+
                '<td>'+MiItems[i].ID+'</td>'+
                '<td>'+MiItems[i].ID_SOCIO+'</td>'+
                '<td>'+MiItems[i].FECHA_PEDIDO+'</td>'+
                '<td>'+MiItems[i].DETALLE+'</td>'+
                '<td>'+MiItems[i].SUB_TOTAL+'</td>'+
                '<td>'+MiItems[i].TOTAL_ISV +'</td>'+
                '<td>'+MiItems[i].TOTAL+'</td>'+
                '<td>'+MiItems[i].FECHA_ENTREGA+'</td>'+
                '<td>'+MiItems[i].ESTADO+'</td>'+
                '<td>'+
                '<button class="btn btn-warning" onclick="CargarPedido(' + MiItems[i].ID + ')">Actualizar</button>' +
                '<button class="btn btn-danger" onclick="EliminarPedido(' + MiItems[i].ID + ')">Eliminar</button>' +
                '</td>'+
            '</tr>';
            $('.Pedidos').html(valores);
            }
        }
    })
}

function AgregarPedido(){
    var datospedido = {
        ID:$('#ID').val(),
        ID_SOCIO:$('#ID_SOCIO').val(),
        FECHA_PEDIDO:$('#FECHA_PEDIDO').val(),
        DETALLE:$('#DETALLE').val(),
        SUB_TOTAL:$('#SUB_TOTAL').val(),
        TOTAL_ISV:$('#TOTAL_ISV').val(),
        TOTAL:$('#TOTAL').val(),
        FECHA_ENTREGA:$('#FECHA_ENTREGA').val(),
        ESTADO:$('#ESTADO').val()
    };
    var datospedidojson = JSON.stringify(datospedido);

    $.ajax({
        url: UrlPostPedido,
        type: 'POST',
        data: datospedidojson,
        datatype: 'JSON',
        contenType: 'application/json',
        success: function (response){
            console.log(response)
        }
    });
    alert("Pedido Agregado");
}

function CargarPedido(IDpedido){
    var datospedido = {
        ID: IDpedido
    };
    var datospedidojson = JSON.stringify(datospedido);

    $.ajax({
        url: UrlGetPedido,
        type: 'POST',
        data:datospedidojson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function (response) {
            var MiItems = response;
            $('#ID').val(MiItems[0].ID);
            $('#ID_SOCIO').val(MiItems[0].ID_SOCIO);
            $('#FECHA_PEDIDO').val(MiItems[0].FECHA_PEDIDO);
            $('#DETALLE').val(MiItems[0].DETALLE);
            $('#SUB_TOTAL').val(MiItems[0].SUB_TOTAL);
            $('#TOTAL_ISV').val(MiItems[0].TOTAL_ISV);
            $('#TOTAL').val(MiItems[0].TOTAL);
            $('#FECHA_ENTREGA').val(MiItems[0].FECHA_ENTREGA);
            $('#ESTADO').val(MiItems[0].ESTADO);
            var btnactualizar = '<input type="submit" id="btnactualizar" onclick="ActualizarPedido(' + MiItems[0].ID + ')" value="Actualizar Pedido" class="btn btn-primary"></input>';
            $('.button').html(btnactualizar);
        }
    });
}

function ActualizarPedido(IDpedido){
    var datospedido = {
        ID: IDpedido,
        ID:$('#ID').val(),
        ID_SOCIO:$('#ID_SOCIO').val(),
        FECHA_PEDIDO:$('#FECHA_PEDIDO').val(),
        DETALLE:$('#DETALLE').val(),
        SUB_TOTAL:$('#SUB_TOTAL').val(),
        TOTAL_ISV:$('#TOTAL_ISV').val(),
        TOTAL:$('#TOTAL').val(),
        FECHA_ENTREGA:$('#FECHA_ENTREGA').val(),
        ESTADO:$('#ESTADO').val()
    };
    var datospedidojson = JSON.stringify(datospedido);

    $.ajax({
        url: UrlPutPedido,
        type: 'PUT',
        data: datospedidojson,
        datatype: 'JSON',
        contenType: 'application/json',
        success: function (response) {
            console.log(response);
        }
    });
    alert("Pedido Actualizado");
}

function EliminarPedido(IDpedido){
    var datospedido = {
        ID: IDpedido
    };
    var datospedidojson = JSON.stringify(datospedido);

    $.ajax({
        url: UrlDeletePedido,
        type: 'DELETE',
        data: datospedidojson,
        datatype: 'JSON',
        contenType: 'application/json',
        success: function (response) {
            console.log(response);
        }
    });
    alert("Pedido Eliminado");
}
