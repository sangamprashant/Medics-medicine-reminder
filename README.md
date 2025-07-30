# 💊 Medicine Reminder App

A simple and beautiful React Native app built with Expo to help users manage their medicine schedules effectively. The app sends timely reminders and keeps track of medicine intake for improved health management.

---

## 📱 Features

- 🕒 Schedule multiple medicines with time and dosage
- 🔔 Automatic reminders via notifications
- 📆 Daily schedule overview
- 📋 Home screen with upcoming medicine alerts
- 🌙 Light & dark theme support (optional)
- 💾 Data persistence using local storage
- ⚙️ Built with modern tools (Expo Router, NativeWind, TypeScript)

---

## 🚀 Tech Stack

- **React Native** with **Expo**
- **TypeScript**
- **NativeWind (Tailwind CSS for React Native)**
- **Expo Router** for navigation
- **AsyncStorage** or **SQLite** for local data
- **Expo Notifications** for scheduling reminders

---

## 📦 Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/medicine-reminder-app.git
cd medicine-reminder-app
````

2. Install dependencies:

```bash
npm install
# or
yarn
```

3. Start the app:

```bash
npx expo start
```

> Make sure you have the **Expo Go app** installed on your mobile device for testing.

---

## 🔔 Setting up Notifications

To enable notifications:

1. Install notifications library:

```bash
npx expo install expo-notifications
```

2. Follow [Expo Notifications Setup Guide](https://docs.expo.dev/versions/latest/sdk/notifications/) for permissions and scheduling.

---

## 🛠 Configuration

### Babel

> Ensure you are using the correct plugin:

In `babel.config.js`:

```js
plugins: ['react-native-worklets/plugin']
```

If you see warnings about `react-native-reanimated/plugin`, replace it as shown above and run:

```bash
npm install react-native-worklets
```

---

## 📸 Screenshots

| Home Screen                   | Schedule Medicines                    |
| ----------------------------- | ------------------------------------- |
| ![Home](screenshots/home.png) | ![Schedule](screenshots/schedule.png) |

---

## 📅 Future Enhancements

* Cloud sync (Firebase or Supabase)
* Support for multiple users
* Refill reminders
* Voice assistant integration

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/xyz`)
3. Commit your changes (`git commit -am 'Add feature xyz'`)
4. Push to the branch (`git push origin feature/xyz`)
5. Create a new Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## ✨ Credits

Created by Prashant Srivastav, Inspired by the need to stay on top of your daily medications.
