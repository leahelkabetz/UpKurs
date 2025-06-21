# UpKurs


פלטפורמת קורסים מודרנית עם ממשק משתמש מבוסס React + MUI, מערכת הרשאות וניהול קורסים, ביקורות, סינון לפי קטגוריה ומחיר, ושרתי Backend כולל JSON Server מקומי ו־GPT Server לתקשורת עם ChatGPT.

---

## 📁 מבנה הפרויקט

```
UpKurs/
├── client/           ← צד לקוח (React + Redux + MUI)
├── json-server/      ← JSON Server לנתונים מקומיים
├── gpt-server/       ← שרת Node.js לתקשורת עם OpenAI API
├── README.md         ← הקובץ הזה
```

---
## 🚀 טכנולוגיות עיקריות:
- React + TypeScript
- Redux Toolkit לניהול מצב אפליקציה
- React Hooks לכל הטפסים והפונקציונליות
- Material UI לעיצוב מודרני ונגיש
- json-server כשרת נתונים מקומי
- Node.js שרת GPT (תקשורת עם OpenAI API)
- סביבת `.env` לניהול מפתחות



---



## 🛠️ התקנות

1. **שכפול הריפוזיטורי**
   ```bash
   git clone https://github.com/leahelkabetz/UpKurs.git
   cd UpKurs
   ```

2. **התקנת התלויות לכל חלקי המערכת**

   ### 🔹 Client (React App)
   ```powershell
   cd client
   npm install
   ```

   ### 🔹 JSON Server (Backend מקומי)
   ```powershell
   cd json-server
   npm install
   ```

   ### 🔹 GPT Server (Node.js)
   ```powershell
   cd gpt-server
   npm install
   ```

---

## 📄 קובץ סביבה `.env` (בתוך `gpt-server`)

יש ליצור קובץ בשם `.env` בתיקיית `gpt-server` ולהכניס לתוכו:

```env
OPENAI_API_KEY=
```
> יש לודא שבקובץ index.js יש את השורות:

```index.js
import dotenv from 'dotenv';
dotenv.config();
```
 


---

## ▶️ איך מריצים?

שלושה חלקים פועלים במקביל:

### 1. 🎛️ הרצת שרת GPT
```powershell
cd gpt-server
node index.js
# רץ בברירת מחדל על http://localhost:3001
```

### 2. 🗃️ הרצת JSON Server
```powershell
cd json-server
npm start
# רץ על http://localhost:3000
```

### 3. 💻 הרצת אפליקציית React (Client)
```powershell
cd client
npm start
# נפתח אוטומטית בדפדפן: http://localhost:3000
```

---

## ✅ בדיקות

- ודאי שכל אחד מהשרתים רץ על פורט אחר (React = 3000, GPT = 3001, JSON = 4000)
- ודאי שקובץ `.env` קיים ותקני
- ניתן להגדיר פרוקסי בצד הקליינט כדי להפנות בקשות ל־GPT ו־JSON Server

---

## 👩‍💻 קרדיטים

פיתוח: לאה אלקבץ  
GitHub: [leahelkabetz](https://github.com/leahelkabetz)

---
