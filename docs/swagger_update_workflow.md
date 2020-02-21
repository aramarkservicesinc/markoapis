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
     
   
  2. Convert *updated* Swagger2 spec to OAS3 (in yaml format)
        1. Save the updated Swagger2 spec to disk.
        1. Sign in to [SwaggerHub](https://app.swaggerhub.com/login)
        1. Click "Create new => Import and Document API"
        1. Click "Browse" and select the updated Swagger2 doc (you must select "public" in the visibility field. After converting to OAS3n delete the spec from SwaggerHub)
        1. Click on the "Save" dropdown and select "Convert to OAS3."
        1. Copy and paste the result into a text file and put it in the markoapis git repository at OAS3/yaml/.

3. Create a .json version of the file at https://www.convertjson.com/yaml-to-json.htm or using a node.js Shai wrote (yaml2json.js found in Git repo).

4. Commit to Github.

