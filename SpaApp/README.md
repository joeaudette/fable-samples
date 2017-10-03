## About this solution

Mainly this sample is to show proof of concept how to be able to write client side script in F# and use it within an ASP.NET Core project.

There are 2 projects SpaApp is an ASP.NET Core web app in C# and ClientScript is an F# project for writing client side code that is transpiled to javascript by Fable resulting in wwwroot/dist/main.js

The transpilation happens automatically using webpack middleware for hot module reloading.
The Web app uses static files middleware to serve the wwwroot/index.html file

There is also an example api controller which is not currently used. 


## Building and running the app

This solution uses paket for F# dependencies and NuGet for C#

You will need 2 terminal windows, one for running the app and one for running the Fable daemon

* Open a terminal in the solution folder
* From the solution root enter the commands: `./.paket/paket.exe install` then: `dotnet restore --no-cache`, then: `dotnet build`
* **Move to the `SpaApp` folder
* Install JS dependencies: `npm install`
* **Open another terminal in the `ClientScript` folder**
* Start Fable daemon in the second terminal: `dotnet fable start`
* In the first terminal in the SpaApp folder: `dotnet run`
* In your browser, open: http://localhost:61380
