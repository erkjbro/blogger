import { createPortal } from 'react-dom';

import './Backdrop.scss';

const Backdrop = (props) => (
  createPortal(
    <div className="backdrop" onClick={props.onClick} />,
    document.getElementById('backdrop-hook')
  )
);

export default Backdrop;
