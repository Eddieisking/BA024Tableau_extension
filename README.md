# Tableau Extension: Interactive Sales Map

![Extension Preview](/images/extension_preview.png)

## Description

The Interactive Sales Map is a custom Tableau extension that allows you to visualize sales data on an interactive map. This extension enhances your Tableau dashboard by displaying sales figures in a geospatial context, making it easier to identify sales trends based on geographic locations.

## Features

- Display sales data points on a map.
- Filter data based on date, product, or region.
- Click on data points to view detailed sales information.

## Prerequisites

Before using this extension, ensure that you have the following:

- A Tableau dashboard.
- A dataset with geographical data (latitude and longitude) and associated sales information.

## Installation

1. Download the latest release of the extension from the [Releases](https://github.com/yourusername/interactive-sales-map/releases) section.
2. Extract the downloaded ZIP file to a location on your computer.

## Usage

1. Open your Tableau dashboard in Edit mode.
2. Drag and drop a new "Web Page" object onto the dashboard.
3. In the URL field of the Web Page object, enter the path to the `index.html` file of the downloaded extension.

   Example: `/path/to/extracted/extension/index.html`

4. Adjust the size of the Web Page object to fit your desired location on the dashboard.
5. Interact with the map to visualize sales data. Use the available filters to refine your view.

## Configuration

You can customize the extension by modifying the `config.js` file located in the extension's directory. The configuration file allows you to set options such as map styling, data sources, and default filters.

## Support and Feedback

For support, bug reports, or feature requests, please create an [issue](https://github.com/yourusername/interactive-sales-map/issues) on GitHub.

## Contributing

Contributions are welcome! If you'd like to improve this extension or fix issues, please follow these steps:

1. Fork the repository.
2. Create a new branch for your changes.
3. Make your changes and test thoroughly.
4. Submit a pull request with a clear description of your changes.

## License

This extension is released under the [MIT License](LICENSE).

---

Enjoy visualizing your sales data in a whole new way with the Interactive Sales Map extension for Tableau!

![Map Analytics](/images/map_analytics.png)
