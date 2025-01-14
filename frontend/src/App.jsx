import { useEffect } from "react"
import { Routes,Route, Navigate } from "react-router-dom"
import { useAuthStore } from "./store/useAuthStore"
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import SignUpPage from "./pages/SignUpPage"
import LoginPage from "./pages/LoginPage"
import ProfilePage from "./pages/ProfilePage"
import SettingsPage from "./pages/SettingsPage"
import { Loader } from "lucide-react"
import{ Toaster }from "react-hot-toast"
import { useThemeStore } from "./store/useThemeStore"

function App() {
  const{ authUser,checkAuth,ischeckingAuth,onlineUsers } = useAuthStore()
  const{ theme } = useThemeStore()
  useEffect(()=>{
     checkAuth()
  },[checkAuth])

  console.log("online users:",[onlineUsers])
  console.log("auth user:" ,{ authUser })
  
  if(ischeckingAuth&&!authUser){
     return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin"></Loader>
      </div>
     )
  }

  return (
    <div data-theme={theme}>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element= {authUser?<HomePage />:<Navigate to="/login" />}></Route>
        <Route path="/signup" element= {!authUser?<SignUpPage />:<Navigate to="/" />}></Route>
        <Route path="/login" element= {!authUser?<LoginPage />:<Navigate to="/" />}></Route>
        <Route path="/settings" element= {<SettingsPage></SettingsPage>}></Route>
        <Route path="/profile" element= {authUser?<ProfilePage></ProfilePage>:<Navigate to="/login" />}></Route>
      </Routes>
      <Toaster></Toaster>
    </div>
  )
}

export default App
