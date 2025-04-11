import React, { useEffect, useState } from 'react';

const PaymentPage = () => {
  const [amount, setAmount] = useState('');
  const [loanId, setLoanId] = useState('');
  const [paid, setPaid] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const addPaypalScript = async () => {
      if (!amount || parseFloat(amount) <= 0) return;

      if (window.paypal) {
        document.getElementById("paypal-button-container").innerHTML = "";
      }

      const script = document.createElement('script');
      script.src = `https://www.paypal.com/sdk/js?client-id=AT6cEuvCs3CNySti9MYvJV6QpNntX_SHcO75_2n1vYuxQ7h83DJ104_l7tQv5-BJ2CopYWlqHPTcGPep&currency=USD`;
      script.async = true;
      script.onload = () => {
        window.paypal.Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [{
                amount: { value: parseFloat(amount).toFixed(2) }
              }]
            });
          },
          onApprove: async (data, actions) => {
            const details = await actions.order.capture();
            const orderId = data.orderID;
            setPaid(true);
            setMessage('Payment successful!');
            try {
              const response = await fetch('http://localhost:8080/api/loans/payment/process', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ loanId, amount, orderId }),
              });
              const resText = await response.text();
              setMessage(resText);
            } catch (error) {
              setMessage('Payment success, but backend update failed.');
            }
          }
        }).render('#paypal-button-container');
      };
      document.body.appendChild(script);
    };

    addPaypalScript();
  }, [amount]);

  const containerStyle = {
    maxWidth: '450px',
    margin: '40px auto',
    padding: '30px',
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 15px',
    margin: '10px 0',
    borderRadius: '10px',
    border: '1px solid #ccc',
    fontSize: '16px',
    boxSizing: 'border-box',
  };

  const titleStyle = {
    fontSize: '24px',
    fontWeight: '600',
    marginBottom: '20px',
    color: '#333',
  };

  const messageStyle = {
    marginTop: '20px',
    fontWeight: '500',
    color: paid ? 'green' : 'red',
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Pay Loan Installment</h2>
      <input
        type="text"
        placeholder="Enter Loan ID"
        value={loanId}
        onChange={(e) => setLoanId(e.target.value)}
        style={inputStyle}
      />
      <input
        type="number"
        placeholder="Enter Amount in USD"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={inputStyle}
      />
      <div id="paypal-button-container" style={{ marginTop: '30px' }}></div>
      {message && <p style={messageStyle}>{message}</p>}
    </div>
  );
};

export default PaymentPage;
