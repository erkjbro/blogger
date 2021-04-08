import { useState } from 'react';

import { Modal, Notification } from '../../shared/components/UIKit';
import './Sandbox.scss';

const Sandbox = () => {
  const [showModal, setShowModal] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const handleModalHide = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

  const handleNotificationHide = () => setShowNotification(false);
  const handleNotificationShow = () => setShowNotification(true);

  return (
    <>
      <Modal
        show={showModal}
        onCancel={handleModalHide}
        header="Sandbox - Modal Demo"
      >
        Sandbox modal content.
      </Modal>
      <Notification
        show={showNotification}
        onCancel={handleNotificationHide}
      >
        Sandbox notification content.
      </Notification>
      <div className="sandbox">
        <h1>Sandbox Page</h1>
        <p>This page is primarily used for testing UIKit components.</p>
        <div className="sandbox__modal">
          <button onClick={handleModalShow}>
            Show Modal
          </button>
        </div>
        <div className="sandbox__notification">
          <button onClick={handleNotificationShow}>
            Show Notification
          </button>
        </div>
      </div>
    </>
  );
};

export default Sandbox;
