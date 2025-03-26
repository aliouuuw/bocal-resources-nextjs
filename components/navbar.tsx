"use client"

import { Button } from './ui/button'
import { Moon, Sun, X, Menu } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useAuth } from '@/lib/authism/hooks/use-auth'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const { isAuthenticated } = useAuth()
  const pathname = usePathname()
  
  useEffect(() => {
    setMounted(true)
  }, [isAuthenticated])

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const navItems = [
    { name: "About", href: "/about" },
    { name: "Work", href: "/work" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <nav className="w-full bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold">
              Bocal
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden space-x-4 md:flex">
            {navItems.map((item) => (
              <Button key={item.name} variant="navlink" active={pathname === item.href} asChild>
                <Link href={item.href}>{item.name}</Link>
              </Button>
            ))}
            {isAuthenticated ? (
              <Button variant="navlink" onClick={() => router.push("/admin")}>Dashboard</Button>
            ) : null}
            <Button variant="ghost" onClick={toggleTheme} className="text-foreground hover:text-primary">
              {mounted ? (
                theme === 'dark' ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )
              ) : (
                // Fallback icon while not mounted (prevents hydration mismatch)
                <div className="h-5 w-5" />
              )}
            </Button>  
          </div>

          {/* Mobile Menu Button */}
          <Button className="md:hidden" variant="link" size="icon" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="flex flex-col space-y-2 pb-4 pt-2">
              {navItems.map((item) => (
                <Button
                  key={item.name}
                  variant="navlink"
                  active={pathname === item.href}
                  className="justify-start"
                  asChild
                  onClick={() => setIsOpen(false)}
                >
                  <Link href={item.href}>{item.name}</Link>
                </Button>
              ))}
              {isAuthenticated ? (
                <Button 
                  variant="navlink" 
                  className="justify-start"
                  onClick={() => {
                    router.push("/admin");
                    setIsOpen(false);
                  }}
                >
                  Dashboard
                </Button>
              ) : null}
              <Button variant="ghost" onClick={toggleTheme} className="text-foreground hover:text-primary">
                {mounted ? (
                  theme === 'dark' ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )
                ) : (
                  // Fallback icon while not mounted (prevents hydration mismatch)
                  <div className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

