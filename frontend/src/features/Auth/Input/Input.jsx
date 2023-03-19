import './Input.css';

function Input({ name, type, placeholder, color, width }) {
  return (
    <div className="group">
      <input
        style={{ color: color, width: width }}
        type={type}
        className="group__input"
        required
        name={name}
        placeholder={placeholder}
      />
    </div>
  );
}

export default Input;
