import './App.css';
import {
  ChakraProvider,
  CSSReset,
} from "@chakra-ui/react";
import InvoiceForm from './components/InvoiceForm';
import InvoiceUI from './components/InvoiceUI';

function App() {
  return (
    <ChakraProvider>
      <CSSReset />
      <InvoiceForm />
    </ChakraProvider>
  );
}

export default App;
