"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import { FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";

interface TeamMember {
  name: string;
  role: string;
  image: string | StaticImageData;
  about: string;
  socials: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    github?: string;
  };
}

const PLACEHOLDER = "/images/placeholder-avatar.png";

const teamMembers: TeamMember[] = [
  {
    name: "Mohammed Osman",
    role: "Core team",
    image: "/team/osman.jpg",
    about:
      "Life moves quickly, often without warning. One day, everything feels familiar and comfortable, and the next, change arrives like a wave. It's easy to feel overwhelmed, but there's beauty in uncertainty. Growth often comes from discomfort, and challenges can reveal hidden strengths. The key is to stay grounded, breathe deeply, and trust the process. Even small steps forward count as progress. Time doesn't stop, but neither does your ability to adapt. Keep learning, keep moving, and remember that every experience shapes who you are becoming. Embrace the journey—it's yours alone, and it's worth every step.",
    socials: {
      linkedin: "https://linkedin.com/in/syedadnanali99/",
      twitter: "https://x.com",
      instagram: "https://instagram.com",
      github: "https://github.com/Adnan-The-Coder",
    },
  },
  {
    name: "jhwbfibaesi fc",
    role: "",
    image: "/team/",
    about:
      "Life moves quickly, often without warning. One day, everything feels familiar and comfortable, and the next, change arrives like a wave. It's easy to feel overwhelmed, but there's beauty in uncertainty. Growth often comes from discomfort, and challenges can reveal hidden strengths. The key is to stay grounded, breathe deeply, and trust the process. Even small steps forward count as progress. Time doesn't stop, but neither does your ability to adapt. Keep learning, keep moving, and remember that every experience shapes who you are becoming. Embrace the journey—it's yours alone, and it's worth every step.",
    socials: {
      linkedin: "https://linkedin.com",
      twitter: "https://x.com",
      instagram: "https://instagram.com",
      github: "https://github.com",
    },
  },
  {
    name: "aefjeifa fjk jk",
    role: "",
    image: "/team/",
    about:
      "Life moves quickly, often without warning. One day, everything feels familiar and comfortable, and the next, change arrives like a wave. It's easy to feel overwhelmed, but there's beauty in uncertainty. Growth often comes from discomfort, and challenges can reveal hidden strengths. The key is to stay grounded, breathe deeply, and trust the process. Even small steps forward count as progress. Time doesn't stop, but neither does your ability to adapt. Keep learning, keep moving, and remember that every experience shapes who you are becoming. Embrace the journey—it's yours alone, and it's worth every step.",
    socials: {
      linkedin: "https://linkedin.com",
      twitter: "https://x.com",
      instagram: "https://instagram.com",
      github: "https://github.com",
    },
  },
  {
    name: "advegavgehdgd",
    role: "",
    image: "/team/",
    about:
      "Life moves quickly, often without warning. One day, everything feels familiar and comfortable, and the next, change arrives like a wave. It's easy to feel overwhelmed, but there's beauty in uncertainty. Growth often comes from discomfort, and challenges can reveal hidden strengths. The key is to stay grounded, breathe deeply, and trust the process. Even small steps forward count as progress. Time doesn't stop, but neither does your ability to adapt. Keep learning, keep moving, and remember that every experience shapes who you are becoming. Embrace the journey—it's yours alone, and it's worth every step.",
    socials: {
      linkedin: "https://linkedin.com",
      twitter: "https://x.com",
      instagram: "https://instagram.com",
      github: "https://github.com",
    },
  },
  {
    name: "ae ekaeqjnknsj c ",
    role: "",
    image: "/team/",
    about:
      "Life moves quickly, often without warning. One day, everything feels familiar and comfortable, and the next, change arrives like a wave. It's easy to feel overwhelmed, but there's beauty in uncertainty. Growth often comes from discomfort, and challenges can reveal hidden strengths. The key is to stay grounded, breathe deeply, and trust the process. Even small steps forward count as progress. Time doesn't stop, but neither does your ability to adapt. Keep learning, keep moving, and remember that every experience shapes who you are becoming. Embrace the journey—it's yours alone, and it's worth every step.",
    socials: {
      linkedin: "https://linkedin.com",
      twitter: "https://x.com",
      instagram: "https://instagram.com",
      github: "https://github.com",
    },
  },
  {
    name: "ke evlk d k",
    role: "",
    image: "/team/",
    about:
      "Life moves quickly, often without warning. One day, everything feels familiar and comfortable, and the next, change arrives like a wave. It's easy to feel overwhelmed, but there's beauty in uncertainty. Growth often comes from discomfort, and challenges can reveal hidden strengths. The key is to stay grounded, breathe deeply, and trust the process. Even small steps forward count as progress. Time doesn't stop, but neither does your ability to adapt. Keep learning, keep moving, and remember that every experience shapes who you are becoming. Embrace the journey—it's yours alone, and it's worth every step.",
    socials: {
      linkedin: "https://linkedin.com",
      twitter: "https://x.com",
      instagram: "https://instagram.com",
      github: "https://github.com",
    },
  },
];

