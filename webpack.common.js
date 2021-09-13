module.exports = {
    // ... some config here
     module: {
     rules: [
       {
         test: /\.(js|jsx)$/,
         // the @react-leaflet and react-leaflet libraries must be excluded.
         exclude: /node_modules\/(?!(@react-leaflet|react-leaflet)\/)/i,
         use: []
       }
     ],
    // ... more config here
     }
 }