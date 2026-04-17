import Swal from 'sweetalert2';

const NotifAlert = ({ icon, title, message }) => {
    Swal.fire({
        icon: icon,
        title: title,
        text: message,
        showConfirmButton: false,
        position: 'center',
        timer: 3000,
        allowOutsideClick: false
    });
};

const NotifOk = ({ icon, title, message, confirmButtonText, onOk}) => {
    Swal.fire({
        icon: icon,
        title: title,
        text: message,
        confirmButtonText,
        confirmButtonColor: '#23A55A',
        allowOutsideClick: false
    }).then((result)=>{
        onOk();
    });
};

const NotifConfirmDialog = ({
    icon,
    title,
    message,
    onConfirm,
    onCancel,
    confirmButtonText = 'Hapus',
}) => {
    Swal.fire({
        icon: icon,
        title: title,
        text: message,
        showCancelButton: true,
        cancelButtonColor: '#23A55A',
        cancelButtonText: 'Batal',
        confirmButtonColor: '#d33000',
        confirmButtonText: confirmButtonText,
        reverseButtons: true,
        allowOutsideClick: false
    }).then((result) => {
        if (result.isConfirmed) {
            onConfirm();
        } else if (result.dismiss) {
            onCancel();
        }
    });
};

const NotifQuestion = ({ icon, title, message, confirmButtonText, onConfirm, onCancel }) => {
    Swal.fire({
        icon: icon,
        title: title,
        text: message,
        showCancelButton: true,
        cancelButtonColor: '#d33000',
        cancelButtonText: 'Batal',
        confirmButtonColor: '#23A55A',
        confirmButtonText: confirmButtonText,
        reverseButtons: true,
        allowOutsideClick: false,
    }).then((result) => {
        if (result.isConfirmed) {
            onConfirm();
        } else if (result.dismiss) {
            onCancel();
        }
    });
};

const QuestionConfirmSubmit = ({ icon, title, message, onConfirm, onCancel }) => {
    Swal.fire({
        icon: icon,
        title: title,
        text: message,
        showCancelButton: true,
        cancelButtonColor: '#d33000',
        cancelButtonText: 'Batal',
        confirmButtonColor: '#23A55A',
        confirmButtonText: 'Submit',
        reverseButtons: true,
        allowOutsideClick: false,
    }).then((result) => {
        if (result.isConfirmed) {
            onConfirm();
        } else if (result.dismiss) {
            onCancel();
        }
    });
};

const QuestionConfirmThree = ({
    icon,
    title,
    message,
    onConfirm,
    onDenied,
    onCancel = (e) => {},
}) => {
    Swal.fire({
        icon: icon,
        title: title,
        text: message,
        showCancelButton: true,
        // cancelButtonColor: '#d33000',
        cancelButtonText: 'Batal',
        confirmButtonColor: '#23A55A',
        confirmButtonText: 'Approve',
        showDenyButton: true,
        denyButtonText: `Reject`,
        denyButtonColor: `#d33000`,
        reverseButtons: true,
        allowOutsideClick: false,
    }).then((result) => {
        if (result.isConfirmed) {
            onConfirm();
        } else if (result.dismiss) {
            onCancel();
        } else if (result.isDenied) {
            onDenied();
        }
    });
};

const CancelConfirm = ({ icon, title, message, onConfirm, onCancel }) => {
    Swal.fire({
        icon: icon,
        title: title,
        text: message,
        showCancelButton: true,
        cancelButtonColor: '#d33000',
        cancelButtonText: 'Batal',
        confirmButtonColor: '#23A55A',
        confirmButtonText: 'Ya, Keluar',
        reverseButtons: true,
        allowOutsideClick: false,
    }).then((result) => {
        if (result.isConfirmed) {
            onConfirm();
        } else if (result.dismiss) {
            onCancel();
        }
    });
};

const NotifProgress = ({ title, timer }) => {
    Swal.fire({
        title: title,
        timer: timer,
        timerProgressBar: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        backdrop: true,
        allowOutsideClick: false,
        
        didOpen: () => {
            Swal.showLoading();
        },
        
        willClose: () => {
            // clearInterval(timerInterval);
        }
    }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
            NotifAlert({
                icon: 'success',
                title: 'Sukses',
                message: 'Login success, redirect to home.',
            });
        }
    });
};

export {
    NotifAlert,
    NotifOk,
    NotifConfirmDialog,
    NotifQuestion,
    QuestionConfirmSubmit,
    CancelConfirm,
    QuestionConfirmThree,
    NotifProgress
};
