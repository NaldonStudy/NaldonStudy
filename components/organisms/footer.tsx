'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Heart, BookOpen } from 'lucide-react'
import { useI18n } from '@/hooks/use-i18n'

export function Footer() {
  const { dict } = useI18n()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-12 px-4 border-t border-border">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 items-center gap-6"
        >
          {/* Left Column - Empty to maintain centering */}
          <div className="hidden md:block" />

          {/* Center Column - Social Links */}
          <div className="flex items-center justify-center gap-4">
            <a
              href="https://github.com/NaldonStudy"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/도훈-김-6b56993a2"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://velog.io/@naldon_study"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              aria-label="Velog"
            >
              <BookOpen className="w-5 h-5" />
            </a>
            <a
              href="mailto:luckyboyhoon@naver.com"
              className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>

          {/* Right Column - Logo & Copyright */}
          <div className="text-center md:text-right">
            <h3 className="text-xl font-bold text-foreground">DH.Kim</h3>
            <p className="text-sm text-muted-foreground mt-1">
              © {currentYear} {dict.footer.rights}
            </p>
          </div>
          </motion.div>

        {/* Back to Top */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8 text-center"
        >
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ↑ {dict.footer.backToTop}
          </button>
        </motion.div>
      </div>
    </footer>
  )
}
