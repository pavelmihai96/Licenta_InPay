import './App.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LogIn from './components/authentication/logIn/LogIn.jsx'
import SignUp from "./components/authentication/signUp/SignUp.jsx";
import Profile from "./components/profile/Profile.jsx";
import Navbar from './components/layout/Navbar';
import ProtectedRoute from './service/ProtectedRoute';
import { AuthProvider } from "./service/AuthContext.jsx";
import ProviderFacilities from "./components/provider/ProviderFacilities.jsx";
import ConsumerSubscriptions from "./components/consumer/ConsumerSubscriptions.jsx";
import ConsumerFacilities from "./components/consumer/ConsumerFacilities.jsx";
import ConsumerFacilityInfo from "./components/consumer/ConsumerFacilityInfo.jsx";
import ConsumerSubscriptionInfo from "./components/consumer/ConsumerSubscriptionInfo.jsx";
import ProviderFacilityInfo from "./components/provider/ProviderFacilityInfo.jsx";
import ProviderConsumersOnFacility from "./components/provider/ProviderConsumersOnFacility.jsx";
import ProviderConsumersOnProvider from "./components/provider/ProviderConsumersOnProvider.jsx";
import ConsumerInvoices from "./components/consumer/ConsumerInvoices.jsx";

function App() {

  return (
      <Router>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route path='/' element={<LogIn />} />
            <Route path='/login' element={<LogIn />} />
            <Route path='/register' element={<SignUp />} />

            <Route path='/provider-facilities/:userId' element={<ProtectedRoute><ProviderFacilities /></ProtectedRoute>} />
            <Route path='/provider-facilities/:providerId/:facilityId' element={<ProtectedRoute><ProviderFacilityInfo /></ProtectedRoute>} />
            <Route path='/provider-consumers-onF/:facilityId' element={<ProtectedRoute><ProviderConsumersOnFacility /></ProtectedRoute>} />
            <Route path='/provider-consumers-onP/:userId' element={<ProtectedRoute><ProviderConsumersOnProvider /></ProtectedRoute>} />

            <Route path='/consumer-subscriptions/:userId' element={<ProtectedRoute><ConsumerSubscriptions /></ProtectedRoute>} />
            <Route path='/consumer-subscriptions/:consumerId/:subscriptionId' element={<ProtectedRoute><ConsumerSubscriptionInfo /></ProtectedRoute>} />
            <Route path='/consumer-facilities/:userId' element={<ProtectedRoute><ConsumerFacilities /></ProtectedRoute>} />
            <Route path='/consumer-facilities/:consumerId/:contractId' element={<ProtectedRoute><ConsumerFacilityInfo /></ProtectedRoute>} />
            <Route path='/consumer-invoices/:userId' element={<ProtectedRoute><ConsumerInvoices /></ProtectedRoute>} />

            <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          </Routes>
        </AuthProvider>
      </Router>
  );
}

export default App