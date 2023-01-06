import { GoogleAuth, GoogleAuthOptions, UserRefreshClient } from 'google-auth-library';
import { Gmail } from 'googleapis';

// Replace these values with your own
const clientId = 'your_client_id';
const clientSecret = 'your_client_secret';
const redirectUrl = 'your_redirect_url';

// Create the GoogleAuth object
const auth = new GoogleAuth({
    clientId,
    clientSecret,
    redirectUrl
});

// Authenticate with the Gmail API
auth.authorize((err, result) => {
    if (err) {
        console.error(err);
        return;
    }

    const client = auth.createUserRefreshClient();
    const gmail = new Gmail({ auth: client });

    // Read the email addresses from the CSV file
    const emailAddresses = [];
    // TODO: Read the email addresses from the CSV file and store them in the emailAddresses array

    // Send the emails
    for (const email of emailAddresses) {
        const subject = 'Hello World';
        const body = 'Hello World';
        const message = `Subject: ${subject}\n\n${body}`;
        const encodedMessage = Buffer.from(message).toString('base64').replace(/\+/g, '-').replace(/\//g, '_');

        const request = {
            userId: 'me',
            resource: {
                raw: encodedMessage
            }
        };

        gmail.users.messages.send(request, (error, res) => {
            if (error) {
                console.error(error);
                return;
            }

            console.log(`Email sent to ${email}`);
        });
    }
});
