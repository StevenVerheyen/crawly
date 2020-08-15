import React, { useState } from 'react';
import GeneratePdfImage from '../assets/images/generate.png';
import LabeledInputFieldText from '../external/react-uikit/Inputs/LabeledInputFieldText';
import ButtonActionPrimary from '../external/react-uikit/Buttons/ButtonActionPrimary';
import ButtonActionOutlineSecondary from '../external/react-uikit/Buttons/ButtonActionOutlineSecondary';
import TextHead from '../external/react-uikit/Labels/TextHead';
import { postCrawl, getDownloadPdf } from '../external/Requesty';
import download from 'downloadjs';

export default function Home() {
  const [fileName, setFileName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [processing, setProcessing] = useState(false);
  const [inputUrl, setInputUrl] = useState('');
  const [inputName, setInputName] = useState('');

  async function onCrawlClick(e) {
    e.preventDefault();
    setErrorMessage('');
    setFileName('');
    setProcessing(true);
    const body = JSON.stringify({
      name: inputName,
      website: inputUrl,
      format: 'A2',
      landscape: true,
    });
    const postJson = await postCrawl(body);
    console.log(postJson);
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
        <div className="flex sm:flex-row flex-col justify-center items-center mx-5">
          <LabeledInputFieldText
            type="url"
            name="input-url"
            label="URL"
            placeholder='Start with "https://www." or "http://www."'
            required={true}
            value={inputUrl}
            onChangeInput={(e) => setInputUrl(e.target.value)}
          />
          <span className="mx-2"></span>
          <LabeledInputFieldText
            type="text"
            name="input-name"
            label="Filename"
            required={true}
            value={inputName}
            onChangeInput={(e) => setInputName(e.target.value)}
          />
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

      <div className="w-full mt-16 mb-4">
        <p className="text-sm text-gray-500 text-center px-2">
          This project is created with ❤️ by{' '}
          <a
            href="https://www.stevenverheyen.be"
            className="text-green-500 hover:text-green-700"
          >
            Steven Verheyen
          </a>
        </p>
      </div>
    </div>
  );
}
