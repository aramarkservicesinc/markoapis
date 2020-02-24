**Suggested Workflow for Swagger2 to OAS3 Transition**

1. Update existing Swagger2 spec *before* converting to OAS3:

   1. *Remove* the apikey query parameter under each operation and replace it with the following in the top part of doc before the paths section.

      ```yaml
      schemes: # already exists, just here for context
      - https # already exists, just here for context
      securityDefinitions:
        apiKey:
          type: apiKey
          in: header
          name: apikey
          description: This HTTP Header variable will verify permissions.
      ```
      
     1. Use $refs for repeating parameters. **This is optional**

           1. *Add* repeating parameters section to spec before /paths.   

               ```yaml
               parameters:
                 bypassCacheParam:
                   in: header
                   name: bypass-cache
                   type: string
                   description: This HTTP Header variable will bypass cache.
                   enum: ['true','false']
                   default: false
                 smokeParam:
                   in: header
                   name: smoke
                   type: string
                   description: When set to 'true' this HTTP header variable will route the API call to the Integration testing environment.  Only applicable in QA.
                   default: false
               ```
               Notice how each param has a new param name (e.g. bypassCacheParm and smokeParam). These are the names used by $refs in the operations.

           1. *Remove* repeating parameters under each operation and add $refs.

               ```yaml
               parameters:
               #  - name: bypass-cache
               #    in: header
               #    type: string
               #    escription: This HTTP Header variable will bypass cache
               #    enum: ['true','false']
               #    default: false
               #  - name: smoke
               #    in: header
               #    type: string
               #    description: When set to 'true' this HTTP header variable will route the API call to the Integration testing environment.  Only applicable in QA.
               #    default: false
                 - $ref: '#/parameters/bypassCacheParam'
                 - $ref: '#parameters/smokeParam'
               ```

    1. Save the updated Swagger2 spec to markoapis repo at swgr2/yaml.
   
1. Convert *updated* Swagger2 spec to OAS3 (in yaml format)
    1. Sign in to [SwaggerHub](https://app.swaggerhub.com/login)
    1. Click "Create new => Import and Document API"
    1. Click "Browse" and select the updated Swagger2 doc you just saved. (You must select "public" in the visibility field. After converting to OAS3 and pasting it to a new yaml file  delete the spec from SwaggerHub.)
    1. Click on the "Save" dropdown and select "Convert to OAS3."
    1. Copy and paste the result into a text file and put it in the markoapis git repository at oas3/yaml/.

1. Make small changes to converted OAS3 version of yaml. 

    1. Add the dev version of API server to the new "servers" section of the spec. After the SwaggerHub conversion to OAS3 the servers section would look this (in the case of the Alerts spec).
       
       ```yaml
       servers:
         - url: https://qa-marko.aramark.net/v1/alerts/
       ```
       Now add the dev-marko server to make it look like this:
       ```yaml
       servers:
         - url: https://qa-marko.aramark.net/v1/alerts/
         - url: https://dev-marko.aramark.net/v1/alerts/
       
       ```
       Note that whichever server is listed first will be the one that the interative "Try" functionality will default to.
       
    1. Model the global description field on the following example:

       ```yaml
       description: |
       
         <description of particular API.>
       
         The base endpoint URL for this API in production is: `https://marko.aramark.net/v1/alerts`.
       
         For testing the API with the "Try" tool on this page or in your app, use either our testing server "qa-marko" or our development server "dev-marko".
       ```
       
       

1. Create a .json version of the file at https://www.convertjson.com/yaml-to-json.htm or using a node.js Shai wrote (yaml2json.js found in Git repo) and put it at oas3/json/.

1. Commit to Github.

