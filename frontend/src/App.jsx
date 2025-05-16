import './App.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LogInComponent from './logIn/LogInComponent'
import SignUpComponent from "./signUp/SignUpComponent.jsx";
import ProfileComponent from "./profile/ProfileComponent.jsx";
import Navbar from './layout/Navbar';
import ProtectedRoute from './service/ProtectedRoute';
import { AuthProvider } from "./service/AuthContext.jsx";
import ProviderFacilitiesComponent from "./components/provider/ProviderFacilitiesComponent.jsx";
import ConsumerSubscriptionsComponent from "./components/consumer/ConsumerSubscriptionsComponent.jsx";
import ConsumerFacilitiesComponent from "./components/consumer/ConsumerFacilitiesComponent.jsx";
import ConsumerFacilityInfoComponent from "./components/consumer/ConsumerFacilityInfoComponent.jsx";
import ConsumerSubscriptionInfoComponent from "./components/consumer/ConsumerSubscriptionInfoComponent.jsx";
import ProviderFacilityInfoComponent from "./components/provider/ProviderFacilityInfoComponent.jsx";
import ProviderConsumersOnFacilityComponent from "./components/provider/ProviderConsumersOnFacilityComponent.jsx";
import ProviderConsumersOnProviderComponent from "./components/provider/ProviderConsumersOnProviderComponent.jsx";
import ConsumerInvoicesComponent from "./components/consumer/ConsumerInvoicesComponent.jsx";

function App() {

  return (
      <Router>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route path='/' element={<LogInComponent />} />
            <Route path='/login' element={<LogInComponent />} />
            <Route path='/register' element={<SignUpComponent />} />


            <Route path='/provider-facilities/:userId' element={<ProtectedRoute><ProviderFacilitiesComponent /></ProtectedRoute>} />
            <Route path='/provider-facilities/:providerId/:facilityId' element={<ProtectedRoute><ProviderFacilityInfoComponent /></ProtectedRoute>} />
            <Route path='/provider-consumers-onF/:facilityId' element={<ProtectedRoute><ProviderConsumersOnFacilityComponent /></ProtectedRoute>} />
            <Route path='/provider-consumers-onP/:userId' element={<ProtectedRoute><ProviderConsumersOnProviderComponent /></ProtectedRoute>} />


            <Route path='/consumer-subscriptions/:userId' element={<ProtectedRoute><ConsumerSubscriptionsComponent /></ProtectedRoute>} />
            <Route path='/consumer-subscriptions/:consumerId/:subscriptionId' element={<ProtectedRoute><ConsumerSubscriptionInfoComponent /></ProtectedRoute>} />
            <Route path='/consumer-facilities/:userId' element={<ProtectedRoute><ConsumerFacilitiesComponent /></ProtectedRoute>} />
            <Route path='/consumer-facilities/:consumerId/:facilityId' element={<ProtectedRoute><ConsumerFacilityInfoComponent /></ProtectedRoute>} />
            <Route path='/consumer-invoices/:userId' element={<ProtectedRoute><ConsumerInvoicesComponent /></ProtectedRoute>} />


            <Route path='/profile' element={<ProtectedRoute><ProfileComponent /></ProtectedRoute>} />
          </Routes>
        </AuthProvider>
      </Router>
  );
}

export default App