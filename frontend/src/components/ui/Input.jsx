export default function Input({ id, label, error, ...props }) {
    return (
        <div className="form-group">
            <label htmlFor={id} className="form-label">
                {label}
            </label>
            <input id={id} className="input" {...props} />
            {error && <p className="form-error">{error}</p>}
        </div>
    );
}
