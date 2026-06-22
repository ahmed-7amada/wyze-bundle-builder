import { BundleProvider } from './state/BundleContext'
import BundleBuilder from './components/BundleBuilder'

export default function App() {
  return (
    <BundleProvider>
      <BundleBuilder />
    </BundleProvider>
  )
}
