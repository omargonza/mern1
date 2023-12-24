export function Button({ onClick, children }) {
  return (
    <button
    style={{
      width: '100%',
      padding: '8px 16px',
      backgroundColor: 'darkgray',
      color: '#585857',
      borderRadius: '4px',
      cursor: 'pointer',
      marginBottom: '8px',
      border:'none',
      outline: 'none',
      transition: 'background-color 0.3s',
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      textDecoration: 'none'
    }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