function normalizeImageSrc(
  src: string | StaticImageData | undefined
): string | StaticImageData {
  if (!src) return PLACEHOLDER;
  if (typeof src !== "string") {
    // @ts-expect-error
    if (src?.src) return src;
    return PLACEHOLDER;
  }
  const s = src.trim();
  if (!s) return PLACEHOLDER;
  try {
    const u = new URL(s);
    if (u.protocol === "http:" || u.protocol === "https:") return u.href;
  } catch {}
  if (s.startsWith("public/")) {
    const withoutPublic = s.replace(/^public\//, "/");
    if (withoutPublic.endsWith("/")) return PLACEHOLDER;
    return withoutPublic;
  }
  if (s.startsWith("/")) {
    if (s.endsWith("/")) return PLACEHOLDER;
    return s;
  }
  if (s.match(/\.(jpg|jpeg|png|webp|svg)$/i)) {
    return `/${s}`;
  }
  return PLACEHOLDER;
}

const TeamPage: React.FC = () => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const closeModal = () => setSelectedMember(null);

  return (
    <div>
      <div className="relative min-h-screen bg-[#0a0a0a] px-6 py-20">
        <h1 className="mb-12 text-center text-4xl font-bold text-white">
          Meet Our Team
        </h1>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name || index}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedMember(member)}
              className="group relative flex cursor-pointer flex-col overflow-hidden rounded-lg bg-[#1B1B1B] shadow-lg"
            >
              <Image
                src={normalizeImageSrc(member.image)}
                alt={member.name}
                width={700}
                height={500}
                className="h-80 w-full object-cover transition-opacity duration-300 group-hover:opacity-80"
                unoptimized={false}
              />
              <div className="p-4 text-center">
                <h2 className="text-xl font-bold text-white">{member.name}</h2>
                <p className="mt-2 text-sm text-gray-400">{member.role}</p>
                <div className="mt-4 flex justify-center space-x-4">
                  {member.socials.linkedin && (
                    <a
                      href={member.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-2xl text-blue-500 hover:text-blue-400"
                    >
                      <FaLinkedin />
                    </a>
                  )}
                  {member.socials.twitter && (
                    <a
                      href={member.socials.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-2xl text-blue-500 hover:text-blue-400"
                    >
                      <BsTwitterX />
                    </a>
                  )}
                  {member.socials.instagram && (
                    <a
                      href={member.socials.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-2xl text-blue-500 hover:text-blue-400"
                    >
                      <FaInstagram />
                    </a>
                  )}
                  {member.socials.github && (
                    <a
                      href={member.socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-2xl text-blue-500 hover:text-blue-400"
                    >
                      <FaGithub />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedMember && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
              onClick={closeModal}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="relative m-4 flex w-full max-w-4xl flex-col rounded-lg bg-[#1b1b1b] p-6 shadow-lg lg:flex-row lg:items-center"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={closeModal}
                  className="absolute right-4 top-4 text-3xl text-white"
                >
                  &times;
                </button>

                <Image
                  src={normalizeImageSrc(selectedMember.image)}
                  alt={selectedMember.name}
                  width={700}
                  height={500}
                  className="h-80 w-full flex-shrink-0 rounded-lg object-cover lg:h-auto lg:w-1/3"
                />

                <div className="flex flex-col justify-center lg:ml-8">
                  <h2 className="mt-4 text-3xl font-bold text-white lg:mt-0">
                    {selectedMember.name}
                  </h2>
                  <p className="mt-2 text-lg text-gray-300">
                    {selectedMember.role}
                  </p>
                  <p className="mt-4 text-sm text-gray-400">
                    {selectedMember.about}
                  </p>

                  <div className="mt-6 flex space-x-4">
                    {selectedMember.socials.linkedin && (
                      <a
                        href={selectedMember.socials.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-2xl text-blue-500 hover:text-blue-400"
                      >
                        <FaLinkedin />
                      </a>
                    )}
                    {selectedMember.socials.twitter && (
                      <a
                        href={selectedMember.socials.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-2xl text-blue-500 hover:text-blue-400"
                      >
                        <BsTwitterX />
                      </a>
                    )}
                    {selectedMember.socials.instagram && (
                      <a
                        href={selectedMember.socials.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-2xl text-blue-500 hover:text-blue-400"
                      >
                        <FaInstagram />
                      </a>
                    )}
                    {selectedMember.socials.github && (
                      <a
                        href={selectedMember.socials.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-2xl text-blue-500 hover:text-blue-400"
                      >
                        <FaGithub />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-12" />
      </div>
    </div>
  );
};

export default TeamPage;
