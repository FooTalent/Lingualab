import Modal from '../../components/Modal';
import logo from '/Popup_SeGuardoExitosamente.png'

const SuccessModal = ({ isOpen, onClose }) => (
  <Modal isOpen={isOpen} onClose={onClose} title="">
    <div className="flex flex-col items-center justify-center py-4">
      <img src={logo} alt="Éxito" className="" />
      <button
        className="mt-4 bg-purple-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={onClose}
      >
        Cerrar
      </button>
    </div>
  </Modal>
);

export default SuccessModal;
