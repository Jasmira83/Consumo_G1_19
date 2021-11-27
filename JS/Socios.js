var URLGetSocios = 'http://34.68.196.220:90/G1_19/Socios/controller/socios_negocio.php?op=GetSocios_negocio';
var URLPostSocio = 'http://34.68.196.220:90/G1_19/Socios/controller/socios_negocio.php?op=InsertSocio_negocio';
var URLGetUno = 'http://34.68.196.220:90/G1_19/Socios/controller/socios_negocio.php?op=GetUno';
var URLPutSocio = 'http://34.68.196.220:90/G1_19/Socios/controller/socios_negocio.php?op=UpdateSocio_negocio';
var URLDEL = 'http://34.68.196.220:90/G1_19/Socios/controller/socios_negocio.php?op=DeleteSocio_negocio';

$(document).ready(function(){
    cargarsocios();
});

function cargarsocios(){
    $.ajax({
        url: URLGetSocios,
        type: 'GET',
        datatype: 'JSON',
        success: function(response){
            var MiItems = response;
            var Valores ='';

            for(i=0; i< MiItems.length; i++){
                Valores += '<tr>'+
                '<td>'+ MiItems[i].ID+'</td>'+
                '<td>'+MiItems[i].NOMBRE+'</td>'+
                '<td>'+MiItems[i].RAZON_SOCIAL+'</td>'+
                '<td>'+MiItems[i].DIRECCION+'</td>'+
                '<td>'+MiItems[i].TIPO_SOCIO+'</td>'+
                '<td>'+MiItems[i].CONTACTO+'</td>'+
                '<td>'+MiItems[i].EMAIL+'</td>'+
                '<td>'+MiItems[i].FECHA_CREADO+'</td>'+
                '<td>'+MiItems[i].ESTADO+'</td>'+
                '<td>'+MiItems[i].TELEFONO+'</td>'+
                '<td>'+
                '<button class="btn btn-warning" onclick="CargarSocio('+MiItems[i].ID+')">Editar</button>'+
                '<button class="btn btn-danger" onclick="EliminarSocio('+MiItems[i].ID+')">Eliminar</button>'+
                '</td>'+
            '</tr>';
            $('.Socios').html(Valores);
            }


            

        }
    })
}

function AgregarSocio(){
    var datosSocio = {
     ID:$('#ID').val(),
     NOMBRE:$('#NOMBRE').val(),
     RAZON_SOCIAL:$('#RAZON_SOCIAL').val(),
     DIRECCION:$('#DIRECCION').val(),
     TIPO_SOCIO:$('#TIPO_SOCIO').val(),
     CONTACTO:$('#CONTACTO').val(),
     EMAIL:$('#EMAIL').val(),
     FECHA_CREADO:$('#FECHA_CREADO').val(),
     ESTADO:$('#ESTADO').val(),
     TELEFONO:$('#TELEFONO').val()
    };
     var datossociosjson = JSON.stringify(datosSocio);

     $.ajax({
         url: URLPostSocio,
         type: 'POST',
         data: datossociosjson,
         datatype: 'JSON',
         contentype: 'application/json',
         success: function(response){
             console.log(response)
            }
        });
        alert("Socio Agregado");

}

function CargarSocio(IDsocio) { 
    var datossocio = { 
        ID: IDsocio
    };
    var datossociosjson= JSON.stringify(datossocio);

    $.ajax({
        url: URLGetUno,
        type: 'POST',
        data:datossociosjson,
        datatype:'JSON',
        contentype: 'application/json',
        success: function(response){ 
            var MiItems = response;
            $('#ID').val(MiItems[0].ID);
            $('#NOMBRE').val(MiItems[0].NOMBRE);
            $('#RAZON_SOCIAL').val(MiItems[0].RAZON_SOCIAL);
            $('#DIRECCION').val(MiItems[0].DIRECCION);
            $('#TIPO_SOCIO').val(MiItems[0].TIPO_SOCIO);
            $('#CONTACTO').val(MiItems[0].CONTACTO);
            $('#EMAIL').val(MiItems[0].EMAIL);
            $('#FECHA_CREADO').val(MiItems[0].FECHA_CREADO);
            $('#ESTADO').val(MiItems[0].ESTADO);
            $('#TELEFONO').val(MiItems[0].TELEFONO);
            var btnactualizar = '<input type="submit" id="btn_actualizar" onclick="ActualizarSocio(' + MiItems[0].ID +')" value="Actualizar Socio" class="btn btn-outline-warning"></input>';
            $('.button').html(btnactualizar);
        }
     });
}

function ActualizarSocio(IDsocio){ 
    var datosSocio = {
        ID: IDsocio,
        ID:$('#ID').val(),
        NOMBRE:$('#NOMBRE').val(),
        RAZON_SOCIAL:$('#RAZON_SOCIAL').val(),
        DIRECCION:$('#DIRECCION').val(),
        TIPO_SOCIO:$('#TIPO_SOCIO').val(),
        CONTACTO:$('#CONTACTO').val(),
        EMAIL:$('#EMAIL').val(),
        FECHA_CREADO:$('#FECHA_CREADO').val(),
        ESTADO:$('#ESTADO').val(),
        TELEFONO:$('#TELEFONO').val()
    };
    var datossociosjson = JSON.stringify(datosSocio);

    $.ajax({
        url: URLPutSocio,
        type: 'PUT',
        data: datossociosjson,
        datatype: 'JSON',
        contentype: 'application/json',
        success: function(response){ 
            console.log(response);

        }
    });
   alert("Socio Actualizado");
}

function EliminarSocio(IDsocio){
    var datossocio = { 
        ID: IDsocio
    };
    var datossociosjson= JSON.stringify(datossocio);

    $.ajax({
        url: URLDEL,
        type: 'DELETE',
        data: datossociosjson,
        datatype: 'JSON',
        contentype: 'application/json',
        success: function(response){ 
            console.log(response);

        }
    });
    alert("Socio Eliminado");
    
 
}