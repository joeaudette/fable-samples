## Building and running the app

You will need 2 terminal windows, one for running the app and one for running the Fable daemon

* Open a terminal in the solution folder
* From the solution root: `dotnet restore --no-cache`, then: `dotnet build`
* **Move to the `SpaApp` folder
* Install JS dependencies: `npm install`
* **Open another terminal in the `fab` folder**
* Start Fable daemon in the second terminal: `dotnet fable start`
* In the first terminal in the SpaApp folder: `dotnet run`
* In your browser, open: http://localhost:5000/
