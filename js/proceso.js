
form = document.getElementById('form');

form.addEventListener('submit', (e) => {
	e.preventDefault();

	let arr_data = new FormData(form);

	arr_data.append('add', true);

	fetch('data/proceso.php',{
		method: 'POST',
		body: arr_data
	})
	.then(res => res.json())
	.then(data => {
		if(data) {
			Swal.fire({
				icon: 'success',
				title: 'Exito',
				text: 'Mensaje guardado',
				confirmButtonText: `Aceptar`
			});
		} else {
			Swal.fire({
				icon: 'error',
				title: 'Error',
				text: 'No se pudo guardar el mensaje',
				confirmButtonText: `Aceptar`
			});
		}

		form.reset();
	});
});