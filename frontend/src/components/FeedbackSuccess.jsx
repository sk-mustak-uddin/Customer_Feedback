import { CheckCircle2 } from 'lucide-react';

const FeedbackSuccess = ({ result, onReset }) => {
  return (
    <div className="success-container">
      <div className="success-icon-wrapper">
        <CheckCircle2 size={48} />
      </div>
      
      <h2 style={{ margin: '0 0 1rem', fontSize: '1.5rem' }}>Thank You!</h2>
      <p style={{ color: 'var(--text-muted)', margin: '0 0 1.5rem' }}>
        {result?.message || 'Your feedback has been successfully submitted.'}
      </p>

      {result?.sentiment && (
        <div>
          <p style={{ fontSize: '0.875rem', marginBottom: '0.25rem', color: 'var(--text-muted)' }}>AI Sentiment Analysis</p>
          <span className={`sentiment-badge sentiment-${result.sentiment}`}>
            {result.sentiment}
          </span>
        </div>
      )}

      <button onClick={onReset} className="reset-btn">
        Submit Another Response
      </button>
    </div>
  );
};

export default FeedbackSuccess;
