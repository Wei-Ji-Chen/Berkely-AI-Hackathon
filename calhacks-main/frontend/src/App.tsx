
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthenticationForm } from "./Login";
import AudioRecorder from "./component/AudioRecorder";
import Chat from "./component/Chat";
import Journal from "./component/Journal";
import Layout from "./component/Layout";
import { FeaturesCards } from "./component/Dash";
import NavigationBar from "./component/NavigationBar";
import { ChatNew } from "./component/ChatNew";
import { SignupForm } from "./Signup";
import { LoginContext } from "./context/LoginContext";
import { QueryClient, QueryClientProvider } from "react-query";

const client = new QueryClient();
import { TableReviews } from "./component/habit-tracking";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(checkLoggedIn());

  if (!isLoggedIn) {
    return (
      <div className="App">
        <QueryClientProvider client={client}>
          <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            <BrowserRouter>
              <Routes>
                <Route path="/signup" element={<SignupForm />} />
                <Route path="/" element={<AuthenticationForm />} />
              </Routes>
            </BrowserRouter>
          </LoginContext.Provider>
        </QueryClientProvider>
      </div>
    );
  }

  //data for TableReviews (Habit Tracking)
  const tableReviewsData = [
    {
      title: 'Vegetables once a week',
      author: 'Brian',
      // year: 2023,
      reviews: { positive: 50, negative: 50 },
      frequency: 25,
    },
    {
      title: 'Exercise 30 minutes a day',
      author: 'Sebastian',
      // year: 2023,
      reviews: { positive: 60, negative: 40 },
      frequency: 10,
    },
    {
      title: 'Read 10 pages everyday',
      author: 'Weiji',
      // year: 2023,
      reviews: { positive: 75, negative: 25 },
      frequency: 15,
    },
    {
      title: 'Meditate every Tuesday',
      author: 'Shreyas',
      // year: 2023,
      reviews: { positive: 30, negative: 70 },
      frequency: 3,
    },

  ];


  return (
    <div className="App">
      <QueryClientProvider client={client}>
        <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
          <BrowserRouter>
            <NavigationBar />
 
            <Routes>
              <Route path="/" element={<Layout />}>
                
                <Route index element={<FeaturesCards />} />
                <Route path="chat" element={<ChatNew />} />
                <Route path="tools/journal" element={<Journal />} />
                <Route path="tools/habbit-tracking" element={<TableReviews data={tableReviewsData} />} />
              </Route>
            </Routes>
          
          </BrowserRouter>
        </LoginContext.Provider>
      </QueryClientProvider>
    </div>
  );
}

export default App;



// import { useState } from "react";

// import { Link } from "react-scroll";
// import "./App.css";
// import "./style.css";
// import { AuthenticationForm } from "./Login";
// import AudioRecorder from "./component/AudioRecorder";
// import Chat from "./component/Chat";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Layout from "./component/Layout";
// import {FeaturesCards} from "./component/Dash";
// import NavigationBar from "./component/NavigationBar";

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const handleLoginSuccess = () => {
//     setIsLoggedIn(true);
//   };

//   return (
//     <div className="App">
//       {isLoggedIn ? (
//         <>
//           <BrowserRouter>
//             <Routes>
//               <Route path="/" element={<Layout />}>
//                 <Route index element={<FeaturesCards />} />
//                 <Route path="chat" element={<Chat />} />
//                 <Route path="todo" element={<AudioRecorder />} />
//                 {/* <Route path="*" element={<NoPage />} /> */}
//               </Route>
//             </Routes>
//           </BrowserRouter>
//         </>
//       ) : (
//         <AuthenticationForm onLoginSuccess={handleLoginSuccess} />
//       )}
//     </div>
//   );
// }

// export default App;

function checkLoggedIn() {
  const sessionCookie = document.cookie
    .split(";")
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith("session="));

  return !!sessionCookie;
}
