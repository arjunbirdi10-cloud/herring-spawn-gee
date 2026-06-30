// DEFINE STUDY AREA - Strait of Georgia
var geometry = ee.Geometry.Rectangle([-125.5, 48.5, -123.0, 50.5]);

// LOAD SENTINEL-2 COLLECTION
var s2 = ee.ImageCollection('COPERNICUS/S2_SR')
  .filterDate('2020-03-01', '2020-03-31') // March 2020 - peak spawn season
  .filterBounds(geometry)
  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 10));

// FUNCTION TO CALCULATE HSDI
var addHSDI = function(image) {
  var hsdi = image.normalizedDifference(['B3', 'B4']).rename('HSDI');
  return image.addBands(hsdi);
};

// APPLY HSDI TO ENTIRE COLLECTION
var s2WithHSDI = s2.map(addHSDI);

// GET THE MARCH 9 2020 IMAGE SPECIFICALLY
// (same date as your SNAP analysis)
var march9 = s2WithHSDI
  .filterDate('2020-03-09', '2020-03-10')
  .first();

// DISPLAY TRUE COLOUR
Map.addLayer(march9, {
  bands: ['B4', 'B3', 'B2'],
  min: 0,
  max: 3000
}, 'True Colour March 9 2020');

// DISPLAY HSDI WITH YOUR THRESHOLDS
// Spawn threshold > 0.4757 shown in red
Map.addLayer(march9.select('HSDI'), {
  min: -0.2667,
  max: 0.7728,
  palette: [
    '00008B', // dark blue - water min
    '0000FF', // blue - water
    '00FFFF', // cyan - transition
    '808080', // grey - substrate
    'FF4500', // red - spawn lower
    'FF6347', // orange red - spawn peak
    'FFFFFF'  // white - spawn max
  ]
}, 'HSDI Spawn Detection');

// DISPLAY SPAWN ONLY (pixels above threshold)
var spawnMask = march9.select('HSDI').gt(0.4757);
Map.addLayer(spawnMask.selfMask(), {
  palette: ['FF0000']
}, 'Spawn Detected (threshold > 0.4757)');

// CENTRE MAP
Map.centerObject(geometry, 9);

// PRINT IMAGE INFO TO CONSOLE
print('March 9 2020 Image:', march9);
print('HSDI Min/Max:', march9.select('HSDI').reduceRegion({
  reducer: ee.Reducer.minMax(),
  geometry: geometry,
  scale: 10,
  maxPixels: 1e9
}));
