import { ToastContainer } from "react-toastify";
import Form from "./Form";
import Items from "./Items";

const App = () => {
  const [items, setItems] = useState(defaultItems);
  return (
    <section className="section-center">
      <ToastContainer position="top-center" />
      <Form />
      <Items />
    </section>
  );
};
export default App;
