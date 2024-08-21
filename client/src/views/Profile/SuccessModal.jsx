import Modal from '../../components/Modal';
import logo from '/Popup_SeGuardoExitosamente.png'

const SuccessModal = ({ isOpen }) => (
  <Modal isOpen={isOpen} title="" modalSize={'xsmall'}>
    <img src={logo} alt="Éxito" />
  </Modal>
);

export default SuccessModal;
