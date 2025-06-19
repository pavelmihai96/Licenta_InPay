import './App.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LogIn from './components/authentication/logIn/LogIn.jsx'
import SignUp from "./components/authentication/signUp/SignUp.jsx";
import Navbar from './components/layout/Navbar';
import ProtectedRoute from './service/ProtectedRoute';
import { AuthProvider } from "./service/AuthContext.jsx";
import ProviderFacilities from "./components/provider/ProviderFacilities.jsx";
import ConsumerSubscriptions from "./components/consumer/ConsumerSubscriptions.jsx";
import ConsumerFacilities from "./components/consumer/ConsumerFacilities.jsx";
import ConsumerFacilityInfo from "./components/consumer/ConsumerFacilityInfo.jsx";
import ConsumerSubscriptionInfo from "./components/consumer/ConsumerSubscriptionInfo.jsx";
import ConsumerInvoices from "./components/consumer/ConsumerInvoices.jsx";
import ConsumerFacilitiesJustForTest from "./components/consumer/ConsumerFacilitiesJustForTest.jsx";

function App() {

  return (
      <Router>
        <AuthProvider>
          <Navbar />
          <Routes>
            {/* Authorization routes */}
            <Route path='/' element={<LogIn />} />
            <Route path='/login' element={<LogIn />} />
            <Route path='/register' element={<SignUp />} />

            {/* Admin routes */}
            <Route path='/provider-facilities/:userId' element={<ProtectedRoute><ProviderFacilities /></ProtectedRoute>} />

            {/* Consumer routes */}
            <Route path='/consumer-subscriptions/:userId' element={<ProtectedRoute><ConsumerSubscriptions /></ProtectedRoute>} />
            <Route path='/consumer-subscriptions/:consumerId/:subscriptionId' element={<ProtectedRoute><ConsumerSubscriptionInfo /></ProtectedRoute>} />
            <Route path='/consumer-facilities/:userId' element={<ProtectedRoute><ConsumerFacilities /></ProtectedRoute>} />
            <Route path='/consumer-facilities/:consumerId/:contractId' element={<ProtectedRoute><ConsumerFacilityInfo /></ProtectedRoute>} />
            <Route path='/consumer-invoices/:userId' element={<ProtectedRoute><ConsumerInvoices /></ProtectedRoute>} />
          </Routes>
        </AuthProvider>
      </Router>
  );
}

export default App