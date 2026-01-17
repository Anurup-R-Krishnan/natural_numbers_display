import React, { useState } from 'react';

function App() {
  const [count, setCount] = useState('');
  const [numbers, setNumbers] = useState([]);
  const [error, setError] = useState('');
  const [displayMode, setDisplayMode] = useState('grid'); // 'grid', 'list', 'sum'

  const generateNumbers = () => {
    setError('');
    setNumbers([]);
    
    const num = parseInt(count);
    
    if (isNaN(num)) {
      setError('Please enter a valid number');
      return;
    }
    
    if (num <= 0) {
      setError('Please enter a positive number');
      return;
    }
    
    if (num > 1000) {
      setError('Please enter a number less than or equal to 1000');
      return;
    }
    
    const naturalNumbers = Array.from({ length: num }, (_, i) => i + 1);
    setNumbers(naturalNumbers);
  };

  const calculateSum = () => {
    return numbers.reduce((sum, num) => sum + num, 0);
  };

  const getColorForNumber = (num) => {
    const colors = [
      '#667eea', '#764ba2', '#f093fb', '#f5576c',
      '#4facfe', '#00f2fe', '#43e97b', '#38f9d7',
      '#fa709a', '#fee140', '#a8edea', '#fed6e3'
    ];
    return colors[num % colors.length];
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        background: 'white',
        borderRadius: '20px',
        padding: '40px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
      }}>
        <h1 style={{
          textAlign: 'center',
          color: '#667eea',
          marginBottom: '10px',
          fontSize: '36px'
        }}>
          Natural Numbers Generator
        </h1>
        <p style={{
          textAlign: 'center',
          color: '#666',
          marginBottom: '30px',
          fontSize: '16px'
        }}>
          Display the first N natural numbers
        </p>

        <div style={{
          maxWidth: '500px',
          margin: '0 auto 30px'
        }}>
          <div style={{
            display: 'flex',
            gap: '10px',
            marginBottom: '20px'
          }}>
            <input
              type="number"
              value={count}
              onChange={(e) => setCount(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && generateNumbers()}
              placeholder="Enter N (max 1000)"
              style={{
                flex: 1,
                padding: '15px',
                fontSize: '16px',
                border: '2px solid #ddd',
                borderRadius: '10px',
                boxSizing: 'border-box'
              }}
            />
            <button
              onClick={generateNumbers}
              style={{
                padding: '15px 30px',
                fontSize: '16px',
                fontWeight: 'bold',
                color: 'white',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer',
                transition: 'transform 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            >
              Generate
            </button>
          </div>

          {error && (
            <div style={{
              padding: '15px',
              background: '#fee',
              border: '1px solid #fcc',
              borderRadius: '8px',
              color: '#c33',
              textAlign: 'center'
            }}>
              {error}
            </div>
          )}
        </div>

        {numbers.length > 0 && (
          <>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '10px',
              marginBottom: '25px',
              flexWrap: 'wrap'
            }}>
              <button
                onClick={() => setDisplayMode('grid')}
                style={{
                  padding: '10px 20px',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  color: displayMode === 'grid' ? 'white' : '#667eea',
                  background: displayMode === 'grid' ? '#667eea' : 'white',
                  border: '2px solid #667eea',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                Grid View
              </button>
              <button
                onClick={() => setDisplayMode('list')}
                style={{
                  padding: '10px 20px',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  color: displayMode === 'list' ? 'white' : '#667eea',
                  background: displayMode === 'list' ? '#667eea' : 'white',
                  border: '2px solid #667eea',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                List View
              </button>
              <button
                onClick={() => setDisplayMode('sum')}
                style={{
                  padding: '10px 20px',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  color: displayMode === 'sum' ? 'white' : '#667eea',
                  background: displayMode === 'sum' ? '#667eea' : 'white',
                  border: '2px solid #667eea',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                Statistics
              </button>
            </div>

            {displayMode === 'grid' && (
              <div style={{
                padding: '20px',
                background: '#f8f9fa',
                borderRadius: '12px',
                marginBottom: '20px'
              }}>
                <h3 style={{ marginTop: 0, color: '#333', marginBottom: '20px' }}>
                  First {numbers.length} Natural Numbers:
                </h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(60px, 1fr))',
                  gap: '10px'
                }}>
                  {numbers.map((num) => (
                    <div
                      key={num}
                      style={{
                        padding: '15px',
                        background: getColorForNumber(num),
                        color: 'white',
                        borderRadius: '10px',
                        textAlign: 'center',
                        fontSize: '20px',
                        fontWeight: 'bold',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                        transition: 'transform 0.2s',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                      onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                    >
                      {num}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {displayMode === 'list' && (
              <div style={{
                padding: '20px',
                background: '#f8f9fa',
                borderRadius: '12px',
                marginBottom: '20px'
              }}>
                <h3 style={{ marginTop: 0, color: '#333', marginBottom: '15px' }}>
                  List Format:
                </h3>
                <div style={{
                  fontSize: '18px',
                  color: '#555',
                  lineHeight: '2',
                  maxHeight: '400px',
                  overflowY: 'auto',
                  padding: '15px',
                  background: 'white',
                  borderRadius: '8px'
                }}>
                  {numbers.join(', ')}
                </div>
              </div>
            )}

            {displayMode === 'sum' && (
              <div style={{
                padding: '30px',
                background: '#f8f9fa',
                borderRadius: '12px',
                marginBottom: '20px'
              }}>
                <h3 style={{ marginTop: 0, color: '#333', marginBottom: '25px' }}>
                  Statistics:
                </h3>
                
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '20px'
                }}>
                  <div style={{
                    padding: '20px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    borderRadius: '12px',
                    color: 'white',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '14px', marginBottom: '8px', opacity: 0.9 }}>
                      Count
                    </div>
                    <div style={{ fontSize: '32px', fontWeight: 'bold' }}>
                      {numbers.length}
                    </div>
                  </div>

                  <div style={{
                    padding: '20px',
                    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                    borderRadius: '12px',
                    color: 'white',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '14px', marginBottom: '8px', opacity: 0.9 }}>
                      Sum
                    </div>
                    <div style={{ fontSize: '32px', fontWeight: 'bold' }}>
                      {calculateSum()}
                    </div>
                  </div>

                  <div style={{
                    padding: '20px',
                    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                    borderRadius: '12px',
                    color: 'white',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '14px', marginBottom: '8px', opacity: 0.9 }}>
                      Average
                    </div>
                    <div style={{ fontSize: '32px', fontWeight: 'bold' }}>
                      {(calculateSum() / numbers.length).toFixed(2)}
                    </div>
                  </div>

                  <div style={{
                    padding: '20px',
                    background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                    borderRadius: '12px',
                    color: 'white',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '14px', marginBottom: '8px', opacity: 0.9 }}>
                      Last Number
                    </div>
                    <div style={{ fontSize: '32px', fontWeight: 'bold' }}>
                      {numbers[numbers.length - 1]}
                    </div>
                  </div>
                </div>

                <div style={{
                  marginTop: '25px',
                  padding: '20px',
                  background: 'white',
                  borderRadius: '10px'
                }}>
                  <h4 style={{ marginTop: 0, color: '#333' }}>Formula for Sum:</h4>
                  <p style={{ fontSize: '18px', color: '#555', margin: '10px 0' }}>
                    Sum = n × (n + 1) / 2
                  </p>
                  <p style={{ fontSize: '16px', color: '#666', margin: '10px 0' }}>
                    Where n = {numbers.length}
                  </p>
                  <p style={{ fontSize: '16px', color: '#666', margin: '10px 0' }}>
                    Sum = {numbers.length} × {numbers.length + 1} / 2 = <strong>{calculateSum()}</strong>
                  </p>
                </div>
              </div>
            )}

            <div style={{
              padding: '15px',
              background: '#e3f2fd',
              borderRadius: '8px',
              fontSize: '14px',
              color: '#555',
              textAlign: 'center'
            }}>
              <strong>Natural Numbers:</strong> Positive integers starting from 1, 2, 3, 4, 5, ...
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;