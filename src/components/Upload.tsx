"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useRoastResume } from "@/hooks/useRoastResume"
import { Loader2 } from "lucide-react"

export function Upload() {
  const [file, setFile] = useState<File | null>(null)
  const [submit, setSubmit] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const language = "id" // Assuming language is "id"

  const { streamData, isLoading, error } = useRoastResume(file, language, submit)

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile)
      setSubmit(false)
    } else {
      alert("Please select a PDF file.")
      setFile(null)
      setSubmit(false)
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!file) {
      alert("Please select a file before submitting.")
      return
    }
    setSubmit(true)
  }

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <Card className="text-center w-full max-w-6xl bg-white border border-gray-200 shadow-md">
        <CardHeader>
          <CardTitle className="text-gray-800">Upload Your CV</CardTitle>
          <CardDescription className="text-gray-600">
            Upload your CV in PDF format for review
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center items-center space-y-4"
          >
            <div className="w-full sm:w-1/2 gap-1.5">
              <Input
                ref={fileInputRef}
                id="cv"
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={handleFileChange}
              />
              <Button
                type="button"
                onClick={handleButtonClick}
                className="w-full bg-blue-500 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                disabled={isLoading}
              >
                {file ? "Change File" : "Select File"}
              </Button>
              {file && (
                <p className="mt-2 text-sm text-gray-600">
                  Selected file: {file.name}
                </p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full sm:w-1/2 bg-green-500 text-white hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              disabled={!file || isLoading}
            >
              {isLoading ? "Uploading..." : "Upload"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {(isLoading || streamData || error) && (
        <Card className="w-full max-w-6xl mt-4">
          <CardContent>
            <div className="mt-4">
              {error && <p className="text-red-500 text-center">{error}</p>}
              {isLoading && (
                <div className="flex flex-col justify-center items-center">
                  <p className="text-red-500 text-center text-sm sm:text-base px-2 py-1 bg-red-100 rounded-md">
                    Content Warning: The following roast contains harsh content.
                  </p>
                  <Loader2 className="h-20 w-20 mt-4 animate-spin text-blue-500" />
                </div>
              )}
              {streamData && (
                <div className="space-y-2">
                  <pre className="whitespace-pre-wrap">{streamData}</pre>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}