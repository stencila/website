---
extends: learn/_page.html
title: Troubleshooting
---

This page provides some advice on dealing with commonly reported problems you may encounter. Stencila and its various components
are still in development phase and so you may find
that there are some glitches. We are working on fixing them but in the meantime we ask you for patience and hope that the advice below will be helpful.
Thank you for your understanding!


# Stencila Execution Contexts

### Can't see if execution contexts are working
Stencila execution contexts, so the "engines" that allow you to run the code (R, Python and so on) within Stencila documents, run
as hosts either on your local machine (if you are using the Desktop version) or on the cloud (that usually be the case, if you 
use Stencila Hub). <br/>
If you are using Stencila Desktop and would like to check if the execution contexts are running correctly, you can do that through
the command line. <br/>
If you are running Linux or Mac OS, open a terminal and type:

```
ls /tmp/stencila/hosts -lt
```

This should result in an output similar to the one below:
```
total 16
-rw------- 1 nokome nokome  514 Feb 22 12:36 r-host-293d576d-5e56-4dde-9196-dc67aea40a55.json
-rw------- 1 nokome nokome   64 Feb 22 12:36 r-host-293d576d-5e56-4dde-9196-dc67aea40a55.key
-rw------- 1 nokome nokome 1281 Feb 22 12:36 node-host-a2163786-8d50-4fe2-a64f-b942ff165cea.json
-rw------- 1 nokome nokome   64 Feb 22 12:36 node-host-a2163786-8d50-4fe2-a64f-b942ff165cea.key
```

The `node-host` is the one embedded in Stencila Desktop. It starts as soon as you launch the application. The `r-host` starts as soon
as you create an `R` cell within Stencila document. You can see more details of the `r-host` by looking at its JSON file, in
the example above it is `r-host-293d576d-5e56-4dde-9196-dc67aea40a55.json`.

```
cat /tmp/stencila/hosts/r-host-293d576d-5e56-4dde-9196-dc67aea40a55.json 
{
   "stencila": {
     "package": "r",<br/>
     "version": "0.28.3"
   },
   "id": "r-host-293d576d-5e56-4dde-9196-dc67aea40a55",
   "spawn": ["/usr/bin/Rscript", "-e", "stencila:::spawn()"],
   "environs": [
     {
       "id": "local",
       "name": "local",
       "version": ""
     }
   ],
   "types": {
     "RContext": {
       "name": "RContext",
       "client": "ContextHttpClient"
     }
   },
   "machine": [],
   "process": {
     "pid": 4142
   },
   "servers": {
     "http": {
       "url": "http://127.0.0.1:2010"
     }
   }
 }        
```

You can confirm that the `r-host` is running by pinging it's IP: `curl http://127.0.0.1:2010` or by using its `pid`. For the example above it would be `ps 4142`. 
Stencila Desktop uses the information in that JSON file to connect to an execution context. If the process running the context has died for some reason, it could be that the Desktop is still trying to connect to it and hence you are experiencing problems such as the code
not being excecuted in a cell.

# Stencila Desktop

### Code output doesn't change and no error is displayed
First, try to delete the whole cell that became inactive and then create a new cell, re-entering the code.
If that doesn't help, it may be that what happened is  the execution context you are using to run the code in the code cell became unavailable for Stencila Desktop to communicate with. Depending on which context you are using, R, Python or Jupyter, you may need to restart the context on your machine. <br/>
* for R context, open an R session (either in an R shell or R Studio) and type `stencila::start()`;
* for Python or Jupyter Python context, open a terminal and type `python -m stencila`.


# Stencila Encoda

### Converting files into a `dar` project results in an error  `Cannot read property 'length' of undefined`
Most likely one of the files in the folder you are trying to convert is a `csv` file and our converter may be tripping over some
empty cells. One of the solutions is not to convert the `csv` files into `dar`. You will still be able to manipulate them from
within Stencila Desktop using your programming language of choice, just like you would in any other code editor. Another solution would be editing your `csv` files trying to find the empty cells and filling them in with a relevant information (such as `NA`) and
then trying the conversion step once again.



