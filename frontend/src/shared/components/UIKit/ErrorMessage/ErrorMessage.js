
import './ErrorMessage.scss';

export const ErrorMessage = (props) => {
  const { message, onClick } = props;

  return (
    <div
      onClick={onClick}
      className="error__message"
    >
      <h1>
        {message}
      </h1>
    </div>
  );
};
