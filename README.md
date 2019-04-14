## This project represents a `frontend` solution for catalog front of an e-commerce website name Clouds & Co.

## Requested Features
- User must select a category to see products within it.
- User can filter using price range.
- User can combine two or more filters.
- Data rendered from api

## Features available in the project:
- User can select a category to view products related to this category
- User can filter products using (a price range, colour or rating)
- User can combine one or more of the filters mentioned above
- User can clear one or more of the selected combination of filters
- User can clear all selected filters
- All data is rendered from the requested API

## Missing Features:
- User cannot clear the selected category

## Features/Changes to add if I had more time:
- User able to clear category
- Using React Routing for the filters (currently adjusting the urls myself and this has a margin of error and not very scalable)
- Using pagination
- Deploying on a server
- Lazy loading for the rest of the images
- on clicking on product, open up a modal with more of the product details, zoom in on product image, ability to rate or review product.

## Technical stack used:
### React: 
  Light-weight library, faster rendering, data binding and a lot is doable in a relatively smaller time compared with others     (There was no need for Redux so I did not use it)
### Typescript: 
  Pairs well with react and having everything type-checked reduces a lot of errors, everything related to types is caught on     spot. 
### SCSS: 
  For writing more compact css code, nesting, using variables and mixins.
### Bootstrap: 
  For using the grid and polishing the view a bit 
### External Libraries used:
- React-Select: A component for the colour dropdown https://github.com/JedWatson/react-select
- React-Input-Range: A component for using it in the price range section https://www.npmjs.com/package/react-input-range
- Chroma.js: A colour manipulation library used for the colours dropdown https://gka.github.io/chroma.js/

## Architecture 
- The project is currently component based.
- The folders are organized based on their types.
- All scss files in a folder, all tsx files in a folder and all the assets are in a separate folder.
- And each component has a file in the tsx folder and an adjacent file in the scss folder.
- In case the project files grew very large it could then be organized based on business domain.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## To run the project:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
