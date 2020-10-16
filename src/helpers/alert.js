import swal from 'sweetalert';

export function showAlert(title, desc, type) {
  swal({
    title: title,
    text: desc,
    icon: type,
    button: 'Ok',
  });
}
