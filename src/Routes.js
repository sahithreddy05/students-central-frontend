import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./core/Home";
import Signin from "./auth/Signin";
import Signup from "./auth/Signup";
import List from "./lostfound/Lists";
import PrivateRoutes from "./auth/helper/PrivateRoutes";
import AdminRoutes from "./auth/helper/AdminRotes";
import AddItem from "./lostfound/AddItem";
import Notifications from "./notifications/Notifications";
import AddNotification from "./notifications/AddNotification";
import UserComplaints from "./complaints/UserCom";
import AdminComplaints from "./complaints/AdminComp";
import AddComplaint from "./complaints/AddComplaint";
import UserCertificates from "./certificates/UserCerts";
import AddCertificate from "./certificates/AddCertificate";
import AllCertificates from "./certificates/AllCerts";
import CertsByRoll from "./certificates/CertsByRoll";
import SellerPanel from "./seller/SellerPanel";
import ManageFoodItems from "./seller/ManageFoodItems";
import AddFoodItem from "./seller/AddFoodItem";
import CanteenList from "./canteen/ListAll";
import CartList from "./canteen/Cart";
import UserOrders from "./orders/ListAll";
import AllOrders from "./seller/AllOrders";
import ScanOrder from "./seller/ScanOrder";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoutes path="/" exact component={Home} />
        <Route path="/signin" exact component={Signin} />
        <AdminRoutes path="/signup" exact component={Signup} />
        <PrivateRoutes path="/lostfound" exact component={List} />
        <PrivateRoutes path="/postlostfound" exact component={AddItem} />
        <PrivateRoutes path="/notifications" exact component={Notifications} />
        <AdminRoutes
          path="/addnotification"
          exact
          component={AddNotification}
        />
        <PrivateRoutes path="/complaints" exact component={UserComplaints} />
        <AdminRoutes path="/allcomplaints" exact component={AdminComplaints} />
        <PrivateRoutes path="/postcomplaint" exact component={AddComplaint} />
        <PrivateRoutes
          path="/certificates"
          exact
          component={UserCertificates}
        />
        <AdminRoutes
          path="/allcertificates"
          exact
          component={AllCertificates}
        />
        <AdminRoutes path="/rollcerts" exact component={CertsByRoll} />
        <PrivateRoutes
          path="/addcertificate"
          exact
          component={AddCertificate}
        />
        <AdminRoutes path="/sellerpanel" exact component={SellerPanel} />
        <AdminRoutes
          path="/managefooditems"
          exact
          component={ManageFoodItems}
        />
        <AdminRoutes path="/postfooditem" exact component={AddFoodItem} />
        <PrivateRoutes path="/canteen" exact component={CanteenList} />
        <PrivateRoutes path="/cart" exact component={CartList} />
        <PrivateRoutes path="/myorders" exact component={UserOrders} />
        <AdminRoutes path="/allorders" exact component={AllOrders} />
        <AdminRoutes path="/scanorder" exact component={ScanOrder} />
      </Switch>
    </BrowserRouter>
  );
}
