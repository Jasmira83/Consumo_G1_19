var UrlGetFacturas = 'http://34.68.196.220:90/G1_19/Facturas/controller/facturas.php?op=GetFacturas';
var UrlPostFacturas = 'http://34.68.196.220:90/G1_19/Facturas/controller/facturas.php?op=InsertFacturas'
var UrlDeleteFacturas = 'http://34.68.196.220:90/G1_19/Facturas/controller/facturas.php?op=DeleteFacturas'
var UrlPutFacturas = 'http://34.68.196.220:90/G1_19/Facturas/controller/facturas.php?op=UpdateFacturas'
var UrlGetUnoFacturas = 'http://34.68.196.220:90/G1_19/Facturas/controller/facturas.php?op=GetUno'
$(document).ready(function(){
    CargarFacturas();
});

function CargarFacturas(){
    $.ajax({
        url: UrlGetFacturas,
        type: 'GET',
        datatype: 'JSON',
        success: function(response){
            var MiItems = response;
            var Valores ='';

            for(i=0; i < MiItems.length; i++){
                Valores += '<tr>'+
                '<td>'+ MiItems[i].ID+'</td>'+
                '<td>'+ MiItems[i].NUMERO_FACTURA+'</td>'+
                '<td>'+ MiItems[i].ID_SOCIO+'</td>'+
                '<td>'+ MiItems[i].FECHA_FACTURA+'</td>'+
                '<td>'+ MiItems[i].DETALLE+'</td>'+
                '<td>'+ MiItems[i].SUB_TOTAL+'</td>'+
                '<td>'+ MiItems[i].TOTAL_ISV+'</td>'+
                '<td>'+ MiItems[i].TOTAL+'</td>'+
                '<td>'+ MiItems[i].FECHA_VENCIMIENTO+'</td>'+
                '<td>'+ MiItems[i].ESTADO+'</td>'+    
                '<td>'+
                '<button class="btn btn-warning" onclick="CargarFactura('+MiItems[i].ID +')">Actualizar</button>'+
                '<button class="btn btn-danger" onclick="EliminarFactura('+MiItems[i].ID +')">Eliminar</button>'+
                '</td>'+            
            '</tr>';
            $('.facturas').html(Valores);
                
            }   
                          
        }
        
    })
}

function AgregarFacturas(){
    var datosfacturas = {
     ID:$('#ID').val(),
     NUMERO_FACTURA:$('#NUMERO_FACTURA').val(),
     ID_SOCIO:$('#ID_SOCIO').val(),
     FECHA_FACTURA:$('#FECHA_FACTURA').val(),
     DETALLE:$('#DETALLE').val(),
     SUB_TOTAL:$('#SUB_TOTAL').val(),
     TOTAL_ISV:$('#TOTAL_ISV').val(),
     TOTAL:$('#TOTAL').val(),
     FECHA_VENCIMIENTO:$('#FECHA_VENCIMIENTO').val(),
     ESTADO:$('#ESTADO').val(),
    };

    var datosfacturasjson = JSON.stringify(datosfacturas);

    $.ajax({
        url:UrlPostFacturas,
        type: 'POST',
        data: datosfacturasjson,
        datatype: 'JSON',
        contenType: 'application/json',
        success: function(response){
            console.log(response)                 
         }         
         
    });
    alert("Factura Agregada");  

}

function CargarFactura(idfactura){
    var datosfactura ={
        ID: idfactura
    };
    var datosfacturajson= JSON.stringify(datosfactura);

    $.ajax({
        url: UrlGetUnoFacturas,
        type: 'POST',
        data: datosfacturajson,
        datatype: 'JSON',
        contentType: 'applicatopn/json',
        success: function(response){
            var MiItems = response;
            $('#ID').val(MiItems[0].ID);
            $('#NUMERO_FACTURA').val(MiItems[0].NUMERO_FACTURA);
            $('#ID_SOCIO').val(MiItems[0].ID_SOCIO);
            $('#FECHA_FACTURA').val(MiItems[0].FECHA_FACTURA);
            $('#DETALLE').val(MiItems[0].DETALLE);
            $('#SUB_TOTAL').val(MiItems[0].SUB_TOTAL);
            $('#TOTAL_ISV').val(MiItems[0].TOTAL_ISV);
            $('#TOTAL').val(MiItems[0].TOTAL);
            $('#FECHA_VENCIMIENTO').val(MiItems[0].FECHA_VENCIMIENTO);
            $('#ESTADO').val(MiItems[0].ESTADO);
            
            var btnactualizar = '<input type="submit" id="btn_actualizar" onclick="ActualizarFactura('+MiItems[0]+')" value="Actualizar Factura" class="btn btn-primary"></input>';
            $('.button').html(btnactualizar);
        }
    });
}

function ActualizarFactura(idfactura){
    var datosfactura = {
        ID:idfactura,
        ID: $('#ID').val(),
        NUMERO_FACTURA: $('#NUMERO_FACTURA').val(),
        ID_SOCIO: $('#ID_SOCIO').val(),
        FECHA_FACTURA: $('#FECHA_FACTURA').val(),
        DETALLE: $('#DETALLE').val(),
        SUB_TOTAL: $('#SUB_TOTAL').val(),
        TOTAL_ISV:$('#TOTAL_ISV').val(),
        TOTAL: $('#TOTAL').val(),
        FECHA_VENCIMIENTO: $('#FECHA_VENCIMIENTO').val(),
        ESTADO: $('#ESTADO').val()
    };
    var datosfacturajson= JSON.stringify(datosfactura);

    $.ajax({
        url: UrlPutFacturas,
        type: 'PUT',
        data:datosfacturajson,
        datatype: 'JSON',
        contenType: 'application/json',
        success: function(response){
            console.log(response);
        }
    });
    alert("Factura Actualizada");
}

function EliminarFactura(idfactura){
    var datosfactura={
        ID:idfactura
    };
    var datosfacturajson=JSON.stringify(datosfactura);

    $.ajax({
        url:UrlDeleteFacturas,
        type: 'DELETE',
        data:datosfacturajson,
        datatype: 'JSON',
        contenType: 'application/json',
        success: function(response){
            console.log(response);
        }
    });
    alert("Factura Eliminada");
}
