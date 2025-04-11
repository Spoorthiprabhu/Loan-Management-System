import axios from 'axios';

// Function to get PayPal Access Token
const getAccessToken = async () => {
  const clientId = 'AT6cEuvCs3CNySti9MYvJV6QpNntX_SHcO75_2n1vYuxQ7h83DJ104_l7tQv5-BJ2CopYWlqHPTcGPep';  // Replace with your actual PayPal Client ID
  const secret = 'EKjBvdxOnz0Ct0PVHRs8MIF_OvibOV-uTuI3x6_x2aS0lZd6hrKYstTQvW4aOkM05HhNUnHGRLZVB_TA';       // Replace with your actual PayPal Secret

  const auth = `Basic ${btoa(clientId + ':' + secret)}`;

  try {
    // Request PayPal to get the access token
    const response = await axios.post(
      'https://api.sandbox.paypal.com/v1/oauth2/token',  // Use sandbox URL for testing, live URL for production
      null,
      {
        headers: {
          'Authorization': auth,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        params: {
          'grant_type': 'client_credentials',
        }
      }
    );

    const accessToken = response.data.access_token;
    console.log('Access Token:', accessToken);  // Log the access token for debugging
    return accessToken;
  } catch (error) {
    console.error('Error fetching access token:', error);
    throw new Error('Failed to fetch access token');
  }
};

export default getAccessToken;
