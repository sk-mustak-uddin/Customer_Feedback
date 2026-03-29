import { useState } from 'react';
import axios from 'axios';
import { Send, AlertCircle } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const FeedbackForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    product: '',
    feedback: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${API_URL}/feedback`, formData);
      onSuccess(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to submit feedback. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name" className="form-label">Full Name</label>
        <input
          type="text"
          id="name"
          name="name"
          className="form-input"
          placeholder="John Doe"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="email" className="form-label">Email Address</label>
        <input
          type="email"
          id="email"
          name="email"
          className="form-input"
          placeholder="john@example.com"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="product" className="form-label">Product / Service</label>
        <input
          type="text"
          id="product"
          name="product"
          className="form-input"
          placeholder="What did you use?"
          value={formData.product}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="feedback" className="form-label">Your Feedback</label>
        <textarea
          id="feedback"
          name="feedback"
          className="form-textarea"
          placeholder="Tell us what you loved, or what we can improve..."
          value={formData.feedback}
          onChange={handleChange}
          required
        />
      </div>

      {error && (
        <div className="error-message">
          <AlertCircle size={18} />
          {error}
        </div>
      )}

      <button type="submit" className="submit-btn" disabled={loading}>
        {loading ? (
          <>
            <div className="loader"></div>
            Analyzing...
          </>
        ) : (
          <>
            <Send size={20} />
            Submit Feedback
          </>
        )}
      </button>
    </form>
  );
};

export default FeedbackForm;
