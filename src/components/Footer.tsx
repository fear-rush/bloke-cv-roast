import { Github } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const githubUrl = "https://github.com/fear-rush/bloke-cv-roast"

  return (
    <footer className="w-full p-4 bg-white">
      <div className="container mx-auto flex justify-center items-center">
        <p className="text-sm text-gray-600">
          &copy; {currentYear} fear-rush & 0xrsydn. All rights reserved.
        </p>
        <Link href={githubUrl} target="_blank" rel="noopener noreferrer">
          <Button variant="ghost" size="icon" className="ml-2">
            <Github className="h-6 w-6 text-gray-600 hover:text-gray-800" />
          </Button>
        </Link>
      </div>
    </footer>
  )
}
