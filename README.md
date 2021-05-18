# Google oAuth 2.0 and Emailing system

## End points :

1.  http://localhost:5000/ root path
2.  http://localhost:5000/oauth/google is google auth endpoint
3.  http:localhost:5000/oauth/google/redirect is redirect url
4.  http://localhost:5000/users/mail is for mailing to the users

    It takes the **following structured json request body** for emailing to all of registered users

    `{ "to": "destination@mail.com", "subject": "the important subject", "text": "a long long text body to send to the mail" }`
