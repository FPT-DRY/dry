import { ToastContainer, ToastContainerProps } from 'react-toastify';

function Toast({
  hideProgressBar = true,
  draggable = false,
  pauseOnHover = false,
  ...toastProps
}: ToastContainerProps) {
  return (
    <ToastContainer
      hideProgressBar={hideProgressBar}
      draggable={draggable}
      pauseOnHover={pauseOnHover}
      {...toastProps}
    />
  );
}

export default Toast;
