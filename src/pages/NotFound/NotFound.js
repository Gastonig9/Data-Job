import "./NotFound.css"
const NotFound = () => {
  return (
    <div className="not-found-container">
      <img
        src="https://i.ibb.co/K6RXn5m/notfound.png"
        alt="Error 404"
        className="error-image"
      />
      <h1 className="error-title">404 Not Found</h1>
      <p className="error-message">
        La página que estás buscando no se encontró.
      </p>
    </div>
  );
};

export default NotFound;
