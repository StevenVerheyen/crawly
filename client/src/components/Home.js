import React, { useState, useEffect } from 'react';
import GeneratePdfImage from '../assets/images/generate.png';
import LabeledInputFieldText from '../external/react-uikit/Inputs/LabeledInputFieldText';
import LabeledInputFieldNumber from '../external/react-uikit/Inputs/LabeledInputFieldNumber';
import ButtonActionPrimary from '../external/react-uikit/Buttons/ButtonActionPrimary';
import ButtonActionOutlineSecondary from '../external/react-uikit/Buttons/ButtonActionOutlineSecondary';
import TextHead from '../external/react-uikit/Labels/TextHead';
import { postCrawl, getDownloadPdf } from '../external/requesty';
import download from 'downloadjs';
import CreatedBy from './CreatedBy';
import Select from 'react-select';

export default function Home() {
  const [fileName, setFileName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [processing, setProcessing] = useState(false);
  const [inputUrl, setInputUrl] = useState('');
  const [inputName, setInputName] = useState('');
  const [inputWidth, setInputWidth] = useState('');
  const [inputHeight, setInputHeight] = useState('');
  const [checkLandscape, setCheckLandscape] = useState(false);
  const [selectDeviceValue, setSelectDeviceValue] = useState('');
  const [selectDeviceOptions, setSelectDeviceOptions] = useState([]);

  useEffect(() => {
    const options = [
      { value: 'Moto G4', label: 'Moto G4' },
      { value: 'Galaxy S5', label: 'Galaxy S5' },
      { value: 'Pixel 2', label: 'Pixel 2' },
      { value: 'Pixel 2 XL', label: 'Pixel 2 XL' },
      { value: 'iPhone 5/SE', label: 'iPhone 5/SE' },
      { value: 'iPhone 6/7/8', label: 'iPhone 6/7/8' },
      { value: 'iPhone 6/7/8 Plus', label: 'iPhone 6/7/8 Plus' },
      { value: 'iPhone X', label: 'iPhone X' },
      { value: 'iPad', label: 'iPad' },
      { value: 'iPad Pro', label: 'iPad Pro' },
      { value: 'Surface Duo', label: 'Surface Duo' },
      { value: 'Galaxy Fold', label: 'Galaxy Fold' },
    ];
    setSelectDeviceOptions(options);
  }, []);

  async function onCrawlClick(e) {
    e.preventDefault();
    setErrorMessage('');
    setFileName('');
    setProcessing(true);

    // todo: add format
    let body = {
      name: inputName,
      website: inputUrl,
      landscape: checkLandscape,
      width: inputWidth,
      height: inputHeight,
    };
    if (selectDeviceValue && selectDeviceValue.value) {
      body.device = selectDeviceValue.value;
    }

    const postJson = await postCrawl(JSON.stringify(body));
    if (postJson.success === true) {
      setProcessing(false);
      setFileName(postJson.fileName);
    } else {
      setProcessing(false);
      setErrorMessage(postJson.error);
    }
  }

  async function onDownloadClick() {
    if (fileName.length === 0) {
      console.error('no filename specified');
      return;
    }
    const getJsonBlob = await getDownloadPdf(fileName);
    download(getJsonBlob, `${inputName}.pdf`, 'application/pdf');
  }

  return (
    <div className="container mx-auto">
      <div className="text-center w-full mt-8 mb-12 px-2">
        <TextHead text="Crawly 🐙" center={true} />
        <p className="font-italic text-sm text-gray-600">
          Crawly is a very simple tool that will create a PDF file from a given
          website.
          <br />
          In the future, this project will be extended with more functionality
          such as logging in into a website and then creating a PDF of its
          content.
        </p>
      </div>
      <form onSubmit={onCrawlClick} className="w-full">
        <div className="flex flex-col space-y-3 mx-5">
          <div className="w-full flex sm:flex-row flex-col space-x-2 justify-center items-center">
            <LabeledInputFieldText
              type="url"
              name="input-url"
              label="URL"
              placeholder='Start with "https://www." or "http://www."'
              required={true}
              value={inputUrl}
              onChangeInput={(e) => setInputUrl(e.target.value)}
            />
            <LabeledInputFieldText
              type="text"
              name="input-name"
              label="Filename"
              required={true}
              value={inputName}
              onChangeInput={(e) => setInputName(e.target.value)}
            />
          </div>

          <div className="w-full flex sm:flex-row flex-col space-x-4 items-center">
            <Select
              className="w-72"
              isClearable={true}
              isSearchable={true}
              placeholder="Select device"
              options={selectDeviceOptions}
              value={selectDeviceValue}
              onChange={(selectedOption) =>
                setSelectDeviceValue(selectedOption)
              }
            />

            <div className="sm:pl-24">
              <div
                id="input-dimentions"
                className="w-1/2 flex sm:flex-row flex-col space-x-3 justify-center items-center"
              >
                <LabeledInputFieldNumber
                  name="input-width"
                  label="WIDTH"
                  required={
                    inputHeight > 0 &&
                    (!selectDeviceValue || !selectDeviceValue.value)
                  }
                  value={inputWidth}
                  onChangeInput={(e) => setInputWidth(e.target.value)}
                  min={1}
                  disabled={selectDeviceValue && selectDeviceValue.value}
                />
                <LabeledInputFieldNumber
                  name="input-height"
                  label="HEIGHT"
                  required={
                    inputWidth > 0 &&
                    (!selectDeviceValue || !selectDeviceValue.value)
                  }
                  value={inputHeight}
                  onChangeInput={(e) => setInputHeight(e.target.value)}
                  min={1}
                  disabled={selectDeviceValue && selectDeviceValue.value}
                />
              </div>
              <label
                htmlFor="input-dimentions"
                className="text-gray-500 text-xs"
              >
                WARNING: Values in pixels. These values are ignored if a device.
                is selected
              </label>
            </div>
          </div>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="h-5 w-5"
              checked={checkLandscape}
              onChange={(e) => setCheckLandscape(e.target.checked)}
            />
            <span className="ml-2 text-gray-700">Landscape</span>
          </label>
        </div>
        <div className="flex items-center my-3 mx-5">
          <ButtonActionPrimary
            text="Crawl"
            type="submit"
            disabled={processing}
          />
          <img
            src={GeneratePdfImage}
            alt="← Generate PDF"
            className="mx-4 h-32"
          />
        </div>
      </form>

      <div className="my-2 mx-5 font-bold">
        {processing === true && (
          <span className="">
            Processing{' '}
            <span role="img" aria-label="praying">
              🙏
            </span>
          </span>
        )}
        {fileName.length > 0 && (
          <ButtonActionOutlineSecondary
            text="Download"
            handleClick={onDownloadClick}
          />
        )}
        {errorMessage.length > 0 && (
          <span className="text-red-600">{errorMessage}</span>
        )}
      </div>

      <CreatedBy />
    </div>
  );
}
