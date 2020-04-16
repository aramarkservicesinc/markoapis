## Workflow for Swagger2 to OAS3 Conversion

### Remember to `git pull` before you start working

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
      
   1. Use `$refs` for adding parameters to a path. Even if the spec only has one path, all params should be in the `components` section and referred to via `$refs`.

	1. *Add* `parameters:` section to spec before the `/paths` section.   

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
	   *Notice how each param has a new param name (e.g. bypassCacheParm and smokeParam). These are the names used by $refs in the parameters section of each path*.

	1. *Add* a $ref for each parameter. For example

	   ```yaml	   
	     - $ref: '#/parameters/bypassCacheParam'
	     - $ref: '#parameters/smokeParam'
	   ```
	    
	1. *Remove* parameters under each operation. (In the example below I remove the params by commenting them out. I have done that for providing better context in the instructions. __In the actual spec, you can simply delete these lines__.

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
	   ```


    1. Save the updated Swagger2 spec to markoapis repo at swgr2/yaml.
   
1. Convert *updated* Swagger2 spec to OAS3 (in yaml format)
    1. Sign in to [SwaggerHub](https://app.swaggerhub.com/login)
    1. Click `Create new` and then `Import and Document API`.
    1. Click `Browse` and select the updated Swagger2 doc you just saved. (You must select "public" in the visibility field.) 
    1. Click on the `Save` dropdown and select `Convert to OAS3`.
    1. Copy and paste the result into a `.yaml` file.
    1. Use the following guides to name the file:
	1. Use the base path to name the spec, adding the operation path when needed to make the file name meaningful.
	1. Use all lower case letters.
	1. Connect words with hyphens.
    1. Save the file in `markoapis/oas3/yaml`.

1. Make changes to converted OAS3 version of yaml. 

    1. Add the dev version of API server to the new `servers:` section of the spec. Also add a description field for each server.
       
       It will look like this:
       
       ```yaml
       servers:
         - url: https://qa-marko.aramark.net/v1/<base path>
       ```
       Change it to look like this:
       
       ```yaml
       servers:
	 - url: https://qa-marko.aramark.net/v1/<base path>
	   description: Testing server
	 - url: https://dev-marko.aramark.net/v1/<base path>
	   description: Development server
       ```

       __Replace `<base path>` with the actual base path__

       If only dev is available for all paths in the spec, then list only the dev version here. 

    1. Each `/path` must have *both* `summary:` and `description:` definitions. The summary should be shorter than the description can not be formatted.
       
    1. Model the *global* description field on the following example replacing `<base path>` with the right path for that particular spec:

       ```yaml
       # The pipe `|` denotes that a multi-line description follows.
       description: | 
       
         <description of the particular API>
       
         The base endpoint URL for this API in production is: `https://marko.aramark.net/v1/<base path>`.
       
         For testing the API with the "Try" tool on this page or in your app, use either our testing server "qa-marko" or our development server "dev-marko".
       ```
       
    1. Model *each operation's* description field on the following example:

       ```yaml
       description: |
       
         <description of the particular operation>

         # Use only **one** of the following three lines. 
         ![This endpoint is in development](/themes/portal/images/statuspngs/statusdev.png)
         ![This endpoint is in qa](/themes/portal/images/statuspngs/statusqa.png)
         ![This endpoint is in production](/themes/portal/images/statuspngs/statusprod.png)
       ```  	 
1. Create a `.json` version of the file at [https://www.convertjson.com/yaml-to-json.htm](https://www.convertjson.com/yaml-to-json.htm) or using a `node.js` script wrote (`yaml2json.js` or `yamldan.js` found in root of `markoapis` Git repo). The new `.json` file should land in `markoapis/oas3/json`. The script must run from a commandline located at: `markoapis/oas3/yaml`.

1. Commit to Github.

