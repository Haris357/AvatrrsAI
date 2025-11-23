"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';

const footerLinks = {
  Product: [
    { name: 'Resume Builder', href: '#' },
    { name: 'Portfolio Creator', href: '#' },
    { name: 'AI Digital Twin', href: '#' },
    { name: 'Job Finder', href: '#' },
    { name: 'Proposal Generator', href: '#' }
  ],
  Resources: [
    { name: 'Blog', href: '#' },
    { name: 'Help Center', href: '#' },
    { name: 'Career Tips', href: '#' },
    { name: 'Templates', href: '#' },
    { name: 'API Documentation', href: '#' }
  ],
  Company: [
    { name: 'About', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Contact', href: '#' },
    { name: 'Press', href: '#' },
    { name: 'Partners', href: '#' }
  ],
  Legal: [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'Cookie Policy', href: '#' },
    { name: 'GDPR', href: '#' }
  ]
};

export function Footer() {
  return (
    <footer className="bg-black text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Link href="/" className="text-2xl font-bold">
                Avatrr
              </Link>
              <p className="text-gray-400 mt-4 text-sm leading-relaxed">
                The complete AI-powered platform for building your professional presence 
                and accelerating your career.
              </p>
            </motion.div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <h3 className="font-semibold text-white mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="border-t border-gray-800 mt-16 pt-8 text-center"
        >
          <p className="text-gray-400 text-sm">
            © 2025 Avatrr. All rights reserved. Built with ❤️ for professionals worldwide.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}