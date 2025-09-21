# 💊 Medics – Medicine Reminder

Medics is a **medicine reminder app** that helps you stay on track with your prescriptions and health routines.  
It comes with a **React Native (Expo)** mobile app and a **React + Tailwind (Vite)** landing site.

---

## 📱 Mobile App (`medicine-reminder`)

The mobile app is built using **Expo + React Native** with modern tools for reminders and notifications.

### ✨ Features
- 🗓️ **Set Reminders** – Schedule medicines by date & time  
- 🔔 **Notifications** – Get push alerts for upcoming doses  
- 📊 **Calendar View** – Track your medicine history  
- 💾 **Offline Support** – Uses SQLite for local storage  
- 👋 **Onboarding** – Guided introduction for first-time users  

### 🚀 Tech Stack
- [Expo Router](https://expo.github.io/router/) – File-based navigation  
- [Expo Notifications](https://docs.expo.dev/versions/latest/sdk/notifications/) – Local + push reminders  
- [SQLite](https://docs.expo.dev/versions/latest/sdk/sqlite/) – Local database  
- [React Native Calendars](https://github.com/wix/react-native-calendars) – Calendar UI  
- [React Native Paper](https://callstack.github.io/react-native-paper/) – Material UI components  

### ▶️ Run Locally
```bash
# Go to the app folder
cd medicine-reminder

# Install dependencies
npm install

# Start development server
npm start
````

---

## 🌐 Website (`medicine-reminder-web`)

The website is the **landing page** for the app.
Built with **Vite + React + Tailwind**, it showcases the app, provides downloads, and hosts the privacy policy.

### ✨ Features

* 🎯 **Hero Section** – Clear introduction
* 📖 **Privacy Policy** – Accessible for compliance
* 📥 **Download Section** – Direct APK download / store links
* ⚡ **Fast + Responsive** – Powered by Tailwind CSS

### 🚀 Tech Stack

* [React](https://react.dev/) – UI library
* [Vite](https://vitejs.dev/) – Fast build tool
* [Tailwind CSS](https://tailwindcss.com/) – Styling
* [React Router](https://reactrouter.com/) – Routing

### ▶️ Run Locally

```bash
# Go to the site folder
cd medicine-reminder-web

# Install dependencies
npm install

# Start dev server
npm run dev
```

---

## 📂 Repository Structure

```
Medics-medicine-reminder/
│
├── medicine-reminder/        # 📱 React Native (Expo) App
│   ├── app/                  # Screens & navigation
│   ├── assets/               # App icons, splash, etc.
│   ├── package.json
│   └── ...
│
├── medicine-reminder-web/    # 🌐 Landing Page Website
│   ├── public/               # Favicon, meta, manifest
│   ├── src/                  # React + Tailwind source
│   ├── package.json
│   └── ...
│
└── README.md
```

---

## 📜 Privacy Policy

The app's privacy policy is available on the [website](./medicine-reminder-web/src/pages/PrivicyPolicy.tsx).

---

## 📥 Download

* 🛒 **Play Store:** (coming soon)
* 🌐 **Website:** [Medicine Reminder Site](https://medics.techorbitals.in/)

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repo
2. Create a new branch (`feature/my-feature`)
3. Commit changes
4. Open a pull request

---

## 📄 License

This project is licensed under the **MIT License**.
You’re free to use, modify, and distribute it with attribution.

---

## 👨‍💻 Author

**Prashant Srivastav**
MERN Stack Developer | React Native Enthusiast
📧 [srivastavprashant.ps.official@gmail.com](mailto:srivastavprashant.ps.official@gmail.com)
🌐 [Portfolio](https://prashant.techorbitals.in)

