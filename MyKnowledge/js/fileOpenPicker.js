//// THIS CODE AND INFORMATION IS PROVIDED "AS IS" WITHOUT WARRANTY OF
//// ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT LIMITED TO
//// THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR FITNESS FOR A
//// PARTICULAR PURPOSE.
////
//// Copyright (c) Microsoft Corporation. All rights reserved

/// <reference path="base-sdk.js" />
/// <reference path="Windows.ApplicationModel.js" />
/// <reference path="Windows.Foundation.js" />
/// <reference path="Windows.Storage.Streams.js" />
/// <reference path="Windows.Storage.js" />
/// <reference path="Windows.Storage.Pickers.js" />
/// <reference path="Windows.ApplicationModel.Activation.js" />
/// <reference path="Windows.UI.WebUI.js" />

(function () {
    var fileOpenPickerUI;
    var localFileId = "MyLocalFile"; //ID representing the file added from the application's package
    var uriFileId = "MyUriFile"; //ID representing the file added from a URI

    function id(elementId) {
        return document.getElementById(elementId);
    }

    function onAddLocalFile() {
        // Respond to the "Add" button being clicked

        // Retrieve a file from the application package to be added to the picker basket
        Windows.ApplicationModel.Package.current.installedLocation.getFileAsync("images\\squareTile-sdk.png").then(function (fileToAdd) {
            addFileToBasket(localFileId, fileToAdd);
        },
        function (error) {
            id("scenario1Error").innerHTML = error;
        });
    }

    function onAddUriFile() {
        // Respond to the "Add" button being clicked

        var uri = new Windows.Foundation.Uri(id("imageSrcInput").value);
        var thumbnail = Windows.Storage.Streams.RandomAccessStreamReference.createFromUri(uri);

        // Retrieve a file from a URI to be added to the picker basket
        Windows.Storage.StorageFile.createStreamedFileFromUriAsync("URI.png", uri, thumbnail).then(function (fileToAdd) {
            addFileToBasket(uriFileId, fileToAdd);
        },
        function (error) {
            id("scenario2Error").innerHTML = error;
        });
    }

    function onRemoveLocalFile() {
        // Respond to the "Remove" button being clicked
        removeFileFromBasket(localFileId);
    }

    function onRemoveUriFile() {
        // Respond to the "Remove" button being clicked
        removeFileFromBasket(uriFileId);
    }

    function addFileToBasket(fileId, file) {
        // Programmatically add the file to the basket

        var inBasket;
        switch(fileOpenPickerUI.addFile(fileId, file)) {
            case Windows.Storage.Pickers.Provider.AddFileResult.added:
                // Optionally notify user that the file was added to the basket
            case Windows.Storage.Pickers.Provider.AddFileResult.alreadyAdded:
                // Optionally notify the user that the file is already in the basket
                inBasket = true;
                break;
            case Windows.Storage.Pickers.Provider.AddFileResult.notAllowed:
                // Optionally notify the user that the file is not allowed in the basket
            case Windows.Storage.Pickers.Provider.AddFileResult.unavailable:
                // Optionally notify the user that the basket is not currently available
            default:
                inBasket = false;
                break;
        }

        // Adjust the add/remove buttons based on addition
        updateSelectionState(fileId, inBasket);
    }

    function removeFileFromBasket(fileId) {
        // Programmatically remove the file from the picker basket

        if (fileOpenPickerUI.containsFile(fileId)) {
            fileOpenPickerUI.removeFile(fileId);
        } else {
            // The file to be removed is not in the basket
        }

        // Adjust the add/remove buttons based on removal
        updateSelectionState(fileId, false);
    }

    function onFileRemovedFromBasket(e) {
        // Add any code to be called when an item is removed from the basket by the user

        // Adjust the add/remove buttons based on removal
        updateSelectionState(e.id, false);
    }

    function updateSelectionState(fileId, selected) {
        // Update the add/remove buttons as selection changes

        if (fileId === localFileId) {
            id("addLocalFileButton").disabled = selected;
            id("removeLocalFileButton").disabled = !selected;
        } else if (fileId === uriFileId) {
            id("addUriFileButton").disabled = selected;
            id("removeUriFileButton").disabled = !selected;
        }
    }

    function onActivation(e) {
        if (e.kind === Windows.ApplicationModel.Activation.ActivationKind.filePicker) {
            fileOpenPickerUI = e.detail.fileOpenPickerUI;
            fileOpenPickerUI.addEventListener("fileremoved", onFileRemovedFromBasket, false);
        }
    }

    function initialize() {
        // Add any initialization code here

        id("addLocalFileButton").addEventListener("click", /*@static_cast(EventListener)*/onAddLocalFile, false);
        id("removeLocalFileButton").addEventListener("click", /*@static_cast(EventListener)*/onRemoveLocalFile, false);
        id("addUriFileButton").addEventListener("click", /*@static_cast(EventListener)*/onAddUriFile, false);
        id("removeUriFileButton").addEventListener("click", /*@static_cast(EventListener)*/onRemoveUriFile, false);
        id("scenarios").addEventListener("change", /*@static_cast(EventListener)*/onScenarioChanged, false);
    }

    function onScenarioChanged() {
        sdkSample.displayStatus("");
    }

    document.addEventListener("DOMContentLoaded", initialize, false);
    WinJS.Application.addEventListener("activated", onActivation, false);
})();
