# CLIENT

### Instalation:

### Adding new mutations or queries:

In order for mutations and queries to be properly typed, we will be using GraphQL Code Generator with apollo

1. add your .graphql mutation or query to the src/graphql folder (make sure to use aliases)
2. in your client folder - run "yarn gen"
3. this will add or replace the generated folder and allow correct apollo graphql typing in app
4. when using this generated file refer the the hooks it creates eg: "useRegisterMutation()"

# SERVER

1. go into src/index.ts and uncomment the sendEmail() call
   1. if it console.logs the send then you are all good
   2. if it errors then the nodemailer test account is probably expired in which case:
      1. uncomment lines that create test email and console log the info
      2. replace the auth section of transporter with newly created data

### Seeding Database
1. go into your graphql endpoint and create 5 users
   ```
   mutation register {
   register(
      options: {
         username: "steven"
         email: "stevenmchenry01@gmail.com"
         password: "123123"
      } 
   ) {
      user {
         id
         createdAt
         username
         email
      }
      errors {
         field
         message
      }
   }
   }
   ```
   - make sure their ids range from 1-5

2. run mutation... (TODO)
