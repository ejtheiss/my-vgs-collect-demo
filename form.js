const vgsForm = window.VGSCollect.create(
  'tntjhqlhdyl',
  'sandbox', 
  (state) => {}).setRouteId('9fc47b21-c74b-463b-9875-d8515a33e052');

const css = {
  boxSizing: 'border-box',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI"',
  color: '#000000',
  '&::placeholder': {
    color: '#bcbcbc'
  }
};

const cardHolder = vgsForm.field('#cc-holder', {
  type: 'text',
  name: 'card_holder',
  placeholder: 'John Doe',
  validations: ['required'],
  css: css,
  });

const cardNumber = vgsForm.field('#cc-number', {
  type: 'card-number',
  name: 'card_number',
  placeholder: '4111 1111 1111 1111',
  showCardIcon: true,
  validations: ['required', 'validCardNumber'],
  css: css,
  });

const cardSecurityCode = vgsForm.field('#cc-cvc', {
  type: 'card-security-code',
  name: 'card_cvc',
  placeholder: '123',
  showCardIcon: true,
  validations: ['required', 'validCardSecurityCode'],
  css: css,
  });

const cardExpDate = vgsForm.field('#cc-expiration-date', {
  type: 'card-expiration-date',
  name: 'card_exp',
  placeholder: 'MM / YY',
  validations: ['required', 'validCardExpirationDate'],
  css: css,
  });

const submitVGSCollectForm = () => {
  const submitButton = document.querySelector('#vgs-collect-form button[type="submit"]');
  
  // Change button text to "Processing..."
  submitButton.textContent = 'Processing...';
  submitButton.disabled = true; // Disable button to prevent multiple submissions

  vgsForm.submit('/post', {}, (status, data) => {
    if (status >= 200 && status <= 300) {
      console.log('Tokenized data received:', data); // Log tokenized card info

      // Change button text to "Complete"
      submitButton.textContent = 'Complete';
      submitButton.disabled = true; // Keep button disabled after success

      // Optional: Reset button after a few seconds
      setTimeout(() => {
        submitButton.textContent = 'Submit';
        submitButton.disabled = false;
      }, 3000); // Reset after 3 seconds
    } else if (!status) {
      console.error('Network Error occurred');
      displayErrorMessage('Network error occurred. Please try again.');

      // Reset button text
      submitButton.textContent = 'Submit';
      submitButton.disabled = false;
    } else {
      console.error('Server Error:', status, data);
      displayErrorMessage('Server error. Please try again later.');

      // Reset button text
      submitButton.textContent = 'Submit';
      submitButton.disabled = false;
    }
  }, (validationError) => {
    console.error('Validation Error:', validationError);
    displayErrorMessage('Validation failed. Please check your inputs.');

    // Reset button text
    submitButton.textContent = 'Submit';
    submitButton.disabled = false;
  });
};
}

document.getElementById('vgs-collect-form').addEventListener('submit', (e) => {
  e.preventDefault();
  submitVGSCollectForm();
});
