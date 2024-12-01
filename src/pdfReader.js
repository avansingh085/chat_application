import React, { useEffect, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";

// Use CDN for pdf.worker.min.js
pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.8.69/pdf.worker.min.js";

const PdfViewer = ({ file }) => {
  const canvasRef = useRef(null); // Ref for the canvas to render the PDF
  const [loading, setLoading] = useState(true); // Loading state for the PDF
  const [pdfDoc, setPdfDoc] = useState(null); // PDF document state

  useEffect(() => {
    const renderPDF = async () => {
      if (!file) return;

      try {
        // Create a file reader to read the selected file as a Data URL
        const reader = new FileReader();
        reader.onload = async (event) => {
          const pdfData = new Uint8Array(event.target.result);
          
          // Fetch the PDF document
          const pdf = await pdfjsLib.getDocument(pdfData).promise;
          setPdfDoc(pdf); // Store the PDF document

          // Get the first page of the PDF
          const page = await pdf.getPage(1);
          
          // Set the scale of the PDF rendering
          const scale = 1.5;
          const viewport = page.getViewport({ scale });

          // Set canvas size based on the PDF page's viewport
          const canvas = canvasRef.current;
          const context = canvas.getContext("2d");
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          // Render the page to the canvas
          await page.render({
            canvasContext: context,
            viewport: viewport,
          });

          setLoading(false); // Once rendering is complete, update the loading state
        };

        reader.readAsArrayBuffer(file);
      } catch (error) {
        console.error("Error rendering PDF:", error);
        setLoading(false);
      }
    };

    renderPDF();

    // Cleanup function if necessary
    return () => {
      setLoading(true);
    };
  }, [file]); // Re-run if the file changes

  return (
    <div>
      {loading ? (
        <div>Loading...</div> // Show a loading message until the PDF is rendered
      ) : (
        <canvas ref={canvasRef} /> // Render the canvas with the PDF page
      )}
    </div>
  );
};

const App = () => {
  const [selectedFile, setSelectedFile] = useState(null); // State for the selected file

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the first file
    if (file) {
      setSelectedFile(file); // Set the selected file in the state
    }
  };

  return (
    <div>
      <h1>PDF Viewer</h1>

      {/* File input to select the PDF file */}
      <input type="file" accept="application/pdf" onChange={handleFileChange} />

      {/* Render the PdfViewer component if a file is selected */}
      {selectedFile && <PdfViewer file={selectedFile} />}
    </div>
  );
};

export default App;
