$(document).ready(function() {

    var idpersona, fila, opcion;

    opcion = 2;

    $('#clean_form').click(()=>{
        document.getElementById("form_person").reset();
    });

    var tbl_personas = $('#tbl_personas').DataTable({
        "ajax":{
            "url": "data/proceso.php",
            "method": 'POST',
            "data": { opcion: opcion },
            "dataSrc": ""
        },
        "columns":[
            {"data": "idpersona"},
            {"data": "nombres"},
            {"data": "apellidos"},
            {"data": "telefono"},
            {
                "defaultContent":
                    `<div class='text-center'>
                        <div class='btn-group'>
                            <button class='btn btn-primary btn-sm edit-data'>
                                <i class='material-icons'>edit</i>
                            </button>
                            <button class='btn btn-danger btn-sm delete-data'>
                                <i class='material-icons'>delete</i>
                            </button>
                        </div>
                    </div>`
            }
        ]
    });

    $('#exe').click(()=>{
        var arr_data = new FormData();

        arr_data.append('insert_rand', true);

        fetch('data/proceso.php',{
            method: 'POST',
            body: arr_data
        })
        .then(res => res.json())
        .then(data => {
            if(data) {
                Swal.fire('Exito', 'persona registrada exitosamente', 'success').then(()=>{ tbl_personas.ajax.reload(null, false); });
            }else {
                Swal.fire('Error', 'Hubo un error al registrar la persona', 'error');
            }
        });
    });

    //submit para el Alta y Actualización

    var form_person = document.getElementById('form_person');

    form_person.addEventListener('submit', (e) => {
        e.preventDefault();

        let arr_data = new FormData(form_person);

        arr_data.append('opcion', opcion);
        arr_data.append('idpersona', idpersona);

        fetch('data/proceso.php', {
            method: 'POST',
            body: arr_data
        })
        .then(res => res.json())
        .then(data => {
            if (data) {
                let mnsj = (opcion == 3) ? 'Registro actualizado' : 'Persona registrada';

                Swal.fire({
                    icon: 'success',
                    title: mnsj,
                    confirmButtonText: `Aceptar`
                })
                .then(() => {
                    tbl_personas.ajax.reload(null, false);
                });
            }else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Hemos tenido problemas para actualizar este registro, por favor intenta nuevamente.',
                    confirmButtonText: `Aceptar`
                });
            }
        }).then(()=>{
            form_person.reset();
            $('#modal_person').modal('hide');
        });

    });

    //para limpiar los campos antes de dar de Alta una Persona

    $("#modal_form").click(() => {
        opcion = 1; //alta
        idpersona = null;

        $(".modal-header").css("background-color", "#343a40");
        $(".modal-title").text("Nueva persona");
    });

    //Evento de edición

    $(document).on("click", ".edit-data", function(){
        opcion = 3;

        fila = $(this).closest("tr");

        idpersona = parseInt(fila.find('td:eq(0)').text()); //capturo el ID
        nombres = fila.find('td:eq(1)').text();
        apellidos = fila.find('td:eq(2)').text();
        telefono = fila.find('td:eq(3)').text();

        $("#nombres").val(nombres);
        $("#apellidos").val(apellidos);
        $("#telefono").val(telefono);

        $(".modal-header").css("background-color", "#138496");
        $(".modal-title").text("Editar Usuario");

        $('#modal_person').modal('show');
    });

    //Borrar
    $(document).on("click", ".delete-data", function(){
        fila = $(this);

        idpersona = parseInt($(this).closest('tr').find('td:eq(0)').text()) ;

        opcion = 4;

        Swal.fire({
            icon: 'warning',
            title: 'Eliminar registro',
            html: `¿Está seguro de borrar el registro <strong>N°${idpersona}</strong>?`,
            showCancelButton: true,
            confirmButtonText: 'Borrar',
            cancelButtonText: `Cancelar`,
        }).then((result) => {
            if (result.isConfirmed) {
                let arr_data = new FormData();

                arr_data.append('opcion', opcion);
                arr_data.append('idpersona', idpersona);

                fetch('data/proceso.php', {
                    method: 'POST',
                    body: arr_data
                })
                .then(res => res.json())
                .then(data => {
                    if (data) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Registro eliminado',
                            confirmButtonText: `Aceptar`
                        })
                        .then(() => {
                            tbl_personas.row(fila.parents('tr')).remove().draw();
                        });
                    }else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Hemos tenido problemas para eliminar este registro, por favor intenta nuevamente.',
                            confirmButtonText: `Aceptar`
                        });
                    }
                });
            }else{
                Swal.fire('Acción cancelada', '', 'info')
            }
        });
    });

});