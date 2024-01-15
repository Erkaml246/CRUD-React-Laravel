

function Loading() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Memuat...</span>
        </div>
        <span style={{ marginTop: '1rem' }}>Tunggu Sebentar...</span>
      </div>
    );
  }
  
  export default Loading;
  