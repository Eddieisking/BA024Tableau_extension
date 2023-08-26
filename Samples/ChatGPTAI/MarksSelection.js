'use strict';

// Wrap everything in an anonymous function to avoid polluting the global namespace
(function () {
  // Use the jQuery document ready signal to know when everything has been initialized
  $(document).ready(function () {
    // Tell Tableau we'd like to initialize our extension
    tableau.extensions.initializeAsync().then(function () {
      // Once the extension is initialized, ask the user to choose a sheet
      showChooseSheetDialog();
      // showChooseColumnDialog();
      initializeButtons();
    });
  });

  /**
     * Shows the choose sheet UI. Once a sheet is selected, the data table for the sheet is shown
     */

  function showChooseSheetDialog () {
    // Clear out the existing list of sheets
    $('#choose_sheet_buttons').empty();

    // Set the dashboard's name in the title
    const dashboardName = tableau.extensions.dashboardContent.dashboard.name;
    $('#choose_sheet_title').text(dashboardName);

    // The first step in choosing a sheet will be asking Tableau what sheets are available
    const worksheets = tableau.extensions.dashboardContent.dashboard.worksheets;

    // Next, we loop through all of these worksheets and add buttons for each one
    worksheets.forEach(function (worksheet) {
      // Declare our new button which contains the sheet name
      const button = createButton(worksheet.name);
      // const button = $("<button type='button' class='btn btn-default btn-block'></button>");
      // button.text(worksheet.name);

      // Create an event handler for when this button is clicked
      button.click(function () {
        const worksheetName = worksheet.name;

        // move the column_sheet_dialog
        $('#choose_sheet_dialog').modal('toggle');
        showChooseColumnDialog(worksheetName); // Show the column selection dialog after selecting the worksheet
      });

      // Add our button to the list of worksheets to choose from
      $('#choose_sheet_buttons').append(button);
    });

    // Show the dialog
    $('#choose_sheet_dialog').modal('toggle');
  }

  // // This variable will save off the function we can call to unregister listening to marks-selected events
  // let unregisterEventHandlerFunction;

  function showChooseColumnDialog(worksheetName) {
    // Clear out the existing list of columns
    $('#choose_column_buttons').empty();

    // Set the worksheet's name in the title
    $('#choose_column_title').text(worksheetName);

    // Get the selected worksheet
    // plan 1 doesn't work
    // const worksheet = worksheetName
    // plan 2
    const worksheet = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === worksheetName);
    // plan3
    // const worksheet = tableau.extensions.dashboardContent.dashboard.worksheets.find(function(worksheet) {
    //     return worksheet.name === worksheetName;
    // });

    // Get the available columns for the selected worksheet
    const columns = worksheet.getSummaryDataAsync().then(function (sumdata) {
    const worksheetColumns = sumdata.columns;

    // Loop through all columns and add buttons for each one
    worksheetColumns.forEach(function (column) {
    // Declare our new button which contains the column name
    const button = createButton(column.fieldName)

    // Create an event handler for when this button is clicked
    button.click(function () {
      // Get the column name which was selected
      const columnName = column.fieldName;

      // Close the dialog and show the data table for this column
      $('#choose_column_dialog').modal('toggle');
      loadSelectedMarks(worksheetName, columnName); // Load selected marks for the selected column
    });

      // Add our button to the list of columns to choose from
      $('#choose_column_buttons').append(button);
    });

      // Show the dialog
        $('#choose_column_dialog').modal('toggle');
      });
    }

  function createButton (buttonTitle) {
    const button =
            $(`<button type='button' class='btn btn-default btn-block'>
      ${buttonTitle}
    </button>`);

    return button;
  }

  // This variable will save off the function we can call to unregister listening to marks-selected events
  let unregisterEventHandlerFunction;

  function loadSelectedMarks (worksheetName, columnName) {
    // Remove any existing event listeners
    if (unregisterEventHandlerFunction) {
      unregisterEventHandlerFunction();
    }

    // Get the worksheet object we want to get the selected marks for
    const worksheet = getSelectedSheet(worksheetName);

    // Set our title to an appropriate value
    $('#selected_marks_title').text(worksheet.name);

    // Call to get the selected marks for our sheet
    worksheet.getSelectedMarksAsync().then(function (marks) {
      // Get the first DataTable for our selected marks (usually there is just one)
      const worksheetData = marks.data[0];

      // Map our data into the format which the data table component expects it
      const data = worksheetData.data.map(function (row, index) {
        const rowData = row.map(function (cell) {
          return cell.formattedValue;
        });

        return rowData;
      });

      // Get the number of rows in the rowData array
      const numRows = data.length;
      console.log('Number of rows:', numRows);

      const columns = worksheetData.columns.map(function (column) {
        return {
          title: column.fieldName
        };
      });

      // Populate the data table with the rows and columns we just pulled out
      populateDataTable(data, columns, columnName);

      // Add an event listener to the button of user input and combine input with data wanted
      document.getElementById('sendToChatButton').addEventListener('click', function () {
        // Get all column names
        const allColumnNames = columns.map(column => column.title);

        // Get the user input from the input field
        const userInput = document.getElementById('userInput').value;

        // Create a message containing the data and user input
        const message = formatDataAndUserInputForChat(data, allColumnNames, userInput);
        console.log('message is:', message)

        // Send message to chat API
        sendMessageToChat(message);

        // Send the message to the chat service
    });
  });

    // Function to send the message to the chat service
    function sendMessageToChat(message) {
      const token = 'Your API KEY';
      const gptEL = document.getElementById('result_of_gpt');

      fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        },
        body: JSON.stringify({
          "model": 'gpt-3.5-turbo',
          "messages": [{"role": "system", "content": "You are a professional customer review and other relevant /" +
                "information analyst. Your role involves analyzing and extracting insights from customer reviews and/" +
                " other relevant data sources for various products and services. You are skilled at identifying /" +
                "patterns, sentiments, and trends in customer feedback to provide valuable insights to businesses./" +
                " You use data analysis tools and techniques to gather, clean, and process large datasets, and you/" +
                " are experienced in presenting your findings in clear and actionable reports. Your expertise helps /" +
                "businesses make informed decisions to improve their products and services based on customer feedback/" +
                " and market trends. Feel free to ask for any guidance or assistance related to your role."},
          {"role": "user", "content": message}]
        })
      }).then(response => {
        return response.json();
      }).then(data => {
        gptEL.innerText = data.choices[0].message.content;
      });
    }

    // Add an event listener for the selection changed event on this sheet.
    unregisterEventHandlerFunction = worksheet.addEventListener(tableau.TableauEventType.MarkSelectionChanged, function (selectionEvent) {
      // When the selection changes, reload the data
      loadSelectedMarks(worksheetName, columnName);
    });
  }

  function formatDataAndUserInputForChat(data, allColumnNames, userInput) {
    let formattedMessage = 'Selected Marks:\n';

    // Add column names to the title
    formattedMessage += 'Columns name and data: ' + '\n' + allColumnNames + '\n';
    // Format the data rows
    data.forEach(function (row) {
      const rowData = row.join(', ');
      formattedMessage += rowData + ';\n';
    });

    // Add user input to the message
    formattedMessage += 'User Input:\n' + userInput;

    return formattedMessage;
  }

  function populateDataTable (data, columns, columnName) {
    // Do some UI setup here to change the visible section and reinitialize the table
    $('#data_table_wrapper').empty();

    if (data.length > 0) {
      $('#no_data_message').css('display', 'none');
      $('#data_table_wrapper').append('<table id=\'data_table\' class=\'table table-striped table-bordered\'></table>');

      // Do some math to compute the height we want the data table to be
      const top = $('#data_table_wrapper')[0].getBoundingClientRect().top;
      const height = $(document).height() - top - 130;

      // Initialize our data table with what we just gathered
      $('#data_table').DataTable({
        data: data,
        columns: columns,
        autoWidth: false,
        deferRender: true,
        scroller: true,
        scrollY: height,
        scrollX: true,
        dom: "<'row'<'col-sm-6'i><'col-sm-6'f>><'row'<'col-sm-12'tr>>" // Do some custom styling
      });
    } else {
      // If we didn't get any rows back, there must be no marks selected
      $('#no_data_message').css('display', 'inline');
    }
  }

  function initializeButtons () {
    $('#show_choose_sheet_button').click(showChooseSheetDialog);
  }

  function getSelectedSheet (worksheetName) {
      // Go through all the worksheets in the dashboard and find the one we want
      return tableau.extensions.dashboardContent.dashboard.worksheets.find(function (sheet) {
        return sheet.name === worksheetName;
      });
    }
  })();


