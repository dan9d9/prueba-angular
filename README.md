# Getting started

`git clone https://github.com/dan9d9/prueba-angular.git`  
`cd prueba-angular`  
`npm install`  

1. You will need to register an account at https://gorest.co.in/ to receive a free API token in order to fetch the information.
2. In the /src directory create a `config.ts` file and save `export const token = YOUR_TOKEN`;

That's it for installation, now you can run the server!

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


## Extra Features

The basic project contains all the required features, on top of the basic features I have added:
* El contador MataGatos
* El 'dob' detalle
* Search input debounce. After the user has entered at least 2 letters and stops typing for 1 second, the search is initiated automatically.
* Remove a favorite user from the favorites modal
* Upon clicking on the mataGatos image, a log of all server requests are shown.

## Improvements

Infinity scrolling, probably utilizing `ngx-infinite-scroll`  
I think there's room to make some more reusable components. The pages, for instance, are almost identical and could be extracted into one component.   
I think a container for the user-list and user-details would be a good idea as well.
