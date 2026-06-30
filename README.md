# herring-spawn-gee
 
**Machine Learning Classification of Pacific Herring Spawn Events Using Sentinel-2 Imagery and the Herring Spawn Detection Index**
 
Arjun Birdi — University of Victoria, BC, Canada | arjunbirdi@uvic.ca
 
---
 
## Overview
 
This repository contains the full code and training data for a machine learning pipeline that detects and maps Pacific herring (*Clupea pallasii*) spawn events in the Strait of Georgia, British Columbia, using Sentinel-2 satellite imagery.
 
A Random Forest classifier was trained on multispectral bands (B1–B5) and a derived Herring Spawn Detection Index (HSDI) to distinguish three classes: spawn, substrate, and water. Spatial cross-validation yielded 98.3% accuracy (±0.054). The pipeline is built across two platforms: Google Earth Engine (GEE) for geospatial and remote sensing processing and Google Colab for model training and evaluation.
 
**Study period:** March 2020
**Study area:** Strait of Georgia, BC (48.5°N–50.5°N, 125.5°W–123.0°W)
 
---
 
## Repository Structure
 
```
herring-spawn-gee/
├── herring-spawn-gee-script.js     # Google Earth Engine JavaScript script
├── herring-spawn-notebook.ipynb    # Google Colab training and evaluation notebook
├── herring_spawn_ROIs.csv          # Training dataset (8,546 labelled pixels)
├── LICENSE                         # MIT License
└── README.md
```
 
---
 
## File Descriptions
 
### `herring-spawn-gee-script.js`
Google Earth Engine script (JavaScript) for:
- Filtering Sentinel-2 L2A imagery (COPERNICUS/S2_SR_HARMONIZED) for March 2020
- Computing the Herring Spawn Detection Index (HSDI = (B3 − B4) / (B3 + B4))
- Sampling ROI pixels and exporting training data
- Running the GEE Random Forest classifier (ee.Classifier.smileRandomForest)
- Applying a JRC Global Surface Water land mask
- Exporting multi-date classification results and spawn area statistics
### `herring-spawn-notebook.ipynb`
Google Colab Python notebook for:
- Loading and preprocessing the training CSV
- Training Random Forest and Gradient Boosting classifiers (scikit-learn)
- Spatial cross-validation using Leave-One-Group-Out (LOGO) with K-Means grouping
- Feature importance analysis
- Time-series visualization of spawn extent across March 2020
### `herring_spawn_ROIs.csv`
Training dataset exported from ESA SNAP software. Contains 8,546 spectrally sampled pixels across three classes:
 
| Class     | Samples | Proportion |
|-----------|---------|------------|
| Spawn     | 3,226   | 37.7%      |
| Water     | 3,055   | 35.7%      |
| Substrate | 2,265   | 26.5%      |
 
**Columns:** `B1, B2, B3, B4, B5, Latitude, Longitude, Class`
 
---
 
## How to Use
 
### GEE Script
1. Open [Google Earth Engine Code Editor](https://code.earthengine.google.com)
2. Create a new script and paste the contents of `herring-spawn-gee-script.js`
3. Run the script — outputs export to your Google Drive
### Colab Notebook
1. Open [Google Colab](https://colab.research.google.com)
2. Upload `herring-spawn-notebook.ipynb`
3. Upload `herring_spawn_ROIs.csv` to your Colab session or Google Drive
4. Run all cells in order
**Dependencies:** `scikit-learn`, `pandas`, `numpy`, `matplotlib`, `geemap`, `earthengine-api`
 
---
 
## Citation
 
If you use this code or data, please cite the associated paper:
 
> Birdi, A. (2026). *Machine learning classification of Pacific herring spawn events using Sentinel-2 imagery and the Herring Spawn Detection Index, Strait of Georgia, British Columbia*. University of Victoria.
 
---
 
## License
 
This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
 
---
 
## Contact
 
Arjun Birdi | arjunbirdi@uvic.ca | University of Victoria, Department of Geography
 
