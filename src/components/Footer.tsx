"use client"

import { Github, ChevronDown } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"

export function Footer() {
  const currentYear = new Date().getFullYear()
  const [selectedUser, setSelectedUser] = useState("user1")

  const githubUsers = {
    user1: "https://github.com/fear-rush",
    user2: "https://github.com/0xrsydn"
  }

  return (
    <footer className="w-full p-4 bg-white">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="p-0">
                <Github className="h-6 w-6 text-gray-600 hover:text-gray-800" />
                <ChevronDown className="h-4 w-4 ml-1 text-gray-600" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-40 p-0">
              <Link href={githubUsers.user1} target="_blank" rel="noopener noreferrer">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => setSelectedUser("user1")}
                >
                  fear-rush
                </Button>
              </Link>
              <Link href={githubUsers.user2} target="_blank" rel="noopener noreferrer">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => setSelectedUser("user2")}
                >
                  0xrsydn
                </Button>
              </Link>
            </PopoverContent>
          </Popover>
        </div>
        <p className="text-sm text-gray-600">
          &copy; {currentYear} fear-rush & 0xrsydn. All rights reserved.
        </p>
      </div>
    </footer>
  )
}