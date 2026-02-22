<div align="center">
  <img src="assets/images/android-icon-foreground.png" width="128" alt="App icon" />

# jamsuy

A React Native mobile layout assignment built with **Expo** — plus a music player screen added for fun.

![Expo](https://img.shields.io/badge/Expo-SDK%2054-000020?logo=expo&logoColor=white&style=plastic)
![React Native](https://img.shields.io/badge/React%20Native-0.81-61DAFB?logo=react&logoColor=black&style=plastic)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white&style=plastic)
![React Compiler](https://img.shields.io/badge/React%20Compiler-enabled-brightgreen?style=plastic)


https://github.com/user-attachments/assets/3232888b-1e9c-417e-b82e-bfacac2a1c04

</div>

---

## Overview

This project is a university Mobile App Development assignment. The task was to implement a single mobile screen in React Native based on a provided design, covering layout structure, styling, and component organization.

The required screen consists of four sections: a square profile image with a label, a horizontal two-button tab bar that triggers an alert on press, a 2×3 image grid using local assets, and a full-width bottom action button.

The **Explore** tab (music player) is an extra screen built for fun — not part of the assignment.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) ≥ 20
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- iOS Simulator / Android Emulator, or the [Expo Go](https://expo.dev/go) app

### Install

```bash
npm install
```

### Run

```bash
# Start the dev server (scan QR with Expo Go or press i/a for simulator)
npm start

# iOS simulator directly
npm run ios

# Android emulator directly
npm run android
```

> [!NOTE]
> `expo-symbols` (used for the play/pause icon) is iOS-only. On Android and Web, emoji fallback characters are used automatically.

## Code Quality

Run [react-doctor](https://www.react.doctor) to check for React-specific issues:

```bash
npx -y react-doctor@latest . --verbose --diff
```

https://github.com/user-attachments/assets/07cc88d9-9589-44c3-aa73-5d603cb1c570
