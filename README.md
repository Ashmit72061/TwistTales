# TwistTales

> A collaborative storytelling game where players create chaotic, fun short stories—one twist at a time.

---

## 🧠 Project Description

**TwistTales** is a web-based multiplayer storytelling game where creativity meets chaos. Players are given a story prompt (pretext) and asked to write exactly 100 words. However, the twist is: the next player only sees **the last sentence** of the previous story and continues from there. Once all players have contributed, the full story is revealed—often bizarre, hilarious, and unexpectedly delightful.

**Live Demo:** [https://twisttales.vercel.app](https://twisttales.vercel.app)

### 🎯 Target Audience

- Creative writers
- Party game lovers
- Ice-breaker activities for teams/classrooms
- Anyone who enjoys fun, unpredictable storytelling

### 🚀 Key Features

- Multiplayer short-story creation with minimal rules
- Real-time collaborative gameplay
- Display of full story at the end for laughs
- Clean, responsive UI
- Built using **React**, **TailwindCSS**, **Firebase**, and **CohereAI**

---

## ⚙️ Installation Instructions

### ✅ Prerequisites

- Node.js (v18 or above)
- npm or yarn
- Firebase account (or Auth and DB)

### 📦 Setup Steps

```bash
# Clone the repository
git clone https://github.com/Ashmit72061/TwistTales.git

# Navigate to the project directory
cd TwistTales

# Install dependencies
npm install
# OR if using Yarn
yarn install
```

---
### 🔐 Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
# 🔑 Cohere AI API Key
VITE_Cohere_Authorisation=your_cohere_api_key

# 🔥 Firebase Project Configuration
VITE_Api_Key=your_firebase_api_key
VITE_Auth_Domain=your_project.firebaseapp.com
VITE_Project_ID=your_project_id
VITE_Storage_Bucket=your_project.appspot.com
VITE_Messaging_Sender_ID=your_messaging_sender_id
VITE_App_ID=your_app_id
VITE_Measurement_ID=your_measurement_id
```


> 🧠 **Note**:
>
> - ✅ **Make sure your Firestore database has proper security rules** for read/write access based on authentication or custom logic. You can configure them in the Firebase Console under **Firestore > Rules**.


---

## 🛠 Usage Instructions

### ▶️ Running the Application

```bash
# Start the development server
npm run dev

# Or if you’re using separate client/server structure
# Start backend
cd server
npm run start

# Start frontend
cd client
npm run dev
```

### 🧪 Example Workflow

1. User enters a lobby or room.
2. Receives a random or user-submitted story prompt.
3. Writes a 100-word story.
4. The next player sees only the last sentence.
5. After all players contribute, the full chaotic story is revealed!

---

## 📁 Folder Structure

```
TwistTales:.
|   .gitignore
|   eslint.config.js
|   FolderStructure.txt
|   index.html
|   package-lock.json
|   package.json
|   README.md
|   vercel.json
|   vite.config.js
|   
+---lib
|       utils.js
|       
+---public
|       vite.svg
|       
\---src
    |   main.jsx
    |   
    +---assets
    |       book-writer-illustration.svg
    |       Color and font scheme
    |       landing-hero-illustration.png
    |       logo.png
    |       react.svg
    |       
    +---components
    |       AuthContext.jsx
    |       DataContext.jsx
    |       FloatingDocButton.jsx
    |       JoinRoomPopup.jsx
    |       LandingNav.jsx
    |       loading.jsx
    |       OldNavBackup.jsx
    |       ProtectedSection.jsx
    |       RoomCodeSection.jsx
    |       Router.jsx
    |       Story-pretext.jsx
    |       Story-textbox.jsx
    |       StoryPrompt.jsx
    |       text-generate-effect.jsx
    |       
    +---pages
    |       App.jsx
    |       FinalStory.jsx
    |       LandingPage.jsx
    |       login.jsx
    |       signup.jsx
    |       
    \---styles
            App.css
            index.css
            

```
---
