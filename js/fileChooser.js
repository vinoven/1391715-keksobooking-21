'use strict';

const processFileSelection = (fileInpuelement, availableFileTypes, callback) => {
  const file = fileInpuelement.files[0];
  const fileName = file.name.toLowerCase();

  const matches = availableFileTypes.some((fileType) => {
    return fileName.endsWith(fileType);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener(`load`, () => {
      callback(reader.result);
    });

    reader.readAsDataURL(file);
  }
};

window.fileChooser = {
  'process': processFileSelection
};
