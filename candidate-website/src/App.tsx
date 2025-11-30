import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import CoursesTable from './courses/CoursesTable';

function App() {
  return (
    <>
      <Header />
      <main>
        <h2>About the Candidate</h2>
      </main>
      <CoursesTable />
      <Footer />
    </>
  );
}

export default App;
