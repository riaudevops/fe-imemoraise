<div align="center" style="margin-bottom: 59px;">
    This repository houses the <b>frontend code</b> for iMemoraise, the Integrated Quran Memorization Information System.
    </br>
    🔥 Designed to streamline the recitation submission process, particularly for UIN Suska Riau. 🔥
</div>

<div align="center" style="margin-bottom: 59px;">
  <a href="https://github.com/riaudevops/fe-imemoraise">
    <img width="650px" src="https://github.com/mfarhanz1/mfarhanz1/blob/master/FE-RTDVBTS-V3.png" alt="RTNEPSQL Logo" />
  </a>
</div>

<p align="center">
  iMemoraise: Integrated Quran Memorization Information System UIN Suska Riau
  </br> 
  <i>(build with 💚💜 using: React TS + TailwindCSS + DaisyUI + Vite + Bun)</i>
</p>

<div align="center">
  <a href="https://circleci.com/gh/riaudevops/fe-imemoraise">
    <img src="https://img.shields.io/circleci/project/github/riaudevops/fe-imemoraise/master.svg?style=flat-square" alt="CircleCI branch" />
  </a>
  <a href="https://github.com/riaudevops/fe-imemoraise/network">
    <img src="https://img.shields.io/github/forks/riaudevops/fe-imemoraise.svg" alt="GitHub Forks" />
  </a>
  <a href="https://github.com/riaudevops/fe-imemoraise/stargazers">
    <img src="https://img.shields.io/github/stars/riaudevops/fe-imemoraise.svg" alt="GitHub Stars" />
  </a>
  <a href="https://github.com/riaudevops/fe-imemoraise/issues">
    <img src="https://img.shields.io/github/issues/riaudevops/fe-imemoraise.svg" alt="GitHub Issues" />
  </a>
  <a href="https://github.com/riaudevops/fe-imemoraise/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/riaudevops/fe-imemoraise.svg" alt="GitHub License" />
  </a>
  <a href="https://coveralls.io/github/riaudevops/fe-imemoraise">
    <img src="https://coveralls.io/repos/github/riaudevops/fe-imemoraise/badge.svg" alt="Coverage Status" />
  </a>
</div>

---

[underconstruction]: https://img.shields.io/badge/Status-WIP-FFFF00?style=for-the-badge&logoColor=FFFF00

## ✨ What’s the deal with iMemoraise? ✨ // ✧˚ ༘ ⋆｡♡˚ ![underconstruction][underconstruction]

**iMemoraise** _(Integrated Quran Memorization Information System)_ is a comprehensive web application created to enhance the management and tracking of Quran recitations. This system is specifically designed to support educational institutions in overseeing and recording students' recitations, **which are mandatory for progressing to internships, seminars, final projects, and other academic activities.** By providing a streamlined platform for tracking these essential recitations, iMemoraise simplifies the administrative process, ensuring that all requirements are met efficiently. This application is particularly tailored for use at [UIN Suska Riau](https://www.uin-suska.ac.id/), _where it aids in managing students' academic progress and compliance_ with Quran memorization prerequisites.

---

## ⚙️ Before You Begin

Before you start, we recommend you familiarize yourself with the basic components needed to build a React TypeScript application using Vite, Bun, DaisyUI, and TailwindCSS:

- **React TypeScript** - Begin with the [React Official Website](https://reactjs.org/). The [Getting Started](https://reactjs.org/docs/getting-started.html) guide is very useful, and the [React TypeScript Cheatsheets](https://react-typescript-cheatsheet.netlify.app/) provide additional tips for using TypeScript with React.
- **Vite** - Learn about Vite from the [Vite Official Website](https://vitejs.dev/). The [Getting Started](https://vitejs.dev/guide/) guide will help you set up your project quickly.
- **Bun** - Visit the [Bun Official Website](https://bun.sh/) for information on Bun, a fast JavaScript runtime. Check out the [Getting Started](https://bun.sh/docs/getting-started) guide for installation and usage instructions.
- **TailwindCSS** - Start with the [TailwindCSS Official Website](https://tailwindcss.com/). The [Documentation](https://tailwindcss.com/docs) offers a detailed guide on how to use TailwindCSS in your projects.
- **DaisyUI** - Explore DaisyUI through its [Official Website](https://daisyui.com/). The [Documentation](https://daisyui.com/docs) provides a comprehensive guide on how to use DaisyUI components with TailwindCSS.

## 📝 Prerequisites

Ensure you have the following prerequisites installed on your development machine:

- **Git** - [Download & Install Git](https://git-scm.com/downloads). Git is commonly pre-installed on OSX and Linux machines.
- **Node.js** - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager. For installation issues, you can refer to this [GitHub Gist](https://gist.github.com/isaacs/579814) for guidance.
- **Bun** - [Download & Install Bun](https://bun.sh/) for a fast JavaScript runtime environment.
- **TailwindCSS** - Install TailwindCSS via bun. After installing Node.js and bun, follow the [official TailwindCSS installation guide](https://tailwindcss.com/docs/installation) to set it up.
- **DaisyUI** - Install DaisyUI via Bun. After setting up Node.js and Bun, follow the [DaisyUI documentation](https://daisyui.com/docs) to integrate DaisyUI components with TailwindCSS for enhanced styling.

---

## 🚀 Key Features of iMemoraise

iMemoraise is designed to enhance the management and tracking of Quran recitations for Academic Advisors and students. Here are the main features provided:

**For Academic Advisors:**

- **Recitation Management:** Monitor and track the progress of students' Quran recitations under their guidance. Review the completeness and accuracy of memorization progress.
- **Approval Process:** Listen to students' offline Quran recitations and assess their memorization progress, then approve or reject the recitations based on your assessment. Provide feedback directly to students to ensure they meet the required standards.

**For Students:**

- **Progress Tracking:** Keep an eye on the status of each recitation you’ve submitted later, monitor your own progress and view updates on the status of your recitations based on feedback from Academic Advisors. Students submit their recitations offline, and no online submission is required.

## 👣 Usage Scenario

iMemoraise uses Keycloak for identity and access management. Keycloak handles authentication and authorization, providing secure access through its OAuth2 and OpenID Connect protocols.

**Here’s a simple scenario for logging in as an Academic Advisor or student:**

- **Account Setup:** Academic Advisors are assigned roles via Keycloak, which sets up accounts with default credentials. Advisors can reset their passwords for enhanced security.
- **Login:** Users authenticate via Keycloak using their credentials.
- **For Academic Advisors:** Manage and monitor offline recitations, approve or reject submissions based on your evaluation, then provide live feedback to students to help them meet the required memorization standards.
- **For Students:** Track your recitation progress and receive feedback on your offline submissions.

## 🤝 Contributing

Contributions are crucial for improving iMemoraise. We welcome and value any help or suggestions.

To contribute, fork the repository, create a pull request, or open a new issue to discuss potential enhancements. Don’t forget to star the repository if you find it helpful! Thank you for your support!

---

## 📙 License

[No-License](LICENSE.md) // ✧˚ ༘ ⋆｡♡˚
[![License](https://img.shields.io/github/license/riaudevops/fe-imemoraise.svg)](https://github.com/riaudevops/fe-imemoraise/blob/master/LICENSE)
