# Tableau Extension: ChatGPT AI

![Extension Preview](/images/Tableau_extension_review.png)

## Description

This is a custom Tableau extension that allows you to build connections to your data with ChatGPT AI. This extension enhances your Tableau dashboard by displaying the response from ChatGPT, making it easier to find insights.

## Features

- Dynamic interaction with ChatGPT/other potential models.
- Ask any questions related to your data.

## Prerequisites

Before using this extension, ensure that you have the following:

- A Tableau Desktop/Cloud/Server [https://www.tableau.com/products/desktop].
- Node.js and npm dependencies [https://nodejs.org/en].
- An API key from ChatGPT Open AI website [https://openai.com/pricing].
- A dataset with any data.

## Installation

1. Download and extract all of this extension repository on your computer. Assume to save it at your './download/BA024Tableau_extention' path.
2. Download the latest Tableau Desktop that suits your environment (Win/Mac) on your computer Desktop.
3. Download the Node.js that suits your environment (Win/Mac). ! Remember to select it with npm manager when installing.
4. Acquire your Open AI API key from the Open AI website. Assume it is 'API_KEY'.

## Usage

1. Open your terminal and navigate to the extension directory './download/BA024Tableau_extention'.
2. Run the command: npm install; npm run build; npm start.
3. Open your Tableau Desktop and build a Dashboard.
4. In your Dashboard, click the 'Extension' button in the left bottom area. Then click 'Access Local Extensions', find and open the ChatGPTAI.trex at './download/BA024Tableau_extention/Samples/ChatCPTAI/ChatGPTAI.trex'.
5. Before using it. You need to add your 'API_KEY' to the './download/BA024Tableau_extention/Samples/ChatCPTAI/MarksSelection.js' file.
6. Then, you can select the data and type the question in the input box to start. 

## Configuration

You can customise the extension by modifying the `MarksSelection.js` file in the path './download/BA024Tableau_extention/Samples/ChatCPTAI/MarksSelection.js'. The configuration file allows you to set options such as GPT model type GPT role setting.

## Support and Feedback

For support, bug reports, or feature requests, please create an [issue](https://github.com/Eddieisking/BA024Tableau_extension
/issues) on GitHub.

## Contributing

Contributions are welcome! If you'd like to improve this extension or fix issues, please follow these steps:

1. Fork the repository.
2. Create a new branch for your changes.
3. Make your changes and test thoroughly.
4. Submit a pull request with a clear description of your changes.

Enjoy visualising and analysing your data in a new way with the Interactive GPT model for Tableau!

![Map Analytics](/images/map_analytics.png)
