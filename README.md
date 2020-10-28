# CLIENT
### Instalation:

### Adding new mutations or queries:
In order for mutations and queries to be properly typed, we will be using GraphQL Code Generator with apollo

1. add your .graphql mutation or query to the src/graphql folder (make sure to use aliases)
2. in your client folder - run "yarn gen"
3. this will add or replace the generated folder and allow correct apollo graphql typing in app
4. when using this generated file refer the the hooks it creates

# SERVER