import React, { useState, useCallback } from "react"
import { Link } from "gatsby";
import { Tags } from "./Tags";
import { Alert } from "./Alert";
import { ErrorBoundary } from "./ErrorBoundary";
import { Navbar } from "./Navbar";
import { WelcomeModal } from "./WelcomeModal";

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`;
  const [showAlert, setShowAlert] = useState(false);
  const [alert, setAlert] = useState('');
  const [alertColor, setAlertColor] = useState('pink');

  const onSuccess = useCallback((newPull) => {
    setShowAlert(true);
    if (newPull === false || !newPull) {
      setAlertColor('red');
      setAlert(`Submit failed! Please try again or report bug here: https://github.com/benjackson90/commit/issues`)
      return;
    } else {
      setAlertColor('green');
      setAlert(`Submit successfully! However, you need to wait about some times for us to confirm it. See your post's status here: ${newPull}`)
    }
  }, [setShowAlert, setAlert, setAlertColor]);

  const onCloseAlert = useCallback(() => {
    setAlert('');
    setAlertColor('pink');
  }, [setAlert])

  return (
    <ErrorBoundary>
      <WelcomeModal />
      <div className="min-h-screen max-h-screen flex flex-col">
        <Alert color={alertColor} alert={alert} onCloseAlert={onCloseAlert} showAlert={showAlert} setShowAlert={setShowAlert} />
        <Navbar title={title} onSuccess={onSuccess} />
        <main className="flex flex-1 overflow-hidden">
          <div className="w-64 border-r border-solid border-gray-200 lg:block md:hidden hidden">
            <Tags />
          </div>
          <div className="flex flex-col flex-1 w-full">
            <div className="w-full h-full overflow-y-auto py-5">
              {children}
            </div>
          </div>
        </main>
      </div>
    </ErrorBoundary>
  )
}

export default Layout
