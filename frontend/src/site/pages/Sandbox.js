import { useState } from 'react';

import { Modal, Notification } from '../../shared/components/UIKit';
import { Button } from '../../shared/components/UIKit/FormElements';
import './Sandbox.scss';

let realModal = {
  header: 'Sandbox Modal Header',
  content: 'Sandbox Modal Content'
};

let realNotification = "Sandbox Notification";

const Sandbox = () => {
  const [showModal, setShowModal] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const [modal, setModal] = useState({ header: '', content: '' });
  const [notification, setNotification] = useState('');

  const handleModalHide = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

  const handleNotificationHide = () => setShowNotification(false);
  const handleNotificationShow = () => setShowNotification(true);

  const handleModalSubmit = (event) => {
    event.preventDefault();
    realModal = { ...modal };
  };

  const handleNotificationSubmit = (event) => {
    event.preventDefault();
    realNotification = notification;
  }

  return (
    <>
      <Modal
        show={showModal}
        onCancel={handleModalHide}
        header={realModal.header}
      >
        {realModal.content}
      </Modal>
      <Notification
        show={showNotification}
        onCancel={handleNotificationHide}
      >
        {realNotification}
      </Notification>
      <div className="sandbox">
        <h1>Sandbox Page</h1>
        <p>This page is primarily used for testing UIKit components.</p>
        <hr />

        <h2>Modal Testing</h2>
        <div className="sandbox__modal">
          <Button
            className="sandbox__modal--button"
            onClick={handleModalShow}
          >
            Show Modal
          </Button>

          <form onSubmit={handleModalSubmit}>
            <label>
              Edit Modal's Header:
              <input
                placeholder="Modal header..."
                value={modal.header}
                onChange={(event) => setModal({
                  ...modal,
                  header: event.target.value
                })}
              />
            </label>

            <label>
              Edit Modal's Content:
              <textarea
                placeholder="Modal contents..."
                value={modal.content}
                onChange={(event) => setModal({
                  ...modal,
                  content: event.target.value
                })}
              />
            </label>

            <Button
              className="sandbox__modal--button"
              type="submit"
              inverse
            >
              Update Modal
            </Button>
          </form>
        </div>

        <h2>Notification Testing</h2>
        <div className="sandbox__notification">
          <Button
            className="sandbox__notification--button"
            onClick={handleNotificationShow}
          >
            Show Notification
          </Button>

          <form onSubmit={handleNotificationSubmit}>
            <label>
              Edit Notification Message:
              <input
                placeholder="Notification message..."
                value={notification}
                onChange={(event) => setNotification(event.target.value)}
              />
            </label>

            <Button
              className="sandbox__notification--button"
              type="submit"
              inverse
            >
              Update Notification
            </Button>
          </form>
        </div>

        <h2>Button Testing</h2>
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
      </div>
    </>
  );
};

export default Sandbox;
