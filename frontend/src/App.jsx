import { useState } from 'react'
import FeedbackForm from './components/FeedbackForm'
import FeedbackSuccess from './components/FeedbackSuccess'

function App() {
  const [submissionResult, setSubmissionResult] = useState(null)

  const handleSuccess = (data) => {
    setSubmissionResult(data)
  }

  const handleReset = () => {
    setSubmissionResult(null)
  }

  return (
    <div className="app-container">
      <div className="glass-panel">
        <div className="header">
          <h1 className="title">Customer Experience</h1>
          <p className="subtitle">We value your opinion and use it to improve.</p>
        </div>
        
        {!submissionResult ? (
          <FeedbackForm onSuccess={handleSuccess} />
        ) : (
          <FeedbackSuccess 
            result={submissionResult} 
            onReset={handleReset} 
          />
        )}
      </div>
    </div>
  )
}

export default App
