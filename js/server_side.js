
$(document).ready(function() {

    // var fila captura la fila para editar o eliminar un registro

    var idpersona, fila, opcion;

    var tbl_personas = $('#tbl_personas').DataTable({
        "processing": true,
        "serverSide": true,
        "sAjaxSource": "data/personas.php",
        "columnDefs":[{
            "targets": -1,
            "defaultContent": `
                <div class='wrapper'>
                    <button class='btn btn-sm btn-primary edit-data'><i class="fa-solid fa-pen"></i></button>
                    <button class='btn btn-sm btn-danger delete-data'><i class="fa-solid fa-trash-can"></i></button>
                </div>`
        }],
        "responsive": true,
        "paging": true,
        "lengthChange": true,
        "searching": true,
        "ordering": true,
        "info": true,
        "autoWidth": false,
        "language":
        {
            "emptyTable":           "No hay datos disponibles en la tabla.",
            "info":                 "Del _START_ al _END_ de _TOTAL_",
            "infoEmpty":            "Mostrando 0 registros de un total de 0.",
            "infoFiltered":         "(filtrados de un total de _MAX_ registros)",
            "infoPostFix":          " ",
            "lengthMenu":           "Mostrar &nbsp; _MENU_",
            "loadingRecords":       "Cargando...",
            "processing":           "Procesando...",
            "search":               "Buscar:",
            "searchPlaceholder":    "Dato para buscar",
            "zeroRecords":          "No se han encontrado coincidencias.",
            "paginate":
            {
                "first":            "Primera",
                "last":             "Última",
                "next":             "Siguiente",
                "previous":         "Anterior"
            },
            "aria":
            {
                "sortAscending":    "Ordenación ascendente",
                "sortDescending":   "Ordenación descendente"
            }
        },
        "lengthMenu": [[5, 10, 20, 25, 50], [5, 10, 20, 25, 50]]
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