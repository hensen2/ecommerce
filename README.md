### Environment
- NodeJS v20.14+
- App server runs on port 5252
- Vite dev server runs on port 4242

### Checkout testing details
- Card number: 4242 4242 4242 4242
- Expires: 12/34
- Security code: 123
- Zip: 12345

Note: Without an active stripe webhook listening, the completed cart sessions 
won't clear out correctly following checkout success. To simulate a user checkout
process again, you will need to clear cart session cookie (sid) from browser.

### Instructions to run app in development mode
1. Clone this repository code to your local device.
2. Open a terminal and navigate to the project directory
3. Run the command "cd backend" to move into the backend directory
4. Install the backend packages using "npm i"
5. Start the server by running "npm run dev"
6. Without closing the first terminal, open a second terminal and navigate to the project directory again
7. Run the command "cd frontend" to move into the frontend directory
8. Install the frontend packages using "npm i"
9. Start the app by running "npm run dev"
10. Navigate in your browser to http://localhost:4242/
11. Enter card details listed above to test checkout
