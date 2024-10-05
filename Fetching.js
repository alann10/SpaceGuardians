// Step 1: Make a POST request to the OAuth2 token endpoint to obtain the access token
fetch('https://api.spaceforce.sh/login/oauth/access-token', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
        'username': 'alice',
        'password': 'secret'
    })
})
    .then(response => response.json()) // Parse the JSON response
    .then(authData => {
        if (authData.access_token) {
            console.log('Access token received:', authData.access_token); // Print the access token

            // Step 2: Use the access token to check the status of the current user
            return fetch('https://api.spaceforce.sh/login/oauth/status', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${authData.access_token}` // Use the access token in the Authorization header
                }
            });
        } else {
            throw new Error('Failed to authenticate. No access token received.');
        }
    })
    .then(statusResponse => {
        if (!statusResponse.ok) {
            throw new Error('Failed to fetch user status');
        }
        return statusResponse.json(); // Parse the JSON from the status response
    })
    .then(userData => {
        console.log('Authenticated user information:', userData); // Display the user information
    })
    .catch(error => {
        console.error('Error:', error); // Handle errors
    });
