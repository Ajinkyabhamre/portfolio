"use client";
import React from "react";
import Image from "next/image";
import { profilePicBlurDataURL } from "@/lib/image-utils";
import Link from "next/link";
import { BsArrowRight, BsLinkedin } from "react-icons/bs";
import { HiDownload } from "react-icons/hi";
import { FaGithubSquare } from "react-icons/fa";
import { useSectionInView } from "@/lib/hooks";
import { useActiveSectionContext } from "@/context/active-section-context";
import styles from "@/styles/intro.module.css";
import clsx from "clsx";

export default function Intro() {
  const { ref } = useSectionInView("Home", 0.5);
  const { setActiveSection, setTimeOfLastClick } = useActiveSectionContext();
  return (
    <section
      ref={ref}
      id="home"
     className="mb-28 max-w-[50rem] text-center sm:mb-0 scroll-mt-[100rem]"
    >
      <div className="flex items-center justify-center">
        <div className="relative">
          <div className={styles.profilePic}>
            <Image
              src="/profilePic-400.webp"
              alt="Ajinkya Bhamre"
              width={192}
              height={192}
              quality={80}
              priority={true}
              placeholder="blur"
              blurDataURL={profilePicBlurDataURL}
              sizes="(max-width: 640px) 128px, 192px"
              className="h-50 w-40 rounded-full object-cover border-[0.35rem] border-white shadow-xl"
            />
          </div>
          <span
            className={clsx("absolute bottom-0 right-4 text-5xl", styles.waveEmoji)}
          >
            👋
          </span>
        </div>
      </div>

      <p
        className={clsx(
          "mb-10 mt-4 px-4 text-2xl font-medium !leading-[1.5] sm:text-4xl",
          styles.headline
        )}
      >
        <span className="font-bold">Hello, I'm Ajinkya.</span> I'm a{" "}
        <span className="font-bold">Full-Stack Developer</span> focused on{" "}
        <span className="italic">
          delivering high-quality web applications and services
        </span>
        .
      </p>
      <div
        className={clsx(
          "flex flex-col sm:flex-row items-center justify-center gap-2 px-4 text-lg font-medium",
          styles.cta
        )}
      >
        <Link
          href="#contact"
           className="group bg-gray-900 text-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 hover:bg-gray-950 active:scale-105 transition"
          onClick={() => {
            setActiveSection("Contact");
            setTimeOfLastClick(Date.now());
          }}
        >
          {" "}
          Contact me here{" "}
          <BsArrowRight className="opacity-70 group-hover:translate-x-1 transition" />
        </Link>
        <a
         className="group bg-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 active:scale-105 transition cursor-pointer borderBlack dark:bg-white/10"
          href="/Ajinkya_Bhamre_Resume.pdf"
          download="Ajinkya_Bhamre_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          Download Resume{" "}
          <HiDownload className="opacity-60 group-hover:translate-y-1 transition" />
        </a>
        <a
 className="bg-white p-4 text-gray-700 hover:text-gray-950 flex items-center gap-2 rounded-full focus:scale-[1.15] hover:scale-[1.15] active:scale-105 transition cursor-pointer borderBlack dark:bg-white/10 dark:text-white/60"
          href="https://www.linkedin.com/in/ajinkyabhamre/"
          target="_blank"
        >
          {" "}
          <BsLinkedin />{" "}
        </a>
        <a
          className="bg-white p-4 text-gray-700 flex items-center gap-2 text-[1.35rem] rounded-full focus:scale-[1.15] hover:scale-[1.15] hover:text-gray-950 active:scale-105 transition cursor-pointer borderBlack dark:bg-white/10 dark:text-white/60"
          href="https://github.com/Ajinkyabhamre?tab=repositories"
          target="_blank"
        >
          {" "}
          <FaGithubSquare />{" "}
        </a>
      </div>
    </section>
  );
}
