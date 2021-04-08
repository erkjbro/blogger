import { useState } from 'react';

import { Modal, Notification } from '../../shared/components/UIKit';
import { Button } from '../../shared/components/UIKit/FormElements';
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
        <hr />

        <div className="sandbox__modal">
          <Button onClick={handleModalShow}>
            Show Modal
          </Button>
        </div>
        <hr />

        <div className="sandbox__notification">
          <Button inverse onClick={handleNotificationShow}>
            Show Notification
          </Button>
        </div>
        <hr />

        <div className="sandbox__buttons">
          <span>
            <Button onClick={() => console.log("Default Clicked!")}>
              Default Button
            </Button>
          </span>
          <span>
            <Button inverse onClick={() => console.log("Inverse Clicked!")}>
              Inverse Button
            </Button>
          </span>
          <span>
            <Button danger onClick={() => console.log("Danger Clicked!")}>
              Danger Button
            </Button>
          </span>
          <span>
            <Button href="localhost:3000/">
              Anchor Button
            </Button>
          </span>
          <span>
            <Button inverse to="/blogs">
              Link Button
            </Button>
          </span>
        </div>
        <hr />
      </div>
    </>
  );
};

export default Sandbox;
