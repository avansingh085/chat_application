import React, { useState } from "react";
import axios from "axios";

function FileSharer() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileLink, setFileLink] = useState(null);
    const [viewLink, setViewLink] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            alert("Please select a file first!");
            return;
        }
        const formData = new FormData();
        formData.append("file", selectedFile);

        setIsLoading(true); // Set loading state to true

        try {
            const response = await axios.post("http://localhost:3001/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            const fileId = response.data.fileId;
            setFileLink(`http://localhost:3001/download/${fileId}`);
            setViewLink(`http://localhost:3001/view/${fileId}`);
        } catch (error) {
            console.error("Error uploading file:", error);
            alert("Failed to upload the file.");
        } finally {
            setIsLoading(false); 
        }
    };

    return (
        <div className="flex flex-col items-center p-6 bg-gray-100 rounded-lg shadow-md">
            <label
                htmlFor="file-input"
                className="cursor-pointer text-blue-500 hover:text-blue-700 font-bold mb-4"
            >
                Choose a file to share
            </label>
            <input
                id="file-input"
                type="file"
                className="hidden"
                onChange={handleFileChange}
            />

            {selectedFile && (
                <div className="mt-4 p-4 bg-white rounded-lg shadow w-full max-w-md">
                    <p className="text-gray-700 font-medium">Selected File:</p>
                    <p className="text-gray-600">{selectedFile.name}</p>
                </div>
            )}

            <button
                onClick={handleUpload}
                className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400"
                disabled={isLoading} // Disable the button while loading
            >
                {isLoading ? "Uploading..." : "Upload & Generate Links"}
            </button>

            {fileLink && (
                <div className="mt-4">
                    <p className="text-gray-700">Shareable Links:</p>
                    <a
                        href={viewLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                    >
                        View File
                    </a>
                    <br />
                    <a
                        href={fileLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                    >
                        Download File
                    </a>
                </div>
            )}
        </div>
    );
}

export default FileSharer;
